const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add support for additional file extensions
config.resolver.assetExts
  .push
  // Add any additional asset extensions if needed
  ();

// Add support for source files
config.resolver.sourceExts.push('jsx', 'js', 'ts', 'tsx', 'json');

module.exports = withNativeWind(config, { input: './global.css' });
