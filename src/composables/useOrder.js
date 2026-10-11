import { computed, reactive, readonly } from 'vue'
import { products } from '../data/payment.js'
import { normalizeQuantity } from '../utils/payment.js'

const items = reactive(products.map((product) => ({ ...product, quantity: 1 })))
const selection = reactive({ bank: 'BKTW', store: '711' })
const total = computed(() =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
)

export function useOrder() {
  function setQuantity(id, value) {
    const item = items.find((entry) => entry.id === id)
    if (item) item.quantity = normalizeQuantity(value)
  }
  return { items: readonly(items), total, selection, setQuantity }
}
