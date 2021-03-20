<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-3 py-lg-7 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Thank you for registration.</h1>
              <p class="text-lead text-white">Please check your email address and verify <b>"Go to Dashboard"</b> to complete setting up your account.</p>
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

    </div>

  </div>
</template>
<script>
export default {
  layout: 'AuthLayout',
  name: 'register',
  data() {
    return {
      model: {
        password: ''
      }
    }
  }
};
</script>
<style></style>
