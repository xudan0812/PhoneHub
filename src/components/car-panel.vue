<template>
  <li class="nav-cart" @mouseenter="showCarHandle()" @mouseleave="hideCarHandle()">
    <a href="javascript:;" class="ball-rect">Cart</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{'cart-num': count > 0}">
								<i>{{count}}</i>
							</span>
    <div class="nav-cart-wrapper"  v-if="carShow">
      <div class="nav-cart-list">
        <div class="empty" v-if="count <= 0">
          <h3>Cart is empty</h3>
          <p>No product here, go to the store?</p>
        </div>
        <div class="full" v-else>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="item,index in carPanelData">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src = "item.ali_image+'?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'">
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{item.title}}</a>
                        </h4>
                        <p class="attrs">
                          <span>{{item.spec_json.show_name}}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span><span class="price-num">{{item.price}}</span><span class="item-num"> x {{item.count}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click="delCarPanelHandle(item.sku_id)">Delete</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p><strong class="ng-binding">{{count}}</strong> items in total</p>
            <h5>Total：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{total}}</span></h5>
            <h6>
              <router-link class="nav-cart-btn" to="/Cart">Go To Cart</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <transition
    name="ball"
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:after-enter="afterEnter"
    v-bind:css="true"
    >
      <div class = "addcart-mask" v-show="ball.show">
        <img class="mask-item" style="width:20px;height:20px;">
      </div>
    </transition>
  </li>
</template>

<script>
  export default {
    computed: {
      carPanelData () {
        return this.$store.state.carPanelData
      },
      count () {
        return this.$store.getters.totalCount
      },
      total () {
        return this.$store.getters.totalPrice
      },
      carShow () {
        return this.$store.state.carShow
      },
      ball () {
        return this.$store.state.ball
      }
    },
    methods: {
      delCarPanelHandle (id) {
        this.$store.commit('delCarPanelData', id)
      },
      showCarHandle () {
        this.$store.commit('showCar')
      },
      hideCarHandle () {
        this.$store.commit('hideCar')
      },
      beforeEnter (el) {
        let rect = this.ball.el.getBoundingClientRect()
        let rectEl = document.getElementsByClassName('ball-rect')[0].getBoundingClientRect()
        let ball = document.getElementsByClassName('mask-item')[0]
        let x = (rectEl.left + rectEl.width / 2) - (rect.left + rect.width / 2)
        let y = rect.top + rect.height / 2 - (rectEl.top + rectEl.height / 2)
        el.style.transform = 'translate3d(0,' + y + 'px,0)'
        ball.style.transform = 'translate3d(-' + x + 'px,0,0)'
        ball.src = this.ball.img
      },
      enter (el) {
        let a = el.offsetHeight
        el.a = a
        el.style.transform = 'translate3d(0,0,0)'
        document.getElementsByClassName('mask-item')[0].style.transform = 'translate3d(0,0,0)'
      },
      afterEnter () {
        this.ball.show = false
      }
    }
  }
</script>

<style type="text/css">
  .ball-enter-active {
    transition: .5s cubic-bezier(.32,.89,.72,1.32);
  }
  .ball-enter-active .mask-item{
    transition: .5s cubic-bezier(0,0,1,1);
  }
</style>
