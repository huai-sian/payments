<script setup>
defineProps({ nowstep: { type: Number, required: true } })
const steps = [
  'Step1 選定支付方式',
  'Step2 輸入信用卡資訊或取得支付代碼',
  '示範結果',
]
</script>

<template>
  <section
    class="progress-section"
    data-region="G2"
    aria-labelledby="page-heading"
  >
    <div class="heading-row">
      <h1 id="page-heading">訂單資訊</h1>
      <span class="demo-badge"
        ><span aria-hidden="true"></span>付款流程示範</span
      >
    </div>
    <ol class="step-list" aria-label="付款進度">
      <li
        v-for="(label, index) in steps"
        :key="label"
        :class="{ current: nowstep === index + 1, done: nowstep > index + 1 }"
        :aria-current="nowstep === index + 1 ? 'step' : undefined"
      >
        <span class="step-number" aria-hidden="true">{{
          nowstep > index + 1 ? '✓' : `0${index + 1}`
        }}</span>
        <span class="step-label">{{ label }}</span>
      </li>
    </ol>
  </section>
</template>
