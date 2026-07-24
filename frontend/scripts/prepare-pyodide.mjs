import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = resolve(root, "node_modules/pyodide");
const destinationDir = resolve(root, "public/pyodide");
const requiredFiles = [
  "pyodide.js",
  "pyodide.asm.js",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
  "pyodide-lock.json",
];

mkdirSync(destinationDir, { recursive: true });

for (const file of requiredFiles) {
  const source = resolve(sourceDir, file);
  const destination = resolve(destinationDir, file);
  if (!existsSync(source)) {
    throw new Error(`Asset Pyodide introuvable après installation: ${source}`);
  }
  copyFileSync(source, destination);
}

console.log(`Runtime Pyodide local préparé (${requiredFiles.length} fichiers): ${destinationDir}`);
