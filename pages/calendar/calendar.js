// pages/calendar/calendar.js
const util = require("../../utils/util.js");
let selectedDate = new Date().toString();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCalendarShow: '',
    calendarDisplayMonthNum: 1,
    calendarDisplayTime: selectedDate,
    calendarSelectedDate: selectedDate,
    calendarSelectedDateStr: util.dateUtil.format(new Date(selectedDate), 'Y年M月D日')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(selectedDate)
  },
  onCalendarDayTap(e) {
    console.log("这是一个页面")
    console.log(e.detail)
    util.popup("选中日期", e.detail.year + "年" + (e.detail.month + 1) + "月" + e.detail.day + "日")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})