<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        padding-top: 12px;
        background-color: #fff;
    }
    .moments{
        display: flex;
        padding: 0 12px;
        .desc{
            flex: 1;
            margin-left: 12px;
            .text{
                margin-top: 6px;
                line-height: 1.4rem;
            }
        }
        .title{
            display: flex;
            justify-content: space-between;
        }
        .verify{
            padding-bottom: 6px;
        }
    }
    .imgContent{
        display: flex;
        padding: 0 12px;
    }
    .imgItem{
        width: 80px;
        height: 80px;
        margin-right: ~"calc(25% - 80px)";
        background-size: cover;
    }
</style>
<template>
    <li :class="$style.content">
        <div :class="$style.moments">
            <div :class="$style.portrait">
                <imgContain :imgUrl="dataInfo.c_cover_file" :onlyImage="true" style="width:40px ;height:40px"></imgContain>
            </div>
            <div :class="$style.desc">
                <div :class="$style.title">
                    <div>
                        <span class="topic">{{dataInfo.c_name}}</span><span>（<span class="color-hint">{{ dataInfo.count }}</span>人）</span>
                    </div>
                    <div :class="$style.verify" v-if="isSelf && dataInfo.unverified > 0" @click.prevent.stop="goVerify">
                        <span class="color-hint">待审核{{dataInfo.unverified}}人</span>
                    </div>
                </div>
                <div :class="$style.text" v-transform="dataInfo.c_description"></div>
            </div>
        </div>
        <div :class="$style.imgContent" v-if="dataInfo.pictures.length > 0">
            <ImgLazy v-for="(img,index) in dataInfo.pictures" v-if="index < 4" :imgUrl="img" :class="$style.imgItem" type="square"></ImgLazy>
        </div>
    </li>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    props: {
      dataInfo: {
        type: Object,
        required: true
      }
    },
    computed:{
      ...mapState({
          profile:(state)=>state.user.profile
      }),

      isSelf(){
          return this.profile.uid == this.dataInfo.uid
      }
    },
    methods:{
      goVerify(){
        this.$emit('verify',this.dataInfo);
      }
    }
  }
</script>