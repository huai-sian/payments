<template>
    <div class='methods container'>
        <h3>付款方式</h3>
        <div class="row d-flex options">
            <div class='col-4'>
                <div class='option1'>
                    <a href="" class='option_link' @click.prevent="$router.push('/order/orderatm')">
                        <div class='option_item' :class="{'active':payoption==='atm'}">
                            <div class='imgfr'><img src="../assets/images/atm-machine.svg" alt=""></div>
                            <p class="mt-2">ATM付款</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class='col-4'>
                <div class='option1'>
                    <router-link href="" class='option_link' to='/order/ordercard'>
                        <div class='option_item' :class="{'active':payoption==='card'}">
                            <div class='imgfr'><img src="../assets/images/credit-card.svg" alt=""></div>
                            <p class="mt-2">信用卡付款</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class='col-4'>
                <div class='option1'>
                    <router-link href="" class='option_link' to='/order/orderconvenient'>
                        <div class='option_item' :class="{'active':payoption==='con'}">
                            <div class='imgfr'><img src="../assets/images/store.svg" alt=""></div>
                            <p class="mt-2">超商代碼付款</p>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Paymethods',
    props:['payoption']
}
</script>