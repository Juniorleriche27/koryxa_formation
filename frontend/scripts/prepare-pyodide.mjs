import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "node_modules/pyodide/pyodide.js");
const destinationDir = resolve(root, "public/pyodide");
const destination = resolve(destinationDir, "pyodide.js");

if (!existsSync(source)) {
  throw new Error(`Pyodide introuvable après installation: ${source}`);
}

mkdirSync(destinationDir, { recursive: true });
copyFileSync(source, destination);
console.log(`Pyodide loader préparé: ${destination}`);
