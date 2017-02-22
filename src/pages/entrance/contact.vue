<style lang="less" module>
    @import '../../assets/less/const.less';
    .content{
        margin-top: -1px;
        background-color: #fff;
    }
    .verify{
        position: absolute;
        right: 12px;
        top: 7px;
        width: 80px;
        height: 24px;
        line-height: 24px !important;
        color: #fff;
        background-color: @theme-color;
    }
    .mate{
        background-color: #fff;
        padding: 0 15px 0 24px;
    }
    .refresh{
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
    }
    .iconRefresh{
        width: 16px;
        height: 16px;
        background-size: contain;
        background-image: url("../../assets/images/icon-refresh.png");
    }
    .friendItem{
        width: 90px;
        height: 24px;
        line-height: 24px;
        margin-right: 20px;
        margin-bottom: 12px;
        border: 1px solid @theme-color;
        color: @theme-color;
        text-align: center;
        &.active{
            background-color: @theme-color;
            color: #fff;
        }
    }
</style>
<template>
    <div>
        <div class="entrance-content">
            <div class="item">
                <div class="dfn"><span class="label inline-block">微 信 号</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="text" class="input" placeholder="请填写" v-model="userInfo.wechat" maxlength="15">
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">手机号码</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic relative">
                    <input type="tel" class="input" placeholder="请填写" v-model="userInfo.phonenum" maxlength="11">
                    <span :class="[$style.verify,'text-center']" @click="sendVerifyCode">{{waiting ? count : '发送验证码'}}</span>
                </div>
            </div>
            <div class="item">
                <div class="dfn"><span class="label inline-block">验 证 码</span><span class="color-hint inline-block">*</span></div>
                <div class="textInput color-topic">
                    <input type="tel" class="input" placeholder="请填写" v-model="verifyCode">
                </div>
            </div>
        </div>
        <div :class="$style.mate" v-if="friendsArr.length > 0">
            <div :class="$style.refresh">
                <span>选择您认识的2位熟人</span>
                <span @click="getFriends"><i :class="['inline-block',$style.iconRefresh]"></i><span class="inline-block color-theme">刷新</span></span>
            </div>
            <div :class="[$style.friends]">
                <span :class="[$style.friendItem,'inline-block',{[$style.active]:friend.active}]" @click="selectFriend(friend)" v-for="friend in friendsArr">{{friend.name}}</span>
             </div>
        </div>
        <div class="entrance-next-step text-center" @click="submit">
            <span>完成</span>
        </div>
    </div>
</template>
<script>
    import  { mapState } from  'vuex'
    import $api from 'api';
    export default {
        data(){
            return {
                waiting: false,
                count: 6,
                verifyCode:'',
                friendsArr:[],
                nameErrorTimes:0
            }
        },
        computed:{
            ...mapState({
                channel:(state) => state.entrance.channel,
                userInfo:(state) => state.entrance.userInfo
            })
        },
        methods:{
            valid(code){
              if(!/^1[3-8]\d{9}$/.test(this.userInfo.phonenum)){
                this.$toast('手机号码不正确');
                return false;
              }
              if(!/^[\w\d\_]{3,20}$/.test(this.userInfo.wechat)){
                this.$toast('微信号不规范');
                return false;
              }
              if(!code){
                if(!this.verifyCode){
                  this.$toast('验证码不能为空');
                  return false;
                }
              }
              return true;
            },
            sendVerifyCode(){
                if(!this.waiting){
                    if(!this.valid('code'))return false;
                    this.waiting = true;
                    $api.post('/index.php/Regverify/getCode',{phone:this.userInfo.phonenum})
                    .then(res=>{
                        if(res.code == 200){
                            this.$toast('验证码已经发送');
                        }else{
                            this.$toast('验证码发送失败');
                        }
                    },res=>{
                        this.$toast('验证码发送失败');
                    });
                    this.timer = setInterval(() => {
                        this.count --;
                        if(this.count == 0){
                            this.count = 6;
                            this.waiting = false;
                            clearInterval(this.timer);
                        }
                    },1000);
                }
            },
            verifyFriend(){
                var {role} = this.userInfo;
                var nameArr = [];
                this.friendsArr.forEach(friend=>{
                    if(friend.active){
                        nameArr.push(friend.name);
                    }
                });
                return new Promise((resolve,reject)=>{
                    if(this.friendsArr.length < 1){
                      resolve(true);
                    }else if(nameArr.length < 2){
                        this.$toast('请至少选择2位熟人');
                        reject(false);
                    }else{
                        $api.post('/index.php/Regverify/verifyRandName',{role,'class':this.userInfo.class,namestr:nameArr.join(',')})
                        .then(res=>{
                          if(res.code == 200 && res.result){
                                resolve(true);
                            }else{
                                let count = this.userInfo.nameErrorCount+1;
                                if(count >=3 ){
                                  this.$store.dispatch('entrance/CHANGE_USERINFO',{passedNameCheck:false});
                                }
                                this.$store.dispatch('entrance/CHANGE_USERINFO',{nameErrorCount:count});
                                reject(false)
                            }
                        },res=>{
                            this.nameErrorTimes ++;
                            reject(false);
                        });
                    }
                });
            },
            verifySMS(){
                return $api.post('/index.php/Regverify/verify',{phone:this.userInfo.phonenum,code:this.verifyCode})
                        .then(res=>{
                            if(res.code == 200 && res.result){
                              return true;
                            }
                            this.$toast('验证码不正确');
                            return false;
                        },res=>{
                            this.$toast('服务器异常');
                            return false;
                        });
            },
            selectFriend(friend){
                friend.active = !friend.active;
            },
            getFriends(){
                var {role} = this.userInfo;
                $api.post('/index.php/Regverify/getRandomName',{role,'class':this.userInfo.class,department:this.userInfo.department})
                .then((res)=>{
                    if(res.code == 200){
                        this.friendsArr = res.data.map(name=>{
                            return {
                                name,
                                active: false
                            }
                        });
                    }else{
                        this.$toast('获取熟人列表失败');
                    }
                },res=>{
                    this.$toast('获取熟人列表失败');
                });
            },
            register(){
              debugger
                $api.post('/index.php/Profile/upProfile',this.userInfo)
                .then(res => {
                    this.$toast(res.data.msg);
                    if(res.data.result){
                        this.$router.replace('/');
                    }
                },res => {
                    this.$toast(res.msg);
                });
            },
            submit(){
                if(!this.valid()) return false;
                this.verifyFriend()
                .then(data =>{
                    return this.verifySMS();
                }, data=>{
                    this.$toast('朋友验证未通过');
                }).then(data=>{
                    if(data){
                        this.register();
                    }
                },res=>{
                    this.$toast('服务器异常');
                });
            }
        },
        created(){
            this.getFriends();
        }
    }
</script>