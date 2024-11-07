declare global {
  interface Window {
    twttr: {
      ready: () => Promise<void>;
      widgets: {
        load: (el: HTMLElement | null) => void;
      };
    };
    fbAsyncInit: () => void;
    FB: {
      init: (options: Record<string, unknown>) => void;
    };
  }
}