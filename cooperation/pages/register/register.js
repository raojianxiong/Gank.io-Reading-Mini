// pages/register/register.js
var app = getApp();
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips:false,
    errorMsg:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          windowHeight:res.windowHeight,
          windowWidth:res.windowWidth
        });
      },
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  formSubmit:function(e){
    console.log(e)
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    var subPassword = e.detail.value.subPassword;
    var self = this;
    if("" == util.trim(account)){
      util.isError("账号不能为空",self);
      return;
    }else{
      util.clearError(self);
      app.ajax.req('/register/checkLoginName',{
        'loginName':account
      },function(res){
        if(!res){
          uril.isError("账号已经被注册过",slef);
          return;
        }
      })
    }

    if("" == util.trim(password)){
      util.isError("密码不能为空",self)
      return;
    }else{
      util.clearError(self)
    }

    if(subPassword != password){
      util.isError("输入密码不一致",self)
    }

    app.ajax.req('/itdragon/register',{
      'account':account,
      'password':password
    },function(res){
      if(res == true){
        wx.showModal({
          title: '注册状态',
          content: "注册成功，请点击确定登录",
          success:function(res){
            if(res.confirm){
              wx.redirectTo({
                url: '../login/login?account=' + account + '&password?=' + password + '',
              })
            }
          }
        })
      }else{
        wx.showToast({
          title: '注册失败',
          icon:"error",
          duration:2000
        })
      }
    })
  }
})