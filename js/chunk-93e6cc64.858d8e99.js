(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-93e6cc64"],{"0372":function(t,s,i){t.exports=i.p+"img/atm-machine.6b3ea7bc.svg"},"03ba":function(t,s,i){t.exports=i.p+"img/credit-card.fb9852fa.svg"},"0873":function(t,s,i){"use strict";var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"methods container"},[a("h3",[t._v("付款方式")]),a("div",{staticClass:"row d-flex options"},[a("div",{staticClass:"col-4"},[a("div",{staticClass:"option1"},[a("a",{staticClass:"option_link",attrs:{href:""},on:{click:function(s){return s.preventDefault(),t.$router.push("/order/orderatm")}}},[a("div",{staticClass:"option_item",class:{active:"atm"===t.payoption}},[t._m(0),a("p",{staticClass:"mt-2"},[t._v("ATM付款")])])])])]),a("div",{staticClass:"col-4"},[a("div",{staticClass:"option1"},[a("router-link",{staticClass:"option_link",attrs:{href:"",to:"/order/ordercard"}},[a("div",{staticClass:"option_item",class:{active:"card"===t.payoption}},[a("div",{staticClass:"imgfr"},[a("img",{attrs:{src:i("03ba"),alt:""}})]),a("p",{staticClass:"mt-2"},[t._v("信用卡付款")])])])],1)]),a("div",{staticClass:"col-4"},[a("div",{staticClass:"option1"},[a("router-link",{staticClass:"option_link",attrs:{href:"",to:"/order/orderconvenient"}},[a("div",{staticClass:"option_item",class:{active:"con"===t.payoption}},[a("div",{staticClass:"imgfr"},[a("img",{attrs:{src:i("dd3a"),alt:""}})]),a("p",{staticClass:"mt-2"},[t._v("超商代碼付款")])])])],1)])])])},e=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"imgfr"},[a("img",{attrs:{src:i("0372"),alt:""}})])}],o={name:"Paymethods",props:["payoption"]},n=o,c=i("2877"),l=Object(c["a"])(n,a,e,!1,null,null,null);s["a"]=l.exports},"0960":function(t,s,i){t.exports=i.p+"img/ein_vi.17ea9d83.jpg"},9594:function(t,s,i){t.exports=i.p+"img/okmart_app_icon.a32346ac.jpg"},b1b8:function(t,s,i){t.exports=i.p+"img/1055px-7-eleven_logo.svg.f3fe3ec9.png"},c915:function(t,s,i){"use strict";var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"container progressStep"},[i("h1",[t._v("訂單資訊")]),i("div",{staticClass:"progresser"},[i("ul",{staticClass:"stepbar"},[i("li",{staticClass:"step",class:{active:t.nowstep>=1}},[i("div",{staticClass:"text"},[t._v("Step1 選定支付方式")])]),i("li",{staticClass:"step",class:{active:t.nowstep>=2}},[i("div",{staticClass:"text"},[t._v("Step2 輸入信用卡資訊或取得支付代碼")])]),i("li",{staticClass:"step",class:{active:t.nowstep>=3}})])])])},e=[],o={name:"ProgressStep",props:["nowstep"]},n=o,c=i("2877"),l=Object(c["a"])(n,a,e,!1,null,null,null);s["a"]=l.exports},d6ba:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",[a("ProgressStep",{attrs:{nowstep:t.step}}),a("Paymethods",{attrs:{payoption:t.method}}),a("div",{staticClass:"paymentCon"},[a("div",{staticClass:"paymentinfo"},[a("p",{staticClass:"text"},[t._v("需自行至超商機台輸入代碼，產生繳費單據後至櫃檯繳費。")]),a("div",{staticClass:"info"},[a("div",{staticClass:"infoContent"},[a("p",[t._v("應付金額")]),a("span",[t._v("$"+t._s(t.total))])]),a("div",{staticClass:"infoContent"},[a("p",[t._v("選擇超商")]),a("span",{staticClass:"d-flex"},[a("div",{staticClass:"imagefr",class:{active:"711"===t.shop},on:{click:function(s){s.preventDefault(),t.shop="711"}}},[a("img",{attrs:{src:i("b1b8"),alt:""}})]),a("div",{staticClass:"imagefr",class:{active:"family"===t.shop},on:{click:function(s){s.preventDefault(),t.shop="family"}}},[a("img",{attrs:{src:i("0960"),alt:""}})]),a("div",{staticClass:"imagefr",class:{active:"okmart"===t.shop},on:{click:function(s){s.preventDefault(),t.shop="okmart"}}},[a("img",{attrs:{src:i("9594"),alt:""}})]),a("div",{staticClass:"imagefr",class:{active:"hilife"===t.shop},on:{click:function(s){s.preventDefault(),t.shop="hilife"}}},[a("img",{attrs:{src:i("ea7f"),alt:""}})])])])]),t._m(0),a("div",{staticClass:"buttons"},[a("button",{staticClass:"btn-back",on:{click:function(s){return s.preventDefault(),t.$router.push("/order/check")}}},[t._v("返回訂單")]),a("button",{staticClass:"btn-next",on:{click:function(s){return s.preventDefault(),t.$router.push("/order/paycomplete")}}},[t._v("下一步")])])])])],1)},e=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"note"},[i("p",[i("i",{staticClass:"fas fa-exclamation-circle"}),t._v("注意事項")]),i("ul",[i("li",[t._v("假文字假文字假文字假文字假文字，假文字假文字假文字假文字。")]),i("li",[t._v("假文字假文字假文字假文字假文字，假文字假文字假文字假文字。")]),i("li",[t._v("假文字假文字假文字假文字假文字，假文字假文字假文字假文字。")])])])}],o=i("c915"),n=i("0873"),c={name:"Orderconvenient",components:{ProgressStep:o["a"],Paymethods:n["a"]},data:function(){return{step:2,method:"con",total:2e3,shop:"711"}},methods:{getTotal:function(t){this.total=t,console.log(t)}},created:function(){var t=this;this.$bus.$on("total:get",(function(s){return t.getTotal(s)}))}},l=c,r=i("2877"),p=Object(r["a"])(l,a,e,!1,null,null,null);s["default"]=p.exports},dd3a:function(t,s,i){t.exports=i.p+"img/store.e9143755.svg"},ea7f:function(t,s){t.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=chunk-93e6cc64.858d8e99.js.map