<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
    }
    .user{
        padding: 10px 12px 6px;
    }
    .compose{
        display: flex;
        /*justify-content: space-between;*/
        align-items: center;
    }
    .header,.desc{
        padding: 0 10px;
    }
    .header{
        height: 30px;
        h3{
            flex: 1;
        }
    }
    .pic{
        height: 125px;
        .item{
            height: 100%;
            width: 33.3%;
            background-size: cover;
        }
    }
    .desc{
        padding-top: 6px;
        padding-bottom: 6px;
        flex-direction: column;
        align-items: stretch;
    }
    .descItem{
        display: flex;
        align-items:center;
        height: 36px;
        & > div{
            margin-right: 44px;
            }
        .icon{
            width: 12px;
            height: 12px;
            margin-right: 6px;
            background-size: contain;
            background-repeat:no-repeat;
            &.iconLike{
               margin-top: -3px;
               background-image: url('../../assets/images/photo-like.png');
            }
            &.iconComment{
                 background-image: url('../../assets/images/photo-comment.png');
            }
            &.iconView{
                vertical-align: bottom;
                 background-image: url('../../assets/images/photo-view.png');
            }
        }
    }
    .split{
        margin: 0 4px;
    }
    .marginLeft{
        margin-left: 27px;
    }
</style>
<template>
    <div :class="$style.content" @click.stop="click">
        <UserCard :dataInfo="dataInfo.user" :class="$style.user"></UserCard>
        <div :class="[$style.header,$style.compose]">
            <h3 class="topic one-line">{{dataInfo.theme}}</h3>
            <time class="weak" v-if="dataInfo.time == '0'">不限</time>
            <time class="weak" v-else>{{dataInfo.time | dateFormat('yyyy/MM/dd')}}</time>
        </div>
        <div :class="[$style.pic,$style.compose]">
            <ImgLazy :class="$style.item" v-for="(url,index) in dataInfo.pictures" type="square" :imgUrl="url" :key="index" v-if="url"></ImgLazy>
        </div>
        <div :class="[$style.desc,$style.compose]">
            <div :class="[$style.descItem,'color-topic']">
                  <div>
                    <i :class="['inline-block',$style.icon,$style.iconView]"></i>
                    <span class="inline-block">{{dataInfo.hit}}</span>
                  </div>
                  <div  @click.prevent.stop="like">
                    <i :class="['inline-block',$style.icon,$style.iconLike]"></i>
                    <span class="inline-block">{{dataInfo.liked}}</span>
                  </div>
                  <div  @click.prevent.stop="comment">
                    <i :class="['inline-block',$style.icon,$style.iconComment]"></i>
                    <span class="inline-block">{{dataInfo.comments}}</span>
                  </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  import $api from 'api';
  import Util from '../../util'
  import UserCard from './userCard.vue'
    export default {
      props: {
        dataInfo: {
          type: Object,
          required: true
        }
      },
      components:{
         UserCard
      },
      methods:{
        click(){
          this.$emit('click',this.dataInfo);
        },
        imageUrl(str){
          if(str.indexOf('/')== 0){
            return str;
          }
          return `${serverUrl}/${str}`;
        },
        like(){
            if(this.dataInfo.is_liked){
              this.$toast('已经点过赞了');
            }else{
              Util.isAuthored().then(() => {
                $api.post('/Picture/like',{pid:this.dataInfo.pid})
                  .then(res=>{
                    this.$toast(res.msg);
                    if(res.result){
                      this.dataInfo.is_liked = true;
                      this.dataInfo.liked = this.dataInfo.liked * 1 + 1;
                    }
                  },err=>{
                    this.$toast('服务器异常');
                  })
              },()=>{});

            }
        },
        comment(){
          Util.isAuthored().then(() => {
            this.$router.push({
              path: '/comment/picture',
              query:{pid: this.dataInfo.pid}
            });
          },()=>{});

        }
      }
    }
</script>