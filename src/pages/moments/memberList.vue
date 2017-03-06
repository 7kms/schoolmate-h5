<style lang="less" module>
    @import '../../assets/less/const.less';
    .info{
        margin-bottom: 6px;
        background-color: #fff;
    }

</style>
<template>
    <div>
        <div :class="['list-content',$style.info,$style.attendedList]">
            <h3 class="item-header">报名名单</h3>
            <ul>
                <attendedItem :dataInfo="contact" v-for="contact in list"></attendedItem>
            </ul>
        </div>
        <div>
            <Loading v-if="loading"></Loading>
            <div v-if="!loading && list.length == 0" class="empty-data-item">
                <span>数据为空</span>
            </div>
        </div>
    </div>
</template>
<script>
    import $api from 'api'
    import attendedItem from './attendedItem.vue'
    export default {
        data(){
            return {
                list:[],
                loading: true
            }
        },
        components:{
          attendedItem
        },
        created(){
            $api.post('/index.php/Circle/getMembers',{cid:this.$route.params.id})
                .then(res=>{
                    this.loading = false;
                    this.list = [...res.data];
                },err=>{
                    this.$toast('服务器异常');
                })
        }
    }
</script>

