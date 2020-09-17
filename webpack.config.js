const path = require('path');

const clientConfig = {
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    entry: {
        client: './src/client/Client.ts'
    },
    node: {
        __filename: true,
        __dirname: true
    },
    target: "electron-renderer",
    output: {
        filename: '[name].js',
        path: path.join(process.cwd(), './public')
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};

const electronConfig = {
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    entry: {
        electron: './src/electron/Electron.ts'
    },
    node: {
        __filename: true,
        __dirname: true
    },
    target: "electron-main",
    output: {
        filename: '[name].js',
        path: path.join(process.cwd(), './public')
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};

const serverConfig = {
    mode: "production",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    entry: {
        server: './src/server/Server.ts'
    },
    node: {
        __filename: true,
        __dirname: true
    },
    target: "node",
    output: {
        filename: '[name].js',
        path: path.join(process.cwd(), './public')
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    }
};

module.exports = [clientConfig, electronConfig, serverConfig];