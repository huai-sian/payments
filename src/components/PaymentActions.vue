<script setup>
import { useRoute } from 'vue-router'
defineProps({ submit: Boolean })
const route = useRoute()
</script>

<template>
  <div class="payment-actions" data-region="G6">
    <RouterLink
      :to="{ path: '/order/check', query: route.query }"
      class="button button-secondary"
      ><span aria-hidden="true">←</span>返回訂單</RouterLink
    >
    <button v-if="submit" class="button button-primary" type="submit">
      下一步<span aria-hidden="true">→</span>
    </button>
    <RouterLink
      v-else
      :to="{ path: '/order/paycomplete', query: route.query }"
      class="button button-primary"
      >下一步<span aria-hidden="true">→</span></RouterLink
    >
  </div>
</template>
