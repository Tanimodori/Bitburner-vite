import { loadConfig as loadConfigRaw } from 'unconfig';

import { UserConfig } from 'vite';
import { HmrOptions } from './plugins/hmr';

export interface ViteBurnerConfig extends HmrOptions {
  sourcemap?: boolean | 'inline' | 'hidden';
}

export interface ViteBurnerUserConfig extends UserConfig {
  viteburner?: ViteBurnerConfig;
}

export interface ViteBurnerInlineConfig {
  cwd: string;
}

export async function loadConfig(inlineConfig: ViteBurnerInlineConfig) {
  const { config } = await loadConfigRaw<ViteBurnerConfig>({
    sources: [
      // load from `viteburner.config.xx`
      {
        files: 'viteburner.config',
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
      },
      // load inline config from `vite.config`
      {
        files: 'vite.config',
        async rewrite(config) {
          const resolvedConfig = await (typeof config === 'function' ? config() : config);
          const sourcemap = resolvedConfig?.build?.sourcemap;
          return {
            ...(sourcemap && { sourcemap }),
            ...resolvedConfig?.viteburner,
          };
        },
      },
    ],
    cwd: inlineConfig.cwd,
    merge: true,
  });
  return config;
}