import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  // React Compiler is not enabled in this project. Keep its migration diagnostics
  // visible while the existing engines adopt compiler-compatible state patterns.
  // Hook-order and Next.js correctness rules retain their recommended severity.
  { rules: {
    'react-hooks/set-state-in-effect': 'warn',
    'react-hooks/immutability': 'warn',
    'react-hooks/refs': 'warn',
    'react-hooks/purity': 'warn',
  } },
  globalIgnores(['.next/**', 'node_modules/**', '**/node_modules/**', 'mcp/dist/**', 'next-env.d.ts']),
]);
