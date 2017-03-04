<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        height: 100%;
        background-color: #fff;
    }
    .picWrap{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .imgItem{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 90px;
        background-color: @theme-color-weak;
    &.margin{
         margin-top: 1px;
     }
    .deleteImg{
        position: absolute;
        top: 5px;
        right: 5px;
        width: 20px;
        height: 20px;
        background-size: contain;
        background-image: url("../../assets/images/icon-delete.png");
    }
    }
    .imgAdd{
        font-size: @font-size-header;
        color:#fff;
        position: relative;
    .btnAdd{
        display: block;
        width: 43px;
        height: 43px;
        margin: 0 auto 12px;
        background-size: contain;
        background-image: url("../../assets/images/bg-add.png");
    }
    }

</style>
<template>
    <div :class="$style.content">
        <div :class="$style.picWrap">
            <ImgContain :class="[$style.imgItem]" v-for="(url,index) in uploadImageArr" :imgUrl="url">
                <i :class="$style.deleteImg" @click="deleteImage(url)" v-if="url"></i>
                <div :class="[$style.imgAdd,'text-center']" v-if="index == uploadImageArr.length-1 && !url">
                    <file-upload class="file-upload"
                         :drop="false"
                         :post-action="action"
                         :multiple="true"
                         accept="image/*"
                         :events="events"
                         name="file0"
                    ></file-upload>
                    <i :class="$style.btnAdd"></i>
                    <span>点击上传</span>
                </div>
            </ImgContain>
        </div>
        <div class="pub-info-content">
            <div class="pub-item">
                <h3 class="pub-title">需求类型</h3>
                <div class="pub-text">
                    <div class="pub-select" @click="showPicker('needs')">
                        <span>{{ selectNeed.name || '选择您的需求类型' }}</span>
                    </div>
                </div>
            </div>
            <div class="pub-item">
                <h3 class="pub-title">可见范围</h3>
                <div class="pub-text">
                    <div class="pub-select" @click="showPicker('range')">
                        <span>{{ rangeStr || '所有人可见' }}</span>
                    </div>
                </div>
            </div>
            <div class="pub-item">
                <h3 class="pub-title">活动描述</h3>
                <div class="pub-text">
                    <textarea class="pub-area" placeholder="填写活动的具体注意事项、详细信息等" v-model="description"></textarea>
                </div>
            </div>
        </div>
        <div class="pubBar" @click="publish">发布</div>
        <mt-popup
            v-model="showNeeds"
            position="bottom"
            popup-transition="popup-fade">
            <mt-picker :slots="needsArr" valueKey="name" :showToolbar="true" :rotateEffect="true" @change="changeNeeds" ref="needPicker">
                <span></span><span @click="hidePicker('needs')">确定</span>
            </mt-picker>
        </mt-popup>
        <mt-popup
            v-model="showRange"
            position="bottom"
            popup-transition="popup-fade">
            <div class="pop-toolbar">
                <span class="toolbar-cancel"></span>
                <span class="toolbar-ok" @click="hidePicker('range')">确定</span>
            </div>
            <mt-checklist
                    v-model="selectRange"
                    :options="rangeOptions">
            </mt-checklist>
        </mt-popup>
    </div>
</template>
<script>
  import FileUpload from 'vue-upload-component'
  import {serverUrl} from '../../config'
  import util from  '../../util';
  import $api from 'api';
  export default {
    components:{
      FileUpload
    },
    data(){
      return {
        imgArr:[],
        selectNeed:{},
        selectRange:[],
        needsArr:[
          {
            flex:1,
            values:[{name:'拥有资源',value:2},{name:'寻求合作',value:1}]
          }
          ],
        showNeeds: false,
        showRange: false,
        rangeOptions: [],
        description:'',
        info:{
          description:''
        }
      }
    },
    computed:{
      action(){
        return serverUrl + '/index.php/Picture/multiPicUpload';
      },
      uploadImageArr(){
        let arr = [...this.imgArr];
        arr.length = 4;
        return arr;
      },
      selectCircle(){
        let arr = [];
        this.selectRange.forEach(cid=>{
          this.rangeOptions.forEach(obj=>{
            if(obj.value == cid){
              arr.push({
                cid,
                name:obj.label
              })
            }
          });
        });
        return arr;
      },
      rangeStr(){
        let arr = [],str;
        this.selectCircle.forEach(circle => {
          arr.push(circle.name);
        });
        str = arr.join(',');
        return str;
      },
      events(){
        let _this = this;
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
            let res = util.parseJSON(file.response);
            let url = res.data[0];
            _this.imgArr.push(url);
          },
          before(file, component) {
            console.log('before');
          }
        }
      },

    },
    methods:{
      showPicker(type){
        if(type == 'needs'){
          this.showNeeds = true;
        }else{
          this.showRange = true;
        }
      },
      deleteImage(img){
        let index = this.imgArr.indexOf(img);
        if(~index){
          this.imgArr.splice(index,1);
        }
      },
      hidePicker(type){
        if(type == 'needs'){
          let obj = this.$refs['needPicker'].getSlotValue(0);
          if(obj.value != this.selectNeed.vaule)this.selectNeed = obj;
          this.showNeeds = false;
        }else{
          this.showRange = false;
        }
      },
      changeNeeds(picker,values){
        this.selectNeed = values[0];
      },
      getPubInfo(){
        let pubInfo = {
            description: this.description,
            type: this.selectNeed.value,
            pictures: this.imgArr,
            circle: this.selectRange
        };
        return pubInfo
      },
      valid(){
        if(!this.selectNeed.name){
          this.$toast('选择您的需求类型');
          return false;
        }
        if(!this.description){
          this.$toast('请填写详细信息');
          return false;
        }
        return true;
      },
      publish(){
        if(!this.valid()) return false;
        let paramObj = this.getPubInfo();
        $api.post('/index.php/Help/createRes',paramObj)
          .then(res=>{
            if(res.code == 200){
              this.$toast(res.msg);
              this.$router.back();
            }
          },res=>{
            this.$toast('服务器异常')
          })
      }
    },
    created(){
      $api.get('/index.php/Circle/getMyCircle')
        .then(res=>{
          res.forEach(circle => {
            var obj = {
              label: circle.c_name,
              value: circle.cid,
            };
            this.rangeOptions.push(obj);
          });
        },res=>{

          console.log(res);
        })
    }
  }
</script>