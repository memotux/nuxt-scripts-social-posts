<script setup lang="ts">
import type { ScriptXpostProps } from '../../../types'

const defaultOptions: ScriptXpostProps['options'] = {
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

const mergeOptions = Object.assign(defaultOptions, options)

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
    twttr.widgets.createTweet(id, container.value, mergeOptions)
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
      :data-align="mergeOptions.align"
      :data-width="mergeOptions.width"
      :data-dnt="mergeOptions.dnt"
      :data-theme="mergeOptions.theme"
      :data-cards="mergeOptions.cards"
      :data-conversation="mergeOptions.conversation"
      :data-lang="mergeOptions.lang"
    >
      <p
        dir="ltr"
        :lang="mergeOptions.lang || 'es'"
      >
        <a :href="link">Loading ...</a>
      </p>
    </blockquote>
  </div>
</template>
