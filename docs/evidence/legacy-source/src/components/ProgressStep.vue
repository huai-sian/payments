<template>
    <div class='container progressStep'>
        <h1>訂單資訊</h1>
        <div class="progresser">
            <ul class="stepbar">
                <li class='step' :class="{'active':nowstep>=1}"><div class="text">Step1 選定支付方式</div></li>
                <li class='step' :class="{'active':nowstep>=2}"><div class="text">Step2 輸入信用卡資訊或取得支付代碼</div></li>
                <li class='step' :class="{'active':nowstep>=3}"></li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProgressStep',
    props: ['nowstep']
}
</script>