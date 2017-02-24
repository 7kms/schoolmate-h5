<style lang="less" module>
    @import '../../assets/less/const.less';
    .filter{
        z-index: 10;
        left: 0;
        top: @header-height;
        width: 100%;
        position: fixed;
        height: 30px;
        display: flex;
        align-items: center;
        background-color:@body-color;
        .item{
            flex: 1;
            &.active{
                color: @theme-color;
             }
        }
        .iconMore{
            width: 12px;
            height: 12px;
            opacity: .4;
            background-size: contain;
            background-repeat:no-repeat;
            background-image: url('../../assets/images/icon-triangle.png');
        }
    }
    .condition{
        position: fixed;
        z-index: 10;
        left: 0;
        top: @header-height + 30;
        bottom: @nav-height;
        width: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        border-top: 1px solid #C7CED2;;
        background-color: @body-color;
    }
    .condition{
        padding:0 12px 12px;
    }
    .dfn{
        display: flex;
        align-items:center;
        margin-top: 12px;
        .label{
            width: 50px;
            text-align: justify;
        }
        .dInput{
            flex: 1;
            height: 28px;
            margin-left: 12px;
            background-color: #fff;
            input{
                width: 100%;
                height: 28px;
                padding: 0 10px;
                border: none;
                outline: none;
                background-color: transparent;
            }
        }
        .dSelect{
            line-height: 28px;
            text-align: center;
            &.empty{
                 border: 1px solid @theme-color;
             }

        }
        .special{
            width: 148px;
            flex: none;
        }
    }
    .submit{
        width: 100px;
        height: 30px;
        margin: 12px auto;
        line-height: 30px;
        background-color: @theme-color;
        color: #fff;
        border-radius: 2px;
    }
</style>
<template>
    <div>
        <div :class="[$style.filter,'text-center']">
            <div :class="[$style.item,{[$style.active]: nav.active}]" v-for="nav in mates.nav" @click="switchNav(nav)">
                <span>{{nav.name}}</span><i v-if="nav.more" :class="['inline-block',$style.iconMore]"></i>
            </div>
        </div>
        <div :class="$style.condition" v-show="showMore">
            <ul>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">姓名</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">籍贯</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect,$style.special,{[$style.empty]:!condition.bprovince}]" @click="showPicker('place')">
                        <span  v-if="condition.bprovince && condition.bcity">{{condition.bprovince + '-' + condition.bcity}}</span>
                        <span class="color-theme" v-else>点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">工作单位</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">公司行业</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect,{[$style.empty]:!condition.industry}]" @click="showPicker('industry')">
                        <span v-if="condition.industry">{{condition.industry}}</span>
                        <span class="color-theme" v-else>点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">细分行业</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect,{[$style.empty]:!condition.job}]" @click="showPicker('industry_detail')">
                        <span v-if="condition.job">{{condition.job}}</span>
                        <span class="color-theme" v-else>点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">所在部门</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">具体职位</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">入学时间</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect,{[$style.empty]:!condition.enrol_time}]" @click="showPicker('roleStart')">
                        <span v-if="condition.enrol_time">{{condition.enrol_time}}</span>
                        <span class="color-theme" v-else>点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">毕业时间</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect,{[$style.empty]:!condition.graduate_time}]" @click="showPicker('graduate')">
                        <span v-if="condition.graduate_time">{{condition.graduate_time}}</span>
                        <span class="color-theme" v-else>点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">大学专业</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect,{[$style.empty]:!condition.major}]" @click="showPicker('major')">
                        <span v-if="condition.major">{{condition.major}}</span>
                        <span v-else class="color-theme">点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">班级代码</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">岗位描述</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text" placeholder="关键字用空格隔开，越准确越好">
                    </div>
                </li>
            </ul>
            <div :class="[$style.submit,'text-center']" @click="searchMore">搜索</div>
        </div>
        <mt-popup
                v-model="showMajorPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="majorSlots" :showToolbar="true" :rotateEffect="true" @change="selectMajor">
                <span></span><span @click="setDefaultMajor">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
                v-model="showPlacePicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="placeSlots" :showToolbar="true" :rotateEffect="true" @change="selectPlace">
                <span></span><span @click="setDefaultPlace">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-datetime-picker
            ref="startDatePicker"
            type="date"
            cancelText="关闭"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            :startDate="minDate"
            :endDate="maxLimitDate"
            v-model="roleStartDate"
        >
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="endDatePicker"
            type="date"
            cancelText="关闭"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            :startDate="minLimitDate"
            :endDate="maxDate"
            v-model="roleEndDate"
        >
        </mt-datetime-picker>
        <mt-popup
                v-model="showIndustryPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="industrySlots" :showToolbar="true" :rotateEffect="true" @change="selectIndustry">
                <span></span><span @click="selectDefaultIndustry">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
                v-model="showIndustryDetailPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="industryDetailSlots" :showToolbar="true" :rotateEffect="true" @change="selectIndustryDetail">
                <span></span><span @click="selectDefaultIndustryDetail">确定</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    import { placeObj,departmentArr,majorArr,industryObj } from '../../data';
    import { mapState } from 'vuex';
    import util from  '../../util'
    export default {
       data(){
          return {
              showMore: false,
              showMajorPicker: false,
              showPlacePicker: false,
              showIndustryPicker: false,
              showIndustryDetailPicker: false,
              minDate:new Date('1950/09/01'),
              maxDate:new Date('2050/07/01'),
              minLimitDate: new Date('2050/07/01'),
              maxLimitDate: new Date('1950/09/01'),
              roleStartDate:'',
              roleEndDate:'',
	          majorSlots:[{
		          flex: 1,
		          values: majorArr
	          }],
              placeSlots: [
                  {
                      flex: 1,
                      values: Object.keys(placeObj),
                      textAlign: 'center'
                  },
                  {
                      divider: true,
                      content: '-'
                  },
                  {
                      flex: 1,
                      values: placeObj[Object.keys(placeObj)[0]],
                      textAlign: 'center'
                  }
              ],
              industrySlots: [
                  {
                      flex: 1,
                      values: Object.keys(industryObj),
                      textAlign: 'center'
                  }
              ],
              industryDetailSlots: [
                  {
                      flex: 1,
                      values: Object.keys(industryObj),
                      textAlign: 'center'
                  }
              ]
          }
       },
      computed:{
        ...mapState({
          condition: state => state.interact.mates.condition,
            mates: state => state.interact.mates,
            profile: state => state.user.profile
        })
      },
      watch:{
          roleStartDate(newValue,oldValue){
              if(!newValue || !oldValue || newValue == oldValue) return;
              this.minLimitDate = newValue;
              this.$store.dispatch('interact/CHANGE_MATES_CONDITION',{enrol_time:util.dateFormat(newValue,'yyyy/MM/dd')})
          },
          roleEndDate(newValue,oldValue){
              if(!newValue || !oldValue || newValue == oldValue) return;
              if(newValue == this.maxDate) return;
              this.maxLimitDate = newValue;
              this.$store.dispatch('interact/CHANGE_MATES_CONDITION',{graduate_time:util.dateFormat(newValue,'yyyy/MM/dd')})
          }
      },
      methods:{
       	showPicker(pickerName){
       	    switch (pickerName) {
                case 'major':
	                this.showMajorPicker = true;
	                break;
                case 'place':
                    this.showPlacePicker = true;
                    break;
                case 'roleStart':
                    this.$refs['startDatePicker'].open();
                    break;
                case 'graduate':
                    this.$refs['endDatePicker'].open();
                    break;
                case 'industry':
                    this.showIndustryPicker = true;
                    break;
                case 'industry_detail':
                    this.showIndustryDetailPicker = true;
                    break;
            }
        },
          hidePicker(){
              this.showMajorPicker = false;
              this.showIndustryPicker = false;
              this.showIndustryDetailPicker = false;
              this.showPlacePicker =  false;
              this.showDepartmentPicker =  false;
          },
        selectPlace(picker,values){
          let bprovince,bcity;
          if(values){
              if(!values[0]){
                  values[0] = Object.keys(placeObj)[0];
              }
              bprovince = values[0];
              bcity = values[1];
              picker.setSlotValues(1, placeObj[values[0]]);
              this.$store.dispatch('interact/CHANGE_MATES_CONDITION',{
                  bprovince,
                  bcity
              });
          }else{
              this.showPlacePicker = false;
              if(!this.condition.bprovince){
                  bprovince = this.placeSlots[0].values[0];
                  bcity = this.placeSlots[2].values[0];
                  this.$store.dispatch('entrance/CHANGE_USERINFO',{
                      bprovince,
                      bcity
                  });
              }
          }
        },
        selectMajor(picker, values) {
       		this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {major:values[0]})
        },
        setDefaultMajor(){
            this.showMajorPicker = false;
            if(!this.condition.major){
               this.$store.dispatch('interact/CHANGE_MATES_CONDITION',{major:this.majorSlots[0].values[0]})
            }
	    },
         setDefaultPlace(){
             let bprovince,bcity;
             this.showPlacePicker = false;
             if(!this.condition.bprovince){
                 bprovince = this.placeSlots[0].values[0];
                 bcity = this.placeSlots[2].values[0];
                 this.$store.dispatch('interact/CHANGE_MATES_CONDITION',{
                     bprovince,
                     bcity
                 });
             }
         },
          selectIndustryDetail(picker, values){
              this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {
                  job: values[0]
              });
          },
          selectDefaultIndustryDetail(){
              this.hidePicker();
              if(!this.condition.job){
                  this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {
                      job: this.industryDetailSlots[0].values[0]
                  });
              }
          },
          selectIndustry(picker, values){
              this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {
                  industry: values[0]
              });
              this.industryDetailSlots[0].values = industryObj[values[0]]
          },
          selectDefaultIndustry(){
              this.hidePicker();
              if(!this.condition.industry){
                  this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {
                      industry: this.industrySlots[0].values[0]
                  });
              }
          },
        switchNav(nav){
          this.$store.dispatch('interact/SWITCH_MATES_NAV',nav);
          if(nav.more){
            if(this.showMore)nav.active = false;
            this.showMore = !this.showMore;
          }else{
            this.showMore = false;
            this.$store.dispatch('interact/RESET_MATES_CONDITION');
              switch (nav.name){
                  case '同城':
                      this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {
                          city: this.profile.city
                      });
                      break;
                  case '同行':
                      this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {
                          industry: this.profile.industry
                      });
                      break;
                  case '同学':
                      this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {
                          'class': this.profile.class
                      });
                      break;
              }
            this.$parent.loadMore();
          }
        },
        searchMore(){
          this.showMore = false;
//          this.$store.dispatch('interact/RESET_MATES_CONDITION');
          this.$parent.loadMore();
        }
      },
        mounted(){
          this.$nextTick(()=>{
              this.$store.dispatch('interact/RESET_MATES_CONDITION');
          })
        }
    }
</script>