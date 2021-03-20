<template>
  <div>
    <!-- Header -->
    <!-- <div class="header bg-gradient-info py-7 py-lg-8 pt-lg-9"> -->
    <div class="header bg-gradient-info py-3 py-lg-7 pt-lg-3">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">

              <!-- <nuxt-link class="navbar-brand" to="/">
                <img src="img/logo.png" alt="Logo white" />
              </nuxt-link> -->

              <h1 class="text-white">Change Password</h1>
              <p class="text-lead text-white">Please Change Your Password.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary border-0">
            
            <div class="card-body px-lg-5 py-lg-5">
             
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="changePasswordSubmit">

                  <!-- <input type="hidden" name="token" v-model="form.token"> -->

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Password"
                              name="newPassword1"
                              type="text"
                              :rules="{
                                required: true
                                }"
                              v-model="form.newPassword1"
                              vid="form.newPassword1"
                              >
                  </base-input>
                  
                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-lock-circle-open"
                              placeholder="Confirm Password"
                              name="newPassword2"
                              type="text"
                              :rules="{
                                required: true
                                }"
                              rules="confirmed:form.newPassword1"
                              v-model="form.newPassword2"
                              >
                  </base-input>
                            
                  <!-- append-icon="fas fa-eye" -->

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              name="email"
                              :rules="{required: true}"
                              :disabled="true"
                              v-model="form.email">
                  </base-input>
                 
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary mt-4">Change Password</button>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";

  export default {
    layout: 'AuthLayout',
    name: 'register',

    data() {
      return {
        form: {
          // show: false,
          // token: this.$nuxt.$route.query.token,
          newPassword1: "",
          newPassword2: "",
          email: this.$nuxt.$route.query.email
        },
        doSubmit: true
      };
  },

    beforeMount() {
      window.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
          this.doSubmit == false;
          e.preventDefault();
          return false;
        }
      });
      
    },

    methods: {
    async changePasswordSubmit() {
      if(this.doSubmit){
          this.$refs.form.validate().then((success) => {
            if (!success) {
              return; 
            }
            
            this.$axios
              .$post(`main_a/user/user_change_password_first_login`, this.form)
              .then((response) => {
                // confirm sweat alert
                swal.fire({
                  title: `Success.`,
                  text: "Your Password Has Been Changed.",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/general");
              })
              .catch((e) => {});
          });
      }
    },
    }
  };
</script>

