import {resolve} from 'path';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import {defineConfig} from 'vitest/config';

export default defineConfig(({mode}) => {
  return {
    plugins: [
      tsconfigPaths({
        projects: [mode === 'production' ? 'tsconfig.prod.json' : 'tsconfig.json']
      }),
      dts({tsconfigPath: mode === 'production' ? 'tsconfig.prod.json' : 'tsconfig.json'})
    ],
    build: {
      lib: {
        name: 'random-color-generator',
        entry: resolve(__dirname, 'src/index.ts')
      },
      rollupOptions: {
        external: ['d3-color'],
        output: {
          globals: {
            'd3-color': 'hsl'
          }
        }
      }
    }
  };
});
