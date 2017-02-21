<style lang="less" module>
    @import '../../assets/less/const.less';
</style>
<template>
    <div class="content">
        <pub-interact v-if="currentItem=='interact'"></pub-interact>
        <pub-attend v-else-if="currentItem=='attend'"></pub-attend>
        <pub-photo v-else-if="currentItem=='photo'"></pub-photo>
        <pub-activity v-else></pub-activity>
    </div>
</template>
<script>
    import pubInteract from './pubInteract.vue'
    import pubAttend from './pubAttend.vue'
    import pubPhoto from './pubPhoto.vue'
    import pubActivity from './pubActivity.vue'
  export default{
    components:{
      pubInteract,
      pubAttend,
      pubPhoto,
      pubActivity
    },
    data(){
      return {
        currentItem : ''
      }
    },
    watch:{
      $route(to,from){
        this.currentItem = this.$route.params.column;
      }
    },
    created(){
      this.currentItem = this.$route.params.column || 'interact';
    }
  }
</script>