<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
        padding: 12px 0 12px 12px;
    }
    .user{
        position: relative;
        padding-right: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid @line-color-split;
        .info{
            display: flex;
            .portrait{
                width: 40px;
            }
            .text{
                flex: 1;
                display: flex;
                margin-left: 12px;
                justify-content: space-between;
            }
            .text1{
                height: 40px;
                flex-direction: column;
                padding: 2px 0;
            }
        }
        .info2{
            margin-top: 6px;
        }
        .infoBtn{
            position: absolute;
            width: 80px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            right: 12px;
            top: 0;
            color: @theme-color;
            border: 1px solid @theme-color;
            &.exchanged{
                color: #fff;
                background-color: @font-color-weak;
                 border: none;
             }
        }
    }
    .desc{
        padding: 6px 12px 0 0;
        line-height: 1.4rem;
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
        <div :class="$style.user">
            <template v-if="!isSelf">
                <span :class="[$style.infoBtn,{[$style.exchanged]:true}]" v-if="false" @click.prevent="cancelExchange(dataInfo)">撤销</span>
                <span :class="[$style.infoBtn]" @click.prevent="exchange(dataInfo)">交换联系方式</span>
            </template>
            <div :class="$style.info">
                <div :class="$style.portrait">
                    <img :src="dataInfo.photo" width="40" height="40">
                </div>
                <div :class="[$style.text,$style.text1]">
                    <div>
                        <span>{{dataInfo.enrol_time.slice(0,4)}}级</span><span> | </span><span>{{dataInfo.major}}</span>
                    </div>
                    <div>
                        <span>{{dataInfo.company}}</span>
                    </div>
                </div>
            </div>
            <div :class="[$style.info,$style.info2]">
                <div :class="$style.portrait">
                    <span class="color-topic">{{dataInfo.name}}</span>
                </div>
                <div :class="$style.text">
                    <div>{{dataInfo.detail_job}}</div>
                    <div>
                        <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>
                        <span class="inline-block">{{dataInfo.province + '-' + dataInfo.city}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div :class="$style.desc">
            <span class="color-topic">岗位描述:</span>
            {{dataInfo.resource_description}}
        </div>
    </div>
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
      click(){
        this.$emit('click',this.dataInfo);
      },
        cancelExchange(){
            this.$emit('cancelExchange',this.dataInfo);
        },
        exchange(){
            this.$emit('exchange',this.dataInfo);
        }
    }
  }
</script>