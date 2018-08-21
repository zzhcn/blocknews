<template>
<div id="app">
  <headNav></headNav>
  <!--<div class="none"></div>-->
  <section>
    <div class="left_box">
      <div class="contact_us">
        <div class="content_title">
          <div class="phone_logo">&nbsp;</div>
          <div class="contact_title">联系我们</div>
        </div>
        <div class="title_style1">联系电话：</div>
        <div class="content_style1">{{pageData.phone}}</div>
        <div class="title_style1">客服电话：</div>
        <div class="content_style1">{{pageData.tel}}</div>
        <div class="content_style1">（&nbsp;工作日&nbsp;9:00-18:00&nbsp;）</div>

      </div>
      <div class="loop">
        <div class="content_title">
          <div class="coop_logo">&nbsp;</div>
          <div class="contact_title">商务市场合作</div>
        </div>
        <div class="mt_26"></div>
        <div class="title_style1">充值类合作邮箱：</div>
        <div class="content_style1">{{pageData.mail}}</div>
        <div class="title_style1">商务合作：</div>
        <div class="content_style1">{{pageData.mail}}</div>
        <div class="title_style1">QQ：</div>
        <div class="content_style1">{{pageData.QQ}}</div>
      </div>
    </div>
    <div class="right_box">
      <div class="top_box">
        <div class="none"></div>
        <div class="top_title">关于我们</div>
        <div class="about_us_content">{{pageData.content}}</div>
      </div>
      <div class="bottom_box">
        <div class="none"></div>
        <div class="content_title2">
          <div class="address_logo">&nbsp;</div>
          <div class="contact_title">地址</div>
        </div>
        <div id="allmap"></div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
  import headNav from '../components/header.vue'
  import ax from 'axios'
  export default {
    name: 'about',
    components: {
      headNav,
    },
    data () {
      return {
        pageData:{

        },

        baseUrl: 'http://media.iszeng.cn/api/',
      }
    },
    methods: {
      getData:function(){
        const that = this;
        const url = that.baseUrl + 'about';

        ax.get(url).then(function (res) {
          console.log(res.data);
          if(res.data.success==true){
            that.pageData=res.data.data;
            that.mapReady(res.data.data.latitude,res.data.data.longitude,res.data.data.intro,res.data.data.address)
          }
        })
          .catch(function (err) {//网络响应错误
            // 响应错误回调
            alert('网络错误')
          })
      },
      mapReady:function(latitude,longitude,intro,address){
        console.log(latitude,longitude)
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(longitude, latitude);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        map.centerAndZoom(point, 15);
        var opts = {
          width: 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title: address, // 信息窗口标题
          enableMessage: true,//设置允许信息窗发送短息
          message: "亲耐滴，戳下面的链接看下地址喔~"
        }
        var infoWindow = new BMap.InfoWindow(intro, opts);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
          map.openInfoWindow(infoWindow, point); //开启信息窗口
        });
      },
    },
    mounted: function () {
      this.getData()
    }
  }
</script>

<style scoped>
  section{
    position: relative;
    margin: 30px auto 100px;
    width: 1200px;
    height: 700px;
  }
  .none{
    width: 100%;height: 1px;
  }
  .left_box{
    position: absolute;
    top: 0;
    left: 0;
    width: 455px;
    height: 700px;
    background-color: white;
  }
  .right_box{
    position: absolute;
    top: 0;
    right: 0;
    width: 715px;
    height: 700px;
  }
  .top_box{
    position: relative;
    width: 715px;
    height: 300px;
    background-color: white;
  }
  .bottom_box{
    position: relative;
    width: 715px;
    height: 370px;
    margin-top: 30px;
    background-color: white;
  }
  #allmap{
    width: 655px;
    height: 250px;
    margin-top: 20px;
    margin-left: 26px;
  }
  .contact_us{
    margin-top: 26px;
    margin-left: 26px;
  }
  .phone_logo{
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../static/img/icon_contactus.png");
    width: 40px;
    height: 40px;
    padding-top: -20px;
  }
  .contact_title{
    position: absolute;
    top: 0;
    left: 70px;
    font-size: 18px;
    color: #000;
    width:200px;
    height: 40px;
    font-weight: bold;
    line-height: 40px;
  }
  .content_title{
    position: relative;
    width:400px ;
    height: 40px;
  }
  .content_title2{
    position: relative;
    width:400px ;
    height: 40px;
    margin-top: 20px;
    margin-left: 26px;
  }
  .title_style1{
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  .content_style1{
    margin-top: 20px;
    font-size: 16px;
    color: #666;
  }
  .coop_logo{
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../static/img/icon_cooperation.png");
    width: 40px;
    height: 40px;
    padding-top: -20px;
  }
  .loop{
    margin-top: 72px;
    margin-left: 26px;
  }
  .top_title{
    width: 106px;
    height: 20px;
    font-size: 20px;
    margin: 26px auto 20px;
    color: #333;
    border-left: 4px solid #3bb3e4;
    text-align: center;
    font-weight: bold;
  }
  .about_us_content{
    width: 655px;
    margin: 0 auto;
    font-size: 16px;
    color: #666;
  }
  .address_logo{
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("../../static/img/icon_address.png");
    width: 40px;
    height: 40px;
  }
  #app{
    text-align: left;
  }
</style>
