// module.exports = function override(config, env) {
//   console.log('override')
//   let loaders = config.resolve
//   loaders.fallback = {
//     "fs": false,
//     "tls": false,
//     "net": false,
//     "http": require.resolve("stream-http"),
//     "https": false,
//     "zlib": require.resolve("browserify-zlib"),
//     "path": require.resolve("path-browserify"),
//     "stream": require.resolve("stream-browserify"),
//     "util": require.resolve("util/"),
//     "crypto": require.resolve("crypto-browserify")
//   }

//   return config
// }



// TODO: Not sure I need this file at all --- ran into bug involving webpack module 
// deprecations because they changed polyfill processes. This file was 
// created to be used by react-app-rewired to rewire the webpack configs
// that create-react-app hides without having to eject the webpack configs.

// Top portion above wasn't working, so tried bottom portion and it started
// to work once I changed package.json scripts and installed the "missing"
// modules, including npm installing "process" as a dev dependency (this was 
// the final key that took forever to figure out). BUT ONCE I DID THAT I TRIED
// COMMENTING OUT THE BOTTOM PORTION AND IT STILL WORKS!!! SO MIGHT NOT NEED
// THIS FILE OR THE WHOLE react-app-rewired stuff


// UPDATE (3/7/22): installed jquery and suddenly was getting error saying process is undefined again... yikes. tried a bunch of stuff - even tried using react-scripts instead of react-app-rewired for npm start, but ultimately, adding a new webpack.DefinePlugin below worked.. ********** Well it worked until I deleted and reinstalled node packages and package-lock.json, now its happening again...



const webpack = require('webpack');
module.exports = function override(config, env) {
  config.resolve.fallback = {
    // url: require.resolve('url'),
    // assert: require.resolve('assert'),
    crypto: require.resolve('crypto-browserify'),
    // http: require.resolve('stream-http'),
    // https: require.resolve('https-browserify'),
    // os: require.resolve('os-browserify/browser'),
    // process: require.resolve('process'),
    buffer: require.resolve('buffer'),
    stream: require.resolve('stream')
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  );

  return config;
}