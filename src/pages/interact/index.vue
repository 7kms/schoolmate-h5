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
                    { title:'校友录', path:'/interact', name: 'interact-mates' },
                    { title:'互助区', path:'/interact/resource', name: 'interact-list'}
                ]
            }
        }
    }
</script>