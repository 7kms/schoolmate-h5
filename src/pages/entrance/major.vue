<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        margin-top: -1px;
        background-color: #fff;
    }
</style>
<template>
    <div>
        <div class="entrance-content">
            <div class="item">
                <div class="dfn"><span class="label inline-block">班级代码</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写学校班级号" v-model="userInfo.class">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">专业名称</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('major')">
                    <span class="select" v-if="userInfo.major">{{userInfo.major}}</span>
                    <span class="select color-weak" v-else>选择入专业名称</span>
                </div>
            </div>

            <div class="item">
                <div class="dfn"><span class="label inline-block">入学时间</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('roleStart')">
                    <span class="select" v-if="userInfo.enrol_time">{{userInfo.enrol_time}}</span>
                    <span class="select color-weak" v-else>选择入学时间</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">毕业时间</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('graduate')">
                    <span class="select" v-if="userInfo.graduate_time">{{userInfo.graduate_time}}</span>
                    <span class="select color-weak" v-else>选择毕业时间</span>
                </div>
            </div>
            <div class="item itemArea" v-if="channel == 'student'">
                <div class="dfn"><span class="label inline-block">自我描述</span><!--<span class="color-hint inline-block">*</span>--></div>
                <div class="textInput color-topic">
                    <textarea  class="textArea" placeholder="填写关于自己的描述" v-model="userInfo.resource_description"></textarea>
                </div>
            </div>
        </div>
        <div class="entrance-next-step text-center" @click="stepNext">
            <span>下一步</span>
        </div>
        <mt-popup
                v-model="showMajorPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="majorSlots" :showToolbar="true" :rotateEffect="true" @change="selectMajor">
                <span></span><span @click="setDefaultMajor">确定</span>
            </mt-picker>
        </mt-popup>


        <timePicker
                :showPicker="showMajorStartPicker"
                :initDate="roleStartDate"
                :endDate="userInfo.graduate_time"
                pickerRef="majorStartDatePicker"
                @selectEnd="selectMajorStart"
        ></timePicker>
        <timePicker
                :showPicker="showMajorEndPicker"
                :initDate="roleEndDate"
                :startDate="userInfo.enrol_time"
                pickerRef="majorEndDatePicker"
                @selectEnd="selectMajorEnd"
        ></timePicker>
    </div>
</template>
<script>
    import { singlePicker, placePicker,timePicker } from '../../components/popPicker';
  import { majorArr } from '../../data';
  import  { mapState } from  'vuex'
  import util from  '../../util'
  export default {
    data(){
      return {
        showMajorPicker:false,
          showMajorStartPicker: false,
          showMajorEndPicker: false,
          roleStartDate:'1953/01/01',
          roleEndDate:'1953/01/01',
          info:{
              enrol_time: '',
              graduate_time: ''
          },
        majorSlots:[{
          flex: 1,
          values: majorArr
        }]
      }
    },
      components:{
          timePicker
      },
    computed:{
      ...mapState({
        channel:(state) => state.entrance.channel,
        userInfo:(state) => state.entrance.userInfo
      })
    },
    methods:{
      showPicker(pickerName){
        switch (pickerName){
          case 'major':
            this.showMajorPicker = true;
            break;
            case 'roleStart':
                this.showMajorStartPicker = true;
                break;
            case 'graduate':
                this.showMajorEndPicker = true;
                break;
        }
      },
        hidePicker(){
            this.showMajorPicker = false;
            this.showMajorStartPicker = false;
            this.showMajorEndPicker = false;
        },
      selectMajor(picker,values){
        this.$store.dispatch('entrance/CHANGE_USERINFO',{major:values[0]})
      },
      setDefaultMajor(){
        this.showMajorPicker = false;
        if(!this.userInfo.major){
          this.$store.dispatch('entrance/CHANGE_USERINFO',{major:this.majorSlots[0].values[0]})
        }
      },
        selectMajorStart(value){
            this.hidePicker();
            this.$store.dispatch('entrance/CHANGE_USERINFO',{enrol_time:value})
        },
        selectMajorEnd(value){
            this.hidePicker();
            this.$store.dispatch('entrance/CHANGE_USERINFO',{graduate_time:value})
        },
      valid(){
        if(!this.userInfo.class){
          this.$toast('班级代码不能为空');
          return false;
        }
        if(!this.userInfo.major){
          this.$toast('专业名称不能为空');
          return false;
        }
        if(!this.userInfo.enrol_time){
          this.$toast('入学时间不能为空');
          return false;
        }
        if(!this.userInfo.graduate_time){
          this.$toast('毕业时间不能为空');
          return false;
        }
        return true;
      },
      stepNext(){
        if(this.valid()){
          this.$store.dispatch('entrance/STEP_NEXT');
        }
      }
    },
    mounted(){
      if(this.channel == 'student' || this.channel == 'teacher'){
        this.$store.dispatch('entrance/CHANGE_USERINFO',{province:'河北省',city:'石家庄'})
      }
    }
  }
</script>