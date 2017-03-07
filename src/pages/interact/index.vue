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
        computed:{
          ...mapGetters({
            viewStatus: 'view/GET_STATUS'
          })
        },
        data(){
            return {
                tabList:[
                    { title:'互助区', path:'/interact', name: 'interact-list'},
                    { title:'校友录', path:'/interact/mates', name: 'interact-mates' }
                ]
            }
        }
    }
</script>