import Toast from '@vant/weapp/toast/toast';

const app = getApp()
const db = wx.cloud.database()
const users = db.collection('users')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_name: '',
    pwd: ''
  },

  onClickIcon: function() {
    wx.showToast({
      title: '输入公司员工编号，与OA系统相同',
      icon: 'none',
      duration: 2000
    })
  },

  usernameInput: function(res) {
    this.setData({
      user_name: res.detail
    })
  },

  pwdInput: function(res) {
    this.setData({
      pwd: res.detail
    })
  },

  onLoginClick: function() {
    if (this.data.user_name.length == 0 || this.data.pwd.length == 0) {
      Toast.fail('用户名或密码为空');
    } else {
      users.doc(this.data.user_name).get().then(res => {
        app.globalData.userInfo = res.data
        try {
          wx.setStorageSync('s_userinfo', res.data)
        } catch (e) { }
        wx.redirectTo({
          url: '../index/index',
        })
      }).catch(res => {
        Toast.fail('用户名或密码错误');
      })
      
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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