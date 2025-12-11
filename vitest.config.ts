import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    include: ['test/integrations/**/*.{spec,test}.ts'],
    env: {
      NODE_ENV: 'test',
    },
  },
})
