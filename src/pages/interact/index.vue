<template>
  <div>
    <AppHeader :tabList="tabList"></AppHeader>
    <router-view></router-view>
  </div>
</template>
<script>
    import AppHeader from '../public/header.vue'
    export default {
        components:{
            AppHeader
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