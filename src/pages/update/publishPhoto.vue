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
                <div :class="[$style.imgAdd,'text-center']" v-if="index == imgArr.length-1 && !url">
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
                <h3 class="pub-title">照片主题</h3>
                <div class="pub-text">
                    <input type="text" class="pub-input" placeholder="填写28字以内活动主题" maxlength="28" v-model="info.theme">
                </div>
            </div>
            <div class="pub-item">
                <h3 class="pub-title">活动描述</h3>
                <div class="pub-text">
                    <textarea class="pub-area" placeholder="填写活动的具体注意事项、详细信息等" v-model="info.description"></textarea>
                </div>
            </div>
        </div>
        <div class="pubBar" @click="publish">发布</div>
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
          info:{
            theme:'',
            description: '',
            pictures:[]
          }
        }
      },
      computed:{
        action(){
          return serverUrl + '/index.php/Picture/multiPicUpload';
        },
        events(){
          let _this = this;
          return {
            add(file, component) {
              file.data.count = 1;
              component.active = true;
            },
            progress(file, component) {
              console.log('progress ' + file.progress);
            },
            after(file, component) {
              let res = util.parseJSON(file.response);
              let url = res[0];
              _this.info.pictures.push(url);
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
        },
      },
      methods:{
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
              this.$toast('发布成功');
            }
        }
      }
    }
</script>