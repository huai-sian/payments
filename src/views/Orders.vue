<script setup>
import { nextTick, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PaymentTop from '../components/PaymentTop.vue'
import ProgressStep from '../components/ProgressStep.vue'
import PaymentFooter from '../components/PaymentFooter.vue'
const route = useRoute()
const main = ref(null)
watch(
  () => route.path,
  async () => {
    await nextTick()
    main.value?.focus({ preventScroll: true })
  },
)
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content" @click.prevent="main?.focus()"
      >跳至主要內容</a
    >
    <PaymentTop />
    <main id="main-content" ref="main" tabindex="-1" class="container">
      <ProgressStep :nowstep="route.meta.step" />
      <RouterView />
    </main>
    <PaymentFooter />
  </div>
</template>
