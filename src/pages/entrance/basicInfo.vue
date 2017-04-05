<style lang="less" module>
    @import '../../assets/less/const.less';
    .next-step{
        height: 30px;
        margin: 42px 24px 0;
        line-height: 30px;
        color: #fff;
        background-color: @theme-color;
    }
</style>
<template>
    <div>
        <div class="entrance-content">
            <div class="item">
                <div class="dfn"><span class="label inline-block">姓 名</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" :value="userInfo.name" @input="changeName" maxlength="15" placeholder="请填写">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">性 别</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('gender')">
                    <span class="select" v-if="userInfo.gender">{{ userInfo.gender }}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">出生日期</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('birth')">
                    <span class="select" v-if="userInfo.birthday">{{ userInfo.birthday }}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">籍 贯</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('place')">
                    <span class="select" v-if="userInfo.bprovince && userInfo.bcity">{{userInfo.bprovince + '-' + userInfo.bcity}}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item" v-if="channel=='teacher'">
                <div class="dfn"><span class="label inline-block">本校毕业</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('school')">
                    <span class="select" v-if="userInfo.graduate_fromother">{{ userInfo.graduate_fromother == 1 ? '否' : '是' }}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item type color-topic">
                <div @click="changeChannel('graduate')">
                    <i :class="['inline-block','iconType',{'checked':channel=='graduate'}]"></i>
                    <span class="inline-block">毕业校友</span>
                </div>
                <div @click="changeChannel('student')">
                    <i :class="['inline-block','iconType',{'checked':channel=='student'}]"></i>
                    <span class="inline-block">在校学生</span>
                </div>
                <div @click="changeChannel('teacher')">
                    <i :class="['inline-block','iconType',{'checked':channel=='teacher'}]"></i>
                    <span class="inline-block">老师</span>
                </div>
            </div>
        </div>
        <div class="entrance-next-step text-center" @click="stepNext">
            <span>下一步</span>
        </div>
        <mt-datetime-picker
            ref="birthDatePicker"
            type="date"
            :startDate="birthDateStart"
            :endDate="birthDateEnd"
            cancelText="关闭"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="birthDate"
            >
        </mt-datetime-picker>
        <mt-popup
                v-model="showGenderPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="genderSlots" valueKey="name" :showToolbar="true" :rotateEffect="true" @change="selectGender">
                <span></span><span @click="selectGender">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
                v-model="showSchoolPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="schoolSlots" valueKey="name" :showToolbar="true" :rotateEffect="true" @change="selectSchool">
                <span></span><span @click="selectSchool">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
                v-model="showPlacePicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="placeSlots" :showToolbar="true" :rotateEffect="true" @change="selectPlace">
                <span></span><span @click="selectPlace">确定</span>
            </mt-picker>
        </mt-popup>
    </div>

</template>
<script>
    import { placeObj } from '../../data';
    import  { mapState } from  'vuex';
    import util from  '../../util'
    export default {
      data(){
         return {
            birthDate: new Date('1988/01/01'),
            birthDateStart: new Date(Date.now() - 86400000 * 365 * 80),
            birthDateEnd: new Date(),
            showGenderPicker: false,
           showSchoolPicker: false,
            showPlacePicker: false,
            gender:{},
            place:{},
            genderSlots:[{
                flex: 1,
                values: [{code: 1, name: '男'},{code: 2, name: '女'}]
            }],
           schoolSlots:[{
             flex: 1,
             values: [{code: '0', name: '是'},{code: '1', name: '否'}]
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
             ]
         }
      },
      computed:{
        ...mapState({
          channel:(state) => state.entrance.channel,
          userInfo:(state) => state.entrance.userInfo
        })
      },
      watch:{
        birthDate(newValue,oldValue){
          if(!oldValue) return;
          this.$store.dispatch('entrance/CHANGE_USERINFO',{birthday:util.dateFormat(newValue,'yyyy/MM/dd')})
        }
      },
      methods:{
        showPicker(pickerName){
          switch (pickerName){
              case 'gender':
                  this.showGenderPicker = true;
                  break;
              case 'school':
                  this.showSchoolPicker = true;
                  break;
              case 'birth':
                  this.$refs['birthDatePicker'].open();
                  break;
              case 'place':
                  this.showPlacePicker = true;
                  break;
          }
        },
        selectGender(picker,values){
          let gender = '';
          if(values){
            gender = values[0].name;
            this.$store.dispatch('entrance/CHANGE_USERINFO',{gender});
          }else{
            this.showGenderPicker = false;
            if(!this.userInfo.gender){
              gender = this.genderSlots[0].values[0].name;
              this.$store.dispatch('entrance/CHANGE_USERINFO',{gender});
            }
          }
        },
        selectSchool(picker,values){
          let graduate_fromother = '';
          if(values){
            graduate_fromother = values[0].code;
            this.$store.dispatch('entrance/CHANGE_USERINFO',{graduate_fromother});
          }else{
            this.showSchoolPicker = false;
            if(!this.userInfo.graduate_fromother){
              graduate_fromother = this.schoolSlots[0].values[0].code;
              this.$store.dispatch('entrance/CHANGE_USERINFO',{graduate_fromother});
            }
          }
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
            this.$store.dispatch('entrance/CHANGE_USERINFO',{
              bprovince,
              bcity
            });
          }else{
            this.showPlacePicker = false;
            if(!this.userInfo.bprovince){
              bprovince = this.placeSlots[0].values[0];
              bcity = this.placeSlots[2].values[0];
              this.$store.dispatch('entrance/CHANGE_USERINFO',{
                bprovince,
                bcity
              });
            }
          }
        },
        changeChannel(channel){
          let role;
          switch (channel){
            case 'graduate':
                role='毕业校友';
                break;
            case 'student':
                role='在校学生';
                break;
            case 'teacher':
                role='学校老师';
                break;
          }
          this.$store.dispatch('entrance/CHANGE_CHANNEL',channel);
          this.$store.dispatch('entrance/CHANGE_USERINFO',{role});
          if(channel == 'teacher'){
            this.$store.dispatch('entrance/CHANGE_USERINFO',{company:'河北地质大学'});
          }else{
            this.$store.dispatch('entrance/CHANGE_USERINFO',{company:''});
          }
        },
        changeName(event){
          this.$store.dispatch('entrance/CHANGE_USERINFO',{name:event.target.value})
        },
        changeBirthday(date){

          this.$store.dispatch('entrance/CHANGE_USERINFO',{birthday:dateFormat(date,'yyyy/MM/dd')})
        },
        valid(){
            if(!this.userInfo.name){
              this.$toast('姓名不能为空');
              return false;
            }
            if(!this.userInfo.gender){
              this.$toast('姓别不能为空');
              return false;
            }
           if(!this.userInfo.birthday){
             this.$toast('出生日期不能为空');
             return false;
           }
           if(!this.userInfo.bprovince || !this.userInfo.bcity){
             this.$toast('籍贯不能为空');
             return false;
           }
           return true;
        },
        stepNext(){
          if(this.valid()){
            this.$store.dispatch('entrance/STEP_NEXT');
          }
        }
      }
    }
</script>