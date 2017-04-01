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
    }
    .content{
        .title{
            font-size: 1.3rem;
        }
        .text{
            margin-top: 118px;
        }
        .emoji{
            display: inline-block;
            width: 35px;
            height: 35px;
            margin-bottom: 10px;
            background: url("../../assets/images/pay-cancel.png") no-repeat;
            background-size: contain;
        }
    }
    .operate{
        margin-top: 34px;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
    }
    .btn{
        width: 88px;
        padding: 6px 0;
        color: #fff;
        &.cancel{
             background-color: #C8CCCE;
         }
        &.ok{
             background-color: @theme-color;
         }
    }
</style>
<template>
    <div :class="$style.pay">
        <div :class="$style.wrap">
            <i :class="$style.close" @click.stop="cancel"></i>
            <div :class="[$style.content,'text-center']">
                <div :class="[$style.title,'color-topic']">取消报名</div>
                <div :class="[$style.text]">
                    <div :class="$style.emoji"></div>
                    <div>您是否确认取消报名？</div>
                </div>
                <div :class="$style.operate">
                    <div :class="[$style.btn,$style.cancel]" @click.stop="cancel">不取消报名</div>
                    <div :class="[$style.btn,$style.ok]" @click.stop="ok">确认取消</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods:{
            cancel(){
                this.$emit('cancel');
            },
            ok(){
                this.$emit('ok');
            }
        }
    }
</script>