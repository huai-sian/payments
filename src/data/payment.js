import productImage from '../assets/images/hans-vivek-57eUYHIIIH0-unsplash.jpg'
import atmIcon from '../assets/images/atm-machine.svg'
import cardIcon from '../assets/images/credit-card.svg'
import storeIcon from '../assets/images/store.svg'
import seven from '../assets/images/1055px-7-eleven_logo.svg.png'
import family from '../assets/images/ein_vi.jpg'
import okmart from '../assets/images/okmart_app_icon.jpg'
import hilife from '../assets/images/hilife.png'

// C03–C09, C13: original content from the legacy inventory.
export const products = [1, 2].map((id) => ({
  id,
  name: '精美商品',
  description: '商品說明商品說明商品說明',
  price: 1000,
  image: productImage,
}))
export const methods = [
  { id: 'atm', label: 'ATM付款', route: '/order/orderatm', icon: atmIcon },
  {
    id: 'card',
    label: '信用卡付款',
    route: '/order/ordercard',
    icon: cardIcon,
  },
  {
    id: 'con',
    label: '超商代碼付款',
    route: '/order/orderconvenient',
    icon: storeIcon,
  },
]
export const banks = [
  { id: 'BKTW', label: '台灣銀行' },
  { id: 'FCBK', label: '第一銀行' },
  { id: 'HNBK', label: '華南銀行' },
  { id: 'LBOT', label: '土地銀行' },
]
export const stores = [
  { id: '711', label: '7-ELEVEN', image: seven },
  { id: 'family', label: '全家', image: family },
  { id: 'okmart', label: 'OK mart', image: okmart },
  { id: 'hilife', label: '萊爾富', image: hilife },
]
export const notice =
  '假文字假文字假文字假文字假文字，假文字假文字假文字假文字。'
export const paymentInstruction =
  '需自行至超商機台輸入代碼，產生繳費單據後至櫃檯繳費。'
