/**
 * @type { ProjectOptions }
 */
module.exports = {
  lintOnSave: false,

  chainWebpack: chain => {
    chain.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('raw-loader')
      .loader('raw-loader')
  },
}
