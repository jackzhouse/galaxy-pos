<template>
  <div>
    <!-- Header -->
    <!-- <div class="header bg-gradient-success py-3 py-lg-7 pt-lg-3"> -->
    <div class="header bg-gradient-info py-3 py-lg-7 pt-lg-3">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">

               <nuxt-link class="navbar-brand" to="/">
                <!-- <img src="img/logo.png" alt="Logo white" /> -->
                <img src="img/logo.png" alt="Logo white" style="filter: brightness(0) invert(1)" />
              </nuxt-link>
                <br>
                <br>
              <h1 class="text-white">Choose Company or Teacher Account</h1>
              <!-- <p class="text-lead text-white">Better to be safe than sorry.</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <!-- <div class="container mt--8 pb-5"> -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">

          <div class="col-lg-5 col-md-7">
            <div class="card card-profile bg-secondary mt-2">
            
                <div class="card-body pt-5 pb-5 px-5"> 
                    <!-- <div class="text-center mb-4">
                        <h3>Choose A Company</h3>
                    </div> -->
                    <form role="form">
                        <div class="text-center">
                        <nuxt-link to="/register/company" class="btn btn-primary">Register Company</nuxt-link>
                        </div>
                    </form>
                </div>
            
            </div>
        </div>

          <div class="col-lg-5 col-md-7">
            <div class="card card-profile bg-secondary mt-2">
             
                <div class="card-body pt-5 pb-5 px-5">
                    <!-- <div class="text-center mb-4">
                        <h3>Choose A Teacher</h3>
                    </div> -->
                    <form role="form">
                        <div class="text-center">
                        <nuxt-link to="/register/teacher" class="btn btn-primary">Register Teacher</nuxt-link>
                        </div>
                    </form>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import { Header } from "element-ui";

export default {
  layout: 'AuthLayout',
  name: 'register',
  data() {
    return {
      // model: {
      //   password: ''
      // }
    }
  }
};

</script>
<style></style>
