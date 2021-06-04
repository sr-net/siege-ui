declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module 'vue-script2' {
  import { PluginFunction } from 'vue'
  const content: PluginFunction<any>
  export default content
}

declare module 'vue-google-adsense' {
  import { PluginFunction } from 'vue'
  const content: {
    Adsense: PluginFunction<any>
    InArticleAdsense: PluginFunction<any>
    InFeedAdsense: PluginFunction<any>
  }
  export default content
}
