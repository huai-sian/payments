<template>
    <div>
        <ProgressStep :nowstep='step'>
        </ProgressStep>
        <Paymethods :payoption='method'></Paymethods>
        <div class="paymentCon">
        <div class='paymentinfo'>
            <p class='text'>需自行至超商機台輸入代碼，產生繳費單據後至櫃檯繳費。</p>
            <div class='info'>
                <div class='infoContent'>
                    <p>應付金額</p>
                    <span>$2000</span>
                </div>
                <div class='infoContent'>
                    <p>選擇銀行</p>
                    <div class="selectinfo">
                        <select name="" id="selects">
                            <option value="BKTW">台灣銀行</option>
                            <option value="FCBK">第一銀行</option>
                            <option value="HNBK">華南銀行</option>
                            <option value="LBOT">土地銀行</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="note">
                <p><i class="fas fa-exclamation-circle"></i>注意事項</p>
                <ul>
                    <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                    <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                    <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                </ul>
            </div>
            <div class="buttons">
                <button class="btn-back" @click.prevent="$router.push('/order/check')">返回訂單</button>
                <button class="btn-next" @click.prevent="$router.push('/order/paycomplete')">下一步</button>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
import ProgressStep from './ProgressStep'
import Paymethods from './Paymethods';
export default {
    name:'Orderatm',
    components:{
        ProgressStep,
        Paymethods
    },
     data(){
        return{
           step:2,
           method:'atm'
        }
    }
}
</script>