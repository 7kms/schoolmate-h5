<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
        padding: 6px 0;
        & > div{
        padding: 0 12px;
            }
    }
    .desc{
        line-height: 1.4rem;
    }
    .imgContent{
        margin: 6px 0;
        display: flex;
        justify-content: space-between;
    }
    .imgItem{
        width: 80px;
        height: 80px;
    }
    .user{
        display: flex;
        padding-top: 6px !important;
        border-top: 1px solid @line-color-split;
        .name{
            margin-top: 6px;
            width: 40px;
        }
        .info{
            position: relative;
            margin-left: 11px;
            flex: 1;
            .label{
                margin-top: 0;
                display: flex;
                justify-content: space-between;
            }
            & > div{
                margin-top: 10px;
            }
            .infoBtn{
                position: absolute;
                right: 0;
                bottom: 3px;
                width: 80px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                color: @theme-color;
                border: 1px solid @theme-color;
                &.hint{
                    color: @hint-color;
                     border-color: @hint-color;
                 }
            }
        }
    }
    .icon{
        width: 12px;
        height: 12px;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconLocation{
             background-image: url('../../assets/images/icon-location.png');
        }
    }
</style>
<template>
    <div :class="$style.content" @click="click">
        <div :class="$style.desc">
            <span v-if="dataInfo.type == 2" class="color-theme size-topic">拥有资源：</span>
            <span v-else　class="color-hint size-topic">寻求合作：</span>
            {{ dataInfo.description }}
        </div>
        <div class="text-right">
            <time class="weak">{{dataInfo.create_time | dateFormat('yyyy/MM/dd') }}</time>
        </div>
        <div :class="$style.imgContent" v-if="!dataInfo.noPicture">
            <ImgContain :imgUrl="url" :class="$style.imgItem" v-if="index < 4"  @click.native="showSwiper(index)" v-for="(url,index) in dataInfo.pictures"></ImgContain>
        </div>
        <div :class="$style.user">
            <div>
                <img :src="dataInfo.photo" width="40" height="40">
                <div :class="[$style.name,'color-topic','one-line']">
                    {{dataInfo.creater.name}}
                </div>
            </div>
            <div :class="$style.info">
                <div :class="$style.label">
                    <div>
                        <span>{{dataInfo.enrol_time}}级</span>
                        <span> | </span>
                        <span>{{dataInfo.creater.major}}</span>
                    </div>
                    <div>
                        <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>
                        <span class="inline-block">{{ dataInfo.province + '-' + dataInfo.city}}</span>
                    </div>
                </div>
                <div>
                    <span>{{dataInfo.creater.company}}</span>
                </div>
                <div>
                    <span>{{dataInfo.creater.detail_job}}</span>
                </div>
                <template v-if="!isSelf">
                    <span :class="$style.infoBtn" @click.prevent="collaborate" v-if="!dataInfo.applied">申请合作</span>
                    <span :class="[$style.infoBtn,$style.hint]" @click.prevent="revocation" v-else>撤销</span>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
  import {serverUrl} from '../../config';
  import swiper from  '../../components/swiper';
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
      click(){
        this.$emit('click',this.dataInfo);
      },
      showSwiper(currentIndex){
        if(!this.dataInfo.pictures[currentIndex]) return;
        swiper({
          imageArr:this.dataInfo.pictures,
          currentIndex
        });
      },
      collaborate(){
          this.$emit('collaborate',this.dataInfo);
      },
      revocation(){
        this.$emit('revocation',this.dataInfo);
      }
    }
  }
</script>