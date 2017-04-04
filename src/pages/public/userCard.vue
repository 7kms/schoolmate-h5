<style lang="less" module>
    @import '../../assets/less/const.less';
    .user{
        position: relative;
        padding-right: 12px;
        padding-bottom: 6px;
        border-bottom: 1px solid @line-color-split;
        .info{
            display: flex;
            .portrait{
                width: 40px;
            }
            .text{
                flex: 1;
                display: flex;
                margin-left: 12px;
                justify-content: space-between;
            }
            .text1{
                height: 40px;
                flex-direction: column;
                padding: 2px 0;
            }
            .label{
                display: flex;
                justify-content: space-between;
            }
        }
        .info2{
            margin-top: 6px;
        }
        .infoBtn{
            /*position: absolute;*/
            width: 80px;
            height: 24px;
            line-height: 24px;
            text-align: center;
            right: 12px;
            top: 0;
            color: @theme-color;
            border: 1px solid @theme-color;
            &.exchanged{
                 color: #fff;
                 background-color: @font-color-weak;
                 border: none;
             }
            &.contact{
                 background-color: #fff;
                 border: none;
             }
        }
    }
    .icon{
        width: 12px;
        height: 12px;
        background-size: contain;
        background-repeat:no-repeat;
        &.iconLocation{
             background-image: url('../../assets/images/icon-location.png');
         }
    }

</style>
<template>
   <div :class="$style.user">
            <div :class="$style.info">
                <div :class="$style.portrait">
                    <imgContain :imgUrl="dataInfo.photo" :onlyImage="true" style="width:40px ;height:40px"></imgContain>
                </div>
                <div :class="[$style.text,$style.text1]">
                    <div :class="$style.label">
                        <div>
                            <span v-if="dataInfo.enrol_time">{{dataInfo.enrol_time.slice(0,4)}}级</span><span v-if="dataInfo.major"> | </span><span>{{dataInfo.major}}</span>
                        </div>
                        <div>
                            <i :class="['inline-block',$style.icon,$style.iconLocation]"></i>

                            <span class="inline-block" v-if="dataInfo.role=='teacher'">河北省-石家庄</span>
                            <span class="inline-block" v-else>{{dataInfo.province + '-' + dataInfo.city}}</span>
                        </div>
                    </div>
                    <div>
                        <span>{{dataInfo.company}}</span>
                    </div>
                </div>
            </div>
            <div :class="[$style.info,$style.info2]">
                <div :class="$style.portrait">
                    <span class="color-topic">{{dataInfo.name}}</span>
                </div>
                <div :class="$style.text">
                    <div>{{dataInfo.detail_job}}</div>
                    <template v-if="!isSelf">
                        <span :class="[$style.infoBtn]" v-if="dataInfo.exchange_status == 0" @click.prevent.stop="exchange('exchange')">交换联系方式</span>
                        <span :class="[$style.infoBtn,{[$style.exchanged]:true}]" v-if="dataInfo.exchange_status == 1" @click.prevent.stop="exchange('cancel')">撤销</span>
                        <span :class="[$style.infoBtn,$style.contact,'text-center']" v-if="dataInfo.exchange_status == 2" @click.prevent.stop="exchange('contact')">查看联系方式</span>
                    </template>
                </div>
            </div>
        </div>
</template>
<script>
    import {mapState} from 'vuex'
    import $api from  'api';
    export default {
        props: {
            dataInfo: {
                type: Object,
                required: true
            }
        },
        computed:{
            ...mapState({
                profile:(state)=>state.user.profile
            }),

            isSelf(){
                return this.profile.uid == this.dataInfo.uid
            }
        },
        methods:{
            exchange(type){
                var {uid} = this.dataInfo;
                if(type == 'exchange'){
                    $api.post('/Profile/requestExchange',{uid})
                            .then(res => {
                                this.$toast(res.msg);
                                if(res.result) {
                                    this.dataInfo.exchange_status = 1;
                                }
                            },res=>{
                                this.$toast('服务器异常')
                            });
                }else if(type == 'cancel'){
                    $api.post('/Profile/cancelExchange',{uid})
                            .then(res => {
                                this.$toast(res.msg)
                                if(res.result) {
                                    this.dataInfo.exchange_status = 0;
                                }
                            },res=>{
                                this.$toast('服务器异常')
                            })
                }else{
                    this.$router.push(`/mine/contacts/${this.dataInfo.uid}`);
                }
            }
        }
    }
</script>