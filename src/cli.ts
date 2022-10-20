import { watch } from './watcher';
import cac from 'cac';
import { loadConfig, ViteBurnerInlineConfig } from './config';
import { formatNormal } from './console';
import pkg from '../package.json';

const cli = cac('viteburner');

cli
  .command('', 'start dev server')
  .alias('serve')
  .alias('dev')
  .option('--cwd <cwd>', 'Working directory', { default: process.cwd() })
  .option('--port <port>', 'Port to listen on')
  .action(startDev);

cli.help();

cli.version(pkg.version);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function startDev(options: any) {
  const port = options.port;
  const resolveInlineConfig: ViteBurnerInlineConfig = {
    cwd: options.cwd,
    ...(port && { port }),
  };

  // resolve config
  console.log(formatNormal('config', 'resolving user config...'));
  const config = await loadConfig(resolveInlineConfig);
  console.log(formatNormal('config', 'config resolved'));

  watch(config);
}

export async function main() {
  cli.parse();
}
