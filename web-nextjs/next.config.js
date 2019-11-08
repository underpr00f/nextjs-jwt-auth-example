// const sass = require('@zeit/next-sass');
// const CSS = require('@zeit/next-css');
// const withPlugins = require('next-compose-plugins');
// const fonts = require('next-fonts');
// const progressBar = require('next-progressbar')
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const TerserPlugin = require('terser-webpack-plugin');
// const withSourceMaps = require('@zeit/next-source-maps');

// const isProd = process.env.NODE_ENV === 'production';

// const nextConfig = {
//   serverRuntimeConfig: {},
//   publicRuntimeConfig: { // Will be available on both server and client
//     DOMAIN: isProd ? 'http://localhost:3000' : 'http://localhost:3000'
//   },
//   compress: true
// }
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })


// console.log("isProd", isProd);
// module.exports = withPlugins([
//   [withSourceMaps({   
//     webpack(config, {dev, isServer}) {
//       if (!dev && !isServer) {
//         config.optimization.minimize = true
//         config.optimization.minimizer = [new TerserPlugin({
//           parallel: true,
//           sourceMap: true,
//           cache: true
//         })]
//         config.optimization.splitChunks.cacheGroups = { 
//           default: false,
//           vendors: false,
//           framework: {
//               name: 'framework',
//               chunks: 'all',
//               test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
//               priority: 40
//           },
//           lib: {
//               test(module) {
//                   return module.size() > 160000
//               },
//               name(module) {
//                   return /node_modules\/(.*)/.exec(module.identifier())[1]
//                       .replace(/\/|\\/g, "_")
//               },
//               priority: 30,
//               minChunks: 1,
//               reuseExistingChunk: true
//           },
//           commons: {
//               name: 'commons',
//               chunks: 'all',
//               minChunks: totalPages,
//               priority: 20
//           },
//           shared: {
//             name: false,
//             priority: 10,
//             minChunks: 2,
//             reuseExistingChunk: true
//           }               
//         }
//         config.optimization.maxInitialRequests = 20         
//       }

//       return config
//     }
//   })],
//   // [sass({
//   //   prerenderPages: false,    
//   //   webpack(config, options) {
//   //     config.module.rules.push({
//   //       test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//   //       use: 'raw-loader',
//   //     });
//   //     if (config.mode === 'production') {
//   //       if (Array.isArray(config.optimization.minimizer)) {
//   //         config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
//   //       }
//   //       config.optimization.splitChunks.cacheGroups = { 
//   //         common: {
//   //           name: "common",
//   //           test: /\.(css|scss)$/,
//   //           chunks: "all",
//   //           minChunks: 2,
//   //           enforce: true
//   //         }
//   //       }
//   //     }
//   //     return config;
//   //   }
//   // })],
//   // CSS,
//   // fonts,
//   progressBar,
//   withBundleAnalyzer({})
// ], 
// nextConfig);