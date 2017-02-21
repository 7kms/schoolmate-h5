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
                    { title:'活动栏', path:'/activity', name: 'column-list'},
                    { title:'照片墙', path:'/activity/photoshow', name: 'photo-list' }
                ]
            }
        },
        computed:{
            ...mapGetters({
                viewStatus: 'view/GET_STATUS'
            })
        },
        mounted(){
            console.log('component mounted')
            // this.$toast('mint ui')
        }
    }
</script>