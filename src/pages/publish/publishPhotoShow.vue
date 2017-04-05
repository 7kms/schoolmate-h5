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
    .loading{
        color: #fff;
    }
</style>
<template>
    <div class="content">
        <div :class="$style.picWrap">
            <ImgContain :class="[$style.imgItem,{[$style.margin]:index>2}]" v-for="(url,index) in imgArr" :imgUrl="url">
                <i :class="$style.deleteImg" @click="deleteImage(index)" v-if="url"></i>
                <template v-if="index == imgArr.length-1 && !url">
                    <div :class="[$style.imgAdd,'text-center']" v-show="!picUploading" @click="picUpload">
                        <i :class="$style.btnAdd"></i>
                        <span>点击上传</span>
                    </div>
                    <Loading text="上传中..." :class="$style.loading" v-show="picUploading"></Loading>
                </template>
            </ImgContain>
        </div>
        <div class="pub-info-content">
            <div class="pub-item">
                <h3 class="pub-title">照片主题</h3>
                <div class="pub-text">
                    <input type="text" class="pub-input" placeholder="填写28字以内照片主题" maxlength="28" v-model="info.theme">
                </div>
            </div>
           <!-- <div class="pub-item">
                <h3 class="pub-title">可见范围</h3>
                <div class="pub-text">
                    <div class="pub-select" @click="showPicker('range')">
                        <span>{{ rangeStr || '所有人可见' }}</span>
                    </div>
                </div>
            </div>-->
            <div class="pub-item">
                <h3 class="pub-title">照片描述</h3>
                <div class="pub-text">
                    <textarea class="pub-area" placeholder="填写照片详细信息等" v-model="info.description"></textarea>
                </div>
            </div>
        </div>
        <div class="pubBar" @click="publish"><span v-if="edit">重新发布</span><span v-else>发布</span></div>
       <!--
           <singlePicker
                    v-if="!loadingCircle && !loadingInfo"
                    :dataArr="rangeOptions"
                    valueKey="name"
                    :initValue="info.cid"
                    :showPicker="showRange"
                    @selectEnd="selectRange"
                    @hide="hidePicker"
            ></singlePicker>
        -->
    </div>
</template>
<script>
  import FileUpload from 'vue-upload-component'
  import { singlePicker } from '../../components/popPicker';
  import util from  '../../util';
  import $api from 'api';
  import {register} from '../../util/wechat-api';
    export default {
      components:{
        FileUpload,
        singlePicker
      },
      data(){
        return {
          uploadCount:0,
          picUploading: false,
          showRange:false,
          loadingInfo: true,
          loadingCircle: true,
          rangeOptions: [{name:'所有人可见',value:'0'}],
          edit:false,
          info:{
            theme:'',
            description: '',
            pictures:[]
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
        imgArr(){
          let arr = [...this.info.pictures];
          arr.length = 9;
          return arr;
        }
      },
      methods:{
          picUpload(){
              let count = 9 - this.info.pictures.length ;
              count = count > 9 ? 9 : count;
              util.wxUpload({count,onSelectEnd:()=>this.picUploading = true})
              .then(wxIds=>{
                  util.getPathByIds(wxIds)
                          .then(res=>{
                      this.picUploading = false;
                      if(res.path[0]){
                          this.info.pictures = [...this.info.pictures,...res.path];
                      }else{
                          this.$toast('上传图片失败');
                      }
                  },err=>{
                    this.picUploading = false;
                      console.log(err);
                  })
              });
          },
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
                this.$toast('照片描述未填写');
                return false;
              }
              if(!this.info.pictures.length){
                this.$toast('至少上传一张照片');
                return false;
              }
              return true;
            },
        publish(){
            if(this.valid()){
                $api.post('/Picture/upPicture',this.info)
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
        register();
        this.loadingInfo = false;
        this.info.aid = this.$route.params.id;
      }
    }
</script>