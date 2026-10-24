// 随包注册两个 H3 技能：装本插件即可用，不依赖 ~/.agents/skills 等外部目录。
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const skillDirs = ["h3-prompt-writing", "minimax-h3-storyboard-director"];
const baseDir = join(dirname(fileURLToPath(import.meta.url)), "skills");

export const name = "h3-skills";
export const inject = ["skills"];

function readSkill(dir) {
  const file = join(baseDir, dir, "SKILL.md");
  const raw = readFileSync(file, "utf8");
  const end = raw.indexOf("\n---", 3);
  const head = raw.slice(3, end);
  const body = raw.slice(end + 4).replace(/^\n+/, "");
  const field = (key) => head.match(new RegExp(`^${key}:[ \\t]*(.+)$`, "m"))?.[1].trim();
  return {
    name: field("name") ?? dir,
    description: field("description") ?? dir,
    content: body,
    path: file,
    source: "dsh-h3-prompt-review"
  };
}

export function apply(ctx) {
  for (const dir of skillDirs) {
    const skill = readSkill(dir);
    ctx.effect(() => ctx.skills.register(skill));
  }
}
