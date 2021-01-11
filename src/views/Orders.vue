<template>
    <div>
        <div class='container-fluid order px-0'>
            <PaymentTop/>
            <transition name='fade' mode="out-in">
                <router-view></router-view>
            </transition>
            <PaymentFooter/>
        </div>
    </div>
</template>
<script>
import PaymentTop from'../components/PaymentTop';
import PaymentFooter from '../components/PaymentFooter'
export default {
    name: 'Orders',
    components: {
        PaymentFooter,
        PaymentTop
    }
}
</script>
<style lang="scss" scoped>
    .fade-enter{
        opacity: 0;
    }
    .fade-enter-to{
        opacity: 1;
    }
    .fade-enter-active{
        transition:opacity 0.4s;
    }
    .fade-leave{
        opacity: 1;
    }
    .fade-leave-to{
        opacity: 0;
    }
    .fade-leave-active{
        transition:opacity 0.4s;
    }
</style>