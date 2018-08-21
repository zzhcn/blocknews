<template>
  <div class="">
    <headNav></headNav>
    <div class="banner"></div>
    <div class="content_box">
      <div class="content_header">
        <div class="header">
          <div class="icon"></div>
          <div class="title">古斯币行</div>

        </div>
        <div class="menu_box">
          <div class="menu_item" v-for="(item,index) in menuData" :class="{'menu_active':menuIndex==index}" @click="setMenu(index)">{{item.title}}</div>
          <div class="search_box">
          <input type="text" v-model="searchData">
          <div class="search_icon"></div>
        </div>
        </div>
      </div>
      <div class="margin15"></div>
      <div class="content_item" v-for="(item,index) in dataList">
        <img :src="item.pic" alt="">
        <div class="box">
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.summary}}</div>
          <div class="time">{{item.author}}&nbsp;&nbsp;&nbsp;&nbsp; {{item.time}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import headNav from '../components/header.vue'
  import ax from 'axios'

  export default {
    name: "gus_list",
    components: {
      headNav
    },
    data() {
      return {
        menuData:[],
        menuIndex:0,
        searchData:null,
        dataList:[],
      }
    },
    methods: {
      setMenu:function (index) {
        this.menuIndex=index;
        this.dataList=this.menuData[index].article
      },
      getListData:function () {
        const that=this;
        const url='menu/3';
        const callback=function (res) {
          that.menuData=res.data;
          that.setMenu(0);
          console.log(res)
        }
        this.get(url,callback)
      }
    },
    mounted: function () {
      this.getListData()
    }
  }
</script>

<style scoped>
  .margin15{
    width: 100%;
    height: 15px;
  }
  .content_item .time{
    position: absolute;
    bottom: 18px;
    right: 24px;
    font-size: 18px;
    color: #8aa0bf;
  }
  .content_item .content{
    text-align: left;
    position: absolute;
    top: 78px;
    left: 76px;
    width: 690px;
    height: 86px;
    overflow: hidden;
    font-size: 20px;
    color: #666;
    line-height: 28px;
  }
  .content_item .title{
    position: absolute;
    left: 76px;
    top: 12px;
    font-size: 24px;
    color: #343434;
  }
  .content_item .box{
    position: absolute;
    right: 25px;
    width: 764px;
    height:  205px;
    border-bottom: 1px solid #dbe3e7;
  }
  .content_item img{
    position: absolute;
    top: 60px;
    left: 26px;
    width: 384px;
    height: 206px;
  }
  .content_item{
    position: relative;
    padding-top: 60px;
    width: 1200px;
    height: 206px;
    background-color: white;
  }
  .menu_item{
    position: relative;
    display: inline-block;
    width: auto;
    height: 78px ;
    cursor: pointer;
    line-height: 78px;
    margin-right: 70px;
  }
  .menu_active{
    border-bottom: 2px solid #3bb3e4;
    color: #3bb3e4;
  }
  .menu_box {
    text-align: left;
    position: relative;
    font-size: 18px;
    padding-left: 26px;
    width: 1174px;
    height: 80px;
    background-color: white;

  }

  .banner {
    width: 100%;
    min-width: 1200px;
    height: 300px;
    background-color: black;
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
    background-image: url("../../static/img/icon_gusibihang.png");
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
    top: 25px;
    right: 25px;
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
  }
</style>
