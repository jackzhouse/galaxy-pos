<template>
  <div>
    <!-- Header -->
    <div class="header bg-default py-3 py-lg-5 pt-lg-1">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <nuxt-link class="navbar-brand" to="/">
                <!-- Galaxy System -->
                <!-- <img
                  src="img/logo.png"
                  alt="Logo white"
                  style="filter: brightness(0) invert(1)"
                /> -->
              </nuxt-link>
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Please login</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-body px-lg-5 pt-lg-5">
              <!-- <div class="text-center text-muted mb-4">
                <small>Sign in</small>
              </div> -->

              <validation-observer v-slot="{ handleSubmit }" ref="formValidator">
                <template v-if="errors_form.length">
                  <div class="alert alert-danger">
                    <span v-for="(error, index) in errors_form" :key="index">{{
                      error
                    }}</span>
                  </div>
                </template>

                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Username"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Username"
                    v-model="form.username"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="form.password"
                  >
                  </base-input>

                  <div class="text-center">
                    <base-button
                      type="primary"
                      :disabled="disabledSubmitButton"
                      native-type="submit"
                      >Sign in</base-button
                    >
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <!-- <div class="row mt-3">
            <div class="col-6">
              <router-link to="/dashboard" class="text-light"><small>Forgot password?</small></router-link>
            </div>
            <div class="col-6 text-right">
              <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from "element-ui";
import crypto from "crypto";
export default {
  middleware: ["guest"],
  layout: "AuthLayout",
  data() {
    return {
      form: {
        username: "",
        password: "",
        // rememberMe: false,
      },
      errors_form: [],
      disabledSubmitButton: false,
    };
  },
  beforeMount() {
    console.log(process.env.sso_env);
    // window.addEventListener("keypress", (e) => {
    //   if (e.keyCode == 13) {
    //     this.$refs.form.validate().then((success) => {
    //       this.onSubmit();
    //     });
    //   }
    // });
  },
  methods: {
    async onSubmit() {
      this.disabledSubmitButton = true;
      this.errors_form = [];
      this.errors_form = [];
      const formData = new FormData();
      formData.append("username", this.form.username);
      formData.append("password", this.form.password);

      await this.$axios
        .post(process.env.ssoLoginUrl, formData)
        .then((response) => {
          console.log(response);
          const header = response.headers;
          var token = response.data.access_token;
          token = token.replace("Bearer ", "");
          this.setToken(token);
          this.$router.push(process.env.redirectLogin);
        })
        .catch((e) => {
          this.disabledSubmitButton = false;
          this.errors_form = [];
          this.errors_form.push(
            "Login gagal, periksa kembali username atau password anda"
          );
        });
    },
    // async getUser() {
    //   await this.$axios
    //     .get("mainedu/auth/user_sso")
    //     .then((response) => {
    //       var token = response.data.token;
    //       token = token.replace("Bearer ", "");
    //       if (this.setToken(token)) {
    //         this.$store.commit("user/SET_USER", response.data.active_account);
    //         this.$store.commit(
    //           "user/SET_ROLES",
    //           response.data.active_account.accounts[0].role
    //         );
    //         this.$store.commit("user/SET_COMPANY", response.data.active_company);
    //         this.$store.commit("user/SET_LIST_COMPANY", response.data.companies);

    //         this.$auth.setUser(response.data);
    //         this.$router.push(process.env.redirectLogin);
    //       }
    //       // console.log(response.headers);
    //     })
    //     .catch((e) => {
    //       this.disabledSubmitButton = false;
    //       this.errors_form = [];
    //       this.errors_form.push(
    //         "Login gagal, periksa kembali username atau password anda"
    //       );
    //     });
    // },
    async setToken(token) {
      this.$auth
        .setUserToken(token)
        .then(() => {
          // console.log("Token Sukses :"+  token);
          return true;
        })
        .catch((e) => {
          this.disabledSubmitButton = false;
          console.log("Token Failes");
          return false;
        });
    },
  },
};
</script>
