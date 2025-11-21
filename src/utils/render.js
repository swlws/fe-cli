import fs from 'node:fs';
import path from 'node:path';
import ejs from 'ejs';

export async function copyTemplate(srcDir, destDir, data = {}) {
  console.log(`\n ✨ 创建目录：${destDir}`);
  fs.mkdirSync(destDir);

  const files = fs.readdirSync(srcDir);

  for (const file of files) {
    const src = path.join(srcDir, file);
    const dest = path.join(destDir, file);

    const stat = fs.statSync(src);

    if (stat.isDirectory()) {
      // fs.mkdirSync(dest);
      await copyTemplate(src, dest, data);
    } else {
      const content = fs.readFileSync(src, 'utf8');
      const rendered = ejs.render(content, data);

      fs.writeFileSync(dest, rendered);
    }
  }
}
