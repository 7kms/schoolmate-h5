<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        background-color: #fff;
    }
    .pic{
        height: 170px;
        background-size: cover;
        background-repeat:no-repeat;
        background-position:center;
    }
    .desc{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 6px 12px;
    }
    .info{
        display: flex;
        margin-top: 5px;
        justify-content: space-between;
        .location{
            flex: 1;
            .text{
                width: 90%;
            }
        }
    }
    .icon{
        width: 10px;
        height: 10px;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconLocation{
             background-image: url('../../assets/images/icon-location.png');
         }
        &.iconTime{
            background-image: url('../../assets/images/icon-time.png');
        }
        &.iconRemove{
             width: 12px;
             height: 12px;
             background-image: url('../../assets/images/icon-remove.png');
         }
    }
    .remove{
        padding: 10px 0;
    }
</style>
<template>
    <div :class="$style.content" @click="click">
        <ImgLazy :class="$style.pic" :imgUrl="dataInfo.cover_file"></ImgLazy>
        <div :class="$style.desc">
            <h3 :class="[$style.title,'topic','one-line']">{{dataInfo.theme}}</h3>
            <div :class="$style.info">
                <div :class="[$style.location,'one-line']">
                    <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>
                    <span :class="['inline-block','one-line',$style.text]">{{dataInfo.place}}</span>
                </div>
                <div class="color-weak">
                    <i :class="['inline-block',$style.icon,$style.iconTime]"></i>
                    <span class="inline-block" v-if="dataInfo.time == '0'">不限</span>
                    <span class="inline-block" v-else>{{dataInfo.time | dateFormat('M月d日')}}</span>
                </div>
            </div>
            <div class="text-right weak" v-if="isSelf">
                <span :class="[$style.remove,'inline-block']" @click.stop.prevent="remove">
                    <i :class="['inline-block',$style.icon,$style.iconRemove]"></i>
                    <span class="inline-block">撤销发布</span>
                </span>
            </div>
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
              remove(){
                this.$dialog.confirm('您是否确认撤销该发布内容?').then(()=>{
                  this.$emit('remove',this.dataInfo);
                },data=>{
                  return false;
                })

              }
        }
    }
</script>