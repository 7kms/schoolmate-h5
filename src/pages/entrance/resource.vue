<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        margin-top: -1px;
        background-color: #fff;
    }
</style>
<template>
    <div>
        <div class="entrance-content" v-if="channel != 'teacher'">
            <div class="item">
                <div class="dfn"><span class="label inline-block">工作单位</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写公司名称" v-model="userInfo.company">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">所属行业</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('industry')">
                    <span class="select" v-if="userInfo.industry">{{userInfo.industry}}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">细分行业</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('industry_detail')">
                    <span class="select" v-if="userInfo.job">{{userInfo.job}}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">所在部门</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写所在部门名称" v-model="userInfo.department">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">担任职务</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写职位名称" v-model="userInfo.detail_job">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">所在省市</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('place')">
                    <span class="select" v-if="userInfo.province && userInfo.city">{{userInfo.province + '-' + userInfo.city}}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item itemArea">
                <div class="dfn"><span class="label inline-block">岗位描述</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <textarea  class="textArea" placeholder="填写具体工作岗位描述" v-model="userInfo.resource_description"></textarea>
                </div>
            </div>
        </div>
        <div class="entrance-content" v-else>
            <div class="item">
                <div class="dfn"><span class="label inline-block">工作单位</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写单位名称" v-model="userInfo.company">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">所在部门</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic" @click="showPicker('department')">
                    <span class="select" v-if="userInfo.department">{{userInfo.department}}</span>
                    <span class="select color-weak" v-else>请选择</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">担任职务</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="填写职位名称" v-model="userInfo.detail_job">
                </div>
            </div>
            <div class="item itemArea">
                <div class="dfn"><span class="label inline-block">岗位描述</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <textarea  class="textArea" placeholder="填写具体工作岗位描述" v-model="userInfo.resource_description"></textarea>
                </div>
            </div>
        </div>
        <div class="entrance-next-step text-center" @click="stepNext">
            <span>下一步</span>
        </div>
        <mt-popup
                v-model="showIndustryPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="placeSlots" :showToolbar="true" :rotateEffect="true" @change="selectIndustry">
                <span></span><span @click="hidePicker">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
                v-model="showIndustryDetailPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="industryDetailSlots" :showToolbar="true" :rotateEffect="true" @change="selectIndustryDetail">
                <span></span><span @click="hidePicker">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
                v-model="showPlacePicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="placeSlots" :showToolbar="true" :rotateEffect="true" @change="selectPlace">
                <span></span><span @click="hidePicker">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
                v-model="showDepartmentPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="departmentSlots" :showToolbar="true" :rotateEffect="true" @change="selectDepartment">
                <span></span><span @click="hidePicker">确定</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
  import { placeObj,departmentArr,majorArr,industryArr } from '../../data';
  import { mapState } from  'vuex'
  export default {
    data(){
      return {
          waiting: false,
          count: 6,
          showIndustryPicker: false,
          showIndustryDetailPicker: false,
          showPlacePicker: false,
          showDepartmentPicker: false,
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
                  values: industryArr,
                  textAlign: 'center'
              }
          ],
          industryDetailSlots: [
              {
                  flex: 1,
                  values: industryArr,
                  textAlign: 'center'
              }
          ],
          departmentSlots: [
              {
                  flex: 1,
                  values: departmentArr,
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
    methods: {
        showPicker(pickerName){
            switch (pickerName) {
                case 'place':
                    this.showMajorPicker = true;
                    break;
            }
        },
        selectPlace(picker, values){
            this.$store.dispatch('entrance/CHANGE_USERINFO', {
                province: values[0],
                city: values[1]
            });
            picker.setSlotValues(1, placeObj[values[0]]);
        },
        selectDepartment(picker, values){
            this.$store.dispatch('entrance/CHANGE_USERINFO', {
                department: values[0]
            });
        },
        selectIndustryDetail(picker, values){
            this.$store.dispatch('entrance/CHANGE_USERINFO', {
                industry_detail: values[0]
            });
        },
        selectIndustry(picker, values){
            this.$store.dispatch('entrance/CHANGE_USERINFO', {
                industry: values[0]
            });
        }
      },
      valid(){
         if(this.channel == 'teacher'){
             if(!this.userInfo.company){
                 this.$toast('工作单位不能为空');
                 return false;
             }
             if(!this.userInfo.department){
                 this.$toast('所在部门不能为空');
                 return false;
             }
             if(!this.userInfo.detail_job){
                 this.$toast('担任职务不能为空');
                 return false;
             }
             if(!this.userInfo.resource_description){
                 this.$toast('岗位描述不能为空');
                 return false;
             }
         }
          if(!this.userInfo.industry){
              this.$toast('所属行业不能为空');
              return false;
          }
          if(!this.userInfo.industry_detail){
              this.$toast('细分行业不能为空');
              return false;
          }
          if(!this.userInfo.province || !this.userInfo.city){
              this.$toast('所在省市不能为空');
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
</script>