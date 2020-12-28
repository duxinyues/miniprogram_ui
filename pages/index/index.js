//index.js
//获取应用实例
const utils = require("../../utils/util.js")
const wxMap = require("../../utils/qqmap-wx-jssdk.min");
let qqMap = new wxMap({
  key: 'IS6BZ-PTEWW-W62RA-RQH5H-M76QQ-LDFQX' // 必填
});
Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    nvabarData1: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '小程序UI', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
    },
    showleft: false,
    age: 25
  },
  test: function () {
    wx.navigateTo({
      url: '/pages/test/test',
    })
  },
  //　底部弹出
  yd_footer_popup: function () {
    this.setData({
      showfooter: true
    })
  },
  //  左侧弹出
  yd_left_popup() {
    this.setData({
      showleft: true
    })
  },
  yd_center_popup() {
    this.setData({
      showCenter: true
    })
  },
  close_overlay: function () {
    this.setData({
      show: false,
      showCenter: false
    })
  },
  onLoad: function () {
    console.log("页面信息：", getCurrentPages())
    // wx.showActionSheet({
    //   itemList: ['A', 'B', 'C', 'D', 'E', 'F'],
    //   success(res) {
    //     console.log(res.tapIndex)
    //   },
    //   fail(res) {
    //     console.log(res.errMsg)
    //   }
    // })

    // 定义导航栏的高度   方便对齐
    wx.getSystemInfo({
      success: res => {
        console.log(res.statusBarHeight)
        this.setData({
          height: res.statusBarHeight
        })
      }
    })
    this.setData({
      search: this.search.bind(this)
    });


    var page = this
    wx.getLocation({
      type: 'wgs84', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function (res) {
        // success  
        var longitude = res.longitude
        var latitude = res.latitude
        // page.loadCity(longitude, latitude)
      }
    })
  },

  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          text: '搜索结果',
          value: 1
        }, {
          text: '搜索结果2',
          value: 2
        }])
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  onMyEvent: function (e) {
    // 自定义组件触发事件时提供的detail对象
    console.log(e)
  },
  yd_success() {
    utils.popup("温馨提示！", "中间弹窗内容！")
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  realNameConfirm(e) {
    console.log(e)
    this.setData({
      value: e.detail
    })
  },
  atuoGetLocation(e) {
    let city = this.data.city
    qqMap.geocoder({
      address: city + e.detail.value, //用户输入的地址（注：地址中请包含城市名称，否则会影响解析效果），如：'北京市海淀区彩和坊路海淀西大街74号'
      complete: res => {
        if (res) {
          console.log(res); //经纬度对象
        } else {
          console.log('无法定位到该地址，请确认地址信息！');
        }
      }
    });
  },

  onShow: function () {
    let vm = this;
    vm.getUserLocation();

    var _this = this;
    //调用获取城市列表接口
    qqMap.getCityList({
      success: function(res) { //成功后的回调
        console.log(res);
        console.log('省份数据：', res.result[0])
        var city = res.result[0];
        //根据对应接口getCityList返回数据的Id获取区县数据（以北京为例）
        qqMap.getDistrictByCityId({
          // 传入对应省份ID获得城市数据，传入城市ID获得区县数据,依次类推
          id: "520000", //对应接口getCityList返回数据的Id，如：北京是'110000'
          success: function(res) { //成功后的回调
            console.log(res);
            console.log('对应城市ID下的区县数据(以北京为例)：', res.result[0]);
          },
          fail: function(error) {
            console.error(error);
          },
          complete: function(res) {
            console.log(res);
          }
        });
      },
      fail: function(error) {
        console.error(error);
      },
    });
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqMap.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })

      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },

  search(e) {
    const that = this;
    qqMap.getSuggestion({
      keyword: e.detail.value.word,
      success(res) {
        console.log(res)
      }
    });
    qqMap.search({
      keyword: e.detail.value.word,
      success: function(res) {
        if (res.data.length === 0) {
          wx.showToast({
            title: '暂无数据请更换关键词',
            icon: '',
            duration: 0,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          console.log(res)
          that.setData({
            data: res.data
          })
        }
      },
      fail: function(res) {
        wx.showModal({
          title: '异常',
          content: res.message,
          showCancel: true,
          cancelText: '取消',
          cancelColor: '',
          confirmText: '确定',
          confirmColor: '',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
      },
    });
    qqMap.getCityList({
      success(res) {
        console.log(res)
      }
    });
  },
})