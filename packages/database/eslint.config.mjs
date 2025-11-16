import { config as nestjsConfig } from "@repo/eslint-config/nest";

export default [
  { ignores: ["eslint.config.mjs", "prettier.config.mjs"] },
  ...nestjsConfig,
];
