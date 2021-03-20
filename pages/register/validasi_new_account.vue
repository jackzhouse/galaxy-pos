<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-3 py-lg-5">
    <!-- <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9"> -->
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Validate Your Account</h1>
              <p class="text-lead text-white">Validate your account with email and password.</p>
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
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">

            <div class="card-body px-lg-5 py-lg-3">
              <div class="text-center text-muted mb-4">
                <small> </small>
              </div>
            
                <validation-observer ref="form">
                <form class="needs-validation">
                <!-- <form class="needs-validation" @submit.prevent="validateEmail"> -->

                  <base-input
                          name="email"
                          placeholder="Email"
                          success-message="Looks good!"
                          :rules="{required: true}"
                          :disabled="true"
                          v-model="form.email">
                  </base-input>

                  <base-input
                          name="token"
                          placeholder="Password"
                          success-message="Looks good!"
                          :rules="{required: true}"
                          :disabled="true"
                          v-model="form.token">
                  </base-input>

                  <!-- <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-2">Validate</base-button>
                  </div> -->
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
  import { Select, Option } from 'element-ui'

export default {
  name: "validateForm",
  layout: "AuthLayout",
  components: {},
  data() {
    return {
      validated: false,
      form: {

       email: this.$nuxt.$route.query.email,
       token: this.$nuxt.$route.query.token

      },
    };
  },
  
  beforeMount() {
    this.validateEmail();
  },
  methods: {
    async validateEmail() {
      this.$axios
        .$get(`main_a/user/user_validate_email/${this.$nuxt.$route.query.email}/${this.$nuxt.$route.query.token}`, this.form)
        .then((response) => {
          // console.log(response);

          setTimeout( () => this.$router.push(`/register/login_first?email=${this.$nuxt.$route.query.email}&token=${this.$nuxt.$route.query.token}`), 4);

        })
       .catch((e) => {
          swal.fire({
            title: "Validate Failed",
            text: `If you have already validated your account, you cannot validate again`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
        });
    },
  },
};
</script>
