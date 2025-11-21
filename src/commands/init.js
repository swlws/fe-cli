import { select } from '@inquirer/prompts';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import ora from 'ora';
import { copyTemplate } from '../utils/render.js';
import { installDeps } from '../utils/install.js';
import { getTemplateList } from '../utils/getTemplates.js';

export default async function init(name) {
  console.log(chalk.cyan(`\n✨ 创建项目：${name}\n`));

  const answers = await select({
    message: '请选择模板',
    choices: getTemplateList().map((template) => ({
      name: template,
      value: template,
    })),
  });

  // 目标目录
  const targetDir = path.resolve(process.cwd(), name);

  if (fs.existsSync(targetDir)) {
    console.log(chalk.red(`❌ 目录 ${name} 已存在`));
    return;
  }

  const spinner = ora('生成项目中...').start();

  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const templateDir = path.resolve(__dirname, '../../templates', answers);

    // 1. 拷贝 + 渲染模板
    await copyTemplate(templateDir, targetDir, { projectName: name });

    spinner.succeed('项目创建成功！');

    // 2. 自动安装
    await installDeps(targetDir);

    console.log(chalk.green(`\n🎉 项目 ${name} 创建成功！`));
    console.log(`\ncd ${name}`);
    console.log(`npm run dev\n`);
  } catch (err) {
    spinner.fail('创建失败');
    console.error(err);
  }
}
