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
                <imgContain :imgUrl="dataInfo.photo" :onlyImage="true" style="width:40px ;height:40px"></imgContain>
            </div>
        </div>
        <div :class="$style.desc">
            <div  v-if="dataInfo.role=='student'">
                <span class="color-topic">{{dataInfo.name || '姓名未填写'}}</span>
                <span>{{dataInfo.company || '河北地质大学'}}</span>
                <span> | </span>
                <span> 学生 </span>
                <span> | </span>
                <span>{{dataInfo.major || '专业未填写'}}</span>
            </div>
            <div v-else>
                <span class="color-topic">{{dataInfo.name || '姓名未填写'}}</span>
                <span>{{dataInfo.company || '公司未填写'}}</span>
                <span> | </span>
                <span>{{dataInfo.detail_job || '详细工作未填写'}}</span>
            </div>
            <div :class="[$style.desText,'color-topic']" v-transform="dataInfo.content"></div>
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
