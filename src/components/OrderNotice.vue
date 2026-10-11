<script setup>
import { notice } from '../data/payment.js'
</script>

<template>
  <aside class="order-notice" data-region="G4" aria-label="注意事項">
    <h2><span class="notice-symbol" aria-hidden="true">i</span>注意事項</h2>
    <ul>
      <li v-for="i in 3" :key="i">{{ notice }}</li>
    </ul>
  </aside>
</template>
