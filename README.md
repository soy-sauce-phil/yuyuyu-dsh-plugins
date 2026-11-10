# yuyuyu-dsh-plugins

DeepSeek Harness（DSH）的个人插件合集，同时也是一个 DSH 插件市场。

| 插件 | 说明 |
|---|---|
| [dsh-novel-reader](dsh-novel-reader/) | 侧栏小说：兼容 Legado 书源，书源 JS 在沙箱中运行，也可导入本地 TXT |
| [dsh-tieba](dsh-tieba/) | 侧栏贴吧：只读浏览，支持推荐流、看帖、楼中楼，可选登录 |

两个插件都显示在 DSH 左侧栏工作区列表的下方，可以收起成一个小图标。同一时间只能展开其中一个，展开一个时，其他插件的小图标会隐藏。

## 快捷键（macOS）

| 快捷键 | 作用 |
|---|---|
| `⌥⇧N` | 展开 / 收起小说 |
| `⌥⇧T` | 展开 / 收起贴吧 |
| `⌥⇧R` | 刷新贴吧当前页面 |
| `⌥⇧H` | 隐藏 / 显示所有侧栏小部件 |

在 Windows / Linux 上用 `Alt+Shift+相应字母`。

## 安装

### 方式一：插件市场（推荐）

1. 打开 DSH 的插件管理，启用「自定义插件市场」，即 `@deepseek-ai/dsh-experimental-plugin-market-bundle`。
2. 在「发现」标签页添加市场索引：

   ```
   https://raw.githubusercontent.com/soy-sauce-phil/yuyuyu-dsh-plugins/main/market.json
   ```

3. 在列表里找到插件，点击安装，然后刷新页面。如果插件没有出现，重启一次 DSH。

### 方式二：直接从 Git 安装

在 DSH 插件管理中安装下面的地址。也可以直接让 DSH 的 Agent 帮你「安装这个插件」。

```
git+https://github.com/soy-sauce-phil/yuyuyu-dsh-plugins.git#main&path:/dsh-tieba
git+https://github.com/soy-sauce-phil/yuyuyu-dsh-plugins.git#main&path:/dsh-novel-reader
```

### 方式三：本地开发

```bash
git clone git@github.com:soy-sauce-phil/yuyuyu-dsh-plugins.git
cd yuyuyu-dsh-plugins/dsh-novel-reader && npm install   # 小说插件有依赖
```

然后在 DSH 插件管理里安装 `link:/你的路径/yuyuyu-dsh-plugins/dsh-tieba`，小说插件同理。
- 修改界面代码（`client.js`）后刷新页面即可生效。
- 修改后台代码（`index.js` 等）后需要重启 DSH。

## 发布新版本 / 添加新插件

1. 修改插件代码，并提升该插件 `package.json` 里的 `version`。
2. 新插件放在仓库根目录下的新文件夹里（需要包含 `package.json` 和 `cordis.patch.yml`），并在 `tools/build-market.mjs` 的 `PLUGINS` 列表里加上它。
3. 提交并推送代码，然后运行下面的命令，再提交并推送一次 `market.json`：

   ```bash
   node tools/build-market.mjs
   ```

   这个脚本会把 `market.json` 里每个插件的安装来源固定到**当前已推送的提交**。

## 隐私

仓库里不包含任何账号信息或第三方书源：
- 贴吧的 BDUSS 保存在 `~/.dsh-tieba/`。
- 小说的书源和书架保存在浏览器本地存储里。

## 免责

这些插件仅供个人学习使用，与百度、DeepSeek 等公司无关。贴吧插件使用的是非官方接口；小说插件不提供任何第三方书源。请遵守相关网站的用户协议和法律法规。

## 许可

[MIT](LICENSE)
