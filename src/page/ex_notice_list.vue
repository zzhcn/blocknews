<template>
  <div id="app">
    <headNav></headNav>
    <div class="content_header">
      <div class="header">
        <div class="icon"></div>
        <div class="title">交易所公告</div>
        <div class="change">
          <span class="header_btn1" :class="{'header_btn_active':contentType=='all'}"
                @click="changeType('all')">全部关注</span>
          <span class="header_btn2" :class="{'header_btn_active':contentType=='my'}"
                @click="changeType('my')">我的订阅</span>
        </div>
      </div>
    </div>
    <div class="content_box">
      <div class="item_box" v-for="(item,index) in exData" @click="toDel(item.id)">
        <div class="ex_name">[{{item.from}}]</div>
        <div class="ex_title">{{item.title}}</div>
        <div class="ex_time">{{item.time}}</div>
      </div>
    </div>
    <paging class="page_box" ref="child"
            v-if="dataReady==true"
            v-on:pageChange="pageChange"
            :pages="pageData.pages"
            :page="pageData.page">
    </paging>
  </div>
</template>

<script>
  import headNav from '../components/header.vue'
  import paging from '../components/paging.vue'
  import ax from 'axios'
  import html2canvas from '../../static/js/html2canvas.min'

  export default {
    name: "exNoticeList",
    components: {
      headNav,
      paging
    },
    // props: ['pageData'],
    data() {
      return {
        dataReady: false,
        pageData: {},
        exData: [],
        contentType: 'all',
        baseUrl: 'http://media.iszeng.cn/api/',
        pageSize: 13
      }
    },
    methods: {

      changeType: function (type) {
        this.contentType = type
      },
      creatImg: function () {
        html2canvas(document.getElementById('app')).then(function (canvas) {
          var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
          window.location.href = imgUri; // 下载图片

        })
      },
      toDel: function (id) {
        localStorage.setItem('exNoticeId', id);
        this.$router.push('/exNoticeDel')
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
          console.log(res.data+'222');
          // }
        })
          .catch(function (err) {

          })
      }
    },
    mounted: function () {
      this.pageChange(1)
    }
  }
</script>

<style scoped>
  #app{
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
    background-image: url("../../static/img/icon_announcement.png");
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

  .header_btn1 {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    width: 130px;
  }

  .header_btn2 {
    position: absolute;
    top: 0;
    left: 130px;
    display: inline-block;
    width: 130px;
  }

  .header_btn_active {
    background-color: #3bb3e4;
    color: white;
    border-radius: 16px;
  }

  .content_box {
    position: relative;
    margin: 0 auto;
    width: 1200px;
    height: 624px;
    padding-top: 40px;
    background-color: white;
    font-size: 18px;
  }

  .item_box {
    margin-bottom: 15px;
    line-height: 33px;
    cursor: pointer;
    text-align: left;
  }

  .item_box:hover {
    background-color: #f5f9fb;
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
