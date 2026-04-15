import {resolve} from 'node:path';
import dts from 'vite-plugin-dts';
import {defineConfig} from 'vitest/config';

export default defineConfig(({mode}) => {
  return {
    resolve: {
      tsconfigPaths: true
    },
    plugins: [
      dts({tsconfigPath: mode === 'production' ? 'tsconfig.prod.json' : 'tsconfig.json'})
    ],
    build: {
      lib: {
        name: 'random-color-generator',
        entry: resolve(import.meta.dirname, 'src/index.ts')
      },
      rolldownOptions: {
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
