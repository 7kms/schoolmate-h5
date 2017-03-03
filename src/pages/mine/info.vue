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
        border-bottom: 1px solid @line-color-split;
    }
    .itemText {
        padding-top: 10px;
    }
    .item{
        height: 38px;
        align-items: center;
        overflow: hidden;
    }
    .dfn{
        width: 60px;
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
    .save{
        position: fixed;
        height: 40px;
        line-height: 40px;
        left: 0;
        bottom: 0;
        right: 0;
        text-align: center;
        color: #fff;
        font-size:@font-size-header;
        background-color: @theme-color;
    }
    textarea{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 40px;
        resize: none;
        outline: none;
        border: none;
    }
</style>
<template>
    <div :class="$style.wrap">
        <div :class="$style.content">
            <div :class="[$style.bar,'size-topic']">
                <span :class="[$style.title,'color-topic','inline-block']">我的信息</span>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">班级代码：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.class">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">姓      名：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.name">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">性      别：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">男</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">微 信 号 ：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.wechat">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">手机号码：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.phonenum">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">出生日期：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">1989/08/04</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">籍      贯：</div>
                <div :class="[$style.textInput,'color-topic']" @click="showPicker('place')">
                    <span :class="$style.input">{{ profile.bprovince + '-' + profile.bcity }}</span>
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
                    <span :class="$style.input">计算机科学与技术</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">入学时间：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">2008</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">毕业时间：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">2012</span>
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
                    <input type="text" :class="$style.input" v-model="profile.company">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">所属行业：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.industry">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">细分行业：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.job">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">所在部门：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.department">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">担任职务：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" v-model="profile.detail_job">
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">工作城市：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">北京</span>
                </div>
            </div>
            <div :class="$style.itemText">
                <div :class="$style.dfn">岗位描述：</div>
                <div :class="[$style.textInput,$style.textArea,'color-topic']">
                    <textarea class="color-topic" v-model="profile.resource_description"></textarea>
                </div>
            </div>
        </div>
        <div :class="$style.save" @click="saveInfo">
            <span>保存</span>
        </div>

        <placePicker :showPicker="showPlacePicker"
                     :province="profile.bprovince"
                     :city="profile.bcity"
                     @selectEnd="selectPlace"
                     @hide="hidePicker"
        ></placePicker>
    </div>
</template>
<script>
    import { placePicker } from '../../components/popPicker'
    import $api from  'api';
	import { mapState } from 'vuex';
	export default {
		data() {
            return {
                showPlacePicker: false,
            	profile: {}
            }
        },
        components:{
            placePicker
        },
		created: function() {
			this.$store.dispatch('user/GET_ACCOUNT')
				.then( dataInfo => {
				    console.log(dataInfo)
                    this.profile = {...dataInfo}
				})
		},
        methods: {
          hidePicker(){
            this.showPlacePicker = false;
          },
          showPicker(name){
            if(name == 'place'){
              this.showPlacePicker = true;
            }
          },
          selectPlace(placeObj){
            this.showPlacePicker = false;
            this.profile.bprovince = placeObj.province;
            this.profile.bcity = placeObj.city;
          },
          saveInfo() {
            this.$toast('保存成功');
            this.$router.go(-1);
          }
        }
    }
</script>