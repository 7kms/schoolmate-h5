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
    .loading{
        margin: 0 auto;
    }
</style>
<template>
    <div>
        <div class="content">
            <ImgContain :class="$style.picWrap" :imgUrl="info.c_cover_file">
                <template>
                    <div :class="[$style.imgAdd,'text-center']" v-show="!picUploading" @click="picUpload">
                        <i :class="$style.btnAdd"></i>
                        <span>添加圈子头像</span>
                    </div>
                    <Loading text="上传中..." :class="$style.loading" v-show="picUploading"></Loading>
                </template>
            </ImgContain>
            <div class="pub-info-content">
                <div class="pub-item">
                    <h3 class="pub-title">圈子名称</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" maxlength="28" v-model="info.c_name">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">标签</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" placeholder="如：IT、骑行、跑酷，之类的短语" v-model="info.labels">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">简介</h3>
                    <div class="pub-text">
                        <textarea class="pub-area" v-model="info.c_description" maxlength="150"></textarea>
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">设置</h3>
                    <div class="pub-text">
                        <div class="pub-select" @click="showPicker()">
                            <span>{{ settingText }}</span>
                        </div>
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">负责人</h3>
                    <div class="pub-text">
                        <input type="text" class="pub-input" v-model="info.master" placeholder="填写负责人姓名或者称呼">
                    </div>
                </div>
                <div class="pub-item">
                    <h3 class="pub-title">选填项</h3>
                    <div class="pub-text">
                        <input type="tel" class="pub-input" v-model="info.tel"  placeholder="电话">
                    </div>
                    <div class="pub-text">
                        <input type="text" class="pub-input" v-model="info.c_email" placeholder="邮箱">
                    </div>
                    <div class="pub-text">
                        <input type="text" class="pub-input" v-model="info.qq" placeholder="QQ">
                    </div>
                    <div class="pub-text">
                        <input type="text" class="pub-input" v-model="info.c_wechat" placeholder="微信">
                    </div>
                </div>
            </div>
            <div class="pubBar" @click.prevent="publish"><span v-if="edit">修改</span><span v-else>发布</span></div>
        </div>
        <singlePicker  v-if="!loadingInfo"
               :dataArr="settingArr"
                valueKey="name"
               :initValue="info.setting"
               :showPicker="showSettingPicker"
               @selectEnd="selectSetting"
               @hide="hidePicker"
        ></singlePicker>
    </div>

</template>
<script>
  import { singlePicker } from '../../components/popPicker';
  import FileUpload from 'vue-upload-component'
  import util from  '../../util';
  import $api from 'api';
  import {mapState} from 'vuex';
  import {register} from '../../util/wechat-api';
  export default {
    components:{
      FileUpload,
      singlePicker
    },
    data(){
      return {
        info:{
          c_cover_file:'',
          c_name:'',
          labels:'',
          c_description:'',
          setting:'1',
          master:'',
          tel: '',
          c_email:'',
          qq:'',
          c_wechat:''
        },
        picUploading: false,
        edit: false,
        loadingInfo: true,
        showSettingPicker: false,
        settingArr:[
          {name:'允许任何人加入',value:0},
          {name:'需要身份认证',value:1},
          {name:'不许任何人加入',value:2}
        ]
      }
    },
    computed:{
      ...mapState({
        profile: (state) => state.user.profile
      }),
      settingText(){
        let str;
        this.settingArr.forEach(obj=>{
          if(obj.value == this.info.setting){
            str = obj.name;
          }
        });
        return str;
      }
    },
    methods:{
        picUpload(){
            let count = 1;
            util.wxUpload({count,onSelectEnd:()=>this.picUploading = true})
                    .then(wxIds=>{
                        util.getPathByIds(wxIds)
                                .then(res=>{
                                    this.picUploading = false;
                                    if(res.path[0]){
                                        this.info.c_cover_file = res.path[0];
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
        this.showSettingPicker = false;
      },
      showPicker(){
        this.showSettingPicker = true;
      },
      selectSetting(obj){
        this.showSettingPicker = false;
        this.info.setting = String(obj.value);
      },
      valid(){
          if(!this.info.c_cover_file){
              this.$toast('请上传圈子头像');
              return false;
          }
          if(!this.info.c_name){
              this.$toast('圈子名称不能为空');
              return false;
          }
          if(!this.info.c_description){
              this.$toast('圈子简介不能为空');
              return false;
          }
          if(!this.info.labels){
              this.$toast('圈子标签不能为空');
              return false;
          }
          if(!this.info.master){
              this.$toast('圈子负责人不能为空');
              return false;
          }
          return true;
      },
      publish(){
          if(!this.valid()) return false;
        var param = this.info;
        $api.post('/Circle/upCircle',param)
          .then(res=>{
            this.$toast(res.msg);
            if(res.code == 200){
              this.$router.back();
            }
          },res=>{
            this.$toast(res.msg);
          })
      }
    },
    created(){
        register();
        let {cid} =  this.$route.query;
        if(cid){
            this.edit = true;
            $api.get('/Circle/getCircle',{cid})
            .then(res=>{
                this.loadingInfo = false;
                let keyArr = Object.keys(this.info);
                keyArr.forEach(key=>{
                    this.info[key] = res[key] ? res[key] : this.info[key];
                });
                this.info.cid = res.cid;
            },err=>{
                this.$toast({message: err});
            });
        }else{
            this.info.tel = this.profile.phonenum;
            this.info.c_wechat = this.profile.wechat;
            this.loadingInfo = false;
        }
    }
  }
</script>