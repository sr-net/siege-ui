declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.graphql' {
  const content: string
  export default content
}

declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.png' {
  const content: string
  export default content
}

declare module 'vue-resize-text' {
  import { PluginObject } from 'vue'
  const content: PluginObject<any>
  export default content
}
