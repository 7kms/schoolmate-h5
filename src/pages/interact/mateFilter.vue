<style lang="less" module>
    @import '../../assets/less/const.less';
    .filter{
        z-index: 10;
        left: 0;
        top: @header-height;
        width: 100%;
        position: fixed;
        height: 30px;
        display: flex;
        align-items: center;
        background-color:@body-color;
        .item{
            flex: 1;
            &.active{
                color: @theme-color;
             }
        }
        .iconMore{
            width: 12px;
            height: 12px;
            opacity: .4;
            background-size: contain;
            background-repeat:no-repeat;
            background-image: url('../../assets/images/icon-triangle.png');
        }
    }
    .condition{
        position: fixed;
        z-index: 10;
        left: 0;
        top: @header-height + 30;
        bottom: @nav-height;
        width: 100%;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        border-top: 1px solid #C7CED2;;
        background-color: @body-color;
    }
    .condition{
        padding:0 12px 12px;
    }
    .dfn{
        display: flex;
        align-items:center;
        margin-top: 12px;
        .label{
            width: 50px;
            text-align: justify;
        }
        .dInput{
            flex: 1;
            height: 28px;
            margin-left: 12px;
            background-color: #fff;
            input{
                width: 100%;
                height: 28px;
                padding: 0 10px;
                border: none;
                outline: none;
                background-color: transparent;
            }
        }
        .dSelect{
            line-height: 28px;
            text-align: center;
            border: 1px solid @theme-color;
        }
        .special{
            width: 148px;
            flex: none;
        }
    }
    .submit{
        width: 100px;
        height: 30px;
        margin: 12px auto;
        line-height: 30px;
        background-color: @theme-color;
        color: #fff;
        border-radius: 2px;
    }
</style>
<template>
    <div>
        <div :class="[$style.filter,'text-center']">
            <div :class="[$style.item,{[$style.active]: nav.active}]" v-for="nav in mates.nav" @click="switchNav(nav)">
                <span>{{nav.name}}</span><i v-if="nav.more" :class="['inline-block',$style.iconMore]"></i>
            </div>
        </div>
        <div :class="$style.condition" v-if="showMore">
            <ul>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">姓名</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">籍贯</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect,$style.special]">
                        <span class="color-theme">点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">工作单位</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">公司行业</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect]">
                        <span class="color-theme">点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">细分行业</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect]">
                        <span class="color-theme">点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">所在部门</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">具体职位</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">入学时间</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect]">
                        <span class="color-theme">点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">毕业时间</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect]">
                        <span class="color-theme">点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">大学专业</span>
                    </div>
                    <div :class="[$style.dInput,$style.dSelect]" @click="showPicker('major')">
                        <span v-if="mates.condition.major">{{mates.condition.major}}</span>
                        <span v-else class="color-theme">点击选择</span>
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">班级代码</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text">
                    </div>
                </li>
                <li :class="$style.dfn">
                    <div :class="$style.label">
                        <span class="color-topic">岗位描述</span>
                    </div>
                    <div :class="$style.dInput">
                        <input type="text" placeholder="关键字用空格隔开，越准确越好">
                    </div>
                </li>
            </ul>
            <div :class="[$style.submit,'text-center']" @click="searchMore">搜索</div>
        </div>
        <mt-popup
                v-model="showMajorPicker"
                position="bottom"
                popup-transition="popup-fade">
            <mt-picker :slots="majorSlots" :showToolbar="true" :rotateEffect="true" @change="selectMajor">
                <span></span><span @click="setDefaultMajor">确定</span>
            </mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    import { placeObj,departmentArr,majorArr,industryObj } from '../../data';
    import { mapState } from 'vuex';
    export default {
       data(){
          return {
            showMore: false,
            showMajorPicker: false,
	          majorSlots:[{
		          flex: 1,
		          values: majorArr
	          }],
              placeSlots: [
                  {
                      flex: 1,
                      values: Object.keys(placeObj),
                      textAlign: 'center'
                  },
                  {
                      divider: true,
                      content: '-'
                  },
                  {
                      flex: 1,
                      values: placeObj[Object.keys(placeObj)[0]],
                      textAlign: 'center'
                  }
              ],
              industrySlots: [
                  {
                      flex: 1,
                      values: Object.keys(industryObj),
                      textAlign: 'center'
                  }
              ],
              industryDetailSlots: [
                  {
                      flex: 1,
                      values: Object.keys(industryObj),
                      textAlign: 'center'
                  }
              ]
          }
       },
      computed:{
        ...mapState({
          mates: state => state.interact.mates
        })
      },
      watch:{
        showMore(newValue){
          if(newValue){
            document.querySelector('body').style.overflow = 'hidden';
          }else{
            document.querySelector('body').style.overflow = 'auto';
          }
        }
      },
      methods:{
       	showPicker(pickerName){
       	    switch (pickerName) {
                case 'major':
	                this.showMajorPicker = true;
	                break;

            }
        },
        selectMajor(picker, values) {
       		this.$store.dispatch('interact/CHANGE_MATES_CONDITION', {major:values[0]})
        },
        setDefaultMajor(){
		      this.showMajorPicker = false;
		      if(!this.mates.condition.major){
			      this.$store.dispatch('interact/CHANGE_MATES_CONDITION',{major:this.majorSlots[0].values[0]})
		      }
	      },
        switchNav(nav){
          this.$store.dispatch('interact/SWITCH_MATES_NAV',nav);
          if(nav.more){
            if(this.showMore)nav.active = false;
            this.showMore = !this.showMore;
          }else{
            this.showMore = false;
            this.$store.dispatch('interact/RESET_MATES_CONDITION');
            this.$parent.loadMore();
          }
        },
        searchMore(){
          this.showMore = false;
          this.$store.dispatch('interact/RESET_INTERACT_LIST');
          this.$parent.loadMore();
        }
      }
    }
</script>