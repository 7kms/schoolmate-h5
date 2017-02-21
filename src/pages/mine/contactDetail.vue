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
    textarea{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 40px;
        resize: none;
        outline: none;
    }
</style>
<template>
    <div :class="$style.wrap">
        <div :class="$style.content">
            <div :class="[$style.bar,'size-topic']">
                <span :class="[$style.title,'color-topic','inline-block']">基本信息</span>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">班级代码：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">B08056038</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">姓      名：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <input type="text" :class="$style.input" value="陈博">
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
                    <span :class="$style.input">wind_road</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">手机号码：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">13301523576</span>
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
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">江苏-无锡</span>
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
                    <span :class="$style.input">星河互联</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">所属行业：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">计算机／互联网</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">细分行业：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">计算机软件</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">所在部门：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">产品部</span>
                </div>
            </div>
            <div :class="$style.item">
                <div :class="$style.dfn">担任职务：</div>
                <div :class="[$style.textInput,'color-topic']">
                    <span :class="$style.input">设计师</span>
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
                <div :class="[$style.textInput,$style.textArea]">
                    <textarea disabled class="color-topic">内容描述内容描述内容描述内容内容描述内容描述内容描述内容</textarea>
                </div>
            </div>
        </div>
        <div :class="$style.operate">
            <span :class="[$style.btn, $style.reject]">拒绝</span>
            <span :class="[$style.btn, $style.agree]">同意</span>
        </div>
    </div>
</template>