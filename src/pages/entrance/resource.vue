<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        margin-top: -1px;
        background-color: #fff;
    }
</style>
<template>
    <div>
        <div class="entrance-content">
            <div class="item">
                <div class="dfn"><span class="label inline-block">工作单位</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写公司名称">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">所属行业</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <span class="select color-weak">请选择</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">细分行业</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <span class="select color-weak">请选择</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">所在部门</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写所在部门名称">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">担任职务</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写职位名称">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">所在省市</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <span class="select color-weak">请选择</span>
                </div>
            </div>
            <div class="item itemArea">
                <div class="dfn"><span class="label inline-block">岗位描述</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <textarea  class="textArea" placeholder="填写具体工作岗位描述"></textarea>
                </div>
            </div>
        </div>
        <div class="entrance-next-step text-center" @click="stepNext">
            <span>下一步</span>
        </div>
    </div>
</template>
<script>
  import  { mapState } from  'vuex'
  export default {
    data(){
      return {
        waiting: false,
        count: 6
      }
    },
    computed:{
      ...mapState({
        channel:(state) => state.entrance.channel
      })
    },
    methods:{
      stepNext(){
        this.$store.dispatch('entrance/STEP_NEXT');
      }
    }
  }
</script>