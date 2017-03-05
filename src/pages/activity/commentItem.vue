<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        display: flex;
        padding: 6px 0 12px;
        border-top: 1px solid @line-color-split;
        &.onBorder{
            border: none;
            padding-top: 12px;
        }
    }
    .portrait{
        width: 60px;
        margin-right: 6px;
    .userText{
        margin-top: 6px;
    }
    }
    .desc{
        flex: 1;
        padding-right: 6px;
        & > div:not(:last-child) {
            margin-bottom: 6px;
        }
        .desText{
            line-height: 1.3rem;
        }
        .deleteBtn{
            margin-right: 6px;
           color: @theme-color;
        }
    }
</style>
<template>
    <li :class="[$style.content,{[$style.onBorder]:isOwner}]">
        <div :class="[$style.portrait,'text-center']">
            <div :class="$style.pic">
                <img :src="dataInfo.photo" alt="" width="40" height="40">
            </div>
        </div>
        <div :class="$style.desc">
            <div>
                <span class="color-topic">{{dataInfo.name}}</span>
                <span>{{dataInfo.company}}</span>
                <span> | </span>
                <span>{{dataInfo.detail_job}}</span>
            </div>
            <div :class="[$style.desText,'color-topic']">{{dataInfo.content}}</div>
            <div class="text-right">
                <span v-if="isOwner" class="weak">
                    <span>{{dataInfo.hit}}个浏览</span>
                    <span>{{dataInfo.liked}}个赞</span>
                </span>
                <span v-else-if="showRemove" :class="[$style.deleteBtn,'inline-block']" @click="remove">删除评论</span>
            </div>
        </div>
    </li>
</template>
<script>
  export default{
    props:{
      isOwner:{
        type: Boolean,
        default: false
      },
      showRemove:{
        type: Boolean,
        default: false
      },
      dataInfo:{
        type: Object,
        default(){
          return {}
        }
      }
    },
    data(){
      return {
        url: require('../../assets/moke/0.3.1.png')
      }
    },
    methods:{
      remove(){
        this.$dialog.confirm('确认删除此评论?').then(data=>{
          this.$emit('removeComment',this.dataInfo);
        },data=>{
        });
      }
    }
  }
</script>
