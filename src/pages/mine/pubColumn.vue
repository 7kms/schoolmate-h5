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
  import {mapState} from 'vuex'
    import pubInteract from './pubInteract.vue'
    import pubAttend from './pubAttend.vue'
    import pubPhoto from './pubPhoto.vue'
    import pubActivity from './pubActivity.vue'
  export default{
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('interact/RESET_INTERACT_LIST');
      this.$store.dispatch('activity/RESET_COLUMN_LIST');
      this.$store.dispatch('interact/RESET_INTERACT_LIST');
      this.$store.dispatch('activity/RESET_ATTEND_LIST');
      next();
    },
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
    computed:{
      ...mapState({
        uid:state=>state.user.profile.uid
      })
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