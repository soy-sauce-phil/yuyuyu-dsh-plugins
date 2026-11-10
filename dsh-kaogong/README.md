# DSH 考公刷题

在 DSH 左侧栏刷公考行测题，收起时小图标显示今日进度。

## 功能

- 政治理论、常识判断、言语理解、数量关系、判断推理、资料分析，可分类练习或混合练习
- 可以读取放在本机的真题库：按整套卷练习、按来源（国考 / 江苏 / 内置自建）筛选，资料分析显示材料，题目配图和解析公式都能显示
- “今日一练”按每日目标抽题，会优先混入错题和没做过的题
- 答错自动进错题本，连续答对 2 次自动移出；可收藏题目
- 统计今日正确率、连续达标天数、各分类完成度和正确率
- 背题模式、打乱选项、多选题
- 导入自己的题库：支持文本格式和 JSON，可导出错题本

## 快捷键（macOS，Windows / Linux 用 Alt+Shift）

| 快捷键 | 作用 |
|---|---|
| `⌥⇧K` | 展开 / 收起考公刷题 |
| `⌥⇧H` | 隐藏 / 显示所有侧栏小部件 |

## 安装

在插件市场里安装，或在 DSH 插件管理中安装：

```
git+https://github.com/soy-sauce-phil/yuyuyu-dsh-plugins.git#main&path:/dsh-kaogong
```

安装后刷新页面。

## 说明

- 内置的 61 道题是为这个插件原创的示例题（资料分析的数据是虚构的），不是真题，只用来体验功能。正式备考请导入你有权使用的题库。
- 答题时可按 A-D 或 1-4 选择，回车下一题（鼠标在卡片上时生效）。
- 做题记录和导入的题库只保存在本机浏览器；本机真题库只在本机文件夹里。
- 文本题库格式：

  ```
  【常识判断】
  1. 题干
  A. 选项一
  B. 选项二
  答案：B
  解析：……
  ```

  JSON 格式：`[{"q": "题干", "opts": ["…", "…"], "ans": "B", "exp": "解析", "cat": "分类"}]`。

## 本机真题库

插件本身不带真题。真题库放在你自己电脑上的 `~/.dsh-kaogong/banks/<名字>/` 文件夹里，插件启动时自动读取，不会上传，也不会进这个仓库。

[`tools/convert_errrc.py`](tools/convert_errrc.py) 可以把 GitHub 上 [ERRRC/xingcezhenti](https://github.com/ERRRC/xingcezhenti) 整理的国考、江苏省考行测真题（Markdown）转换成题库包：

```bash
git clone --depth 1 https://github.com/ERRRC/xingcezhenti.git   # 约 300MB，含图片
python3 dsh-kaogong/tools/convert_errrc.py xingcezhenti
```

转换后重启 DeepSeek Harness，或在「题库与设置」里点「重新读取」。

- 真题版权归原出题方，题目和解析来自第三方整理，大多是网友回忆版，个别题可能和原卷有出入。仅供个人学习，请不要再分发转换后的题库。
- 题库包格式：`pack.json`（`papers`、`materials`、`questions`）加 `img/` 图片文件夹，说明见 [`index.js`](index.js) 开头的注释。

## 许可

MIT
