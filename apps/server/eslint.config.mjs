import antfu from "@antfu/eslint-config";

export default antfu({
  stylistic: false,
  rules: {
    "node/prefer-global/process": "off",
    "no-console": "warn",
  },
});