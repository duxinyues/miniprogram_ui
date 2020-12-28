// pages/ui_component/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    placeholder: "",
    searchValue: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {

    blur(e) {
      console.log(e)
      this.setData({
        searchValue: e.detail.value
      })
      // 组件向页面传递参数
      this.triggerEvent('realNameConfirm', e.detail.value)
    },

  }
})