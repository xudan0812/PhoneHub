<template>
  <div id="header">
    <div class="nav-global">
      <div class="container">
        <h1 class="nav-logo">
          <a href="javascript:;"></a>
        </h1>
        <ul class="nav-aside">
          <li class="nav-user">
            <a href="javascript:;">My Account</a>
            <!--active-->
            <div class="nav-user-wrapper">
              <div class="nav-user-list">
                <dl class="nav-user-avatar">
                  <dd><span class="ng-scope"></span></dd>
                  <dt class="ng-binding">+1 512***9453</dt>
                </dl>
                <ul>
                  <router-link tag="li" to="/account" class="order"><a href="javascript:;">My Orders</a></router-link>
                  <li class="support"><a href="javascript:;">Support Center</a></li>
                  <li class="coupon"><a href="javascript:;">My Coupons</a></li>
                  <li class="information"><a href="javascript:;">Account Information</a></li>
                  <li class="address"><a href="javascript:;">Shipping Address</a></li>
                  <li class="logout"><a href="javascript:;">Log out</a></li>
                </ul>
              </div>
            </div>
          </li>
          <!--active-->
          <car-panel></car-panel>
        </ul>
        <ul class="nav-list">
          <li><a href="javascript:;">Online Store</a></li>
          <li><a href="javascript:;">Nuts Pro</a></li>
          <li><a href="javascript:;">Smartisan M1 / M1L</a></li>
          <li><a href="javascript:;">Smartisan OS</a></li>
          <li><a href="javascript:;">Cloud</a></li>
          <li><a href="javascript:;">Apps</a></li>
          <li><a href="javascript:;">Forum</a></li>
        </ul>
      </div>
    </div>
    <div class="nav-sub">
      <div class="nav-sub-wrapper">
        <div class="container">
          <ul class="nav-list">
            <li><a href="javascript:;">Home</a></li>
            <li><a href="javascript:;">Smart Phones</a></li>
            <li><a href="javascript:;">Footprint Screen Protectors</a></li>
            <li class="active"><router-link to="/">Official Accessories</router-link></li>
            <li><a href="javascript:;">Third-party Accessories</a></li>
            <li><a href="javascript:;">All Products</a></li>
            <li><a href="javascript:;">Service</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import carPanel from '../components/car-panel.vue'
  export default {
    components: {
      carPanel
    }
  }
</script>

<style>
</style>
