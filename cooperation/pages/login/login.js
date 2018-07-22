var app = getApp();
var util = require('../../utils/util.js');

Page({
  data: {
    account:"",
    password:""
  },
  onLoad: function (options) {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          account: options.account,
          password: options.password
        })
      }
    });
  },

  formSubmit: function (e) {
    var accountVal = e.detail.value.account;
    var passwordVal = e.detail.value.password;
    var vcode = e.detail.value.vcode;
    var self = this;
    if ("" == util.trim(accountVal) || "" == util.trim(passwordVal)) {
      util.isError("请输入账号密码", self);
      return;
    } else {
      util.clearError(self);
    }
    app.ajax.req('/itdragon/login', {
      "account": accountVal,
      "password": passwordVal
    }, function (res) {
      console.log(res);
    });
  },

  visited:function(){
    wx.switchTab({
      url: '../news/news',
    })
  },
  notice:function(){
    wx.showModal({
      title: '干货品读 V1.0',
      content: '此小程序解析干货API，对Android、IOS、前端等多个分类进行整理，并加入了快递查询\r\n旨在:\r\n  1.解决用电脑查看干货最新技术动态的复杂度，提供分类查看，支持动态解析视频url得到播放地址(解析数量过多可能造成缓慢)，图片支持放大缩小\r\n  2.方便用户买快递之前对送货时常有个及时的了解\r\n本版本暂不支持用户登录注册',
    })
  }
})
