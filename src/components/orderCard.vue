<script setup>
import { nextTick, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Paymethods from './Paymethods.vue'
import OrderNotice from './OrderNotice.vue'
import PaymentActions from './PaymentActions.vue'
import { useOrder } from '../composables/useOrder.js'
import { validateCard } from '../utils/payment.js'
import visa from '../assets/images/visa.svg'
import mastercard from '../assets/images/mastercard.svg'
import jcb from '../assets/images/jcb.svg'
import expiryDesktop from '../assets/images/Web_order_hit01.png'
import expiryMobile from '../assets/images/Mobile_order_hit01.png'
import cvvDesktop from '../assets/images/Web_order_hit02.png'
import cvvMobile from '../assets/images/Mobile_order_hit02.png'
const { total } = useOrder()
const router = useRouter()
const route = useRoute()
const formElement = ref(null)
const form = reactive({ card: '', name: '', expiry: '', cvv: '', phone: '' })
const errors = ref({})
const submitted = ref(false)
const hints = reactive({ expiry: false, cvv: false })
const fields = [
  {
    id: 'card',
    label: '信用卡卡號',
    placeholder: 'xxxx-xxxx-xxxx-xxxx',
    maxlength: 19,
    mode: 'text',
  },
  { id: 'name', label: '持卡人英文姓名', mode: 'text' },
  {
    id: 'expiry',
    label: '有效年月',
    placeholder: 'MM/YY',
    maxlength: 5,
    mode: 'text',
    desktop: expiryDesktop,
    mobile: expiryMobile,
  },
  {
    id: 'cvv',
    label: '安全驗證碼',
    maxlength: 3,
    type: 'password',
    mode: 'numeric',
    desktop: cvvDesktop,
    mobile: cvvMobile,
  },
  { id: 'phone', label: '手機號碼', maxlength: 10, mode: 'tel' },
]
function revalidate() {
  if (submitted.value) errors.value = validateCard(form)
}
async function submit() {
  submitted.value = true
  errors.value = validateCard(form)
  if (Object.keys(errors.value).length) {
    await nextTick()
    formElement.value.querySelector('[aria-invalid="true"]')?.focus()
    return
  }
  for (const key of Object.keys(form)) form[key] = ''
  router.push({ path: '/order/paycomplete', query: route.query })
}
</script>

<template>
  <Paymethods />
  <div class="payment-surface card-surface">
    <section
      class="form-panel panel card-overview"
      data-region="S5"
      aria-label="信用卡付款金額"
    >
      <div>
        <h2 class="field-heading">應付金額</h2>
        <p class="total-price amount">${{ total }}</p>
      </div>
      <div>
        <h2 class="field-heading">支援使用卡種類</h2>
        <div class="card-brands">
          <img :src="visa" alt="Visa" /><img
            :src="mastercard"
            alt="Mastercard"
          /><img :src="jcb" alt="JCB" />
        </div>
      </div>
    </section>
    <form
      ref="formElement"
      class="form-panel panel card-form"
      novalidate
      autocomplete="off"
      @submit.prevent="submit"
    >
      <div class="card-fields" data-region="S6">
        <p class="demo-note" id="card-demo">
          僅供流程示範，請使用測試資料，不會扣款或送出資料。
        </p>
        <div v-for="field in fields" :key="field.id" class="form-field">
          <div class="field-label">
            <label :for="field.id">{{ field.label }}</label
            ><button
              v-if="field.desktop"
              type="button"
              class="hint-button"
              :aria-label="`查看${field.label}提示`"
              :aria-expanded="hints[field.id]"
              :aria-controls="`${field.id}-hint`"
              @click="hints[field.id] = !hints[field.id]"
            >
              ?
            </button>
          </div>
          <input
            :id="field.id"
            v-model="form[field.id]"
            :type="field.type || 'text'"
            :inputmode="field.mode"
            :maxlength="field.maxlength"
            :placeholder="field.placeholder"
            required
            :aria-invalid="!!errors[field.id]"
            :aria-describedby="`card-demo${errors[field.id] ? ` ${field.id}-error` : ''}`"
            @input="revalidate"
          />
          <p
            v-if="errors[field.id]"
            :id="`${field.id}-error`"
            class="field-error"
          >
            {{ errors[field.id] }}
          </p>
          <div
            v-if="field.desktop"
            v-show="hints[field.id]"
            :id="`${field.id}-hint`"
            class="field-hint"
          >
            <picture
              ><source media="(max-width: 576px)" :srcset="field.mobile" />
              <img
                :src="field.desktop"
                :alt="`${field.label}在信用卡上的位置示意`"
            /></picture>
          </div>
        </div>
      </div>
      <OrderNotice />
      <PaymentActions submit />
    </form>
  </div>
</template>
