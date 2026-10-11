<script setup>
import Paymethods from './Paymethods.vue'
import OrderNotice from './OrderNotice.vue'
import PaymentActions from './PaymentActions.vue'
import { banks, paymentInstruction } from '../data/payment.js'
import { useOrder } from '../composables/useOrder.js'
const { total, selection } = useOrder()
</script>

<template>
  <Paymethods />
  <div class="payment-surface">
    <section class="form-panel panel" aria-label="ATM付款資訊">
      <p class="payment-instruction" data-region="S3">
        {{ paymentInstruction }}
      </p>
      <div class="payment-info" data-region="S4">
        <div>
          <h2 class="field-heading">應付金額</h2>
          <p class="total-price amount">${{ total }}</p>
        </div>
        <div class="bank-field">
          <label for="bank">選擇銀行</label
          ><select id="bank" v-model="selection.bank">
            <option v-for="bank in banks" :key="bank.id" :value="bank.id">
              {{ bank.label }}
            </option>
          </select>
        </div>
      </div>
      <p class="demo-note">流程示範，不會產生實際繳費代碼或交易。</p>
      <OrderNotice />
      <PaymentActions />
    </section>
  </div>
</template>
