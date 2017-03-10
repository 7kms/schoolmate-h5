<style lang="less" module>
    @import '../../assets/less/const.less';
    .picWrap{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        background-color: #fff;
    }
    .imgItem{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 33%;
        height: 122px;
        background-color: @theme-color-weak;
        &.margin{
            margin-top: 1px;
        }
         .deleteImg{
             position: absolute;
             top: 10px;
             right: 10px;
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
            width: 60px;
            height: 60px;
            margin: 0 auto 12px;
            background-size: contain;
            background-image: url("../../assets/images/bg-add.png");
        }
    }

</style>
<template>
    <div class="content">
        <div :class="$style.picWrap">
            <ImgContain :class="[$style.imgItem,{[$style.margin]:index>2}]" v-for="(url,index) in imgArr" :imgUrl="url">
                <i :class="$style.deleteImg" @click="deleteImage(index)" v-if="url"></i>
                <template v-if="index == imgArr.length-1 && !url">
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
                <h3 class="pub-title">照片主题</h3>
                <div class="pub-text">
                    <input type="text" class="pub-input" placeholder="填写28字以内活动主题" maxlength="28" v-model="info.theme">
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
                    <textarea class="pub-area" placeholder="填写活动的具体注意事项、详细信息等" v-model="info.description"></textarea>
                </div>
            </div>
        </div>
        <div class="pubBar" @click="publish"><span v-if="edit">重新发布</span><span v-else>发布</span></div>
        <singlePicker
                v-if="!loadingCircle && !loadingInfo"
                      :dataArr="rangeOptions"
                      valueKey="name"
                      :initValue="info.cid"
                      :showPicker="showRange"
                      @selectEnd="selectRange"
                      @hide="hidePicker"
        ></singlePicker>
    </div>
</template>
<script>
  import FileUpload from 'vue-upload-component'
  import { singlePicker } from '../../components/popPicker';
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
          showRange:false,
            loadingInfo: true,
            loadingCircle: true,
            rangeOptions: [{name:'所有人可见',value:'0'}],
            edit:false,
          info:{
            theme:'',
            description: '',
            pictures:[],
            cid:'0'
          }
        }
      },
      computed:{
        rangeStr(){
          let str ;
          this.rangeOptions.forEach(obj=>{
            if(obj.value == this.info.cid){
                str = obj.name;
            }
          });
          return str;
        },
        action(){
          return serverUrl + '/index.php/Picture/multiPicUpload';
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
                if(url){
                    _this.info.pictures.push(url);
                }else{
                    _this.$toast(res.msg);
                }
              _this.uploadCount --;
              if(!_this.uploadCount){
                _this.uploading = false;
              }
            },
            before(file, component) {
              console.log('before');
            }
          }
        },
        imgArr(){
          let arr = [...this.info.pictures];
          arr.length = 9;
          return arr;
        }
      },
      methods:{
          hidePicker(){
              this.showRange = false;
          },
          showPicker(){
              this.showRange = true;
          },
          selectRange(obj){
              this.info.cid = obj.value;
              this.hidePicker();
          },
          deleteImage(index){
              this.info.pictures.splice(index,1);
          },
            valid(){
              if(!this.info.theme){
                this.$toast('照片主题未填写');
                return false;
              }
              if(!this.info.description){
                this.$toast('活动描述未填写');
                return false;
              }
              return true;
            },
        publish(){
            if(this.valid()){
                $api.post('/index.php/Picture/upPicture',this.info)
                        .then(res=>{
                    this.$toast(res.msg);
                if(res.result){
                    this.$router.back();
                }
                },err=>{
                    this.$toast('服务器异常');
                })
            }
        }
      },
      created(){
            $api.get('/index.php/Circle/getMyCircle')
                .then(res => {
                    res.forEach(circle => {
                        var obj = {
                            name: circle.c_name,
                            value: circle.cid,
                        };
                        this.rangeOptions.push(obj);
                    });
                    this.loadingCircle = false;
                },res=>{
                    console.log(res);
                });
          let {pid} =  this.$route.query;
          if(pid){
              this.edit = true;
              $api.get('/index.php/Picture/getDetail',{ pid })
              .then(data => {
                    let keyArr = Object.keys(this.info);
                    keyArr.forEach(key =>{
                      this.info[key] = data[key];
                    });
                    if(!this.info.pictures)this.info.pictures = [];
                    this.info.pid = data.pid;
                    this.loadingInfo = false;
               },err=>{
                  this.$toast({message: err});
               })
          }else {
            this.loadingInfo = false;
          }
      }
    }
</script>