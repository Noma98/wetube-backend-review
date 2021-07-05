const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BASE_JS = "./src/client/js/";

module.exports = {
    entry: {
        main: BASE_JS + "main.js",
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        //path의 경로에 filename대로 만든다. 
        clean: true //이전에 빌드한 거 지우고 만든다.
    },
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
    })],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]]
                    },
                }
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    }
};