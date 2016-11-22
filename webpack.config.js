module.exports = {
    entry: {
        javascript: "./src/index.js"
    },
    output: {
        path: "./dist",
        filename: "index.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: [
                        "es2015"
                    ]
                }
            }
        ]
    }
};
