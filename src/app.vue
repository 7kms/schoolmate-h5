<style module>
    .app{
        height: 100%;
    }
</style>
<template>
    <div id="app" :class="$style.app">
        <slot></slot>
        <router-view></router-view>
        <template v-if="viewStatus.showNav">
            <AppNav :list="navList"></AppNav>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import AppNav from './pages/public/nav.vue';
    export default {
        data(){
            return {
                showNav: true
            }
        },
        created: function() {
            this.$store.dispatch('user/GET_ACCOUNT')
                .then( (profile) => {
                	console.log(profile);
                	if(!profile.phonenum) {
		                this.$router.replace('/entrance');
                    }
                } )
        },
        components:{
           AppNav 
        },
        computed:{
            ...mapGetters({
                navList: 'nav/GET_NAV',
                viewStatus: 'view/GET_STATUS'
            })
        },
        watch:{
            $route(to,from){
                let {showNav,showHeader} = to.meta;
                this.$store.dispatch('view/SET_STATUS',{showNav,showHeader})
            }
        }
    }
</script>