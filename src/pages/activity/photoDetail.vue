<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-bottom: 40px;
    }
    .info{
        margin-bottom: 6px;
        background-color: #fff;
    }
    .desc{
        position: relative;
        padding: 6px 6px 12px 12px;
        .photoList{
            margin: 6px -6px 0 -12px;
            img{
                width: 100%;
            }
        }
        .text{
            padding: 12px 0;
            line-height: 1.3rem;
        }
    }
</style>
<template>
    <div v-if="!loading">
        <div :class="$style.content">
            <div :class="[$style.info,$style.owner]">
                <commentItem :isOwner="true" :dataInfo="dataInfo"></commentItem>
            </div>
            <div :class="$style.info">
                <div :class="$style.desc">
                    <h3 class="topic">{{dataInfo.theme}}</h3>
                    <ul :class="$style.photoList">
                        <li v-for="url in dataInfo.pictures"><ImgContain :imgUrl="url" :onlyImage="true"></ImgContain></li>
                    </ul>
                    <div :class="$style.text">
                        {{dataInfo.description}}
                    </div>
                </div>
            </div>
            <div :class="['list-content',$style.info,$style.commentList]">
                <h3 class="item-header">校友评论</h3>
                <ul>
                    <commentItem v-for="(comment,index) in dataInfo.comments" :dataInfo="comment" :key="index" :showRemove="showRemove(comment)" @removeComment="removeComment"></commentItem>
                </ul>
            </div>
            <operateBar :dataInfo="operateBarData" @click="operateBarClick"></operateBar>
        </div>
    </div>
    <Loading v-else></Loading>

</template>
<script>
  import $api from 'api';
  import {mapState} from 'vuex';
  import operateBar from  '../public/operateBar.vue'
  import commentItem from './commentItem.vue'
  export default {
    created(){
      this.getData(this.$route.params);
    },
    data(){
      return {
        loading: true,
        url:require('../../assets/moke/1.png'),
        dataInfo:{}
      }
    },
    components:{
      commentItem,
      operateBar
    },
    computed:{
      ...mapState({
        self:(state)=>state.user.profile
      }),
      operateBarData(){
        var obj = {
          leftText:'评论',
          leftImage:require('../../assets/images/icon-comment.png'),
          rightText:'点赞',
          rightImage: require('../../assets/images/icon-like.png')
        };
        if(this.dataInfo.is_liked){
          obj.rightText = '已赞';
        }
        return obj;
      }
    },
    methods: {
      showRemove(comment){
        return this.self.uid == this.dataInfo.uid || this.self.uid == comment.uid;
      },
      operateBarClick(type){
        if(type == 'left'){
          this.$router.push({
            path: '/comment/picture',
            query:{pid: this.dataInfo.pid}
          });
        }else{
          if(!this.dataInfo.is_liked){
            $api.post('/Picture/like',{pid:this.dataInfo.pid})
              .then(res=>{
                this.$toast(res.msg);
                if(res.result){
                  this.dataInfo.is_liked = true;
                  this.dataInfo.liked = this.dataInfo.liked * 1 + 1;
                }
            },err=>{
              this.$toast('服务器异常');
            });
          }
        }
      },
      getData({id}){
        this.loading = true;
        $api.get('/Picture/getDetail',{pid:id })
          .then(res=>{
            this.dataInfo = res;
            this.loading = false;
          },err=>{
            this.$toast({message: err});
            this.loading = false;
          })
      },
      removeComment(item){
        $api.post('/Picture/deleteComment',{cid:item.cid})
          .then(res=>{
          this.$toast(res.msg);
          if(res.result) {
            this.dataInfo.comments = this.dataInfo.comments.filter(obj=>{
              if(obj.cid == item.cid){
                return false;
              }
              return true;
            });
          }
        },err=>{
          this.$toast('服务器异常')
        })
      }
    },
    mounted(){

    }
  }
</script>