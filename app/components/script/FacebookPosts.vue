<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    link: string
    trigger?: string
    dataWidth?: number
    caption?: string
    title?: string
  }>(),
  { trigger: 'visible' }
)

const fbCardStyle = {
  maxWidth: props.dataWidth ? `${props.dataWidth}px` : '80%',
  width: '100%',
}

const isVideo = computed(() => props.link.includes('/videos/'))

onMounted(() => {
  if (!document.querySelector('#fb-root')) {
    const fbRoot = document.createElement('div')
    fbRoot.id = 'fb-root'
    document.querySelector('body')?.prepend(fbRoot)
  }
})

const { onLoaded, remove } = useScript(
  {
    src: 'https://connect.facebook.net/en_US/sdk.js',
    tagPosition: 'bodyOpen',
    async: true,
  },
  {
    trigger: useScriptTriggerElement({
      trigger: props.trigger,
      el: useTemplateRef('container'),
    }),
    use() {
      return () => {
        window.FB.init({
          appId: useRuntimeConfig().fbAppId,
          xfbml: true,
          version: 'v3.2',
        })
      }
    },
  }
)

onLoaded((fbAsyncInit) => {
  fbAsyncInit()
})

onUnmounted(() => {
  if (document.querySelector('#fb-root')) {
    document.querySelector('#fb-root')?.remove()
  }
  remove()
})
</script>

<template>
  <div
    ref="container"
    :style="fbCardStyle"
  >
    <div
      v-if="isVideo"
      class="fb-video"
      :data-href="link"
      :data-with="dataWidth || 500"
    >
      <div class="fb-xfbml-parse-ignore">
        <blockquote :cite="link">
          <a
            v-if="title"
            :href="link"
            >{{ title }}</a
          >
          <p v-if="caption">{{ caption }}</p>
        </blockquote>
      </div>
    </div>
    <div
      v-else
      class="fb-post"
      :data-href="link"
      :data-with="dataWidth || 500"
    />
  </div>
</template>
