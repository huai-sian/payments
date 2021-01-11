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
                    <span>${{total}}</span>
                </div>
                <div class='infoContent'>
                    <p>選擇超商</p>
                    <span class="d-flex">
                        <div class="imagefr" @click.prevent="shop='711'" :class="{'active':shop==='711'}"><img src="../assets/images/1055px-7-eleven_logo.svg.png" alt=""></div>
                        <div class="imagefr" @click.prevent="shop='family'" :class="{'active':shop==='family'}"><img src="../assets/images/ein_vi.jpg" alt=""></div>
                        <div class="imagefr" @click.prevent="shop='okmart'" :class="{'active':shop==='okmart'}"><img src="../assets/images/okmart_app_icon.jpg" alt=""></div>
                        <div class="imagefr" @click.prevent="shop='hilife'" :class="{'active':shop==='hilife'}"><img src="../assets/images/hilife.png" alt=""></div>
                    </span>
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
    name:'Orderconvenient',
    components:{
        ProgressStep,
        Paymethods
    },
    data(){
        return{
           step:2,
           method:'con',
           total:2000,
           shop:'711'
        }
    },
    methods:{
        getTotal(sum){
            this.total=sum;
            console.log(sum);
        }
    },
    created () {
        const vm=this;
        this.$bus.$on('total:get', sum => 
            this.getTotal(sum)
    )
    
  }
}
</script>