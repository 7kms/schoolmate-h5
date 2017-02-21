<style lang="less" module>
    @import '../../assets/less/const.less';
</style>
<template>
    <div class="wrap">
        <regNav></regNav>
        <basicInfo v-if="step == 1"></basicInfo>
        <template v-if="channel=='graduate'">
            <major v-if="step == 2"></major>
            <resource v-if="step == 3"></resource>
            <contact v-if="step == 4"></contact>
        </template>
        <template v-if="channel == 'teacher'">
            <resource v-if="step == 2"></resource>
            <contact v-if="step == 3"></contact>
        </template>
        <template v-if="channel == 'student'">
            <major v-if="step == 2"></major>
            <contact v-if="step == 3"></contact>
        </template>
    </div>
</template>
<script>
    import regNav from './nav.vue';
    import basicInfo from './basicInfo.vue';
    import contact from './contact.vue'
    import resource from './resource.vue'
    import major from './major.vue'
    import { mapGetters, mapState } from 'vuex'
    export default {
       components:{
          regNav,
          basicInfo,
          contact,
          resource,
          major
       },
       computed:{
            ...mapGetters({
              navInfo:'entrance/GET_NAV'
            }),
            ...mapState({
                channel:(state)=> state.entrance.channel,
                step:(state)=> state.entrance.step,
            })
        },
        methods:{

        }
    }
</script>