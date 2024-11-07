import type { ElementScriptTrigger } from "#nuxt-scripts";

declare global {
  interface Window {
    twttr: {
      ready: () => Promise<void>;
      widgets: {
        createTweet: (id: string, el: Element | HTMLElement | null, options?: XpostOptions) => void;
        load: (el: Element | HTMLElement | null) => void;
      };
    };
    fbAsyncInit: () => void;
    FB: {
      init: (options: Record<string, unknown>) => void;
    };
  }
}

export interface FBPostsProps {
  link: string
  trigger?: ElementScriptTrigger
  dataWidth?: number
  caption?: string
  title?: string
}

export interface ScriptXpostProps {
  link?: string
  trigger?: ElementScriptTrigger
  id?: string
  options?: XpostOptions
}

export interface XpostOptions {
  cards?: 'hidden' | 'visible'
  conversation?: 'none' | 'all'
  theme?: 'dark' | 'light'
  width?: 'auto' | number
  align?: 'left' | 'rigth' | 'center'
  lang?: string
  dnt?: boolean
}