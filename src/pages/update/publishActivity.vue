<style lang="less" module>
    @import '../../assets/less/const.less';
    .picWrap{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: @font-size-header;
        height: 225px;
        color: #fff;
        background-image: linear-gradient(-180deg, #56AEEA 0%, #81D2F8 98%);
    .cover{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
    }
    }
    .imgAdd{
        position: relative;
    .btnAdd{
        display: block;
        width: 93px;
        height: 93px;
        margin: 0 auto 12px;
        background-size: contain;
        background-image: url("../../assets/images/bg-add-plus.png");
    }
    }
    .defaultImg{
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
</style>
<template>
    <div>
        <div class="content">
            <div :class="$style.picWrap">
                <div :class="$style.cover" v-if="showBgImage" :style="{backgroundImage:'url('+ imageUrl(info.cover_file) +')'}"></div>
                <Loading text="上传中..." :class="$style.loading" v-show="loading"></Loading>
                <div :class="[$style.imgAdd,'text-center']" v-show="!loading">
                    <file-upload class="file-upload"
                                 :drop="false"
                                 :post-action="action"
                                 accept="image/*"
                                 :events="events"
                                 name="file0"
                    ></file-upload>
                    <i :class="$style.btnAdd"></i>
                    <span>添加封面</span>
                </div>
                <span :class="$style.defaultImg" @click="selectDefaultImage">选用默认</span>
            </div>
            <div class="pub-info-content">
                <div class="pub-item">
                    <h3 class="pub-title">活动主题</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="填写28字以内活动主题" maxlength="28" v-model="info.theme">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">活动时间</h3>
                    <div class="pub-time-content">
                        <div class="pub-dfn-item" v-show="timeLimit">
                            <div class="dfn-label">
                                <!--<input type="text" class="dfn-input l-input">-->
                                <span class="inline-block dfn-span">开始时间：</span><div class="dfn-input l-input inline-block" @click="showPicker('showStartDatePicker')">{{ startDate}}</div><span class="inline-block">日期</span>
                            </div>
                            <div class="dfn-label">
                                <!--<input type="text" class="dfn-input s-input">-->
                                <div class="dfn-input s-input inline-block" @click="showPicker('showStartTimePicker')">{{ startTime.split(':')[0] }}</div><span class="inline-block">时</span>
                            </div>
                            <div class="dfn-label">
                                <!--<input type="text" class="dfn-input s-input">-->
                                <div class="dfn-input s-input inline-block" @click="showPicker('showStartTimePicker')">{{ startTime.split(':')[1] }}</div><span class="inline-block">分</span>
                            </div>
                        </div>
                        <div class="pub-dfn-item" v-show="timeLimit">
                            <div class="dfn-label">
                                <span class="inline-block dfn-span">结束时间：</span><div class="dfn-input l-input inline-block" @click="showPicker('showEndDatePicker')">{{ endDate}}</div><span class="inline-block">日期</span>
                            </div>
                            <div class="dfn-label">
                                <div class="dfn-input s-input inline-block" @click="showPicker('showEndTimePicker')">{{ endTime.split(':')[0] }}</div><span class="inline-block">时</span>
                            </div>
                            <div class="dfn-label">
                                <div class="dfn-input s-input inline-block" @click="showPicker('showEndTimePicker')">{{ endTime.split(':')[1] }}</div><span class="inline-block">分</span>
                            </div>
                        </div>
                        <div class="pub-dfn-item">
                            <div class="dfn-label">
                                <span class="inline-block dfn-span"><span v-show="!timeLimit">开始时间：</span></span><div class="dfn-input l-input inline-block dfn-box" :class="{on: !timeLimit}" @click="switchTime"><span>不限时间</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">活动地址</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="填写您的具体活动地址" v-model="info.place">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">手机号码</h3>
                    <div class="pub-text">
                        <input type="tel" class="pub-input" placeholder="填写联系人号码" v-model="info.contact">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">活动费用</h3>
                    <div class="pub-time-content">
                        <div class="pub-dfn-item" v-show="!free">
                            <div class="dfn-label">
                                <span class="inline-block dfn-span"><span>单人收费：</span></span><input type="text" class="dfn-input l-input" v-model="info.fee">
                            </div>
                        </div>
                        <div class="pub-dfn-item">
                            <div class="dfn-label">
                                <span class="inline-block dfn-span">免&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;费：</span><div class="dfn-input l-input inline-block dfn-box" :class="{on: free}" @click="switchFee"><span>免费</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">限定人数</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="填写参加的人数限制" v-model="info.amount">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">活动描述</h3>
                    <div class="pub-text">
                        <textarea class="pub-area" placeholder="填写活动的具体注意事项、详细信息等" v-model="info.description"></textarea>
                    </div>
                </div>
            </div>
            <div class="pubBar" @click="publish">发布</div>
        </div>
        <timePicker
                :showPicker="showStartDatePicker"
                :initDate="info.time"
                :startDate="dateNow"
                ref="showStartDate"
                pickerRef="showStartDatePicker"
                @selectEnd="selectStartDate"
        ></timePicker>
        <timePicker
                :showPicker="showEndDatePicker"
                :initDate="info.end_time"
                :startDate="startDate"
                ref="showEndDate"
                pickerRef="showEndDatePicker"
                @selectEnd="selectEndDate"
        ></timePicker>
        <timePicker
                :showPicker="showStartTimePicker"
                :initDate="info.time"
                pickerType="time"
                ref="showStartTime"
                pickerRef="showStartTimePicker"
                @selectEnd="selectStartTime"
        ></timePicker>
        <timePicker
                :showPicker="showEndTimePicker"
                :initDate="info.end_time"
                pickerType="time"
                ref="showEndTime"
                pickerRef="showEndTimePicker"
                @selectEnd="selectEndTime"
        ></timePicker>
    </div>

</template>
<script>
    import { singlePicker, placePicker,timePicker } from '../../components/popPicker';
    import FileUpload from 'vue-upload-component';
    import {serverUrl} from '../../config'
    import util from  '../../util';
    import $api from 'api';
    export default {
        components:{
            FileUpload,
            timePicker
        },
        data(){
            return {
                showStartDatePicker: false,
                showEndDatePicker: false,
                showStartTimePicker: false,
                showEndTimePicker: false,
                info:{
                    theme:'',
                    time:'',
                    end_time: '',
                    description:'',
                    place:'',
                    cover_file:'image/default-activity-cover.jpg',
                    amount:'',
                    fee:'',
                    contact: ''
                },
                loading: false,
                showBgImage: false,
                dateNow: util.dateFormat(new Date(),'yyyy/MM/dd'),
                startDate: '',
                startTime: '',
                endDate: '',
                endTime: '',
                free: false,
                timeLimit: true,
                popupVisible: false
            }
        },
        computed:{
            action(){
                return serverUrl + '/Picture/multiPicUpload';
            },
            limitTime(){
                return this.startDate + ' ' + this.startTime;
            },
            events(){
                var _this = this;
                return {
                    add(file, component) {
                        file.data.count = 1;
                        component.active = true;
                        _this.loading = true;
                    },
                    progress(file, component) {
                        console.log('progress ' + file.progress);
                    },
                    after(file, component) {
                        var res = util.parseJSON(file.response);
                        if(res.code == 200){
                            _this.info.cover_file = res[0];
                            _this.showBgImage = true;
                        }else{
                            this.$toast(res.msg);
                        }
                        _this.loading = false;
                    },
                    before(file, component) {
                        console.log('before');
                    }
                }
            },
        },
        methods:{
            selectStartDate(val){
                this.hidePicker();
                console.log(val)
                this.startDate = val;
            },
            selectEndDate(val){
                this.hidePicker();
                this.endDate = val;
            },
            selectStartTime(val){
                this.hidePicker();
                this.startTime = val;
            },
            selectEndTime(val){
                this.hidePicker();
                this.endTime = val;
            },
            hidePicker(){
                this.showStartDatePicker = false;
                this.showEndDatePicker = false;
                this.showStartTimePicker = false;
                this.showEndTimePicker = false;
            },
            showPicker(name){
                let ref = name.slice(0,-6);
                this.$refs[ref].$refs[name].open();
                this[name] = true;
            },
            selectDefaultImage(){
                this.info.cover_file = 'image/default-activity-cover.jpg';
                this.showBgImage = true;
            },
            deleteImage(img){
                console.log(img);
            },
            switchTime(){
                this.timeLimit = !this.timeLimit;
            },
            switchFee(){
                this.free = !this.free;
            },
            valid(){
                if(!this.info.theme){
                    this.$toast('活动主题不能为空');
                    return false;
                }
                if(!this.info.place){
                    this.$toast('活动地址不能为空');
                    return false;
                }
                if(!/^1[3-8]\d{9}$/.test(this.info.contact)){
                    this.$toast('手机号码不正确');
                    return false;
                }

                if(!this.free && !/[1-9]\d*/.test(this.info.fee)){
                    this.$toast('活动费用不正确');
                    return false;
                }
                if(!this.info.amount){
                    this.$toast('限定人数未填写');
                    return false;
                }
                if(this.info.description == ''){
                    this.$toast('活动描述未填写');
                    return false;
                }
                if(!this.startDate || !this.endDate || !this.startTime || !this.endTime){
                    this.$toast('活动时间不能为空');
                    return false;
                }
                return true;
            },
            getParams(){
                let obj = Object.assign({},this.info);
                if(this.free){
                    obj.fee = 0;
                }
                if(!this.timeLimit){
                    obj.time = 0;
                    obj.end_time = 0;
                }else{
                    obj.time = String(new Date(this.startDate + ' ' + this.startTime).getTime());
                    obj.end_time = String(new Date(this.endDate + ' ' + this.endTime).getTime());
                }
                return obj;
            },
            publish(){
                if(!this.valid())return false;
                var paramObj = this.getParams();
                if(paramObj.time * 1 > paramObj.end_time *1){
                    this.$toast('开始时间不能大于结束时间');
                    return false;
                }
                $api.post('/Activity/publish',paramObj)
                .then(res=>{
                    if(res.code == 200){
                        this.$toast('发布成功');
                        this.$router.push('/')
                    }else{
                        this.$toast('发布失败');
                    }
                },res=>{
                    this.$toast('服务器异常');
                })
            },
            imageUrl(str){
                return `${serverUrl}/${str}`;
            }
        }

    }
</script>