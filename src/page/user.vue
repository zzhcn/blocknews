<template>

  <div id="app">
    <headNav></headNav>
    <section>
      <div class="user_header">
        <div class="user_logo"></div>
        <div class="user_text">我的</div>
        <div class="menu_box">
          <div class="item_box" v-for="(item,index) in menuData" :class="{'item_active':index==0}">{{item.name}}
          </div>
        </div>
      </div>
      <realName></realName>
    </section>
  </div>
</template>

<script>
  import headNav from '../components/header.vue'
  import realName from '../components/real_name.vue'
  import paging from '../components/paging.vue'
  import ax from 'axios'

  export default {
    name: "user",
    components: {
      headNav,
      paging,
      realName
    },
    data() {
      return {
        cardImg1: 'img/icon_zhengmian.png',
        cardImg2: 'img/icon_beimian.png',
        menuData: [
          {
            name: '用户信息',
            url: ''
          },
          {
            name: '系统消息',
            url: ''
          },
          {
            name: '我的自选',
            url: ''
          },
          {
            name: '我的订阅',
            url: ''
          }
        ],
        contentType:'userInfo'
      }
    },
    methods:{

    },
    mounted:function () {
      if(!localStorage.getItem('token')){
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .none{
    width: 100%;
    height: 1px;
  }
  section{
    text-align: left;
  }
  .user_header {
    width: 1200px;
    height: 80px;
    background-color: white;
    margin: 30px auto 16px;
    position: relative;
  }

  .user_logo {
    position: absolute;
    background-image: url("../../static/img/icon_wode.png");
    width: 24px;
    height: 24px;
    top: 28px;
    left: 26px;
  }

  .phone_logo {
    background-image: url("../../static/img/icon_shoujihao.png");
    width: 40px;
    height: 40px;
    position: absolute;
    top: 20px;
    left: 0;
  }

  .user_text {
    position: absolute;
    left: 65px;
    line-height: 80px;
    font-size: 18px;
    color: #000;
    font-weight: bold;
  }

  .menu_box {
    position: absolute;
    left: 320px;
  }

  .item_box {
    display: inline-block;
    width: 75px;
    height: 78px;
    line-height: 78px;
    margin-right: 90px;
    text-align: center;
    color: #000000;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }

  .item_active {
    border-bottom: 2px solid #3bb3e4;
  }

  .content_box {
    position: relative;
    margin: 16px auto 100px;
    width: 1200px;
    height: 803px;
    background-color: white;
  }

  .user_info_box {
    margin-top: 155px;
    margin-left: 232px;
    position: relative;
  }

  .user_box_one {
    position: relative;
    margin-bottom: 44px;
    width: 775px;
    height: 40px;
    /*background-color: red;*/
  }

  .user_btn_box {
    position: absolute;
    right: 0;
    font-size: 16px;
    color: #3bb3e4;
    top: 20px;
    line-height: 40px;
  }

  .user_btn_box span {
    display: inline-block;
    /*margin-right: 40px;*/
    cursor: pointer;
  }

  .nav {
    margin-top: 25px;
    margin-left: 26px;
    font-size: 16px;
    color: #333;
  }

  .name_box {
    position: relative;
    width: 600px;
    height: 64px;
    margin: 62px auto 24px;
    font-size: 18px;
    color: #333;
  }

  .msg_box {
    position: relative;
    width: 600px;
    height: 64px;
    margin: 62px auto 24px;
    font-size: 16px;
    color: #8aa0bf;
  }

  .msg_box div {
    margin-top: 16px;
  }

  .name_box .title {
    display: inline-block;
    width: 140px;
    text-align: right;
  }

  .cardImg {
    position: absolute;
    right: 0;
    top: 10px;
    /*background-image: url("../img/icon_beimian.png");*/
    width: 120px;
    height: 76px;
  }

  .idCard_box {
    position: relative;
    width: 600px;
    height: 64px;
    margin: 30px auto 24px;
    font-size: 18px;
    color: #333;
  }

  .idCard_box .title {
    display: inline-block;
    width: 140px;
    text-align: right;
    line-height: 65px;
  }

  .input_box {
    position: relative;
    display: inline-block;
    margin-left: 20px;
    width: 420px;
    height: 64px;
    border-radius: 10px;
    border: 1px solid #3bb3e4;
  }

  .input_box input {
    margin-top: 10px;
    padding-left: 20px;
    width: 400px;
    height: 44px;
    border: none;
  }

  .red {
    color: #ff173e;
  }

  .submit_btn {
    width: 260px;
    height: 70px;
    border-radius: 35px;
    background-color: #3bb3e4;
    color: white;
    text-align: center;
    line-height: 70px;
    margin: 90px auto 70px;
    font-size: 20px;
  }

  #uploadForm1 {
    display: inline-block;
    /*visibility: hidden;*/
    position: absolute;
    width: 175px;
    height: 40px;
    background-color: #3bb3e4;
    overflow: hidden;
    left: 165px;
    top: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    z-index: 1;
    opacity: 0;
  }

  #uploadForm2 {
    display: inline-block;
    /*visibility: hidden;*/
    position: absolute;
    width: 175px;
    height: 40px;
    background-color: #3bb3e4;
    overflow: hidden;
    left: 165px;
    top: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: white;
    z-index: 1;
    opacity: 0;
  }

  .btn1 {
    display: inline-block;
    position: absolute;
    width: 175px;
    height: 40px;
    background-color: #3bb3e4;
    color: white;
    text-align: center;
    line-height: 40px;
    overflow: hidden;
    left: 165px;
    top: 10px;
    border-radius: 10px;
    cursor: pointer;
    /*z-index: 1;*/
  }

  .visiable {
    visibility: hidden;
  }

  .msg_text {
    position: absolute;
    left: 165px;
    bottom: -12px;
    font-size: 14px;
    color: #8aa0bf;
  }
</style>
