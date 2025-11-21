import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function getTemplateList() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const templatesDir = path.resolve(__dirname, '../../templates');

  return fs
    .readdirSync(templatesDir)
    .filter(name => fs.statSync(path.join(templatesDir, name)).isDirectory());
}
