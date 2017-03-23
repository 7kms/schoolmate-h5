<style lang="less" module>
    @import '../../assets/less/const.less';
    .wrap{
        padding-bottom: 40px;
    }
    .content{
        background-color: #fff;
    .bar{
        height: 30px;
        padding-left: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: @body-color;
    }
    .title{
        padding-left: 6px;
        color: @theme-color;
        border-left: 2px solid @theme-color;
    }
    }
    .item,.itemText{
        display: flex;
        margin-left: 24px;
        border-bottom: 1px solid transparent;
    }
    .item{
        height: 38px;
        align-items: center;
        overflow: hidden;
    }
    .dfn{
        width: 60px;
        /*text-align: right;*/
        text-align: justify;
    }
    .textInput{
        flex: 1;
        margin-left: 7px;
    span{
        line-height: 38px;
    }
    .input{
        width: 100%;
        display: inline-block;
        height: 38px;
        color: @font-color-topic;
    }
    }
    .operate{
        position: fixed;
        height: 40px;
        line-height: 40px;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        font-size:@font-size-header;
        display: flex;
        .btn{
            flex: 1;
        }
        .agree{
            background-color: @theme-color;
            color: #fff;
        }
        .reject{
            background-color: @font-color-weak;
            color: @font-color-topic;
        }
    }
    .textArea{
        margin: 0;
        padding-left:4px;
        width: 100%;
        height: 40px;
        resize: none;
        outline: none;
        border: none;
    }
</style>
<template>
    <div>
        <Loading v-if="loading"></Loading>
        <div v-else :class="$style.wrap">
            <div :class="$style.content">
                <div :class="[$style.bar,'size-topic']">
                    <span :class="[$style.title,'color-topic','inline-block']">基本信息</span>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">班级代码：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.class }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">姓      名：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.name }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">性      别：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input"> {{ userInfo.gender }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">微 信 号 ：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.wechat }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">手机号码：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.phonenum }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">出生日期：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.birthday }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">籍      贯：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.birth_from }}</span>
                    </div>
                </div>
            </div>
            <div :class="$style.content">
                <div :class="[$style.bar,'size-topic']">
                    <span :class="[$style.title,'color-topic','inline-block']">工作信息</span>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">专业名称：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.major }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">入学时间：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.enrol_time ?  userInfo.enrol_time.slice(0,4) : '' }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">毕业时间：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.graduate_time ?  userInfo.graduate_time.slice(0,4) : ''}}</span>
                    </div>
                </div>
            </div>
            <div :class="$style.content">
                <div :class="[$style.bar,'size-topic']">
                    <span :class="[$style.title,'color-topic','inline-block']">基本信息</span>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">工作单位：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.company }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">所属行业：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.industry }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">细分行业：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.job }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">所在部门：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.department }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">担任职务：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.detail_job }}</span>
                    </div>
                </div>
                <div :class="$style.item">
                    <div :class="$style.dfn">工作城市：</div>
                    <div :class="[$style.textInput,'color-topic']">
                        <span :class="$style.input">{{ userInfo.province + '-' + userInfo.city }}</span>
                    </div>
                </div>
                <div :class="$style.itemText">
                    <div :class="$style.dfn">岗位描述：</div>
                    <div :class="[$style.textInput,$style.textArea]">
                        <textarea disabled :class="['color-topic',$style.textArea]">{{ userInfo.resource_description }}</textarea>
                    </div>
                </div>
            </div>
            <div :class="$style.operate" v-if="userInfo.verify_status">
                <span :class="[$style.btn, $style.reject]" @click="reject(userInfo)">拒绝</span>
                <span :class="[$style.btn, $style.agree]" @agree="agree(userInfo)">同意</span>
            </div>
        </div>
    </div>

</template>
<script>
    import $api from 'api'
    export default {
      data(){
        return {
          loading:true,
          userInfo:{}
        }
      },
      methods:{
        agree(contact){
          const {fid} = contact;
          this.$dialog.confirm('同意交换联系方式后,双方可查看详细资料').then(data=>{
            return $api.post('/Profile/handleExchange',{fid,status:1});
          },data=>{
            return false;
          }).then(res=>{
            if(!res)return false;
            if(res.result){
              this.$toast('操作成功');
              contact.verify_status = false;
            }else{
              this.$toast(res.msg);
            }
          },error=>{
            this.$toast('服务器异常')
          });
        },
        reject(contact){
          const {fid} = contact;
          this.$dialog.confirm('拒绝交换联系方式,并将其从列表中删除?').then(data=>{
            return $api.post('/Profile/handleExchange',{fid,status:0});
          },data=>{
            return false;
          }).then(res=>{
            if(!res)return false;
            if(res.result){
              this.$toast('操作成功');
              this.$store.dispatch('contact/REMOVE_CONTACT',fid);
            }else{
              this.$toast(res.msg);
            }
          },error=>{
            this.$toast('服务器异常')
          });
        }
      },
      created(){
        this.loading = true;
        $api.get('/Profile/getUserCard',{uid:this.$route.params.id})
          .then(data=>{
            this.loading = false;
            this.userInfo = data;
          },err=>{
            this.loading = false;
            this.$toast('服务器异常');
          })
      }
    }
</script>