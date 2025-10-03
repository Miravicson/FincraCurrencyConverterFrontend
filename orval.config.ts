import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:8080/swagger/yaml',
      validation: true,
    },
    output: {
      target: './src/_generated/index.ts', // Everything in a single file
      client: 'react-query',
      mode: 'single',
      indexFiles: false, // Ensure no additional index files are created
      prettier: true,
      // format: 'esm',
      mock: {
        type: 'msw',
        delay: 1000,
      },
      override: {
        mutator: {
          path: './src/lib/axios.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});

