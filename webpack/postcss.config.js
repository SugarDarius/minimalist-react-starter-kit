module.exports = {
  plugins: [
    require('postcss-global-import')(),
    require('postcss-import')(),
    require('postcss-custom-properties')(),
    require('postcss-custom-media')(),
    require('postcss-media-minmax')(),
    require('postcss-custom-selectors')(),
    require('postcss-calc')(),
    require('postcss-nesting')(),
    require('postcss-nested')(),
    require('postcss-color-function')(),
    require('pleeease-filters')(),
    require('pixrem')(),
    require('postcss-selector-matches')(),
    require('postcss-selector-not')(),
    require('postcss-flexbugs-fixes')(),
    require('autoprefixer')({
      cascade: false,
      add: true,
      browsers: ['last 5 versions', 'IE > 10']
    })
  ]
};
