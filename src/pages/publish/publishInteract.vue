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
                        <span>{{ selectRange.name || '所有人可见' }}</span>
                    </div>
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
            <mt-picker :slots="rangeArr" valueKey="name" :showToolbar="true" :rotateEffect="true" @change="changeRange">
                <span></span><span @click="hidePicker">确定</span>
            </mt-picker>
        </mt-popup>
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
        },
        selectNeed:{},
        selectRange:{},
        needsArr:[{flex:1,values:[{name:'拥有资源',value:1},{name:'寻求合作',value:2}]}],
        rangeArr:[{flex:1,values:[{name:'所有人可见',value:1},{name:'朋友圈1',value:1},{name:'朋友圈2',value:2}]}],
        showNeeds: false,
        showRange: false
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
        console.log(img);
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
      changeRange(picker,values){
        this.selectRange = values[0];
      }
    },
    created(){
      for(let i=0;i<4;i++){
        this.imgArr.push({
          url:i<=1 ? require('../../assets/moke/0.3.2.png') : ''
        })
      }
    }
  }
</script>