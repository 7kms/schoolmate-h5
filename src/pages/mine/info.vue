<style lang="less" module>
    @import '../../assets/less/const.less';
    .wrap{
        padding-bottom: 40px;
    }
    .content{
        background-color: #fff;
        .bar{
            height: 30px;
            padding-left: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: @body-color;
        }
        .title{
            padding-left: 6px;
            color: @theme-color;
            border-left: 2px solid @theme-color;
        }
    }
    .item,.itemText{
        display: flex;
        margin-left: 24px;
        border-bottom: 1px solid @line-color-split;
    }
    .itemText {
        padding-top: 10px;
    }
    .item{
        height: 38px;
        align-items: center;
        overflow: hidden;
    }
    .dfn{
        width: 60px;
        text-align: justify;
    }
    .textInput{
        flex: 1;
        margin-left: 7px;
        span{
            line-height: 38px;
        }
        .input{
            width: 100%;
            display: inline-block;
            height: 38px;
            color: @font-color-topic;
        }
    }
    .save{
        position: fixed;
        height: 40px;
        line-height: 40px;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        color: #fff;
        font-size:@font-size-header;
        background-color: @theme-color;
    }
    textarea{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 40px;
        resize: none;
        outline: none;
        border: none;
    }
</style>
<template>
    <div>
        <Loading v-if="loading"></Loading>
        <div v-if="!loading" :class="$style.wrap">
            <div :class="$style.content">
                <div :class="[$style.bar,'size-topic']">
                    <span :class="[$style.title,'color-topic','inline-block']">我的信息</span>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">班级代码：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <input type="text" :class="$style.input" v-model="info.class">
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">姓 名：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <input type="text" :class="$style.input" v-model="info.name">
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">性 别：</div>
                    <div :class="[$style.textInput,'color-topic']" @click="showPicker('gender')">
                        <span :class="$style.input">{{ info.gender }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">微 信 号 ：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <input type="text" :class="$style.input" v-model="info.wechat">
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">手机号码：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <input type="text" :class="$style.input" v-model="info.phonenum">
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">出生日期：</div>
                    <div :class="[$style.textInput,'color-topic']" @click="showPicker('birthday')">
                        <span :class="$style.input">{{ info.birthday }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">籍 贯：</div>
                    <div :class="[$style.textInput,'color-topic']" @click="showPicker('place')">
                        <span :class="$style.input">{{ info.bprovince + '-' + info.bcity }}</span>
                    </div>
                </div>
            </div>
            <div :class="$style.content">
                <div :class="[$style.bar,'size-topic']">
                    <span :class="[$style.title,'color-topic','inline-block']">工作信息</span>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">专业名称：</div>
                    <div :class="[$style.textInput,'color-topic']"  @click="showPicker('major')">
                        <span :class="$style.input">{{ info.major }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">入学时间：</div>
                    <div :class="[$style.textInput,'color-topic']"  @click="showPicker('majorStart')">
                        <span :class="$style.input">{{ info.enrol_time }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">毕业时间：</div>
                    <div :class="[$style.textInput,'color-topic']" @click="showPicker('majorEnd')">
                        <span :class="$style.input">{{ info.graduate_time }}</span>
                    </div>
                </div>
            </div>
            <div :class="$style.content">
                <div :class="[$style.bar,'size-topic']">
                    <span :class="[$style.title,'color-topic','inline-block']">基本信息</span>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">工作单位：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <input type="text" :class="$style.input" v-model="info.company">
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">所属行业：</div>
                    <div :class="[$style.textInput,'color-topic']"  @click="showPicker('industry')">
                        <span :class="$style.input">{{ info.industry }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">细分行业：</div>
                    <div :class="[$style.textInput,'color-topic']"  @click="showPicker('industry_detail')">
                        <span :class="$style.input">{{ info.job }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">所在部门：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <input type="text" :class="$style.input" v-model="info.department">
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">担任职务：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <input type="text" :class="$style.input" v-model="info.detail_job">
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">工作城市：</div>
                    <div :class="[$style.textInput,'color-topic']" @click="showPicker('cPlace')">
                        <span :class="$style.input">{{ info.province + '-' + info.city }}</span>
                    </div>
                </div>
                <div :class="$style.itemText">
                    <div :class="$style.dfn">岗位描述：</div>
                    <div :class="[$style.textInput,$style.textArea,'color-topic']">
                        <textarea class="color-topic" v-model="info.resource_description"></textarea>
                    </div>
                </div>
            </div>
            <div :class="$style.save" @click="saveInfo">
                <span>保存</span>
            </div>
            <placePicker  v-if="!loading"
                          :showPicker="showPlacePicker"
                          :province="profile.bprovince"
                          :city="profile.bcity"
                          @selectEnd="selectPlace"
                          @hide="hidePicker"
            ></placePicker>
            <placePicker  v-if="!loading"
                          :showPicker="showCPlacePicker"
                          :province="profile.province"
                          :city="profile.city"
                          @selectEnd="selectCPlace"
                          @hide="hidePicker"
            ></placePicker>
            <singlePicker  v-if="!loading"
                           :dataArr="genderArr"
                           :text="info.gender"
                           :showPicker="showGenderPicker"
                           @selectEnd="selectGender"
                           @hide="hidePicker"
            ></singlePicker>
            <singlePicker  v-if="!loading"
                           :dataArr="majorArr"
                           :text="info.major"
                           :showPicker="showMajorPicker"
                           @selectEnd="selectMajor"
                           @hide="hidePicker"
            ></singlePicker>
            <singlePicker  v-if="!loading"
                           :dataArr="industryArr"
                           :text="info.industry"
                           :showPicker="showIndustryPicker"
                           @selectEnd="selectIndustry"
                           @hide="hidePicker"
            ></singlePicker>
            <singlePicker  v-if="!loading"
                           :dataArr="industryDetailArr"
                           :text="info.job"
                           :showPicker="showIndustryDetailPicker"
                           @selectEnd="selectIndustryDetail"
                           @hide="hidePicker"
            ></singlePicker>
            <timePicker
                    :showPicker="showBirthdayPicker"
                    :initDate="profile.birthday"
                    pickerRef="birthDatePicker"
                    @selectEnd="selectBirthday"
            ></timePicker>
            <timePicker
                    :showPicker="showMajorStartPicker"
                    :initDate="profile.enrol_time"
                    :endDate="info.graduate_time"
                    pickerRef="majorStartDatePicker"
                    @selectEnd="selectMajorStart"
            ></timePicker>
            <timePicker
                    :showPicker="showMajorEndPicker"
                    :initDate="profile.graduate_time"
                    :startDate="info.enrol_time"
                    pickerRef="majorEndDatePicker"
                    @selectEnd="selectMajorEnd"
            ></timePicker>
        </div>
    </div>

</template>
<script>
    import { singlePicker, placePicker,timePicker } from '../../components/popPicker';
    import { majorArr,industryObj } from '../../data';
    import $api from  'api';
	import { mapState } from 'vuex'
	export default {
		data() {
            return {
                loading: true,
                showBirthdayPicker: false,
                showPlacePicker: false,
                showCPlacePicker: false,
                showGenderPicker: false,
                showMajorPicker: false,
                showIndustryPicker: false,
                showIndustryDetailPicker: false,
                showMajorStartPicker: false,
                showMajorEndPicker: false,
                genderArr: ['男','女'],
                majorArr: majorArr,
                industryArr: Object.keys(industryObj),
            	profile: {},
                info: {}
            }
        },
        components:{
            singlePicker,
            placePicker,
            timePicker
        },
        computed:{
            industryDetailArr(){
                if(~this.industryArr.indexOf(this.info.industry)){
                   return industryObj[this.info.industry];
                }
                return industryObj[this.industryArr[0]];
            }
        },
		created: function() {
			this.$store.dispatch('user/GET_ACCOUNT')
				.then( dataInfo => {
                    this.loading = false;
				    console.log(dataInfo)
                    this.profile = {...dataInfo};
                    this.info = {...dataInfo};
				})
		},
        methods: {
          hidePicker(){
            this.showPlacePicker = false;
            this.showCPlacePicker = false;
            this.showGenderPicker = false;
            this.showMajorPicker = false;
            this.showIndustryPicker = false;
            this.showIndustryDetailPicker = false;
            this.showBirthdayPicker = false;
            this.showMajorStartPicker = false;
            this.showMajorEndPicker = false;
          },
          showPicker(name){
            if(name == 'place'){
              this.showPlacePicker = true;
            }else if(name == 'cPlace'){
                this.showCPlacePicker = true;
            }else if(name == 'gender'){
              this.showGenderPicker = true;
            }else if(name == 'major'){
                this.showMajorPicker = true;
            }else if(name == 'industry'){
                this.showIndustryPicker = true;
            }else if(name == 'industry_detail'){
                this.showIndustryDetailPicker = true;
            }else if(name == 'birthday'){
                this.showBirthdayPicker = true;
            }else if(name == 'majorStart'){
                this.showMajorStartPicker = true;
            }else if(name == 'majorEnd'){
                this.showMajorEndPicker = true;
            }
          },
          selectPlace(placeObj){
             this.hidePicker();
             this.info.bprovince = placeObj.province;
             this.info.bcity = placeObj.city;
          },
          selectCPlace(placeObj){
            this.hidePicker();
            this.info.province = placeObj.province;
            this.info.city = placeObj.city;
          },
          selectGender(value){
              this.hidePicker();
              this.info.gender = value;
          },
          selectMajor(value){
              this.hidePicker();
              this.info.major = value;
          },
          selectMajorStart(value){
                this.hidePicker();
                this.info.enrol_time = value;
          },
          selectMajorEnd(value){
                this.hidePicker();
                this.info.graduate_time = value;
          },
          selectIndustry(value){
              this.hidePicker();
              this.info.industry = value;
              if(industryObj[value].indexOf(this.info.job) < 0){
                  this.info.job = industryObj[value][0];
              }
          },
          selectIndustryDetail(value){
              this.hidePicker();
              this.info.job = value;
          },
          selectBirthday(value){
              this.hidePicker();
              this.info.birthday = value;
          },
          getParams(){
            let obj = {};
            let baseInfo =  ['uid','class','name','gender','wechat','phonenum','birthday','bprovince','bcity','major','enrol_time','graduate_time','company','industry','job','department','detail_job','province','city','resource_description'];
            baseInfo.map(item=>{
              obj[item] = this.info[item];
            });
            return obj;
          },
          saveInfo() {
            $api.post('/Profile/upProfile',this.getParams())
              .then(res=>{
                if(res.code == 200){
                  this.$toast(res.data.msg);
                  if(res.data.result){
                    this.$router.back();
                  }
                }
              },err=>{
                this.$toast('服务器异常');
              });
          }
        }
    }
</script>