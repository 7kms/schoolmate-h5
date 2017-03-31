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
</style>
<template>
    <div :class="$style.content">
        <div>
            <textarea ref="area" :class="[$style.area,'size-topic']" v-focus placeholder="我有话要说..." maxlength="140" v-model="comment"></textarea>
        </div>
        <div>
            <span>{{comment.length}}/140字</span>
        </div>
        <div class="text-right">
            <span :class="['inline-block','size-topic',$style.btn]" @click="publish">发表评论</span>
        </div>
    </div>
</template>
<script>
    import $api from 'api';
    export default {
        data(){
          return {
            comment: ''
          }
        },
      directives:{
        focus:{
          inserted: function (el) {
            el.focus()
          }
        }
      },
        methods: {
            valid(){
                if(!this.comment.length){
                    this.$toast('评论不能为空');
                    return false;
                }
                return true;
            },
          publish(){
             if(!this.valid()){
               return false;
             }
            const paramObj = {
              content: this.comment
            };
            if(this.column == 'activity'){
              paramObj.aid = this.aid;
            }else if(this.column == 'picture'){
              paramObj.pid = this.pid;
            }
            $api.post('/Picture/postComment',paramObj)
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
        created(){
          let {column} = this.$route.params;
          let {aid,pid} = this.$route.query;
          this.column = column;
          this.aid = aid;
          this.pid = pid;
        }
    }
</script>