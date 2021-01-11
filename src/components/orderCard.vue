<template>
    <div>
        <ProgressStep :nowstep='step'>
        </ProgressStep>
        <Paymethods :payoption='method'></Paymethods>
        <div class="paymentCard">
        <div class='paymentCardinfo'>
            <div class='info'>
                <div class='infoContent'>
                    <p>應付金額</p>
                    <span>$2000</span>
                </div>
                <div class='infoContent'>
                    <p>支援使用卡種類</p>
                    <span class="d-flex">
                        <div class="imagefr"><img src="../assets/images/visa.svg" alt=""></div>
                        <div class="imagefr"><img src="../assets/images/mastercard.svg" alt=""></div>
                        <div class="imagefr"><img src="../assets/images/jcb.svg" alt=""></div>
                    </span>
                </div>
            </div>
        </div>
        <div class="card-info">
            <ValidationObserver v-slot="{ handleSubmit }">
            <form action="" class="mb-3" @submit.prevent="handleSubmit(goNext)">
                <div class='content'>
                    <ValidationProvider rules='required|cardnum' v-slot='{ errors }'>
                    <label for="cardnum" class='text'>信用卡卡號</label>
                    <input type="text" id="cardnum" name='cardno' maxlength="19" placeholder="xxxx-xxxx-xxxx-xxxx" v-model="form.cardcode">
                    <span class="text-danger warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class='content'>
                    <ValidationProvider rules='required' v-slot='{ errors }'>
                    <label for="cardname" class='text'>持卡人英文姓名</label>
                    <input type="text" id="cardname" name='cardname' v-model="form.name">
                    <span class="text-danger warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class='content'>
                    <ValidationProvider rules='required|date' v-slot='{ errors }'>
                    <label for="cardexpire" class='text'>有效年月</label>
                    <input type="text" id="cardexpire" name='cardexpire' maxlength="5" placeholder="MM/YY" v-model="form.date">
                    <i class="far fa-question-circle" @mouseover='hoverL=true' @mouseleave="hoverL=false"></i>
                    <span class="text-danger warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <img class='hint-l' src="../assets/images/Web_order_hit01.png" alt="" v-if='hoverL'>
                    <img class='hint-sm' src="../assets/images/Mobile_order_hit01.png" alt="" v-if='hoverL'>
                </div>
                <div class='content'>
                    <ValidationProvider rules="required" v-slot="{ errors }">
                    <label for="cardcode" class='text'>安全驗證碼</label>
                    <input type="password" id="cardcode" name='cardcode' maxlength="3" v-model="form.password">
                    <i class="far fa-question-circle" @mouseover='hoversm=true' @mouseleave="hoversm=false"></i>
                    <img class='hint-l' src="../assets/images/Web_order_hit02.png" alt="" v-if='hoversm'>
                    <img class='hint-sm' src="../assets/images/Mobile_order_hit02.png" alt="" v-if='hoversm'>
                    <span class="text-danger warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
                <div class='content'>
                     <ValidationProvider rules='required|cellphone' v-slot='{ errors }'>
                    <label for="userphone" class='text'>手機號碼</label>
                    <input type="text" id="userphone" name='phone' maxlength="10" v-model="form.tel">
                    <span class="text-danger warning">{{ errors[0] }}</span>
                    </ValidationProvider>
                </div>
            <div class="note mt-3">
                <p><i class="fas fa-exclamation-circle"></i>注意事項</p>
                <ul>
                    <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                    <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                    <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                </ul>
            </div>
            <div class="buttons">
                <button class="btn-back" @click.prevent="$router.push('/order/check')">返回訂單</button>
                <button class="btn-next" type='submit'>下一步</button>
            </div>
            </form>
            </ValidationObserver>
        </div>
    </div>
    </div>
</template>
<script>
import ProgressStep from './ProgressStep'
import Paymethods from './Paymethods';
export default {
    name:'Ordercard',
    components:{
        ProgressStep,
        Paymethods
    },
    data(){
        return{
            hoverL:false,
            hoversm:false,
            form:{
                tel:'',
                name:'',
                date:'',
                password:'',
                cardcode:''
            },
            step:2,
            method:'card'
        }
    },
    methods:{
        goNext(){
            this.$router.push('/order/paycomplete');
        }
    }
}
</script>