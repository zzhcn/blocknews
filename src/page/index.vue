<template>
  <div id="app">
    <headNav></headNav>
    <section>
      <div class="index_header_box">
        <div class="index_header_con index_header_con1">
          <span class="num">{{headerData.coinAmount}}</span>
          <span class="title">货币总量（个）</span>
        </div>
        <div class="index_header_con index_header_con2">
          <span class="num">{{headerData.valueAmount}}</span>
          <span class="title">流通总市值（亿）</span>
        </div>
        <div class="index_header_con index_header_con3">
          <span class="num">{{headerData.exAmount}}</span>
          <span class="title">交易所（个）</span>
        </div>
      </div>
      <div class="index_content_box1">
        <div class="index_information">
          <div class="header">
            <div class="icon"></div>
            <div class="title">行业快讯</div>
            <div class="more" @click="toJump('newsList')">更多&nbsp;&nbsp;&nbsp;></div>
          </div>
          <div class="info_con_box">
            <div class="none"></div>
            <div class="news_item" v-for="(item,index) in newsList" @click="toNewsDel=(item.id)">
              <div class="title">{{item.title}}</div>
              <div class="content">{{item.content}}</div>
              <div class="time">{{item.time}}</div>
            </div>
          </div>
        </div>
        <div class="index_notice">
          <div class="header">
            <div class="icon"></div>
            <div class="title">交易所公告</div>
            <div class="more">更多&nbsp;&nbsp;&nbsp;></div>
          </div>
          <div class="notice_con_box">
            <div class="none"></div>
            <div class="ex_item" v-for="(item,index) in exList" @click="toNewsDel=(item.id)">
              <div class="title">[&nbsp;{{item.from}}&nbsp;]</div>
              <div class="time">{{item.time}}</div>
              <div class="content">{{item.title}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="index_content_box2">
        <div class="gus_box">
          <div class="gus_title">古斯币行</div>
          <div class="gus_con_box">
            <div class="content_item" v-for="(item,index) in gusList">
              <img :src="item.pic" alt="">
              <div class="box">
                <div class="title">{{item.title}}</div>
                <div class="author">{{item.author}}</div>
                <div class="time">{{item.time}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="block_box">
          <div class="gus_title">区块优评</div>
          <div class="gus_con_box">
            <div class="content_item" v-for="(item,index) in gusList">
              <img :src="item.pic" alt="">
              <div class="box">
                <div class="title">{{item.title}}</div>
                <div class="content">{{item.content}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="none"></div>
      <div class="token_header">
        <div class="logo"></div>
        <div class="title">加密令牌</div>
        <div class="btn_box">
          <span class="header_btn1" :class="{'header_btn_active':tokenType=='all'}"
                @click="changeType('all')">推荐</span>
          <span class="header_btn2" :class="{'header_btn_active':tokenType=='my'}"
                @click="changeType('my')">自选</span>
        </div>
        <div class="more">更多&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;></div>
      </div>
      <div class="token_box">
        <div class="token_item" v-for="(item,index) in 4" :class="{'margin14':index!=3}">
          <img src="" alt="" class="icon">
          <div class="none"></div>
          <div class="name">BTC</div>
          <div class="price">$9999.99</div>
          <div class="amount">流通市值：9999亿</div>
          <div class="line"></div>
          <div class="text">比特币</div>
          <div class="star1"></div>
          <div class="star1"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

  import headNav from '../components/header.vue'

  export default {
    name: 'app',
    components: {
      headNav,
    },
    data() {
      return {
        tokenType:'all',
        newsList: [],
        headerData: {
          coinAmount: 1385,
          exAmount: 210,
          valueAmount: 21499
        },
        exList: [],
        gusList: [],
        blockList: []
      }
    },
    methods: {
      changeType: function (type) {
        this.tokenType = type
      },
      toNewsDel: function (id) {
        sessionStorage.setItem('newsId', id);
        this.index.push('/newsDel')
      },
      toJump: function (url) {
        this.$router.push('/' + url + '')
      },
      getNewsData: function () {
        const that = this;
        const url = 'news?pagesize=3&page=1';
        const callback = function (res) {
          that.newsList = res.data;
          console.log(res)
        };
        this.get(url, callback)
      },
      getExData: function () {
        const that = this;
        const url = 'notice?pagesize=6&page=1';
        const callback = function (res) {
          that.exList = res.data;
          console.log(res)
        }
        this.get(url, callback)
      },

      getGusData: function () {
        const that = this;
        const url = 'menu/3?pagesize=3&page=1';
        const callback = function (res) {
          that.gusList = res.data[0].article;
          console.log(res)
        }
        this.get(url, callback)
      },
      getBlockData: function () {
        const that = this;
        const url = 'menu/4?pagesize=3&page=1';
        const callback = function (res) {
          that.gusList = res.data[0].article;
          console.log(res)
        };
        this.get(url, callback)
      },
      dataFun: function () {
        this.getNewsData();
        this.getExData();
        this.getGusData();
        this.getBlockData()
      }
    },
    mounted: function () {
      this.dataFun()
    }
  }
</script>

<style>
  .token_item .star2{
    position: absolute;
    bottom: 15px;
    right: 16px;
    background-image: url("../../static/img/icon_collection2.png");
    width: 20px;
    height: 18px;
  }
  .token_item .star1{
    position: absolute;
    bottom: 15px;
    right: 16px;
    background-image: url("../../static/img/icon_collection1.png");
    width: 20px;
    height: 18px;
  }
  .token_item .text{
    position: absolute;
    bottom: 15px;
    left: 16px;
    font-size: 16px;
    color: #333;
  }
  .token_item .line{
    position: absolute;
    bottom:45px ;
    left: 16px;
    width:256px ;
    height: 1px;
    background-color: #dbe3e7;
  }
  .token_item .amount{
    margin-top: 20px;
    /*margin-left: 65px;*/
    width: 272px;
    text-align: right;
    font-size: 16px;
    color: #666;
  }
  .token_item .price{
    margin-top: 20px;
    margin-left: 65px;
    font-size: 34px;
    color: #333;
  }
  .token_item .name{
     margin-top: 22px;
    margin-left: 65px;
    font-weight: bold;
    font-size: 34px;
    color: #333;
  }
  .token_item .icon{
    position: absolute;
    top: 26px;
    left: 16px;
    width: 30px;
    height: 30px;
  }
  .token_item{
    position: relative;
    display: inline-block;
    width: 288px;
    height: 220px;
    background-color: white;
  }
  .margin14{
    margin-right: 15px;
  }
  .token_box{
    font-size:0;
    position: relative;
    text-align: left;
    margin:  16px auto 100px;
    width: 1200px;
    height: 220px;
  }
  .header_btn1 {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 70px;
  }

  .header_btn2 {
    position: absolute;
    top: 0;
    left: 70px;
    display: inline-block;
    width: 70px;
  }

  .header_btn_active {
    background-color: #3bb3e4;
    color: white;
    border-radius: 16px;
  }
  .btn_box{

    position: absolute;
    top: 14px;
    right: 155px;
    width: 140px;
    height: 32px;
    border-radius: 16px;
    line-height: 32px;
    color: #000;
    cursor: pointer;
    background-color: #e3e5e6;
    text-align: center;
    font-size: 16px;
  }
  .token_header .more {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 26px;
    line-height: 60px;
    font-size: 18px;
    color: #3bb3e4;
  }

  .token_header .title {
    font-weight: bold;
    position: absolute;
    top: 21px;
    font-size: 16px;
    color: #333;
    left: 67px;
  }

  .token_header .logo {
    position: absolute;
    background-image: url("../../static/img/icon_encryption.png");
    width: 26px;
    height: 26px;
    top: 17px;
    left: 26px;
  }

  .token_header {
    position: relative;
    width: 1200px;
    height: 60px;
    margin: 70px auto 0;
    background-color: white;
  }

  .block_box {
    position: absolute;
    top: 32px;
    right: 0;
    width: 585px;
    height: 596px;
  }

  .content_item .content {
    position: absolute;
    top: 65px;
    font-size: 14px;
    color: #666;
    right: 15px;
    text-align: left;
    left: 26px;
    line-height: 26px;
  }

  .content_item .time {
    position: absolute;
    bottom: 10px;
    font-size: 14px;
    color: #8aa0bf;
    right: 0;
  }

  .content_item .author {
    position: absolute;
    bottom: 35px;
    font-size: 14px;
    color: #8aa0bf;
    right: 0;
  }

  .content_item .title {
    position: absolute;
    text-align: left;
    left: 26px;
    top: 12px;
    font-size: 16px;
    color: #343434;
  }

  .content_item .box {
    overflow: hidden;
    position: absolute;
    right: 26px;
    width: 312px;
    height: 118px;
    border-bottom: 1px solid #dbe3e7;
  }

  .content_item img {
    position: absolute;
    top: 20px;
    left: 26px;
    width: 220px;
    height: 118px;
  }

  .content_item {
    position: relative;
    padding-top: 20px;
    width: 580px;
    height: 144px;
    background-color: white;
    overflow: hidden;
  }

  .ex_item .content {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 10px;
    color: #333;
    overflow: hidden;
  }

  .ex_item .time {
    position: absolute;
    top: 0;
    right: 0;
    color: #333;
  }

  .ex_item .title {
    position: absolute;
    top: 0;
    left: 0;
    color: #3bb3e4;
  }

  .ex_item {
    font-size: 14px;
    position: relative;
    text-align: left;
    width: 350px;
    margin: 20px auto 0;
    border-bottom: 1px solid #dbe3e7;
    height: 65px;
    cursor: pointer;
  }

  .news_item .content {
    margin-top: 26px;
    margin-left: 85px;
    width: 640px;
    font-size: 14px;
    line-height: 25px;
    color: #666;
    max-height: 80px;
    overflow: hidden;
  }

  .news_item .title {
    margin-left: 26px;
    font-size: 16px;
    width: 600px;
    color: #3bb3e4;
  }

  .news_item .time {
    position: absolute;
    right: 0;
    bottom: 7px;
    font-size: 16px;
    color: #333;
    width: 100%;
    text-align: right;

  }

  .none {
    width: 100%;
    height: 1px;
  }

  .news_item {
    cursor: pointer;
    position: relative;
    text-align: left;
    width: 720px;
    margin: 26px auto 0;
    height: 148px;
    border-bottom: 1px solid #dbe3e7;
    /*background-color: rebeccapurple;*/
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  section {
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }

  .index_header_box {
    position: relative;
    width: 1200px;
    height: 120px;
    margin: 16px auto 0;
    background-color: #fff;
  }

  .index_header_con1 {
    left: 0;
  }

  .index_header_con2 {
    left: 400px;
  }

  .index_header_con3 {
    left: 800px;
  }

  .index_header_con {
    position: absolute;
    top: 0;
    width: 400px;
    text-align: center;
  }

  .index_header_con .num {
    display: block;
    color: #343434;
    font-size: 34px;
    margin-top: 30px;

  }

  .index_header_con .title {
    display: block;
    color: #343434;
    font-size: 14px;
    margin-top: 16px;
  }

  .index_content_box1 {
    position: relative;
    margin-top: 20px;
    height: 567px;
    width: 1200px;
  }

  .index_information {
    position: absolute;
    top: 0;
    left: 0;
    width: 770px;
    height: 567px;
  }

  .index_information .header {
    position: relative;
    width: 770px;
    height: 45px;
    font-size: 18px;
  }

  .index_information .header .icon {
    position: absolute;
    top: 10px;
    left: 0;
    background-image: url("../../static/img/icon_alerts.png");
    width: 26px;
    height: 26px;
  }

  .index_information .header .title {
    position: absolute;
    top: 0;
    left: 40px;
    line-height: 45px;
    font-weight: bold;
  }

  .index_information .header .more {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 45px;
    color: #3bb3e4;
    cursor: pointer;
  }

  .info_con_box {
    width: 770px;
    height: 552px;
    background-color: #fff;
  }

  .index_notice {
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    height: 567px;
  }

  .index_notice .header {
    position: relative;
    width: 400px;
    height: 45px;
    font-size: 18px;
  }

  .index_notice .header .icon {
    position: absolute;
    top: 10px;
    left: 0;
    background-image: url("../../static/img/icon_announcement.png");
    width: 26px;
    height: 26px;
  }

  .index_notice .header .title {
    position: absolute;
    top: 0;
    left: 40px;
    line-height: 45px;
    font-weight: bold;
  }

  .index_notice .header .more {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 45px;
    color: #3bb3e4;
    cursor: pointer;
  }

  .index_notice {
    width: 400px;
    height: 552px;
    /*background-color: #fff;*/
  }

  .notice_con_box {
    width: 400px;
    height: 552px;
    background-color: #fff;
  }

  .index_content_box2 {
    position: relative;
    margin-top: 32px;
    height: 596px;
    width: 1200px;
  }

  .gus_box {
    position: absolute;
    top: 32px;
    left: 0;
    width: 585px;
    height: 596px;
  }

  .block_box {
    position: absolute;
    top: 32px;
    right: 0;
    width: 585px;
    height: 596px;
  }

  .gus_title {
    position: relative;
    width: 585px;
    height: 146px;
    margin-bottom: 20px;
    background-color: #3bb3e4;
  }

  .gus_con_box {
    position: relative;
    width: 585px;
    height: 434px;
    background-color: #fff;
    margin-top: 15px;

  }

  .gus_con_item {

  }
</style>
