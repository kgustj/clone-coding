const path = require("path");

module.exports = {
    // 브라우저에서 실행할 코드: src/client/js → assets/js
    entry: {
        videoPlayer: "./src/client/js/videoPlayer.js",
    },
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "assets", "js"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", { targets: "defaults" }]],
                    },
                },
            },
        ],
    },
};
