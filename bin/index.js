#!/usr/bin/env node

import { Command } from 'commander';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pkg = require('../package.json');

import init from '../src/commands/init.js';

const program = new Command();

program
  .name('fe-cli')
  .description('A Front End CLI')
  .version(pkg.version);

program
  .command('init <project-name>')
  .description('Create project')
  .action(init);

program.parse();
