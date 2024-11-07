<script setup lang="ts">
import type { ScriptXpostProps, XpostOptions } from '../../types'

const defaultOptions: XpostOptions = {
  cards: 'hidden',
  conversation: 'none',
  theme: 'dark',
  width: 'auto',
  align: 'left',
  lang: 'es',
  dnt: true,
}

const { id, trigger = 'visible', options } = defineProps<ScriptXpostProps>()

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
      trigger: trigger,
      el: container,
    }),
    use() {
      return window.twttr
    },
  }
)

onLoaded(async (twttr: Window['twttr']) => {
  await twttr.ready()
  if (id) {
    twttr.widgets.createTweet(id, container.value, Object.assign(defaultOptions, options))
  } else {
    twttr.widgets.load(container.value?.children[0] || null)
  }
})

onUnmounted(() => {
  remove()
})
</script>

<template>
  <div ref="container">
    <blockquote
      v-if="link && !id"
      class="twitter-tweet"
      :data-align="options?.align || 'center'"
      :data-width="options?.width || 'auto'"
      :data-dnt="options?.dnt || true"
      :data-theme="options?.theme || 'dark'"
      :data-cards="options?.cards || 'hidden'"
      :data-conversation="options?.conversation || 'none'"
      :data-lang="options?.lang || 'es'"
    >
      <p
        dir="ltr"
        :lang="options?.lang || 'es'"
      >
        <a :href="link">Loading ...</a>
      </p>
    </blockquote>
  </div>
</template>
