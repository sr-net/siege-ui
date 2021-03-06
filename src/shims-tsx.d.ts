/* eslint-disable @typescript-eslint/no-empty-interface,@typescript-eslint/consistent-type-definitions */
import { VNode } from "vue"
import { ComponentRenderProxy } from "vue"

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends ComponentRenderProxy {}
    interface ElementAttributesProperty {
      $props: any // specify the property name to use
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
