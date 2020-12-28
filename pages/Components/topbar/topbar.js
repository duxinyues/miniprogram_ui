const app = getApp()
Component({
  properties: {
    navbarData: {
      //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function(newVal, oldVal) {}
    }
  },
  data: {
    height: '',
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 1
    },
    imageWidth: wx.getSystemInfoSync().windowWidth, // 背景图片的高度
    imageHeight: '', // 背景图片的长度，通过计算获取
  },
  attached: function() {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    wx.getSystemInfo({
      success: res => {
        console.log(res.statusBarHeight)
        this.setData({
          height: res.statusBarHeight
        })
      }
    })
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    // 计算图片高度
    imgLoaded(e) {
      console.log(e.detail.height)
      this.setData({
        imageHeight: e.detail.height *
          (wx.getSystemInfoSync().windowWidth / e.detail.width)
      })
    },
    tapName: function() {
      console.log(0)
    },
    //返回到首页
    _backhome() {
      wx.redirectTo({
        url: '/pages/index/index'
      })
    }
  },
})