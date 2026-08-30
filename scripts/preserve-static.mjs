import { cp, mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const output = join(root, "dist");
const staticDirectories = ["fonts", "images", "mr-docs", "scripts", "styles"];

await mkdir(output, { recursive: true });

for (const directory of staticDirectories) {
  await cp(join(root, directory), join(output, directory), {
    recursive: true,
    force: false,
    errorOnExist: false
  });
}
const rootEntries = await readdir(root);

for (const entry of rootEntries) {
  if (entry === "exit-codes.html" || (entry.startsWith("tutorial-") && entry.endsWith(".html"))) {
    await cp(join(root, entry), join(output, entry), {
      force: false,
      errorOnExist: false
    });
  }
}
