module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // rootValue: 37.5,
      rootValue({ file }) {
        return file.indexOf('vant') === -1 ? 75 : 37.5
      },
      propList: ['*'],
      exclude: 'github-markdown',
    },
  },
}
