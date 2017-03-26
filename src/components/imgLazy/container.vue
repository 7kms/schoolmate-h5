<style lang="less" scoped>

</style>
<template>
    <div v-lazy:background-image="imgObj"></div>
</template>
<script>
  import {serverUrl} from '../../config'
    export default {
        props:{
          imgUrl: String,
          type: String,
          imgStyle:{
            type: Object,
            default (){
              return {}
            }
          }
        },
        computed:{
          imgObj(){
            let obj = {
              src: this.postUrl()
            };
            if(this.type == 'square'){
              obj.error = require('../../assets/images/error-1.png');
              obj.loading = require('../../assets/images/default-1.png');
            }else{
              obj.error = require('../../assets/images/error-2.png');
              obj.loading = require('../../assets/images/default-2.png');
            }
            return obj;
          }
        },
      methods:{
        postUrl(){
          let url = this.imgUrl;
          if(url && url.indexOf('http') != 0){
            url = `${serverUrl+'/..'}/${url}`;
          }
          return url;
        }
      }
    }
</script>