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
            <ImgContain :class="[$style.imgItem,{[$style.margin]:index>2}]" v-for="(img,index) in imgArr" :imgUrl="img.url">
                <i :class="$style.deleteImg" @click="deleteImage(img)" v-if="img.url"></i>
                <div :class="[$style.imgAdd,'text-center']" v-if="index == imgArr.length-1 && !img.url">
                    <file-upload class="file-upload"
                                 :drop="false"
                                 :multiple="true"
                                 post-action="http://10.0.6.213:9000/upload"
                                 accept="image/*"
                                 :events="events"
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
                    <input type="text" class="pub-input" placeholder="填写28字以内活动主题" maxlength="28">
                </div>
            </div>
            <div class="pub-item">
                <h3 class="pub-title">活动描述</h3>
                <div class="pub-text">
                    <textarea class="pub-area" placeholder="填写活动的具体注意事项、详细信息等"></textarea>
                </div>
            </div>
        </div>
        <div class="pubBar">发布</div>
    </div>
</template>
<script>
    import FileUpload from 'vue-upload-component'
    export default {
      components:{
        FileUpload
      },
      data(){
        return {
          imgArr:[],
          events: {
            add(file, component) {
              component.active = true;
//            file.headers['X-Filename'] = encodeURIComponent(file.name);
              file.data.finename = file.name;
            },
            progress(file, component) {
              console.log('progress ' + file.progress);
            },
            after(file, component) {
              console.log('after');
              console.log(file,component);
            },
            before(file, component) {
              console.log('before');
            }
          }
        }
      },
      methods:{
        deleteImage(img){
          console.log(img);
        }
      },
      created(){
        for(let i=0;i<9;i++){
            this.imgArr.push({
              url:i<=4 ? require('../../assets/moke/0.3.2.png') : ''
            })
        }
      }
    }
</script>