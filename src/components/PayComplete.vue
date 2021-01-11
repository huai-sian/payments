<template>
    <div>
        <ProgressStep :nowstep='step'>
        </ProgressStep>
        <Paymethods/>
        <div class="paymentCon">
        <div class='paymentinfo complete'>
            <h4 class="done">訂單成立！</h4>
            <p class="donepara">訂單請於兩天內完成匯款，逾期店家將有權取消訂單。</p>
            <button class='btn-home' @click.prevent="$router.push('/order/check')">回首頁</button>
        </div>
        </div>
    </div>
</template>
<script>
import ProgressStep from './ProgressStep';
import Paymethods from './Paymethods';
const Swal = require('sweetalert2'); //載入sweet alert2
export default {
    name:'PayComplete',
    components:{
        ProgressStep,
        Paymethods,
    },
    data(){
        return{
            step:3
        }
    },
    methods:{
        completeAlert(){
            Swal.fire(
                'Complete!',
                'We are working for your order!',
                'success'
            );
        }
    },
    created(){
        this.completeAlert();
    }
}
</script>