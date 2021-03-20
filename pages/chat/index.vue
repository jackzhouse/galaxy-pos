<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <!-- <h6 class="h2 text-white d-inline-block mb-0">CS Support</h6> -->
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4"> 
            <route-bread-crumb></route-bread-crumb>
          </nav> -->
        </div>
      </div>
    </base-header>
    <!-- <div class="container-fluid mt--6"> -->
    <div class="container-fluid mt--7">
      <main class="content">
        <div class="container p-0">

          <div class="card">
            <div class="row g-0">

              <!-- <iframe src="http://192.168.43.150:8080/login?username=cobadedi&password=cobadedi" style="border:0px #ffffff none;" name="myiFrame" scrolling="no" frameborder="1" height="500px" width="100%" allowfullscreen></iframe> -->

              <!-- <iframe
                :src="'http://192.168.43.150:8080/login?username='+form.username+'&password='+form.password"
                style="border:0px #ffffff none;"
                name="myiFrame"
                scrolling="no"
                frameborder="1"
                height="500px"
                width="1000px"
                allowfullscreen
              ></iframe> -->

              <iframe 
                :src="'http://192.168.43.150:8080/login?username='+form.username+'&password='+form.password"
                style="border:1px #ffffff solid;" name="myiFrame" scrolling="no" frameborder="2" marginheight="0px" marginwidth="0px" height="500px" width="100%" allowfullscreen>
              </iframe>

            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>
<script>

import Vue from "vue";

export default {
  data() {
    return {
      form: {
        username: this.$store.state.user.user.name,
        password: this.$store.state.user.user.activeCompany
        // username:this.rndStr(6),
        // password:this.rndStr(8)
      },
    };
  },
  beforeMount() {
    this.register();
    // this.rndStr();
  },
  methods: {
    async register() {
      this.$axios
      .$post(`http://10.8.0.102:8100/wilayah/regischat`, this.form)
        .then((response) => {
          // form.username = response.username;
          // form.password = response.password;
        })
        .catch((e) => {});
    },

    // rndStr(len) {
    // 	let text = ""
    // 	let chars = "abcdefghijklmnopqrstuvwxyz"
    
    //   for( let i=0; i < len; i++ ) {
		// 		text += chars.charAt(Math.floor(Math.random() * chars.length))
    //   }
		// 	return text
    // },
    
  },
};
</script>
<style class="cp-pen-styles"></style>
