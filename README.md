# Nuxt Script Social Post

Nuxt Layer to extend Nuxt Scripts Facade Components with Social Posts like Facebook Posts or Videos, X (Twitter) Posts.

## Facade Components

### ScriptFacebookPosts

The `ScriptFacebookPosts` component provides a simple way to embed Facebook posts and videos in your Nuxt app.

It's optimized for performance by leveraging the [Element Event Triggers](https://scripts.nuxt.com/docs/guides/script-triggers#element-event-triggers), only loading when the specific elements events happen.

By default, it will load on the `visible` event.

```vue
<template>
  <ScriptFacebookPosts
    link="https://www.facebook.com/100063899706936/posts/pfbid038GTZA22yo2TFhQsKMLjcumxxt3a23nLAEwxZGTku76BgZSXoJUhf4fZ695XipjwTl"
  />
</template>
```

#### Props

The `ScriptFacebookPosts` component accepts the following props:

- `link`: Full URL to Facebook post or video
- `trigger`: The trigger event to load the YouTube Player. Default is `visible`. See [Element Event Triggers](https://scripts.nuxt.com/docs/guides/script-triggers#element-event-triggers) for more information.
- `dataWidth`: `max-width` value to be applied to post `container` and `fb-post | fb-video` elements.
- `caption`: description to be shown when loading `fb-video`.
- `title`: title to be shown when loading `fb-video`.

```ts
interface FBPostsProps {
  link: string
  trigger?: string
  dataWidth?: number
  caption?: string
  title?: string
}
```

### ScriptTwitterPost

The `ScriptTwitterPost` component provides a simple way to embed X (Twitter) posts in your Nuxt app.

It's optimized for performance by leveraging the [Element Event Triggers](https://scripts.nuxt.com/docs/guides/script-triggers#element-event-triggers), only loading when the specific elements events happen.

By default, it will load on the `visible` event.

```vue
<template>
  <ScriptTwitterPost
    link="https://twitter.com/vuejsdevelopers/status/1853852164587655360"
  />
</template>
```

#### Props

The `ScriptTwitterPost` component accepts the following props:

- `link`: Full URL to X post
- `trigger`: The trigger event to load the YouTube Player. Default is `visible`. See [Element Event Triggers](https://scripts.nuxt.com/docs/guides/script-triggers#element-event-triggers) for more information.
- `id`: The numerical ID of the desired Tweet. `required`
- `cards`: When set to hidden, links in a Tweet are not expanded to photo, video, or link previews. Default: `hidden`.
- `conversation`: When set to none, only the cited Tweet will be displayed even if it is in reply to another Tweet. Default: `none`.
- `theme`: When set to dark, displays Tweet with light text over a dark background. Default: `dark`.
- `width`: The maximum width of the rendered Tweet in whole pixels. This value should be between 250 and 550 pixels. Default: `325`.
- `align`: Float the Tweet left, right, or center relative to its container. Typically set to allow text or other content to wrap around the Tweet. Default: `right`.
- `lang`: A supported Twitter language code. Loads text components in the specified language. Note: does not affect the text of the cited Tweet. Default: `es`.
- `dnt`: When set to true, the Tweet and its embedded page on your site are not used for purposes that include personalized suggestions and personalized ads. Default: `true`.

```ts
interface ScriptXpostProps {
  link: string
  trigger?: string
  id?: string
  options?: XpostOptions
}

interface XpostOptions {
  cards?: 'hidden' | 'visible'
  conversation?: 'none' | 'all'
  theme?: 'dark' | 'light'
  width?: 'auto' | number
  align?: 'left' | 'rigth' | 'center'
  lang?: string
  dnt?: boolean
}
```
