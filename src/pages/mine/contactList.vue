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
  import contact from './contact.vue'
  import $api from 'api'
  export default {
    components:{
      contact
    },
    data(){
      return {
      }
    },
    methods:{
      goContactDetail(contact){
        this.$router.push(`/mine/contacts/${contact.uid}`)
      }
    },
    created(){
      const {channel,rid} = this.$route.query;
      if(channel == 'resource'){
        $api.get('/index.php/Help/getCoList',{rid})
          .then(res=>{
            console.log(res);
        },error=>{
            this.$toast('服务器异常')
        })
      }
    }
  }
</script>