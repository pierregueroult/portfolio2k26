import { nestJSConfig } from '@repo/eslint-config/nest';

export default [{ ignores: ['eslint.config.mjs', 'prettier.config.mjs'] }, ...nestJSConfig];
