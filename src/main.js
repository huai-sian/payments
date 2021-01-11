import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './bus'
import 'bootstrap'
import jquery from 'jquery'
import zhTW from 'vee-validate/dist/locale/zh_TW.json'
import { ValidationObserver, ValidationProvider, extend, localize} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { required, length } from 'vee-validate/dist/rules'
import Swal from 'sweetalert2'

localize('zhTW', zhTW)
Vue.config.productionTip = false
window.$ = jquery
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

for (const rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhTW.messages[rule] // add its message
  })
}
extend('required', {
  ...required,
  message: '此欄位不可為空'
});
extend('cellphone', {
  validate: value =>{
    const reg = /^09[0-9]{8}$/;
    return reg.test(value);
    },
    message:"請輸入正確號碼"
  });

extend('cardnum', {
  validate: value =>{
    const reg = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return reg.test(value);
    },
    message:"請輸入正確卡號"
  });
extend('date', {
  validate: value =>{
    const MMYY=value.split('/');
    const inputMon=MMYY[0];
    const inputYear=MMYY[1];
    const months=['01','02','03','04','05','06','07','08','09','10','11','12'];
    const now=new Date();
    const nowYear=now.getFullYear().toString();
    if(months.indexOf(inputMon)<0){
      return false
    }else if(inputYear<nowYear.substring(2,4)){
      return false
    }else{
      return true
    }
  },
  message:"請輸入正確日期"
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
