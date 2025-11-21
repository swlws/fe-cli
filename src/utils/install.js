import {execa} from 'execa';
import ora from 'ora';

export async function installDeps(targetDir) {
  const spinner = ora('安装依赖...').start();

  try {
    await execa('npm', ['install'], { cwd: targetDir });
    spinner.succeed('依赖安装完毕');
  } catch (err) {
    spinner.fail('依赖安装失败');
    throw err;
  }
}
