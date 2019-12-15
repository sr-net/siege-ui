/**
 * @type { ProjectOptions }
 */
module.exports = {
  lintOnSave: false,

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
