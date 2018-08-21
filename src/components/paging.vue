<template>
  <div id="page">
    <div class="none"></div>
    <div class="page_content">
      <div class="last_btn" @click="toPage(page-1)" v-if="page!=1">上一页</div>
      <div class="btn_list_box" v-for="(item,index) in pageBtnList" v-if="index<5" :class="{'btn_active':item==page}" @click="toPage(item)">{{item}}</div>
      <div class="pages_input">
        <input type="text" v-model="pageWill">
      </div>
      <div class="next_btn" @click="toPage(pageWill)">
        <span>跳转</span>
      </div>
      <div class="next_btn" @click="toPage(page+1)" v-if="page!=pages">下一页</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "page",
    props: {
      page: Number,
      pages:Number
    },
    // computed: {
    //   normalizedSize: function () {
    //     return this.pageData.trim().toLowerCase()
    //   }
    // },
    data () {
      return {
        pageWill:1,
        toPageNum:1,
        pageBtnList:[],
        counter:0,
        btnNumber:5
      }
    },
    methods:{
      readyData:function(){
        var halfBtnNumber=parseInt(this.btnNumber/2);
        var num=this.page;
        if(this.pages>=this.btnNumber){
          if(this.page>halfBtnNumber){
            var j=0;
            for(var i=0;i<this.btnNumber;i++){
              if(i<halfBtnNumber){
                this.pageBtnList.push(num-halfBtnNumber+j);
              }else if(i==halfBtnNumber){
                j=0;
                this.pageBtnList.push(num)
              }else {
                this.pageBtnList.push(num+j)
              }
              j++;
            }
          }else {
            for(var k=0;k<this.btnNumber;k++){
              this.pageBtnList.push(k+1)
            }
          }
        }else {
          for(var k=0;k<this.pages;k++){
            this.pageBtnList.push(k+1)
          }
        }
      },
      toPage:function (page) {
          this.$emit('pageChange', page);
      }

    },
    mounted:function () {
      this.readyData();
      console.log(this.page)
    }
  }
</script>

<style scoped>
  .btn_active{
    border: 2px solid #3bb3e4;
    color: #3bb3e4!important;
    width: 45px;
  }
  .btn_list_box{
    margin-left: 20px;
    margin-right: 20px;
    width: 35px;
    height: 24px;
    color: #333;
  }
  .none {
    position: relative;
    width: 100%;
    height: 1px;
  }

  #page {
    width: 1200px;
    height: 70px;
    background-color: white;
  }

  .next_btn{
    margin-top: 23px;
    margin-right: 30px;
    width: 70px;
    height: 24px;
    background-color: #3bb3e4;
    color: white;
  }
  .last_btn{
    margin-top: 23px;
    width: 70px;
    height: 24px;
    background-color: #3bb3e4;
    color: white;
  }
  .page_content div{
    display: inline-block;
    text-align: center;
    font-size: 14px;
    /*color: white;*/
    line-height: 24px;
    border-radius: 12px;
    cursor: pointer;
  }
  .pages_input{
    padding-left: 5px;
    padding-right: 5px;
    width: 40px;
    height: 24px;
    border-radius: 12px;
    text-align: center;
    margin-right: 30px;
    border: 1px solid #3bb3e4;
  }
  .pages_input input{
    text-align: center;
    width: 40px;
    border: none;
    outline: none;
  }
  .page_content {
    width: auto;
    height: 70px;
    position: relative;
    margin: 0 auto;
  }
</style>
