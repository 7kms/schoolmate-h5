<style lang="less" module>
    @import '../../assets/less/const.less';
    .list{
        background-color: #fff;
    }
</style>
<template>
    <ul :class="$style.list">
        <contact @click="goContactDetail"></contact>
    </ul>
</template>
<script>
  import {serverUrl} from '../../config'
  import contact from './contact.vue'
  export default {
    components:{
      contact
    },
    data(){
      return {
        item: '',
        testUrl:require('../../assets/moke/0.3.1.png')
      }
    },
    methods:{
      goContactDetail(contact){
        this.$router.push(`/mine/contacts/${contact.id || 1212}`)
      }
    }
  }
</script>