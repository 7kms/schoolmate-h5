<template>
  <div>
    <AppHeader :tabList="tabList" v-if="viewStatus.showHeader"></AppHeader>
    <router-view></router-view>
  </div>
</template>
<script>
    import AppHeader from '../public/header.vue'
    import { mapGetters } from 'vuex'
    export default {
        components:{
            AppHeader
        },
        data(){
            return {
                tabList:[
                    { title:'兴趣圈', path:'/moments', name: 'interest-list'},
                    { title:'行业圈', path:'/moments/industry', name: 'industry-list' }
                ]
            }
        },
      computed:{
        ...mapGetters({
          viewStatus: 'view/GET_STATUS'
        })
      }
    }
</script>