const app = getApp()
Component({
  properties: {
    name: {
      type: String,
      value: '小明'
    },
    show: Boolean,
    age: Number
  },
  data: {},
  attached: function(e) {},
  methods: {
    close_overlay() {
      this.setData({
        show: false
      })
    },
    pop_left() {
      this.setData({
        show: true
      })
    }
  },
})