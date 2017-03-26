<style lang="less" module>
    @import '../../assets/less/const.less';
    .info{
        margin-bottom: 6px;
        background-color: @body-color;
    }
    .item{
        margin-bottom: 10px;
    }

</style>
<template>
    <div>
        <Loading v-if="loading"></Loading>
        <div v-else>
            <ul :class="[$style.info,$style.attendedList]" v-if="memberList.length">
                <Item v-for="(item,index) in memberList" :class="$style.item" :key="index" :dataInfo="item"></Item>
            </ul>
        </div>
        <div v-if="!loading && memberList.length  == 0" class="empty-data-item">
            <span>数据为空</span>
        </div>
    </div>
</template>
<script>
    import $api from 'api';
    import Item from '../public/mate.vue';
    export default {
        data(){
            return {
                memberList:[],
                loading: true
            }
        },
        components:{
          Item
        },
        created(){
            $api.post('/Circle/getIndustryMembers',{cid:this.$route.params.cid})
                .then(res=>{
                    this.loading = false;
                    if(res.code == 200){
                      this.memberList = [...res.others];
                    }else{
                      this.$toast(res.msg);
                    }
                },err=>{
                    this.loading = false;
                    this.$toast('服务器异常');
                });
        }
    }
</script>

