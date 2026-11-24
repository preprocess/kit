import { readFile } from "node:fs/promises";

const stylesheet = await readFile(
  new URL("../dist/styles.css", import.meta.url),
  "utf8",
);

for (const keyframe of ["spinner-move", "spinner-dash"]) {
  if (!stylesheet.includes(`@keyframes ${keyframe}`)) {
    throw new Error(`Built stylesheet is missing @keyframes ${keyframe}`);
  }
}

for (const utility of [
  ".scroll-fade",
  ".scroll-fade-x",
  ".scroll-divider",
  ".scrollbar-hide",
  ".shimmer-text",
  ".typeset",
  ".reveal-product",
]) {
  if (!stylesheet.includes(utility)) {
    throw new Error(`Built stylesheet is missing ${utility}`);
  }
}
