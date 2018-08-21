<template>
  <div class="header_box">
    <div class="header_con">
      <div class="header_logo">LOGO</div>
      <div class="header_login_box">
        <span class="header_login_btn" @click="toLogin()">登录</span>
        <span class="header_reg_btn">注册</span>
      </div>
      <div class="header_search"></div>
      <div class="header_menu_box">
        <div @click="pageJump(item.mark,index)" v-for="(item,index) in menuData">
          <p>{{item.title}}</p>
          <span v-if="menuIndex==index"></span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import ax from 'axios'
  export default {
    name: "head",
    data() {
      return {
        menuData:[],
        menuIndex:0
      }
    },
    methods: {
      getMenu:function(){
        const that = this;
        const url = that.baseUrl + 'menu';
        ax.get(url).then(function (res) {
          that.menuData=res.data.data;
          sessionStorage.setItem('menuData',JSON.stringify(res.data.data));
          console.log(res.data);
        })
          .catch(function (err) {//网络响应错误
            // 响应错误回调
          })
      },
      toLogin: function () {
        this.$router.push('/login')
      },
      pageJump:function (name,index) {
        this.$router.push('/'+name);
        localStorage.setItem('menuIndex',index)
      }
    },
    mounted: function () {
      if(localStorage.getItem('menuIndex')){
        this.menuIndex=localStorage.getItem('menuIndex')
      }
      if(sessionStorage.getItem('menuData')){
        this.menuData=JSON.parse(sessionStorage.getItem('menuData'))
      }else {
        this.getMenu()
      }
    }
  }
</script>

<style scoped>
  .header_box {
    position: relative;
    width: 100%;
    height: 70px;
    background-color: #fff;
    box-shadow: 0 4px 7px rgba(26, 26, 26, .1);
    font-size: 18px;
    line-height: 70px;
  }

  .none {
    position: relative;
    width: 100%;
    height: 1px;
  }

  .header_box span {
    cursor: pointer;
  }

  .header_con {
    position: relative;
    width: 1200px;
    height: 70px;
    margin: 0 auto;
  }

  .header_logo {
    position: absolute;
    top: 0;
    left: 0;
  }

  .header_login_box {
    position: absolute;
    top: 0;
    right: 0;
  }

  .header_login_btn {
    color: #8aa0bf;
    margin-top: 21px;
    margin-right: 22px;
    line-height: 28px;
  }

  .header_reg_btn {
    display: inline-block;
    margin-top: 21px;
    line-height: 28px;
    width: 70px;
    height: 28px;
    background-color: #3bb3e4;
    border-radius: 14px;
    color: #fff;
    text-align: center;
  }

  .header_search {
    position: absolute;
    right: 165px;
    top: 25px;
    background-image: url("../../static/img/icon_search1.png");
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .header_menu_box {
    position: absolute;
    right: 250px;
    top: 0;
    color: #000;
  }

  .header_menu_box div {
    position: relative;
    display: inline-block;
    margin-right: 60px;
    cursor: pointer;
    height: 70px;
  }

  .header_menu_box div span {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #3bb3e4;
    bottom: 0;
    left: 0;
  }

  .mt_72 {
    position: relative;
    width: 100%;
    height: 72px;
  }

  .mt_26 {
    position: relative;
    width: 100%;
    height: 26px;
  }
</style>
