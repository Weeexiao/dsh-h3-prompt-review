# dsh-h3-prompt-review

DeepSeek Harness（DSH）agent 预设：**MiniMax H3 视频提示词审查与重写**。技能随包内置，装完即可用，不依赖任何本地技能目录。

## 安装

在装了 DSH 的机器上：

```bash
dsh plugin install github:Weeexiao/dsh-h3-prompt-review
```

或克隆后装本地路径：

```bash
git clone https://github.com/Weeexiao/dsh-h3-prompt-review.git
dsh plugin install ./dsh-h3-prompt-review
```

装完新开一个会话，在预设/模式里选「**H3 提示词审查**」。无需重启，技能已随包注册。

卸载：

```bash
dsh plugin remove dsh-h3-prompt-review
```

## 这个 agent 做什么

给它一条 H3 提示词（或一段中文剧本、分镜），它按固定顺序交付：

1. **判定** — 模式（T2VA / I2VA / FL2VA / L2VA / Ref2VA）、时长、参考素材、可用性。
2. **问题清单** — 表格：等级｜位置｜问题｜成片表现｜改法，按 P0 → P2 排序。
3. **重写提示词** — 完整可直接粘贴，段落齐全。
4. **改动说明** — 只列影响成片的改动。
5. **待确认** — 必须由用户拍板的事项。

审查分级覆盖：段落顺序与字段名、关键帧时点、参考标签与 retention 标记、台词逐字保留与说话人绑定、音轨分工（画内/画外/配乐）、运镜幅度与速度、连续性断裂、抽象词替代可视信息。

## 包含什么

| 部分 | 说明 |
| --- | --- |
| 预设定义 | [cordis.patch.yml](cordis.patch.yml)，`insert` 一行 `@deepseek-ai/dsh-agent-preset` |
| 人设 | 同文件内 `persona.prefix`：开工顺序、审查分级、输出格式、红线 |
| 随包技能 | [h3Skills.js](h3Skills.js) 在 preset scope 内注册 [skills/](skills/) 下的两个技能 |
| 工具 | 读文件、搜文件、加载技能、向用户提问；没有 shell 和写操作 |

技能内容来自 [Weeexiao/skills](https://github.com/Weeexiao/skills) 的 `storyboard/` 目录：

- `h3-prompt-writing` — H3 五种模式的权威字段、结构与示例
- `minimax-h3-storyboard-director` — 电影化分镜、运镜、Ref2VA 片段包审查

`h3Skills.js` 直接读 `skills/` 下的 `SKILL.md`，运行时通过 `ctx.skills.register()` 注册，因此：

- 换电脑只需装这一个插件，不用再配 `~/.agents/skills`
- 技能正文仍以文件形式随包分发，可直接用 `read` 打开 `references/` 里的原文

## 修改

改人设：编辑 `cordis.patch.yml` 的 `persona.prefix`。
改技能：直接改 `skills/<name>/SKILL.md` 或 `references/`。

改完重装一次让 DSH 重新加载：

```bash
dsh plugin install ./dsh-h3-prompt-review
```

本地开发时也可以直接指向仓库目录（`dsh plugin install /绝对路径`），pnpm 会做软链，改完只需重新 apply。

## 许可

MIT，见 [LICENSE](LICENSE)。技能正文版权归 [Weeexiao/skills](https://github.com/Weeexiao/skills) 作者所有，随包内嵌分发。
