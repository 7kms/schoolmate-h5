<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        height: 205px;
        background-color: #fff;
    }
    .compose{
        display: flex;
        justify-content: space-between;
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
            flex: 1;
            height: 100%;
            background-size: cover;
            /*background-image: url("../../assets/moke/0.3.1.png");*/
        }
    }
    .desc{
        height: 50px;
        padding-top: 6px;
        padding-bottom: 6px;
        flex-direction: column;
        align-items: stretch;
    }
    .descItem{
        display: flex;
        justify-content: space-between;
        .icon{
            width: 12px;
            height: 12px;
            background-size: contain;
            background-repeat:no-repeat;
            &.iconLike{
                 background-image: url('../../assets/images/icon-like-small.png');
            }
            &.iconComment{
                 background-image: url('../../assets/images/icon-comment-small.png');
            }
        }

    }
    .split{
        margin: 0 4px;
    }
    .marginLeft{
        margin-left: 12px;
    }
</style>
<template>
    <div :class="$style.content" @click.stop="click">
        <div :class="[$style.header,$style.compose]">
            <h3 class="topic one-line">{{dataInfo.theme}}</h3>
            <time class="weak">{{dataInfo.time | dateFormat('yyyy/MM/dd')}}</time>
        </div>
        <div :class="[$style.pic,$style.compose]">
            <ImgContain :class="$style.item" v-for="(url,index) in dataInfo.pictures" :imgUrl="url" :key="index"></ImgContain>
        </div>
        <div :class="[$style.desc,$style.compose]">
            <div :class="$style.descItem">
                <div class="color-weak">
                    <span>上传者：</span>
                    <span class="color-topic">{{dataInfo.user.name}}</span>
                </div>
                <div class="weak">
                    <span>{{dataInfo.hit}}个浏览</span>
                    <span :class="$style.marginLeft">{{dataInfo.liked}}个赞</span>
                </div>
            </div>
            <div :class="$style.descItem">
                <div>
                    <span>{{dataInfo.user.enrol_time.slice(0,4)}}级</span>
                    <span :class="$style.split">|</span>
                    <span>{{dataInfo.user.major}}</span>
                </div>
                <div class="color-topic">
                    <span class="inline-block" @click.prevent.stop="like">
                        <i :class="['inline-block',$style.icon,$style.iconLike]"></i>
                        <span class="inline-block">{{dataInfo.is_liked == 1 ? '已赞' : '点赞'}}</span>
                    </span>
                    <span :class="[$style.marginLeft,'inline-block']" @click.prevent.stop="comment">
                        <i :class="['inline-block',$style.icon,$style.iconComment]"></i>
                        <span class="inline-block">评论</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  import $api from 'api';
    export default {
      props: {
        dataInfo: {
          type: Object,
          required: true
        }
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
            }
        },
        comment(){
          this.$router.push({
            path: '/comment/picture',
            query:{pid: this.dataInfo.pid}
          });
        }
      }
    }
</script>