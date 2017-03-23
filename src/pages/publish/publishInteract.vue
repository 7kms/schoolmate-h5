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
        color: #fff;
    }
    .imgItem{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24.6%;
        height: 95px;
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
                <template v-if="index == uploadImageArr.length-1 && !url">
                    <div :class="[$style.imgAdd,'text-center']" v-show="!uploading">
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
                    <Loading text="上传中..." :class="$style.loading" v-show="uploading"></Loading>
                </template>

            </ImgContain>
        </div>
        <div class="pub-info-content">
            <div class="pub-item">
                <h3 class="pub-title">需求类型</h3>
                <div class="pub-text">
                    <div class="pub-select" @click.prevent="showPicker('needs')">
                        <span>{{ needsText || '选择您的需求类型' }}</span>
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
                <h3 class="pub-title">需求描述</h3>
                <div class="pub-text">
                    <textarea class="pub-area" placeholder="填写需求的具体注意事项、详细信息等" v-model="info.description"></textarea>
                </div>
            </div>
        </div>
        <div class="pubBar" @click="publish"><span v-if="edit">修改</span><span v-else>发布</span></div>

        <singlePicker v-if="!loading"
           :dataArr="needsArr"
           valueKey="name"
           :initValue="info.type"
           :showPicker="showNeeds"
           @selectEnd="changeNeeds"
           @hide="hidePicker"
           @show="showPicker('needs')"
        ></singlePicker>

        <mt-popup
            v-model="showRange"
            position="bottom"
            popup-transition="popup-fade">
            <div class="pop-toolbar">
                <span class="toolbar-cancel"></span>
                <span class="toolbar-ok" @click="hidePicker('range')">确定</span>
            </div>
            <mt-checklist
                    v-model="info.circle"
                    :options="rangeOptions">
            </mt-checklist>
        </mt-popup>
    </div>
</template>
<script>
  import { singlePicker } from '../../components/popPicker';
  import FileUpload from 'vue-upload-component'
  import {serverUrl} from '../../config'
  import util from  '../../util';
  import $api from 'api';
  export default {
    components:{
      FileUpload,
        singlePicker
    },
    data(){
      return {
          uploadCount:0,
          uploading: false,
        loading: false,
        needsArr:[{name:'拥有资源',value:2},{name:'寻求合作',value:1}],
        showNeeds: false,
        showRange: false,
        rangeOptions: [],
        edit: false,
        info:{
          description:'',
          type: '2',
          pictures: [],
          circle: []
        }
      }
    },
    computed:{
      action(){
        return serverUrl + '/Response/multiPicUpload';
      },
      needsText(){
          var text = '';
          this.needsArr.forEach(obj=>{
              if(obj.value == this.info.type){
                  text = obj.name;
              }
          });
          return text;
      },
      uploadImageArr(){
        let arr = [...this.info.pictures];
        arr.length = 4;
        return arr;
      },
      selectCircle(){
        let arr = [];
        this.info.circle.forEach(cid=>{
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
              _this.uploadCount ++;
              _this.uploading = true;
            file.data.count = 1;
            component.active = true;
          },
          progress(file, component) {
            console.log('progress ' + file.progress);
          },
          after(file, component) {
            let res = util.parseJSON(file.response);
            let url = res[0];
              _this.uploadCount --;
              if(url){
                  _this.info.pictures.push(url);
              }else{
                 _this.$toast(res.msg);
              }
              if(!_this.uploadCount){
                  _this.uploading = false;
              }
          },
          before(file, component) {
            console.log('before');
          }
        }
      }
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
        let index = this.info.pictures.indexOf(img);
        if(~index){
            this.info.pictures.splice(index,1);
        }
      },
      hidePicker(){
         this.showNeeds = false;
         this.showRange = false;
      },
      changeNeeds(obj){
          this.info.type = String(obj.value);
          this.hidePicker();
      },
      valid(){
        if(!this.info.type){
          this.$toast('选择您的需求类型');
          return false;
        }
        if(!this.info.description){
          this.$toast('请填写详细信息');
          return false;
        }
        return true;
      },
      publish(){
        if(!this.valid()) return false;
        $api.post('/Help/createRes',this.info)
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
      $api.get('/Circle/getMyCircle')
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
        });
        let {rid} =  this.$route.query;
        if(rid){
            this.edit = true;
            $api.get('/Help/getResList',{rid,start:0,pageSize:1})
            .then(res=>{
                console.log(res);
                let data = res.result[0];
                let keyArr = Object.keys(this.info);
                let cids = [];
                data.scope.forEach(circle=>{
                    cids.push(circle.cid);
                });
                data.circle = cids;
                keyArr.forEach(key=>{
                    this.info[key] = data[key];
                });
            },err=>{
                this.$toast({message: err});
            });
        }
    }
  }
</script>