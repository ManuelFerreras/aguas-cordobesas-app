import path from "path";

module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ['../public'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  webpackFinal: async (config, { configType }) => {
    config.resolve.modules = [path.resolve(__dirname, ".."), "node_modules"];

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  features: {
    interactionsDebugger: true
  }
};