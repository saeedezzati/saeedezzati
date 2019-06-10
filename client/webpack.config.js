const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebappWebpackPlugin = require("webapp-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");
// const { GuessPlugin } = require("guess-webpack");
// const { parseRoutes } = require("guess-parser");

require("@babel/polyfill");

module.exports = (env, argv) => ({
    mode: argv.mode,
    entry: {
        // make baseone entry for itself(header and footer??)
        main: ["@babel/polyfill", path.resolve(__dirname, `src/index.js`)]
    },
    output: {
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "build"),
        publicPath: ("/") // append this before the bundle-[hash].js in index.html files
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules/"),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-react", "@babel/preset-env"],
                            plugins: [
                                "@babel/plugin-proposal-class-properties",
                                ["@babel/plugin-proposal-decorators", { legacy: true }],
                                "@babel/plugin-proposal-do-expressions",
                                "@babel/plugin-proposal-export-default-from",
                                "@babel/plugin-proposal-export-namespace-from",
                                "@babel/plugin-proposal-function-sent",
                                "@babel/plugin-proposal-json-strings",
                                "@babel/plugin-proposal-logical-assignment-operators",
                                "@babel/plugin-proposal-nullish-coalescing-operator",
                                "@babel/plugin-proposal-numeric-separator",
                                "@babel/plugin-proposal-optional-chaining",
                                ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
                                "@babel/plugin-proposal-throw-expressions",
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-syntax-import-meta"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg|ico|gif)$/,
                include: path.resolve(__dirname, "src"),
                exclude: path.resolve(__dirname, "node_modules/"),
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            // publicPath: 'assets/',
                            name: "/[path][name].[ext]?[hash]"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["node_modules"],
        alias: {
            actions: path.resolve("./src/actions/"),
            actionTypes: path.resolve("./src/actionTypes/"),
            api: path.resolve("./src/api/"),
            common: path.resolve("./src/pages/common/"),
            config: path.resolve("./src/config/"),
            constants: path.resolve("./src/constants/"),
            icons: path.resolve("./src/pages/common/icons/"),
            pages: path.resolve("./src/pages/"),
            reducers: path.resolve("./src/reducers/"),
            router: path.resolve("./src/router/"),
            utils: path.resolve("./src/utils/")
        }
    },
    plugins: [
        argv.mode === "production" && new CleanWebpackPlugin(),
        argv.mode === "production" && new CopyWebpackPlugin(
            [
                { from: "./styles.css", to: "." },
                { from: "./assets/", to: "assets/" }
            ],
            { ignore: ["*.sketch", "*/ico"] }
        ),
        argv.mode === "production" && new MinifyPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            // favicon: argv.mode === "development" && "assets/favicon-dev.ico",
            // inject: true,
            title: argv.mode === "production" ? "Saeed Ezzati Personal Website" : "DEV-Saeed Ezzati Personal Website",
            // chunks: ["index"],
            filename: "index.html",
            template: "template.html"
        }),
        new WebappWebpackPlugin({
            logo: argv.mode === "production" ? "./assets/logo/logo.svg" : "./assets/logo/logo-dev.svg",
            // The prefix for all image files (might be a folder or a name)
            prefix: "assets/",
            // Emit all stats of the generated icons
            // emitStats: false,
            // The name of the json containing all favicon information
            // don't rebuild the favicons until those hashes change
            cache: true,
            // Inject the html into the html-webpack-plugin
            inject: "force",
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            // background: "#fff",
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: "Saeed Ezzati"
        }),

        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: JSON.stringify(argv.mode), // production, development
                    FB_GRAPH_URL: JSON.stringify("https://graph.facebook.com"),
                    FB_API_VERSION: JSON.stringify("3.0"),
                    DOMAIN: JSON.stringify("saeedezzati.com"),
                    API_URL: JSON.stringify(argv.mode === "development" ? "https://dev.saeedezzati.com:8000" : "https://api.saeedezzati.com"),
                    WWW_URL: JSON.stringify(argv.mode === "development" ? "https://dev.saeedezzati.com:8080" : "https://saeedezzati.com"),
                    MEDIA_URL: JSON.stringify(argv.mode === "development" ? "https://dev.saeedezzati.com:8000" : "https://a0-saeedezzati.com")

                }
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        argv.mode === "production" && new CompressionPlugin({
            filename: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html)$/,
            // test: /\.(js|css|html|svg)$/,
            compressionOptions: { level: 9 },
            threshold: 0,
            minRatio: 1,
            deleteOriginalAssets: false
        }),
        argv.mode === "production" && new CompressionPlugin({
            filename: "[path].br[query]",
            algorithm: "brotliCompress",
            test: /\.(js|html)$/,
            // test: /\.(js|css|html|svg)$/,
            compressionOptions: { level: 11 },
            threshold: 0,
            minRatio: 1,
            deleteOriginalAssets: false
        }),
        new ManifestPlugin({
            writeToFileEmit: true
        }),
        argv.mode === "production" && new ImageminWebpWebpackPlugin({
            config: [
                {
                    test: /\.(jpe?g|png)/,
                    options: {
                        quality: 75
                    }
                }
            ],
            overrideExtension: false, // image.png -> image.png.webp
            detailedLogs: false,
            strict: true
        }),
        // argv.mode === "production" && new GuessPlugin({
        //     GA: "182647124",
        //     // period: {
        //     //     startDate: new Date("2016-1-1"),
        //     //     endDate: new Date("2018-2-24")
        //     // },
        //     routeProvider() {
        //         return parseRoutes(".");
        //     },
        //     runtime: {
        //         delegate: false
        //     }
        //     // routeFormatter(r) {
        //     //     return r.replace(/^\/, "");
        //     // }
        // }),
        // argv.mode === "development" && new webpack.HotModuleReplacementPlugin(),
        argv.mode === "production" && new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: path.resolve(__dirname, `reports/report.html`)
        })
    ].filter(plugin => plugin !== false),

    optimization: {
        minimize: argv.mode === "production",
        splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const { 1: packageName } = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace("@", "")}`;
                    }
                }
            }
        },
        runtimeChunk: "single"
    },
    devtool: argv.mode === "development" && "eval-source-map",
    devServer: {
        inline: false,
        compress: false,
        overlay: false,
        https: true,
        hot: false,
        allowedHosts: [
            ".saeedezzati.com",
            "localhost",
            "127.0.0.1",
            "facebook.com"
        ],
        host: "0.0.0.0",
        port: 8080,
        historyApiFallback: true, // {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "*" // X-Requested-With, content-type, Authorization'
        }
    }
});
