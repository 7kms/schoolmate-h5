<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        margin-top: -1px;
        background-color: #fff;
    }
    .verify{
        position: absolute;
        right: 12px;
        top: 7px;
        width: 80px;
        height: 24px;
        line-height: 24px !important;
        color: #fff;
        background-color: @theme-color;
    }
    .mate{
        background-color: #fff;
        padding: 0 15px 0 24px;
    }
    .refresh{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
    }
    .iconRefresh{
        width: 16px;
        height: 16px;
        background-size: contain;
        background-image: url("../../assets/images/icon-refresh.png");
    }
    .friendItem{
        width: 90px;
        height: 24px;
        line-height: 24px;
        margin-right: 20px;
        margin-bottom: 12px;
        border: 1px solid @theme-color;
        color: @theme-color;
        text-align: center;
        &.active{
            background-color: @theme-color;
            color: #fff;
        }
    }
</style>
<template>
    <div>
        <div class="entrance-content">
            <div class="item">
                <div class="dfn"><span class="label inline-block">微 信 号</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="请填写">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">手机号码</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic relative">
                    <input type="tel" class="input" placeholder="请填写">
                    <span :class="[$style.verify,'text-center']" @click="sendVerify">{{waiting ? count : '发送验证码'}}</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">验 证 码</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="tel" class="input" placeholder="请填写">
                </div>
            </div>
        </div>
        <div :class="$style.mate">
            <div :class="$style.refresh">
                <span>选择您认识的2位熟人</span>
                <span><i :class="['inline-block',$style.iconRefresh]"></i><span class="inline-block color-theme">刷新</span></span>
            </div>
            <div :class="[$style.friends]">
                <span :class="[$style.friendItem,'inline-block']">121212</span><span :class="[$style.friendItem,'inline-block']">121212</span><span :class="[$style.friendItem,'inline-block']">121212</span><span :class="[$style.friendItem,'inline-block']">121212</span>
            </div>
        </div>
        <div class="entrance-next-step text-center" @click="submit">
            <span>完成</span>
        </div>
    </div>
</template>
<script>
    import  { mapState } from  'vuex'
    export default {
        data(){
            return {
                waiting: false,
                count: 6
            }
        },
        computed:{
            ...mapState({
                channel:(state) => state.entrance.channel
            })
        },
        methods:{
            sendVerify(){
                if(!this.waiting){
                    this.waiting = true;
                    this.timer = setInterval(() => {
                        this.count --;
                        if(this.count == 0){
                            this.count = 6;
                            this.waiting = false;
                            clearInterval(this.timer);
                        }
                    },1000);
                }
            },
          submit(){

          }
        }
    }
</script>