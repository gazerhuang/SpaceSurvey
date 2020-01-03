import Toast from '@vant/weapp/toast/toast';

const app = getApp()
const db = wx.cloud.database()
const records = db.collection('records')
var isFirst = true
var rec_id = ""
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: null,
    rom: "",
    rom2: "",
    message: ""
  },

  onLogout: function() {
    wx.clearStorage()
    app.globalData.userInfo = null
    wx.redirectTo({
      url: '../login/login',
    })
  },

  onCommit: function() {
    if (this.data.user_name.length == 0 || this.data.rom.length == 0) {
      Toast.fail('必填项为空')
    }else if(isFirst){
    records.add({
      data:{
        user:this.data.user_name,
        rom: this.data.rom,
        rom2: this.data.rom2,
        message: this.data.message
      }
    }).then(res=>{
      wx.redirectTo({
        url: '../finish/finish',
      })
    }).catch(res=>{
    })
    }else{
      records.doc(rec_id).update({
        data:{
          rom: this.data.rom,
          rom2: this.data.rom2,
          message: this.data.message
        }
      }).then(res=>{
        wx.redirectTo({
          url: '../finish/finish',
        })
      })
    }
  },

  romInput: function(res) {
    this.setData({
      rom: res.detail
    })
  },
  rom2Input: function(res) {
    this.setData({
      rom2: res.detail
    })
  },
  msgInput: function(res) {
    this.setData({
      message: res.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo == null) {
      wx.redirectTo({
        url: '../login/login',
      })
    } else {
      const _user = app.globalData.userInfo.name
      records.where({
        user:_user
      }).get().then(res => { 
        this.setData({
          user_name: _user,
          rom: res.data[0].rom,
          rom2: res.data[0].rom2,
          message: res.data[0].message
        })
        isFirst = false
        rec_id = res.data[0]._id
      }).catch(res => { 
        console.log("查不到资料")
        this.setData({
          user_name: _user
        })
      })
    }
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

  }
})