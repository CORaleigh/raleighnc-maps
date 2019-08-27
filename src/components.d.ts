/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface WebMap {
    'address': string;
    'basemap': string;
    'basemapselect': boolean;
    'center': string;
    'collapsewidgets': boolean;
    'dockposition': string;
    'expandedwidget': string;
    'highlight': boolean;
    'layerlist': boolean;
    'legend': boolean;
    'list': boolean;
    'listfields': string;
    'listlayer': string;
    'listorderby': string;
    'listwhere': string;
    'mapId': string;
    'navigate': boolean;
    'popup': boolean;
    'popupdocked': boolean;
    'querylayer': string;
    'querywhere': string;
    'scene': boolean;
    'sceneId': string;
    'search': boolean;
    'zoom': number;
  }
}

declare global {


  interface HTMLWebMapElement extends Components.WebMap, HTMLStencilElement {}
  var HTMLWebMapElement: {
    prototype: HTMLWebMapElement;
    new (): HTMLWebMapElement;
  };
  interface HTMLElementTagNameMap {
    'web-map': HTMLWebMapElement;
  }
}

declare namespace LocalJSX {
  interface WebMap extends JSXBase.HTMLAttributes<HTMLWebMapElement> {
    'address'?: string;
    'basemap'?: string;
    'basemapselect'?: boolean;
    'center'?: string;
    'collapsewidgets'?: boolean;
    'dockposition'?: string;
    'expandedwidget'?: string;
    'highlight'?: boolean;
    'layerlist'?: boolean;
    'legend'?: boolean;
    'list'?: boolean;
    'listfields'?: string;
    'listlayer'?: string;
    'listorderby'?: string;
    'listwhere'?: string;
    'mapId'?: string;
    'navigate'?: boolean;
    'popup'?: boolean;
    'popupdocked'?: boolean;
    'querylayer'?: string;
    'querywhere'?: string;
    'scene'?: boolean;
    'sceneId'?: string;
    'search'?: boolean;
    'zoom'?: number;
  }

  interface IntrinsicElements {
    'web-map': WebMap;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


