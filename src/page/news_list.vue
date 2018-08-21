<template>
  <div id="app">
    <headNav></headNav>
    <div class="content_header">
      <div class="header">
        <div class="icon"></div>
        <div class="title">行业快讯</div>
      </div>
    </div>
    <div class="content_box">
      <div class="search_box">
        <input type="text" v-model="searchData">
        <div class="search_icon"></div>
      </div>
      <div class="item_box" v-for="(item,index) in newsList">
        <div class="time">{{item.time}}</div>
        <div class="title">{{item.title}}</div>
        <div class="content">{{item.content}}</div>
        <div class="share" @click="toShare(item)">
          <span>分享</span>
          <span class="icon"></span>
        </div>
      </div>
    </div>
    <!--<div class="hide_box" id="img">-->
      <!--<div class="none"></div>-->
      <!--<div class="time">{{imgData.time}}</div>-->
      <!--<div class="title">{{imgData.title}}</div>-->
      <!--<div class="content">{{imgData.content}}</div>-->
      <!--<div class="logo">-->
        <!--<span>事故彩金</span>-->
        <!--<br>-->
        <!--<span>blockox.net</span>-->
      <!--</div>-->
      <!--<div class="er_code">{{imgData.time}}</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  import headNav from '../components/header.vue'
  import paging from '../components/paging.vue'
  import ax from 'axios'
  import html2canvas from '../../static/js/html2canvas.min'

  export default {
    name: "newsList",
    components: {
      headNav,
      paging
    },
    // props: ['pageData'],
    data() {
      return {
        imgData:{
          time:'',
          title:'',
          content:''
        },
        searchData: '',
        dataReady: false,
        pageData: {},
        newsList: [],
        contentType: 'all',
        baseUrl: 'http://media.iszeng.cn/api/',
        pageSize: 13
      }
    },
    methods: {
      toShare:function(data){
        this.imgData=data
      },
      changeType: function (type) {
        this.contentType = type
      },
      creatImg: function () {
        html2canvas(document.getElementById('img')).then(function (canvas) {
          var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
          window.location.href = imgUri; // 下载图片

        })
      },
      toDel: function (id) {
        localStorage.setItem('exNoticeId', id);
        this.$router.push('/exNoticeDel')
      },
      getData: function (page) {
        const that = this;
        const url = 'news?pagesize=' + this.pageSize + '&page=' + page;
        const callback = function (res) {
          that.newsList = res.data;
          console.log(res)
        }
        this.get(url, callback)
      },
      pageChange: function (page) {
        const that = this;
        const url = that.baseUrl + 'notice?pagesize=' + this.pageSize + '&page=' + page;
        ax.get(url).then(function (res) {
          // console.log(res.data);
          // if (res.data.success == true) {
          that.exData = res.data.data;
          that.pageData.pages = res.data.meta.pagination.total_pages;
          that.pageData.page = res.data.meta.pagination.current_page;
          that.dataReady = true;
          console.log(res.data + '222');
          // }
        })
          .catch(function (err) {

          })
      }
    },
    mounted: function () {
      this.getData(1);
    }
  }
</script>

<style scoped>

  .hide_box .logo{
    position: absolute;
    right: 40px;
    bottom: 86px;
    background-image: url("../../static/img/er_code.jpg");
    width: 250px;
    height: 250px;
    background-size: cover;
  }
  .hide_box .er_code{
    position: absolute;
    right: 40px;
    bottom: 86px;
    background-image: url("../../static/img/er_code.jpg");
    width: 250px;
    height: 250px;
    background-size: cover;
  }
  .hide_box .content{
    margin-top: 52px;
    margin-left: 40px;
    width: 1160px;
    font-size: 48px;
    line-height: 84px;
    color: #666;
  }
  .hide_box .title{
    margin-top:60px ;
    margin-left: 40px;
    font-size: 56px;
    color: #333;
  }
  .hide_box .time{
    margin-top: 682px;
    margin-left: 134px;
    font-size: 42px;
    color: #8aa0bf;
  }
  .none{
    position: relative;
    width: 100%;
    height: 1px;
  }
  .hide_box{
    position: fixed;
    top: -600px;
    left: 0;
    background-image: url("../../static/img/bg_muban.png");
    width: 1242px;
    height: 2208px;
    transform:scale(.4,.4);
    text-align: left;
  }
  .item_box .share {
    position: relative;
    color: #3bb3e4;
    font-size: 16px;
    margin-top: 35px;
    margin-left: 1085px;
    width: 55px;
  }
  .item_box .share .icon {
    position: absolute;
    top: 7px;
    right: 0;
    background-image: url("../../static/img/icon_fenxiang.png");
    width: 18px;
    height: 18px;
    background-size: contain;
  }

  .item_box .content {
    margin-left: 85px;
    width: 1040px;
    font-size: 14px;
    line-height: 25px;
    color: #666;
  }

  .item_box .title {
    margin-left: 85px;
    font-size: 16px;
    color: #333;
  }

  .item_box .time {
    margin-left: 26px;
    font-size: 16px;
    color: #3bb3e4;

  }

  #app {
    /*padding-top: 130px;*/
  }

  .page_box {
    margin: 16px auto 100px;
  }

  .content_header {
    position: relative;
    margin: 20px auto 0;
    width: 1200px;
  }

  .content_header .header {
    position: relative;
    width: 1200px;
    height: 45px;
    font-size: 18px;
  }

  .content_header .header .icon {
    position: absolute;
    top: 10px;
    left: 0;
    background-image: url("../../static/img/icon_alerts.png");
    width: 26px;
    height: 26px;
  }

  .content_header .header .title {
    position: absolute;
    top: 0;
    left: 40px;
    line-height: 45px;
    font-weight: bold;
  }

  .content_header .header .change {
    position: absolute;
    top: 0;
    right: 0;
    width: 260px;
    height: 32px;
    border-radius: 16px;
    line-height: 32px;
    color: #000;
    cursor: pointer;
    background-color: #e3e5e6;
    text-align: center;
    font-size: 16px;
  }

  .search_box {
    position: absolute;
    top: 20px;
    right: 26px;
    width: 200px;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #8aa0bf;
    background-color: white;
  }

  .search_box input {
    border: none;
    outline: none;
    width: 100px;
    height: 30px;
    position: absolute;
    top: 0;
    left: 30px;
  }

  .search_box .search_icon {
    background-image: url("../../static/img/icon_search1.png");
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
  }

  .content_box {
    position: relative;
    margin: 0 auto;
    width: 1200px;
    /*height: 624px;*/
    padding-top: 20px;
    padding-bottom: 20px;
    background-color: white;
    font-size: 18px;
  }

  .item_box {
    width: 1140px;
    margin: 30px auto 0;
    line-height: 33px;
    cursor: pointer;
    text-align: left;
    border-bottom: 1px solid #dbe3e7;
  }

  .ex_name {
    display: inline-block;
    color: #3bb3e4;
    margin-left: 26px;
    width: 155px;
  }

  .ex_title {
    display: inline-block;
    margin-left: 26px;
    color: #333;
    width: 800px;
  }

  .ex_time {
    display: inline-block;
    color: #8aa0bf;
  }
</style>
