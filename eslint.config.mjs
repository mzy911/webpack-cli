import globals from "globals";
// eslint 通用规则
import pluginJs from "@eslint/js";
// TypeScript 插件规则
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
// 禁用所有与 Prettier 冲突的 ESLint 规则
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  // // eslint 通用规则
  // pluginJs.configs.recommended,
  // // 禁用所有与 Prettier 冲突的 ESLint 规则
  // eslintConfigPrettier,
  // // // 将 Prettier 的格式化规则转换为 ESLint 规则
  // eslintPluginPrettierRecommended,
  {
    // 必须配置：否则 eslint 不检测 ts 文件
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2021,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      // 设置环境（浏览器、Node.js 等）
      globals: {
        ...globals.browser,
        // 支持 Node.js 环境
        module: "readonly",
        process: "readonly",
        require: "readonly",
        __dirname: "readonly",
        // 支持 Jest 测试环境
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        HUSKY_GIT_PARAMS: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // 单引号
      quotes: ["error", "single"],
      // 最多允许 2 行空行
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0 }],
      // 声明未使用的变量只允许 React、App
      "no-unused-vars": ["error", { varsIgnorePattern: "^(React|App)$" }],
      // 使用 TypeScript 的规则
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^(React|App)$" },
      ],
    },
    settings: {
      react: {
        // pluginReact 与 eslintConfigPrettier 同时使用会有报错
        // 1、错误：Warning: React version not specified in eslint-plugin-react settings.
        // 2、处理：指定 React 版本（自动检测 React 版本）
        version: "detect",
      },
    },
  },
];
