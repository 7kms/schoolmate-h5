<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        height: 100%;
        padding: 20px 12px;
    }
    .area{
        width: 100%;
        height: 140px;
        padding: 6px;
        margin-bottom: 6px;
        color: @font-color-base;
        border: none;
        border-radius: 2px;
        resize: none;
        outline: none;
        background-color: #fff;
    }
    .btn{
        padding: 6px 12px;
        border-radius: 4px;
        color: #fff;
        background-color: @theme-color;
    }
    .dialog{
        display: flex;
        margin-bottom: 18px;
    }
    .text{
        width: 270px;
        height: 71px;
        margin-left: 10px;
        background: url("../../assets/images/feedback-dialog.png") no-repeat;
        background-size: contain;
    }
    .info{
        /*padding: 8px 5px 0 18px;*/
        padding: 1px 1px 0 14px;
        color: #fff;
    }
    @media screen and (min-width: 355px){
        .info{
            padding: 8px 5px 0 18px;
            color: #fff;
        }
    }
</style>
<template>
    <div :class="$style.content">
        <div :class="$style.dialog">
            <div class="avatar">
                <img :src="testUrl" width="40" height="40">
            </div>
            <div :class="$style.text">
                <div :class="$style.info">
                    您好，我是校友云产品经理—刘振远，2002级，广告
                    学专业联系方式：<span class="color-hint">15910927347</span>（微信同号）。您有
                    任何问题可写在下方或直接联系我，我们会及时处理
                    您反馈的问题。谢谢！
                </div>
            </div>
        </div>
        <div>
            <textarea ref="area" :class="[$style.area,'size-topic']" placeholder="写下你的问题" maxlength="200" v-model="comment"></textarea>
        </div>
        <div>
            <span>{{comment.length}}/200字</span>
        </div>
        <div class="text-right">
            <span :class="['inline-block','size-topic',$style.btn]" @click="publish">提交问题</span>
        </div>
    </div>
</template>
<script>
    import $api from 'api';
    export default {
        data(){
          return {
            testUrl:require('../../assets/moke/0.3.2.png'),
            comment: ''
          }
        },
        methods: {
            valid(){
                if(!this.comment.length){
                    this.$toast('反馈建议不能为空');
                    return false;
                }
                return true;
            },
          publish(){
            if(!this.valid()){
              return false;
            }
            const paramObj = {
              msg: this.comment
            };
            $api.post('/Msg/create',paramObj)
              .then(res=>{
                this.$toast(res.msg);
                if(res.result){
                  this.$router.back();
                }
              },err=>{
                this.$toast('服务器异常,请重试');
              })
          }
        },
        beforeRouteLeave (to, from, next) {
            this.$refs.area.blur();
            next();
        },
        mounted(){
          this.$nextTick(()=>{
            this.$refs.area.focus();
          });
        },
        created(){
          let {column} = this.$route.params;
          let {aid,pid} = this.$route.query;
          this.column = column;
          this.aid = aid;
          this.pid = pid;
        }
    }
</script>