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
        margin-left: 10px;
        border-radius: 10px;
        background: url("../../assets/images/feedback-dialog.png") no-repeat;
        background-size: cover;
    }
    .info{
        padding: 8px 5px 8px 20px;
        color: #fff;
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
                    亲爱的校友:<br/>
                    您好！我是校友云创始人刘振远，【2002级，广告学，<span class="color-hint">15910927347</span>（微信同号）】<br/>
                    校友云的宗旨：情感互联，资源共享，困难互助！如果您有好的创业项目想找投资，生活中遇到了困难想寻求帮助请联系我，谢谢！
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
            testUrl:require('../../assets/images/feedback.pic.jpg'),
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
            if(this.comment.indexOf('route:') == 0){
              this.$router.replace(`/${this.comment.split(':')[1]}`);
            }else{
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

          }
        },
        beforeRouteLeave (to, from, next) {
            this.$refs.area.blur();
            next();
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