<template>
    <div>
        <ProgressStep :nowstep='step'>
        </ProgressStep>
    <div class='orders container'>
        <h3>確認訂單金額</h3>
        <ul class='orderul'>
             <h3>訂單編號：20200520</h3>
            <li class='orderlist' v-for='item in products' :key="item.id">
                <div class='row d-flex align-items-center'>
                    <div class='col-md-2 col-3'>
                        <div class='pro-img'>
                            <img :src="`${item.img}`" alt="">
                        </div>
                    </div>
                    <div class='col-md-4 col-9'>
                        <h4>{{item.name}}</h4>
                        <p>{{item.description}}</p>
                    </div>
                    <div class='col-md-4 col-7'>
                        <div class='numControl'>
                            <button type="button" class="btn-minus" @click.prevent='countnum(item,-1)'>
                            <i class="fa fa-minus" aria-hidden="true"></i>
                            </button>
                            <input class="amount" type="number" max="10" min='1' v-model="item.num">
                            <button type="button" class="btn-plus" @click.prevent='countnum(item,1)'>
                            <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                    <div class="col-md-2 d-flex col-2">
                      <div class="item_sum">${{item.sum}}</div>  
                      <div class='del_icon ml-4'>
                          <i class="fas fa-trash-alt"></i>
                      </div>
                    </div>
                </div>
            </li>
            <li class="summaryli">
                <div class='row summary'>
                    <div class='col-3 p-0 text-right'>共{{products.length}}項</div>
                    <div class='col-6 p-0 text-right'>總計</div>
                    <div class='col-3 p-0 text-right total'>${{totalsum}}</div>
                </div>
            </li>
        </ul>
        <Paymethods/> 
        <div class="note">
            <p><i class="fas fa-exclamation-circle"></i>注意事項</p>
            <ul>
                <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
                <li>假文字假文字假文字假文字假文字，假文字假文字假文字假文字。</li>
            </ul>
        </div>
    </div>
    </div>
</template>
<script>
import ProgressStep from './ProgressStep';
import Paymethods from './Paymethods';
export default {
    name: 'Orderlist',
    components:{
        ProgressStep,
        Paymethods
    },
    data(){
        return{
            products:[
                {
                    name: '精美商品',
                    description: '商品說明商品說明商品說明',
                    img: require('../assets/images/hans-vivek-57eUYHIIIH0-unsplash.jpg'),
                    num:1,
                    price:1000,
                    sum:1000
                },
                {
                    name: '精美商品',
                    description: '商品說明商品說明商品說明',
                    img: require('../assets/images/hans-vivek-57eUYHIIIH0-unsplash.jpg'),
                    num:1,
                    price:1000,
                    sum:1000
                }
            ],
            step:1,
            sumtotal:0
        }
    },
    methods: {
        countnum(product,qty){
            let count=product.num+qty;
            if(count>0 && count<=10){
                product.num=count;
            }else{
                product.num=1;
            }
            product.sum=product.num*product.price;
        },
    },
    computed: {
        totalsum(){
            let newtotal=0;
            for(let i=0; i<this.products.length;i++){
                newtotal+=this.products[i].sum;
            }
            this.sumtotal=newtotal;
            this.$bus.$emit('total:get', this.sumtotal);
            return newtotal
            }
        }
}
</script>