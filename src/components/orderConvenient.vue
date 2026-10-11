<script setup>
import Paymethods from './Paymethods.vue'
import OrderNotice from './OrderNotice.vue'
import PaymentActions from './PaymentActions.vue'
import { stores, paymentInstruction } from '../data/payment.js'
import { useOrder } from '../composables/useOrder.js'
const { total, selection } = useOrder()
</script>

<template>
  <Paymethods />
  <div class="payment-surface">
    <section class="form-panel panel" aria-label="超商代碼付款資訊">
      <p class="payment-instruction" data-region="S3">
        {{ paymentInstruction }}
      </p>
      <div class="store-payment-info" data-region="S7">
        <div>
          <h2 class="field-heading">應付金額</h2>
          <p class="total-price amount">${{ total }}</p>
        </div>
        <fieldset class="store-field">
          <legend>選擇超商</legend>
          <div class="store-grid">
            <label
              v-for="store in stores"
              :key="store.id"
              class="store-choice"
              :class="{ selected: selection.store === store.id }"
            >
              <input
                v-model="selection.store"
                type="radio"
                name="store"
                :value="store.id"
                :aria-label="store.label"
              />
              <img :src="store.image" alt="" width="42" height="42" /><span>{{
                store.label
              }}</span>
            </label>
          </div>
        </fieldset>
      </div>
      <p class="demo-note">流程示範，不會產生實際繳費代碼或交易。</p>
      <OrderNotice />
      <PaymentActions />
    </section>
  </div>
</template>
