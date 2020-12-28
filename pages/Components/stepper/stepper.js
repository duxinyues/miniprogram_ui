// pages/Components/stepper/stepper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: Number // 父组件传递的参数
  },

  /**
   * 组件的初始数据
   */
  data: {
    // num: 0,
    minusStatus: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    step() {
      var myEventDetail = {
        name: "duxin",
        num: this.data.num
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    },
    bindMinus() {
      var num = this.data.num;
      if (num > 0) {
        num--;
      }

      var minusStatus = num <= 0 ? "disabled" : "normal";
      this.setData({
        minusStatus: minusStatus,
        num: num
      })
    },
    bindPlus() {
      var num = this.data.num;
      num++;
      var minusStatus = num <= 0 ? "disabled" : "normal";
      this.setData({
        num: num,
        minusStatus: minusStatus
      })
    },
    sendMesgToFather() {
      // 向父组件发送值
      let step = 2;
      this.triggerEvent('realNameConfirm', step) 
    }
  }
})