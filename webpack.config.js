const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mf",
    projectName: "canvas-ui",
    webpackConfigEnv,
    argv
  });

  return merge(defaultConfig, {
    devServer: {
      port: 8081,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },
    output: {
      publicPath: "http://localhost:8081/"
    },
    externals: {
      react: "react",
      "react-dom": "react-dom"
    }
  });
};
