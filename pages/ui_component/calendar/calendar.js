// pages/ui_component/calendar/calendar.js
let View = require("../behavior-view");
const util = require("../../../utils/util");
Component({
  extarmalClasses: ["ex-class"],
  behaviors: [
    View
  ],
  /**
   * 组件的属性列表
   */
  properties: {
    displayMonthNum: {
      type: Number
    },
    displayTime: {
      type: String
    },
    selectedDate: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    weekDayArr: ["日", "一", "二", "三", "四", "五", "六"]
  },
  attached: function () { },
  /**
   * 组件的方法列表
   */
  methods: {
    onDayTap: function (e) {
      this.triggerEvent("onDayTap", e.currentTarget.dataset);
    }
  }
})
