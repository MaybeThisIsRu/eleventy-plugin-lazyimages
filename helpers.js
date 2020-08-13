// Ensures relative paths start in the project root
exports.transformImgPath = (src, options = {}) => {
  if (
    src.startsWith('./') ||
    src.startsWith('../') ||
    (!src.startsWith('/') &&
      !src.startsWith('http://') &&
      !src.startsWith('https://') &&
      !src.startsWith('data:'))
  ) {
    // The file path is relative to the output document
    const { outputPath, inputPath } = options;
    const outputDir = outputPath.substring(0, outputPath.lastIndexOf('/') + 1);
    const imgPath = outputDir + src;
    // TODO: Finish this when https://github.com/11ty/eleventy/issues/789 is resolved
  }

  // Reference files from the root project directory
  if (src.startsWith('/') && !src.startsWith('//')) {
    return `.${src}`;
  }

  return src;
};

// Logs a message prepended with "LazyImages - "
exports.logMessage = (message) => {
  console.log(`LazyImages - ${message}`);
};

// Warns about common issues with custom configs
exports.checkConfig = (config, defaultConfig) => {
  const { appendInitScript, className } = config;
  const isDefaultScriptSrc = config.scriptSrc === defaultConfig.scriptSrc;

  if (!isDefaultScriptSrc && !appendInitScript) {
    console.warn(
      'LazyImages - scriptSrc will be ignored because appendInitScript=false'
    );
  }

  if (
    isDefaultScriptSrc &&
    appendInitScript &&
    !className.includes('lazyload')
  ) {
    console.warn(
      'LazyImages - LazySizes with the default config requires "lazyload" be included in className'
    );
  }
};
