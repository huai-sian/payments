<script setup>
import { methods } from '../data/payment.js'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <section
    class="payment-methods"
    data-region="G3"
    aria-labelledby="methods-heading"
  >
    <h2 id="methods-heading">付款方式</h2>
    <nav class="method-grid" aria-label="選定支付方式">
      <RouterLink
        v-for="method in methods"
        :key="method.id"
        :to="{ path: method.route, query: route.query }"
        class="method-card"
        :class="{ selected: route.meta.method === method.id }"
      >
        <img :src="method.icon" alt="" width="36" height="36" />
        <span>{{ method.label }}</span
        ><span class="method-mark" aria-hidden="true">{{
          route.meta.method === method.id ? '✓' : '↗'
        }}</span>
      </RouterLink>
    </nav>
  </section>
</template>
