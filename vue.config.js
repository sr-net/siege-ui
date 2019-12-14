/**
 * @type { ProjectOptions }
 */
module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/siege-ui' : '/',

  /**
   * @param chain { import("webpack-chain").Config }
   */
  chainWebpack: chain => {
    chain.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('raw-loader')
      .loader('raw-loader')
  },
}
