<style lang="less" module>
    @import '../../assets/less/const.less';
    .operate {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 40px;
        line-height: 40px;
        color: #fff;
        display: flex;

    div {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .oLeft {
        flex: 1;
        background-color: @theme-color;
    }

    .oRight {
        width: 94px;
        background-color: @theme-color-weak;
    }

    .icon {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        background-size: contain;
        background-repeat: no-repeat;
        }
    }
</style>
<template>
    <div :class="[$style.operate,'size-header']">
        <div :class="$style.oLeft" @click="click('left')">
            <i
                    v-if="dataInfo.leftImage"
                    :class="['inline-block',$style.icon,$style.iconLeft]"
               :style="{backgroundImage:'url('+ dataInfo.leftImage +')'}"
            ></i><span class="inline-block">{{dataInfo.leftText}}</span>
        </div>
        <div :class="$style.oRight" @click="click('right')">
            <i  v-if="dataInfo.rightImage" :class="['inline-block',$style.icon,$style.iconRight]"
               :style="{backgroundImage:'url('+ dataInfo.rightImage +')'}"
            ></i><span class="inline-block">{{dataInfo.rightText}}</span>
        </div>
    </div>
</template>
<script>
    export default{
      props:{
        dataInfo:{
          type: Object,
          required: true
        }
      },
      methods:{
        click(type){
          this.$emit('click',type);
        }
      }
    }
</script>