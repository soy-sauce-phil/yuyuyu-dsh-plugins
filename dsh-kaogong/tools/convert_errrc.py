#!/usr/bin/env python3
"""
把 ERRRC/xingcezhenti 仓库里的国考、江苏省考行测真题（Markdown）转换成考公刷题插件的本机题库包。

  python3 convert_errrc.py <xingcezhenti 仓库目录> [输出目录]

输出目录默认是 ~/.dsh-kaogong/banks/zhenti，包含：
  pack.json      试卷列表、资料分析材料和全部题目
  img/           题目配图和解析公式图（只复制用到的）

题库只保存在本机，供个人学习使用，不要再分发。
"""
import html
import json
import os
import re
import shutil
import sys

if len(sys.argv) < 2:
    sys.exit(__doc__)
SRC = sys.argv[1]
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.expanduser('~/.dsh-kaogong/banks/zhenti')
PAPER_RE = re.compile(r'国家公务员录用考试|江苏省公务员录用考试')

# module folder -> plugin category
CATS = {'政治理论': '政治理论', '常识判断': '常识判断', '言语理解与表达': '言语理解', '数量关系': '数量关系', '判断推理': '判断推理', '资料分析': '资料分析'}
MODULE_ORDER = list(CATS.values())

used_images = set()
missing_images = set()


def rich(src):
    """HTML fragment -> plain text with {{img:..}} / {{u}} / {{b}} / {{sub}} / {{sup}} tokens."""
    s = src.replace('\r', '')

    def img(m):
        tag = m.group(0)
        p = re.search(r'src="([^"]+)"', tag)
        if not p:
            return ''
        path = p.group(1)
        path = re.sub(r'^(\.\./)*90-图片/', '', path)
        if path.startswith(('http:', 'https:', '/')) or '..' in path:
            return ''
        full = os.path.join(SRC, '90-图片', path)
        if not os.path.exists(full):
            missing_images.add(path)
            return '[图片缺失]'
        used_images.add(path)
        kind = 'f' if 'flag="tex"' in tag else 'i'
        w = re.search(r'width="(\d+)', tag)
        h = re.search(r'height="(\d+)', tag)
        size = f'|{w.group(1)}x{h.group(1)}' if (w and h) else ''
        return '{{' + ('fx' if kind == 'f' else 'img') + ':' + path + size + '}}'

    s = re.sub(r'<img\b[^>]*>', img, s, flags=re.I)
    s = re.sub(r'<br\s*/?>', '\n', s, flags=re.I)
    s = re.sub(r'</p>\s*', '\n', s, flags=re.I)
    s = re.sub(r'<p\b[^>]*>', '', s, flags=re.I)
    for tag, tok in (('u', 'u'), ('b', 'b'), ('strong', 'b'), ('sub', 'sub'), ('sup', 'sup')):
        s = re.sub(rf'<{tag}\b[^>]*>', '{{' + tok + '}}', s, flags=re.I)
        s = re.sub(rf'</{tag}>', '{{/' + tok + '}}', s, flags=re.I)
    s = re.sub(r'</?(span|i|em|font|div)\b[^>]*>', '', s, flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)  # anything else
    s = html.unescape(s).replace('\u00a0', ' ').replace('\u3000\u3000', '')
    lines = [l.strip() for l in s.split('\n')]
    out = []
    for l in lines:
        if l or (out and out[-1]):
            out.append(l)
    return '\n'.join(out).strip()


def paper_meta(title, region, year):
    t = title
    if '江苏' in region:
        m = re.search(r'([ABC])[类卷]', t)
        level = (m.group(1) + '类') if m else ''
        short = f'{year} 江苏 {level}'.strip()
        reg = '江苏'
    else:
        m = re.search(r'(副省级|地市级|市地级|省级|行政执法)', t)
        level = m.group(1) if m else ''
        level = {'市地级': '地市级'}.get(level, level)
        short = f'{year} 国考 {level}'.strip()
        reg = '国考'
    return reg, level, short


def parse_file(path):
    s = open(path, encoding='utf-8').read()
    fm = {}
    m = re.match(r'---\n(.*?)\n---\n', s, re.S)
    if m:
        for line in m.group(1).split('\n'):
            k, _, v = line.partition(':')
            fm[k.strip()] = v.strip().strip('"')
        s = s[m.end():]
    module = fm.get('模块') or os.path.basename(os.path.dirname(path)).split('-', 1)[-1]
    cat = CATS.get(module, module)
    title = fm.get('试卷') or os.path.basename(path)[:-3]
    blocks = re.split(r'^(#{2,3} .*)$', s, flags=re.M)
    material = None
    mats = {}
    qs = []
    for i in range(1, len(blocks), 2):
        head, body = blocks[i], blocks[i + 1]
        mm = re.match(r'## 材料 (\d+)', head)
        if mm:
            material = f'{title}|{module}|{mm.group(1)}'
            mats[material] = rich(body.strip().rstrip('-').strip())
            continue
        qm = re.match(r'(#{2,3}) 第 (\d+) 题.*?qid (\d+)(?: · ([^<]*))?', head)
        if not qm:
            continue
        if qm.group(1) == '##':
            material = None
        num, qid, tag = int(qm.group(2)), qm.group(3), (qm.group(4) or '').strip()
        body = re.sub(r'\n---\s*$', '', body.strip()).strip()
        am = re.search(r'^\*\*答案\*\*：\s*([A-H]+)\s*$', body, re.M)
        em = re.search(r'^\*\*官方解析\*\*\s*$', body, re.M)
        opt_iter = list(re.finditer(r'^- \*\*([A-H])\*\*\.\s?(.*?)\s*(✅)?\s*$', body, re.M))
        if not am or not opt_iter:
            continue
        stem = body[:opt_iter[0].start()]
        opts = [rich(o.group(2)) for o in opt_iter]
        letters = [o.group(1) for o in opt_iter]
        ans = [letters.index(x) for x in am.group(1) if x in letters]
        while opts and not opts[-1] and len(opts) - 1 not in ans:  # stray empty trailing option
            opts.pop(); letters.pop()
        exp = rich(body[em.end():]) if em else ''
        q = {'id': 'zt' + qid, 'cat': cat, 'tag': tag, 'n': num, 'q': rich(stem), 'opts': opts, 'ans': ans, 'exp': exp}
        if material:
            q['mat'] = material
        qs.append(q)
    return title, fm, module, qs, mats


def main():
    papers = {}
    materials = {}
    for d in sorted(os.listdir(SRC)):
        if not re.match(r'0\d-', d):
            continue
        for f in sorted(os.listdir(os.path.join(SRC, d))):
            if not f.endswith('.md') or not PAPER_RE.search(f):
                continue
            title, fm, module, qs, mats = parse_file(os.path.join(SRC, d, f))
            if not qs:
                continue
            year = int(fm.get('年份') or re.match(r'(\d{4})', f).group(1))
            region, level, short = paper_meta(title, fm.get('地区', ''), year)
            p = papers.setdefault(title, {'title': title, 'name': short, 'region': region, 'level': level, 'year': year, 'qs': []})
            p['qs'].extend(qs)
            materials.update(mats)

    # stable paper ids, questions ordered the way the paper is laid out
    out_papers, out_qs, used_mats = [], [], set()
    by_id = {}  # the same question often appears in several papers of one year (副省级/地市级, A/B/C 类)
    for i, p in enumerate(sorted(papers.values(), key=lambda x: (-x['year'], x['region'] != '国考', x['level']))):
        pid = f"{'gk' if p['region'] == '国考' else 'js'}{p['year']}{ {'副省级': 'f', '地市级': 'd', '省级': 's', '行政执法': 'x'}.get(p['level'], p['level'][:1] if p['level'] else '') }"
        p['qs'].sort(key=lambda q: (MODULE_ORDER.index(q['cat']) if q['cat'] in MODULE_ORDER else 99, q['n']))
        seen = set()
        order = []
        for q in p['qs']:
            if q['id'] in seen:
                continue
            seen.add(q['id'])
            order.append(q['id'])
            if q['id'] in by_id:
                by_id[q['id']]['papers'].append(pid)
                continue
            q['papers'] = [pid]
            by_id[q['id']] = q
            out_qs.append(q)
            if q.get('mat'):
                used_mats.add(q['mat'])
        out_papers.append({'id': pid, 'name': p['name'], 'title': p['title'], 'region': p['region'], 'level': p['level'], 'year': p['year'], 'count': len(seen), 'ids': order})

    # short material ids
    mat_ids = {k: f'm{i}' for i, k in enumerate(sorted(used_mats))}
    for q in out_qs:
        if q.get('mat'):
            q['mat'] = mat_ids[q['mat']]
        q.pop('n', None)

    os.makedirs(os.path.join(OUT, 'img'), exist_ok=True)
    for rel in sorted(used_images):
        dst = os.path.join(OUT, 'img', rel)
        if not os.path.exists(dst):
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            shutil.copyfile(os.path.join(SRC, '90-图片', rel), dst)

    pack = {
        'format': 'dsh-kaogong-pack/1',
        'name': '历年真题（国考 + 江苏省考）',
        'note': '来自 GitHub ERRRC/xingcezhenti 整理的行测真题（含网友回忆版）及解析，仅供个人学习。',
        'papers': out_papers,
        'materials': {v: materials[k] for k, v in mat_ids.items()},
        'questions': out_qs,
    }
    with open(os.path.join(OUT, 'pack.json'), 'w', encoding='utf-8') as fh:
        json.dump(pack, fh, ensure_ascii=False, separators=(',', ':'))
    size = os.path.getsize(os.path.join(OUT, 'pack.json'))
    print(f'papers {len(out_papers)}  questions {len(out_qs)}  materials {len(mat_ids)}  images {len(used_images)}  missing {len(missing_images)}  pack.json {size/1e6:.1f} MB')


if __name__ == '__main__':
    main()
