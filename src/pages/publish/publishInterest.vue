<style lang="less" module>
    @import '../../assets/less/const.less';
    .picWrap{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: @font-size-header;
        height: 140px;
        color: #fff;
        background-image: linear-gradient(-180deg, #56AEEA 0%, #81D2F8 98%);
    }
    .imgAdd{
        position: relative;
    .btnAdd{
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto 15px;
        background-size: contain;
        background-image: url("../../assets/images/btn-add.png");
    }
    }
</style>
<template>
    <div>
        <div class="content">
            <div :class="$style.picWrap">
                <div :class="[$style.imgAdd,'text-center']">
                    <file-upload class="file-upload"
                                 :drop="false"
                                 :multiple="false"
                                 post-action="http://10.0.6.213:9000/upload"
                                 accept="image/*"
                                 :events="events"
                    ></file-upload>
                    <i :class="$style.btnAdd"></i>
                    <span>添加圈子头像</span>
                </div>
            </div>
            <div class="pub-info-content">
                <div class="pub-item">
                    <h3 class="pub-title">圈子名称</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" maxlength="28">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">标签</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="如：IT、骑行、跑酷，之类的短语">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">简介</h3>
                    <div class="pub-text">
                        <textarea class="pub-area"></textarea>
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">设置</h3>
                    <div class="pub-text">
                        <div class="pub-select" @click="showPicker('needs')">
                            <span>{{ selectSetting.name || '需要身份认证' }}</span>
                        </div>
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">负责人</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="填写负责人姓名或者称呼">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">选填项</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="电话">
                    </div>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="邮箱">
                    </div>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="QQ">
                    </div>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="微信">
                    </div>
                </div>
            </div>
            <div class="pubBar">发布</div>
        </div>
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
        selectSetting:{},
        events: {
          add(file, component) {
            component.active = true;
//            file.headers['X-Filename'] = encodeURIComponent(file.name);
//            file.data.finename = file.name;

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

    }
  }
</script>