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
            <span v-if="true" class="color-theme size-topic">拥有资源：</span>
            <span v-else　class="color-hint size-topic">寻求合作：</span>
            {{ dataInfo.resource_description }}
        </div>
        <div class="text-right">
            <time class="weak">{{dataInfo.create_time | dateFormat('yyyy/MM/dd') }}</time>
        </div>
        <div :class="$style.imgContent" v-if="!dataInfo.noPicture">
            <ImgContain :imgUrl="url" :class="$style.imgItem" v-if="index < 4" v-for="(url,index) in dataInfo.pictures"></ImgContain>
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
                <span :class="$style.infoBtn" @click.prevent="collaborate" v-if="!dataInfo.applied">申请合作</span>
                <span :class="$style.infoBtn" v-if="dataInfo.applied">合作名单</span>
            </div>
        </div>
    </div>
</template>
<script>
  import {serverUrl} from '../../config'
  export default {
    data(){
      return {
        testUrl:require('../../assets/moke/0.3.1.png')
      }
    },
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
      collaborate(){
          this.$emit('collaborate',this.dataInfo);
      }
    }
  }
</script>