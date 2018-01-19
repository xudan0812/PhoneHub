import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    carPanelData: [],
    receiveInfo: [{
      'name': 'Mr Wang',
      'phone': '+1 5121111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': 'Beijing',
      'cityId': 110100,
      'city': 'District',
      'countyId': 110106,
      'county': 'Haidian',
      'add': '1234 Beautiful Place, 77777',
      'default': true
    }, {
      'name': 'Ms Li',
      'phone': '+1 5122222222',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': 'Beijing',
      'cityId': 110100,
      'city': 'District',
      'countyId': 110106,
      'county': 'Haidian',
      'add': '5678 Sunny Place, 88888',
      'default': false
    }],
    maxOff: false,
    carShow: false,
    carTimer: null,
    ball: {
      show: false,
      el: null,
      img: ''
    },
    orderData: []
  },
  getters: {
    totalCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    totalPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.price * goods.count
      })
      return price
    },
    allChecked (state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        if (!goods.checked) {
          allChecked = false
          return allChecked
        }
      })
      return allChecked
    },
    checkedCount (state) {
      let checkedCount = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          checkedCount += goods.count
        }
      })
      return checkedCount
    },
    checkedPrice (state) {
      let checkedPrice = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          checkedPrice += goods.price * goods.count
        }
      })
      return checkedPrice
    },
    checkedGoods (state) {
      let checkedGoods = []
      state.carPanelData.forEach((goods) => {
        if (goods.checked) {
          checkedGoods.push(goods)
        }
      })
      return checkedGoods
    }
  },
  mutations: {
    addCarPanelData (state, data) {
      let bOff = true
      if (!state.ball.show) {
        state.carPanelData.forEach((goods) => {
          if (goods.sku_id === data.info.sku_id) {
            goods.count += data.count
            bOff = false
            if (goods.count > goods.limit_num) {
              goods.count -= data.count
              state.maxOff = true
              return
            }
            state.carShow = true
            state.ball.show = true
            state.ball.img = data.info.ali_image
            state.ball.el = event.path[0]
          }
        })
        if (bOff) {
          let goodsData = data.info
          Vue.set(goodsData, 'count', data.count)
          Vue.set(goodsData, 'checked', true)
          state.carPanelData.push(goodsData)
          state.carShow = true
          state.ball.show = true
          state.ball.img = data.info.ali_image
          state.ball.el = event.path[0]
        }
      }
    },
    delCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          state.carPanelData.splice(index, 1)
          return
        }
      })
    },
    plusCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count >= goods.limit_num) return
          goods.count++
        }
      })
    },
    subCarPanelData (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          if (goods.count <= 1) return
          goods.count--
        }
      })
    },
    checkGoods (state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.sku_id === id) {
          goods.checked = !goods.checked
        }
      })
    },
    allCheckGoods (state, allChecked) {
      state.carPanelData.forEach((goods, index) => {
        goods.checked = !allChecked
      })
    },
    delCheckedGoods (state) {
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i, 1)
        }
      }
    },
    closePrompt (state) {
      state.maxOff = false
    },
    showCar (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    hideCar (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      }, 500)
    },
    submitReceive (state, data) {
      if (data.default) {
        state.receiveInfo.forEach((receive) => {
          receive.default = false
        })
      }
      state.receiveInfo.push(data)
    },
    submitOrder (state, data) {
      state.orderData.unshift(data)
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i, 1)
        }
      }
    },
    payNow (state, id) {
      state.orderData.forEach((order) => {
        if (order.orderId === id) {
          order.isPay = true
          return
        }
      })
    }
  }
})

export default store
