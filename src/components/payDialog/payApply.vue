<style lang="less" module>
    @import '../../assets/less/const.less';

    .pay{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,.35);
    }
    .wrap{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 266px;
        height: 316px;
        padding: 30px 0;
        margin-left: -133px;
        margin-top: -158px;
        background: url("../../assets/images/pay-bg.png") no-repeat;
        background-size: contain;
    .close{
        position: absolute;
        right: 0;
        top: 0;
        width: 28px;
        height: 28px;
        background-image: url("../../assets/images/pay-close.png");
        background-size: 14px 14px;
        background-repeat: no-repeat;
        background-position: center;
    }
    .wechat{
        display: inline-block;
        width: 18px;
        height: 15px;
        background: url("../../assets/images/pay-wechat.png") no-repeat;
        background-size: contain;
    }
    }
    .content{
    .title{
        font-size: 1.3rem;
    }
    .money{
        margin-top: 1.8rem;
        font-size: 2.4rem;
    }
    }
    .text{
        margin-top: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .special{
        color:#7ed044;
    }
    .btn{
        width: 180px;
        height: 24px;
        margin: 4.2rem auto 0;
        line-height: 24px;
        color: #fff;
        background-color: @theme-color;
    }
</style>

<template>
    <div :class="$style.pay">
        <div :class="$style.wrap">
            <i :class="$style.close" @click.stop="cancel"></i>
            <div :class="[$style.content,'text-center']">
                <div :class="[$style.title,'color-topic']">本次活动需要您支付</div>
                <div :class="[$style.money,'color-hint']">{{money}}元</div>
                <div :class="$style.text"><span>将跳转至</span><span :class="$style.wechat"></span><span :class="$style.special">微信</span><span>支付</span></div>
                <div :class="[$style.btn,'text-center']" @click.stop="pay">支付</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            money:{
                type:String,
                required:true
            }
        },
        methods:{
            cancel(){
                this.$emit('cancel');
            },
            pay(){
                this.$emit('ok');
            }
        }
    }
</script>