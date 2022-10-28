import { resolve } from 'path';
import type { UserConfig } from 'vite';
import type { ViteBurnerConfig } from '../src/types';

const config: UserConfig & { viteburner: ViteBurnerConfig } = {
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/src': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
  },
  viteburner: {
    watch: [{ pattern: 'src/**/*.{js,ts}', transform: true }, { pattern: 'src/**/*.{script,txt}' }],
    sourcemap: 'inline',
    dumpFiles: (file: string) => {
      return file.replace(/^src\//, 'dist/').replace(/\.ts$/, '.js');
    },
  },
};

export default config;
