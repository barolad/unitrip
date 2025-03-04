import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: false,
  ignores: ['apps/web/src/routeTree.gen.ts'],
  rules: {
    'node/prefer-global/process': 'off'
  }
});
