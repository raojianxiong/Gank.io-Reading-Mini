const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var rootDocment = "";
function req(url,data,cb){
  wx.request({
    url: rootDocment+url,
    data:data,
    method:'POST',
    header:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    success:function(res){
      return typeof cb=='function' && cb(res.data)
    },
    fail:function(){
      return typeof cb == 'function' && cb(false)
    },
  })
}

function getReq(url,data,cb){
  wx.request({
    url: rootDocment+url,
    data:data,
    method:'GET',
    header:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    success:function(res){
      return typeof cb=='function'&& cb(res.data)
    },
    fail:function(){
      return typeof cb == 'function' && cb(false)
    },
  })
}
function requestGank(url,  cb) {
  wx.request({
    url: url,

    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      return typeof cb == 'function' && cb(res)
    },
    fail: function () {
      return typeof cb == 'function' && cb(false)
    },
  })
}
function analysicUrl(url, cb) {
  wx.request({
    url: "https://api.lylares.com/video/douying/",
    data:{
      AppKey: 'xpozzdY1ZL',
      url:url,
    },
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      return typeof cb == 'function' && cb(res)
    },
    fail: function () {
      return typeof cb == 'function' && cb(false)
    },
  })
}

// 去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//提示错误信息
function isError(msg,self){
  self.setData({
    showTopTips:true,
    errorMsg:msg
  })
}
//清空错误信息
function clearError(self){
  self.setData({
    showTopTips:false,
    errorMsg:""
  })
}
module.exports = {
  formatTime: formatTime,
  req:req,
  isError:isError,
  clearError:clearError,
  getReq,getReq,
  trim:trim,
  requestGank:requestGank,
  analysicUrl: analysicUrl
}
