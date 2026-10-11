<script setup>
import { useRoute } from 'vue-router'
import Paymethods from './Paymethods.vue'
const route = useRoute()
</script>

<template>
  <Paymethods />
  <div class="payment-surface">
    <section
      class="form-panel panel complete-panel"
      data-region="S8"
      aria-labelledby="complete-heading"
    >
      <span class="complete-symbol" aria-hidden="true">✓</span>
      <p class="result-label">流程示範結束</p>
      <h2 id="complete-heading">訂單成立！</h2>
      <p class="result-disclaimer">
        此為示範畫面，未建立實際訂單，也未進行扣款。
      </p>
      <p class="legacy-result-copy">
        訂單請於兩天內完成匯款，逾期店家將有權取消訂單。
      </p>
      <p class="muted small-copy">以上為舊版結果文案，僅供展示。</p>
      <RouterLink
        :to="{ path: '/order/check', query: route.query }"
        class="button button-primary home-button"
        >回首頁<span aria-hidden="true">→</span></RouterLink
      >
      <details class="legacy-message">
        <summary>舊版提示文字（示範）</summary>
        <p>Complete!</p>
        <p>We are working for your order!</p>
        <span>OK</span>
      </details>
    </section>
  </div>
</template>
