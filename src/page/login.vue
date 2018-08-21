<template>
  <div id="apps">
    <headNav></headNav>
    <section>
      <div class="none"></div>
      <div class="content_box" v-if="menuText=='login'">
        <div class="menu_box">
          <span class="active" @click="setMenu('login')">登录</span>
          <span class="black" @click="setMenu('reg')">注册</span>
        </div>
        <div class="mt_26"></div>
        <div class="input_box">
          <input type="text" placeholder="手机号码" v-model="loginPhone">
          <div class="phone_icon"></div>
        </div>
        <div class="input_box">
          <input type="password" placeholder="密码" v-model="loginPassword">
          <div class="pass_icon"></div>
        </div>
        <div class="submit_btn" @click="toLogin()">登录</div>
        <div class="to_find" @click="toFind()"><u>找回密码</u></div>
      </div>
      <div class="content_box" v-if="menuText=='reg'">

        <div class="input_box">
          <input type="text" placeholder="手机号码" v-model="regPhone">
          <div class="phone_icon"></div>
        </div>
        <div class="input_box">
          <input type="password" placeholder="密码" v-model="regPassword">
          <div class="pass_icon"></div>
        </div>
        <div class="input_box">
          <input type="password" placeholder="确认密码" v-model="reRegPassword">
          <div class="pass_icon"></div>
        </div>
        <div class="input_box">
          <input type="text" placeholder="验证码" v-model="code">
          <div class="send_code" @click="sendCode()">{{sendText}}</div>
        </div>
        <div class="pic_box">
          <div class="pic_input_box">
            <input type="text" placeholder="图片验证码" v-model="picCode">
          </div>
          <img class="pic_code" :src="picUrl" @click="sendPicCode()">
        </div>
        <div class="submit_btn" @click="toReg()">注册</div>
        <div class="to_find" @click="toFind()"><u>找回密码</u></div>
        <div class="to_login" @click="setMenu('login')"><u>已有账号，立即登录</u></div>
      </div>
    </section>
  </div>
</template>

<script>
  import headNav from '../components/header.vue'
  import ax from 'axios'

  export default {
    name: "login",
    components: {
      headNav,
    },
    data() {
      return {
        menuText: 'login',
        loginPhone: null,
        loginPassword: '',
        regPhone: null,
        regPassword: '',
        reRegPassword: '',
        baseUrl: 'http://media.iszeng.cn/api/',
        sendText: '发送验证码',
        code: '',
        picUrl: '',
        picCode: '',
        captcha_key: ''
      }
    },
    methods: {
      toFind:function(){

        this.$router.push('/find')
      },
      setMenu: function (index) {
        this.menuText = index
      },
      //登陆
      toLogin: function () {
        const that = this;
        const url = that.baseUrl + 'authorizations';
        const data = {
          phone: that.loginPhone,
          password: that.loginPassword
        };
        ax.post(url, data).then(function (res) {
          console.log(res.data);
          if (res.data.success == true) {
            localStorage.setItem('token', res.data.data.token_type + ' ' + res.data.data.access_token);
            that.$router.push('/')
          }else {
            alert(res.data.message)
          }
        })
          .catch(function (err) {//网络响应错误
            // 响应错误回调
            alert('网络错误')
          })
      },
      //注册
      toReg: function () {
        const that = this;
        const pattern = /0?(13|14|15|16|17|19|18)[0-9]{9}/;
        if (!pattern.test(that.regPhone)) {
          alert('请输入正确的手机号')
        } else if (that.regPassword != that.reRegPassword) {
          alert('两次输入密码不一致!')
        } else if (that.regPassword.length < 6) {
          alert('密码长度不能低于六位')
        } else {
          const url = that.baseUrl + 'users';
          const data = {
            phone: that.regPhone,
            password: that.regPassword,
            captcha_code: that.picCode,
            captcha_key: that.captcha_key,
            verification_code: that.code
          };
          ax.post(url, data).then(function (res) {
            console.log(res.data);
            if (res.data.success == true) {
              that.setMenu('login')
            }else {
              alert(res.data.message)
            }
          })
            .catch(function (err) {//网络响应错误
              // 响应错误回调
              alert('网络错误')
            });
        }

      },
      //发送图片验证码
      sendPicCode: function () {
        var that = this;
        var url = that.baseUrl + 'captchas';

        ax.get(url).then(function (res) {
          console.log(res);
          that.picUrl = res.data.captcha_image_content;
          that.captcha_key = res.data.captcha_key
        })
          .catch(function (err) {//网络响应错误
            // 响应错误回调
            alert('网络错误')
          })
      },
      //发送验证码
      sendCode: function () {
        var that = this;
        if (that.sendText == '发送验证码') {
          const that = this;
          const url = that.baseUrl + 'verificationCodes';
          const data = {
            phone: that.regPhone
          };
          ax.post(url, data).then(function (res) {
            console.log(res.data);

          })
            .catch(function (err) {//网络响应错误
              // 响应错误回调
              alert('网络错误')
            })

          var t = 60;
          var timer = setInterval(function () {
            t--;
            that.sendText = t + 's';
            if (t < 1) {
              that.sendText = '发送验证码';
              clearInterval(timer)
            }

          }, 1000)
        }

      }
    },
    mounted: function () {
      this.sendPicCode()
    }
  }
</script>

<style scoped>
  body {
    height: 100%;
  }

  #apps {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url("../../static/img/login_bg.jpg");
    background-size: cover !important;
  }

  .content_box {
    border-top: 8px solid #3bb3e4;
    position: relative;
    margin: 30px auto 0;
    width: 640px;
    height: 700px;
    background-color: white;
  }

  .menu_box {
    margin-top: 160px;
    /*margin-left: 90px;*/
    font-size: 20px;
  }

  .menu_box .active {
    display: inline-block;
    line-height: 40px;
    border-bottom: 2px solid #3bb3e4;
    color: #3bb3e4;
    cursor: pointer;
  }

  .menu_box .black {
    margin-left: 50px;
    display: inline-block;
    line-height: 40px;
    color: #000;
    cursor: pointer;
  }

  .menu_box2 {
    margin-top: 56px;
    margin-left: 90px;
    font-size: 20px;
  }

  .menu_box2 .active {
    display: inline-block;
    line-height: 40px;
    border-bottom: 2px solid #3bb3e4;
    color: #3bb3e4;
    margin-right: 50px;
    cursor: pointer;
  }

  .menu_box2 .black {
    margin-right: 50px;
    /*margin-left: 50px;*/
    display: inline-block;
    line-height: 40px;
    color: #000;
    cursor: pointer;
  }

  .code_content {
    position: relative;
    margin: 26px auto 0;
    margin-left: 90px;
  }

  .code_box {
    position: relative;
    width: 300px;
    height: 64px;
    border: 1px solid #8aa0bf;
    border-radius: 10px;
  }

  .code_box input {
    width: 220px;
    margin-left: 30px;
    height: 64px;
    line-height: 64px;
    color: #8aa0bf;
    font-size: 18px;
    border: none;
    outline: none;
  }

  .input_box {
    position: relative;
    width: 464px;
    height: 64px;
    margin: 26px auto 0;
    border: 1px solid #8aa0bf;
    border-radius: 10px;
  }

  .input_box input {
    position: absolute;
    top: 0;
    left: 30px;
    width: 300px;
    margin-left: 0;
    height: 64px;
    line-height: 64px;
    color: #8aa0bf;
    font-size: 18px;
    border: none;
    outline: none;
  }

  .phone_icon {
    position: absolute;
    background-image: url("../../static/img/icon_mobilephone.png");
    width: 20px;
    height: 30px;
    right: 30px;
    top: 17px;
  }

  .pass_icon {

    position: absolute;
    background-image: url("../../static/img/icon_password.png");
    width: 20px;
    height: 26px;
    right: 30px;
    top: 17px;
  }

  .submit_btn {
    margin: 66px auto 0;
    width: 220px;
    height: 64px;
    background-color: #3bb3e4;
    color: white;
    font-size: 22px;
    line-height: 66px;
    text-align: center;
    border-radius: 33px;
    box-shadow: 0 4px 8px rgba(0, 178, 222, .28);
  }

  .to_find {
    position: absolute;
    text-decoration: none;
    bottom: 25px;
    right: 90px;
    font-size: 16px;
    color: #3bb3e4;
    cursor: pointer;
  }

  .to_login {
    position: absolute;
    text-decoration: none;
    bottom: 25px;
    left: 90px;
    font-size: 16px;
    color: #3bb3e4;
    cursor: pointer;
  }

  .send_code {
    position: absolute;
    right: 30px;
    top: 0;
    color: #3bb3e4;
    line-height: 64px;
    cursor: pointer;
  }

  .pic_box {
    position: relative;
    width: 464px;
    height: 64px;
    margin: 26px auto 0;
    /*border-radius: 10px;*/
  }

  .pic_input_box {
    display: inline-block;
    width: 300px;
    height: 64px;
    border-radius: 10px;
    border: 1px solid #8aa0bf;
    position: absolute;
    top: 0;
    left: 0;
  }

  .pic_input_box input {
    display: inline-block;
    width: 220px;
    /*margin-left: 30px;*/
    height: 64px;
    line-height: 64px;
    color: #8aa0bf;
    font-size: 18px;
    border: none;
    outline: none;
  }

  .pic_code {
    display: inline-block;
    position: absolute;
    top: 0;
    right: 0;
    height: 66px;
    width: 136px;
    border-radius: 10px;
    /*background-color: red;*/
  }

</style>
