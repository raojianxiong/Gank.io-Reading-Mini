// pages/news/news.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: 4,
    showTab: 0,
    tabNav: {
      tabNum: 5,
      tabItem: [{
          "id": 0,
          "text": "Android",
        },
        {
          "id": 1,
          "text": "iOS",
        }, {
          "id": 2,
          "text": "前端",
        }, {
          "id": 3,
          "text": "休息视频",
        }, {
          "id": 4,
          "text": "福利"
        }
      ]
    },
    android: true,
    ios: false,
    web: false,
    video: false,
    picture: false,

    result: [
      // androidList
      {
        isLoadMore: true,
        isLoadFinish: false,
        select: true,
        page: 1,
        list: []
      },
      //iosList
      {
        isLoadMore: true,
        isLoadFinish: false,
        select: false,
        page: 1,
        list: []
      },
      //webFrontList
      {
        isLoadMore: true,
        isLoadFinish: false,
        select: false,
        page: 1,
        list: []
      },
      //videoList
      {
        isLoadMore: true,
        isLoadFinish: false,
        select: false,
        page: 1,
        list: []
      },
      //pictureList
      {
        isLoadMore: true,
        isLoadFinish: false,
        select: false,
        page: 1,
        list: []
      }
    ],

    isLoadMore: true,
    isLoadFinish: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestDatas();
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
  setTab: function(e) {
    var self = this;
    var index = e.currentTarget.dataset.index;
    self.setData({
      showTab: index,
    });
    this.switchTabContent(index);
    if (self.data.result[index].select == false) {
      var resultCopy = self.data.result;
      resultCopy[index].select = true;
      resultCopy = resultCopy;
      self.setData({
        result: resultCopy,
      });

      //请求数据 
      this.requestDatas();

    }
  },

  requestDatas: function() {
    var self = this;
    var index = self.data.showTab;
    var url = app.globalData.remoteUrl + self.data.tabNav.tabItem[index].text + "/" + self.data.count + "/" + self.data.result[index].page;

    app.ajax.requestGank(url, function(res) {

      if (res == false) {

        wx.showToast({
          title: '请求失败',
          duration: 2000
        })

      } else {

        if (res.data.error) {
          resultTemp[index].isLoadMore = false;
          resultTemp[index].isLoadFinish = true;
        } else {
          var results = res.data.results;
          if (index == 3) {
            if (results.length > 0) {
              self.analysicUrl(0, results);
            }
            return;
          }
          var resultTemp = self.data.result;
          resultTemp[index].list = resultTemp[index].list.concat(results);
          resultTemp[index].page = resultTemp[index].page + 1;
          resultTemp[index].isLoadMore = true;
          resultTemp[index].isLoadFinish = false;
          self.setData({
            result: resultTemp,
          });
        }

        console.log(self.data.result[index].list)
      }

    });
  },

  switchTabContent: function(index) {
    var self = this;
    switch (index) {
      case 0:
        self.setData({
          android: true,
          ios: false,
          web: false,
          video: false,
          picture: false,
        })
        break;
      case 1:
        self.setData({
          android: false,
          ios: true,
          web: false,
          video: false,
          picture: false,
        })
        break;
      case 2:
        self.setData({
          android: false,
          ios: false,
          web: true,
          video: false,
          picture: false,
        })
        break;
      case 3:
        self.setData({
          android: false,
          ios: false,
          web: false,
          video: true,
          picture: false,
        })
        break;
      case 4:
        self.setData({
          android: false,
          ios: false,
          web: false,
          video: false,
          picture: true,
        })
        break;
    }

    self.setData({
      isLoadMore: self.data.result[index].isLoadMore,
      isLoadFinish: self.data.result[index].isLoadFinish,
    });
  },

  //滚动到底部触发事件
  onLoadMore: function() {
    var self = this;
    console.log(self.data.isLoadMore)
    if (self.data.isLoadMore && !self.data.isLoadFinish) {

      self.requestDatas();
    }
  },

  //点击事件
  onItemClick: function(e) {
    var self = this;
    var index = e.currentTarget.dataset.index;
    //跳转页面
    var target = "/pages/detail/detail";
    if (self.data.showTab == 4) {
      target = "/pages/photo/photo";
    } else if (self.data.showTab == 3) {
      return;
    }
    console.log(target)
    wx.navigateTo({
      url: target + '?title=' + self.data.tabNav.tabItem[self.data.showTab].text + "&url=" + self.data.result[self.data.showTab].list[index].url,
    })
  },
  analysicUrl: function(low, res) {
    var self = this;
    var index = self.data.showTab;
    app.ajax.analysicUrl(res[low].url, function(cb) {

      if (cb != false) {
        res[low].url = cb.data.url;
      }
      if (low == res.length - 1) {

        var resultTemp = self.data.result;
        resultTemp[index].list = resultTemp[index].list.concat(res);
        resultTemp[index].page = resultTemp[index].page + 1;
        resultTemp[index].isLoadMore = true;
        resultTemp[index].isLoadFinish = false;
        self.setData({
          result: resultTemp,
        });
      }
      low++;
      if (res.length > low) {
        self.analysicUrl(low, res);
      }

    });
  },
  videoChange:function(e){
    console.log(e)
  }
})