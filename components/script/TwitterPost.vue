<script setup lang="ts">
defineProps({
  link: {
    type: String,
    required: true,
  },
  maxwidth: {
    type: Number,
    default: 480,
    validate: (val: number) => val >= 220 && val <= 550,
  },
  hide_media: {
    type: Boolean,
    default: false,
  },
  hide_thread: {
    type: Boolean,
    default: false,
  },
  omit_script: {
    type: Boolean,
    default: true,
  },
  align: {
    type: String,
    default: 'center',
    validate: (val: string) => ['left', 'right', 'center', 'none'].includes(val),
  },
  related: {
    type: String,
    default: undefined,
  },
  lang: {
    type: String,
    default: 'es',
  },
  theme: {
    type: String,
    default: 'dark',
    validate: (val: string) => ['dark', 'light'].includes(val),
  },
  link_color: {
    type: String,
    default: undefined,
    validate: (val: string) => val || val.startsWith('#'),
  },
  widget_type: {
    type: String,
    default: undefined,
    validate: (val: string) => val || val === 'video',
  },
  dnt: {
    type: Boolean,
    default: true,
  },
})

defineOptions({
  inheritAttrs: false,
})

const container = useTemplateRef<HTMLDivElement>('container')

const { onLoaded, remove } = useScript(
  {
    src: 'https://platform.twitter.com/widgets.js',
    id: 'twitter-wjs',
  },
  {
    trigger: useScriptTriggerElement({
      trigger: 'visible',
      el: container,
    }),
    use() {
      return window.twttr
    },
  }
)

onLoaded(async (twttr: Window['twttr']) => {
  await twttr.ready()
  twttr.widgets.load(container.value)
})

onUnmounted(() => {
  remove()
})
</script>

<template>
  <div>
    <blockquote
      ref="container"
      class="twitter-tweet"
      :align="align"
      :data-width="maxwidth"
      :data-dnt="dnt"
      :data-theme="theme"
    >
      <p
        dir="ltr"
        :lang="lang"
      >
        <a :href="link">Loading ...</a>
      </p>
    </blockquote>
  </div>
</template>
