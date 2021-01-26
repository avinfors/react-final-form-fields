const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(md|ts)x"],
  addons: ["@storybook/addon-docs"],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: [
        path.resolve(__dirname, "./"),
        path.resolve(__dirname, "../src/styles"),
      ],
    });

    config.module.rules.push({
      test: /\.scss$/,
      loaders: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: true,
          },
        },
        "sass-loader",
      ],
      include: path.resolve(__dirname, "../src"),
      exclude: path.resolve(__dirname, "../src/styles"),
    });

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
      },
    });

    config.resolve.extensions.push(".ts", ".tsx");

    return config;
  },
};
