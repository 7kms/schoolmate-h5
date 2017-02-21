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
                <div :class="[$style.imgAdd,'text-center']">
                    <file-upload class="file-upload"
                                 :drop="false"
                                 :multiple="false"
                                 post-action="http://10.0.6.213:9000/upload"
                                 accept="image/*"
                                 :events="events"
                    ></file-upload>
                    <i :class="$style.btnAdd"></i>
                    <span>添加封面</span>
                </div>
                <span :class="$style.defaultImg">选用默认</span>
            </div>
            <div class="pub-info-content">
                <div class="pub-item">
                    <h3 class="pub-title">活动主题</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="填写28字以内活动主题" maxlength="28">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">活动时间</h3>
                    <div class="pub-time-content">
                        <div class="pub-dfn-item" v-show="timeLimit">
                            <div class="dfn-label">
                                <!--<input type="text" class="dfn-input l-input">-->
                                <span class="inline-block dfn-span">开始时间：</span><div class="dfn-input l-input inline-block" @click="openTime('startDatePicker')">{{ startDate | dateFormat('yyyy/MM/dd')}}</div><span class="inline-block">日期</span>
                            </div>
                            <div class="dfn-label">
                                <!--<input type="text" class="dfn-input s-input">-->
                                <div class="dfn-input s-input inline-block" @click="openTime('startTimePicker')">{{ startTime.split(':')[0] }}</div><span class="inline-block">时</span>
                            </div>
                            <div class="dfn-label">
                                <!--<input type="text" class="dfn-input s-input">-->
                                <div class="dfn-input s-input inline-block" @click="openTime('startTimePicker')">{{ startTime.split(':')[1] }}</div><span class="inline-block">分</span>
                            </div>
                        </div>
                        <div class="pub-dfn-item" v-show="timeLimit">
                            <div class="dfn-label">
                                <span class="inline-block dfn-span">结束时间：</span><div class="dfn-input l-input inline-block" @click="openTime('endDatePicker')">{{ endDate | dateFormat('yyyy/MM/dd')}}</div><span class="inline-block">日期</span>
                            </div>
                            <div class="dfn-label">
                                <div class="dfn-input s-input inline-block" @click="openTime('endTimePicker')">{{ endTime.split(':')[0] }}</div><span class="inline-block">时</span>
                            </div>
                            <div class="dfn-label">
                                <div class="dfn-input s-input inline-block" @click="openTime('endTimePicker')">{{ endTime.split(':')[1] }}</div><span class="inline-block">分</span>
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
                        <input type="text" class="pub-input" placeholder="填写您的具体活动地址">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">手机号码</h3>
                    <div class="pub-text">
                        <input type="tel" class="pub-input" placeholder="填写联系人号码">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">活动费用</h3>
                    <div class="pub-time-content">
                        <div class="pub-dfn-item" v-show="!free">
                            <div class="dfn-label">
                                <span class="inline-block dfn-span"><span>单人收费：</span></span><input type="text" class="dfn-input l-input">
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
                        <input type="text" class="pub-input" placeholder="填写参加的人数限制">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">活动描述</h3>
                    <div class="pub-text">
                        <textarea class="pub-area" placeholder="填写活动的具体注意事项、详细信息等"></textarea>
                    </div>
                </div>
            </div>
            <div class="pubBar">发布</div>
        </div>
        <mt-datetime-picker
            ref="startDatePicker"
            type="date"
            :startDate="dateNow"
            cancelText="关闭"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="startDate">
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="startTimePicker"
            type="time"
            cancelText="关闭"
            v-model="startTime">
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="endDatePicker"
            type="date"
            :startDate="dateNow"
            cancelText="关闭"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="endDate">
        </mt-datetime-picker>
        <mt-datetime-picker
            cancelText="关闭"
            ref="endTimePicker"
            type="time"
            v-model="endTime">
        </mt-datetime-picker>
    </div>

</template>
<script>
  import FileUpload from 'vue-upload-component'
  export default {
    components:{
      FileUpload
    },
    data(){
      return {
        dateNow: new Date(),
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        free: false,
        timeLimit: true,
        popupVisible: false,
        imgArr:[],
        events: {
          add(file, component) {
            component.active = true;
//            file.headers['X-Filename'] = encodeURIComponent(file.name);
//            file.data.finename = file.name;

          },
          progress(file, component) {
            console.log('progress ' + file.progress);
          },
          after(file, component) {
            console.log('after');
            console.log(file,component);
          },
          before(file, component) {
            console.log('before');
          }
        }
      }
    },
    methods:{
      deleteImage(img){
        console.log(img);
      },
      switchTime(){
        this.timeLimit = !this.timeLimit;
      },
      switchFee(){
        this.free = !this.free;
      },
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },
      openTime(ref){
        this.$refs[ref].open()
      }
    },
    created(){
      for(let i=0;i<9;i++){
        this.imgArr.push({
          url:i<=4 ? require('../../assets/moke/0.3.2.png') : ''
        })
      }
    }
  }
</script>