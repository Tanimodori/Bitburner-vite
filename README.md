# Viteburner

Daemon tools of bitburner using vite for script transform, file syncing, RAM monitoring and more!

## Why viteburner

- Write dynamic config in TypeScript and JavaScript.
- No need to monitor your `dist` folder anymore.
- Manual upload/download any time you wish.
- Monitor RAM usage of your selected scripts easily.
- Interactive CLI and well-formatted outputs.
- IDE and system independent.
- Vite is faster than tsc for TypeScript transform.
- Utilize various vite plugins.

## Quick start

### Using [viteburner-template](https://github.com/Tanimodori/viteburner-template)

Prerequisites: [Node.js](https://nodejs.org/en/download/)

```bash
git clone https://github.com/Tanimodori/viteburner-template.git
cd viteburner-template
npm i
npm run dev
```

In bitburner, select "Options > Remote API", enter the port of viteburner displays (default: `12525`) and click "Connect".

### Install viteburner to your existing project

1. Install devDependencies

```bash
npm i -D viteburner vite
```

2. (a) Sync-only setup

In `vite.config.ts`

```ts
import { defineConfig } from 'viteburner';
export default defineConfig({
  viteburner: {
    watch: [{ pattern: 'src/**/*.{js,script,txt}' }],
  },
});
```

2.  (b) TS or mixed TS+JS setup

In `vite.config.ts`

```ts
import { defineConfig } from 'viteburner';
export default defineConfig({
  viteburner: {
    watch: [
      {
        pattern: 'src/**/*.{js,ts}',
        transform: true,
      },
      { pattern: 'src/**/*.{script,txt}' },
    ],
  },
});
```

3. configure `package.json`

```json
{
  "scripts": {
    "dev": "viteburner"
  }
}
```

4. `npm run dev` in your terminal to start viteburner.

## API

```ts
export interface ViteBurnerUserConfig {
  watch?: WatchItem[];
  sourcemap?: boolean | 'inline' | 'hidden';
  port?: number;
  timeout?: number;
  dts?: string | boolean;
  ignoreInitial?: boolean;
  download?: {
    server?: string | string[];
    location?: (file: string, server: string) => string | null | undefined;
    ignoreTs?: boolean;
    ignoreSourcemap?: boolean;
  };
  dumpFiles?: string | null | undefined | ((file: string) => string | null | undefined);
}

export interface WatchItem {
  pattern: string;
  transform?: boolean;
  location?: RenameOutput | ((file: string) => RenameOutput);
}

export type RenameOutput = string | RenameOutputObject | Array<string | RenameOutputObject> | null | undefined;

export type RenameOutputObject = {
  filename?: string;
  server?: string;
};
```

For detailed documentation, checkout the TSDoc of [`config.ts`](src/config.ts).

## Thanks

Thank them for inspiring this package.

- [acorn](https://github.com/acornjs/acorn)
- [bitburner](https://github.com/danielyxie/bitburner)
- [bitburner-filesync](https://github.com/bitburner-official/bitburner-filesync)
- [unconfig](https://github.com/antfu/unconfig)
- [vite](https://vitejs.dev/)
- [vitest](https://vitest.dev/)
- [vite-node](https://www.npmjs.com/package/vite-node)

## License

[MIT License](LICENSE) © 2022-present Tanimodori
