<script setup>
import { useOrder } from '../composables/useOrder.js'
import Paymethods from './Paymethods.vue'
import OrderNotice from './OrderNotice.vue'
const { items, total, setQuantity } = useOrder()
function updateQuantity(item, event) {
  setQuantity(item.id, event.target.value)
  event.target.value = items.find((entry) => entry.id === item.id).quantity
}
</script>

<template>
  <div class="order-page">
    <h2 class="section-title" data-region="S1">確認訂單金額</h2>
    <section class="order-panel panel" data-region="S2" aria-label="訂單明細">
      <div class="order-panel-heading">
        <h3>訂單編號：20200520</h3>
        <span class="small-label">ORDER DETAILS</span>
      </div>
      <ul class="product-list">
        <li v-for="(item, index) in items" :key="item.id" class="product-row">
          <img
            class="product-image"
            :src="item.image"
            :alt="item.name"
            width="80"
            height="88"
          />
          <div class="product-copy">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
          </div>
          <div class="quantity-control">
            <button
              type="button"
              :aria-label="`減少第 ${index + 1} 項商品數量`"
              :disabled="item.quantity === 1"
              @click="setQuantity(item.id, item.quantity - 1)"
            >
              −
            </button>
            <input
              :value="item.quantity"
              type="number"
              min="1"
              max="10"
              step="1"
              inputmode="numeric"
              :aria-label="`第 ${index + 1} 項商品數量`"
              @input="updateQuantity(item, $event)"
            />
            <button
              type="button"
              :aria-label="`增加第 ${index + 1} 項商品數量`"
              :disabled="item.quantity === 10"
              @click="setQuantity(item.id, item.quantity + 1)"
            >
              +
            </button>
          </div>
          <strong class="item-price">${{ item.price * item.quantity }}</strong>
          <button
            class="delete-button"
            type="button"
            disabled
            aria-label="範例商品不可刪除"
            title="範例商品不可刪除"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7m4-7v7" />
            </svg>
          </button>
        </li>
      </ul>
      <div class="order-summary" aria-live="polite">
        <span>共{{ items.length }}項</span>
        <div>
          <span>總計</span><strong class="total-price">${{ total }}</strong>
        </div>
      </div>
    </section>
    <Paymethods />
    <OrderNotice />
  </div>
</template>
