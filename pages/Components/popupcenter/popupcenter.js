// pages/Components/popupcenter/popupcenter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached: function() {
    console.log(87)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close_overlay() {
      this.setData({
        show: false
      })
    }
  }
})