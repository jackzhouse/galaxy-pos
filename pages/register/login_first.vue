<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-info py-5 py-lg-6 pt-lg-7">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <nuxt-link class="navbar-brand" to="/">
                <img
                  src="img/logo.png"
                  alt="Logo white"
                  style="filter: brightness(0) invert(1)"
                />
              </nuxt-link>
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Please login to use ERP Module</p>
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
          <polygon class="fill-default" points="2560 0 2560 100 0 100" />
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <!-- <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="~/static/img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="~/static/img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div>-->
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign in</small>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <template v-if="errors_form.length">
                  <div class="alert alert-danger">
                    <span v-for="(error, index) in errors_form" :key="index">{{
                      error
                    }}</span>
                  </div>
                </template>
                <form role="form">
                <!-- <form role="form" @submit.prevent="handleSubmit(onSubmit)"> -->

                  <base-input
                    alternative
                    class="mb-3"
                    name="username"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="username"
                    :disabled="true"
                    v-model="form.username"
                  ></base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-lock-circle-open"
                    :disabled="true"
                    placeholder="Password"
                    v-model="form.password"
                  ></base-input>
                  <!-- :rules="{required: true, min: 6}" -->

                  <!-- <base-checkbox v-model="form.rememberMe">Remember me</base-checkbox> -->
                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      >Sign in</base-button
                    >
                    <!-- <button class="btn btn-primary" type="submit">Sign In</button> -->
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link to="/dashboard" class="text-light">
                <small>Forgot password?</small>
              </router-link>
            </div>
            <!-- <div class="col-6 text-right">
              <router-link to="/register" class="text-light">
                <small>Create new account</small>
              </router-link>
            </div> -->
          </div>
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
        username: this.$nuxt.$route.query.email,
        password: this.$nuxt.$route.query.token,
        // rememberMe: false,
      },
      errors_form: [],
    };
  },
  beforeMount() {
    console.log(process.env.sso_env);
    
    this.onSubmit();
  },
  methods: {
    async onSubmit() {
      if (process.env.sso_env == "SSO") {
        this.errors_form = [];
        await this.$axios
          .post(process.env.ssoLoginUrl, this.form)
          .then((response) => {
            const header = response.headers;
            var token = header.authorization;
            token = token.replace("Bearer ", "");
            if (this.setToken(token)) {
              this.getUser();
            }
          })
          .catch((e) => {
            this.errors_form.push(
              "Login gagal, periksa kembali username atau password anda"
            );
          });
      } else {
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", this.form.username);
        urlencoded.append("password", this.form.password);
        await this.$auth
          .loginWith("local", {
            data: urlencoded,
          })
          .then((response) => {
            var token = response.data.access_token;
            token = token.replace("Bearer ", "");
            if (this.setToken(token)) {
              this.$store.commit("user/SET_USER", response.data.active_account);
              this.$store.commit(
                "user/SET_COMPANY",
                response.data.active_company
              );
              this.$store.commit(
                "user/SET_LIST_COMPANY",
                response.data.companies
              );
              this.$store.commit(
                "user/SET_SOLUTIONS",
                response.data.active_account.accounts[0].solutions
              );

              this.$auth.setUser(response.data);

              setTimeout( () => this.$router.push(`/register/user_change_password_first_login?email=${this.$nuxt.$route.query.email}`), 4);

            }
          })
          .catch((e) => {
            this.errors_form.push(
              "Login gagal, periksa kembali username atau password anda"
            );
          });
      }
    },
    async getUser() {
      await this.$axios
        .get("mainedu/auth/user_sso")
        .then((response) => {
          var token = response.data.token;
          token = token.replace("Bearer ", "");
          if (this.setToken(token)) {
            this.$store.commit("user/SET_USER", response.data.active_account);
            this.$store.commit(
              "user/SET_COMPANY",
              response.data.active_company
            );
            this.$store.commit(
              "user/SET_LIST_COMPANY",
              response.data.companies
            );

            this.$auth.setUser(response.data);
            
            // this.$router.push(`/register/user_change_password_first_login?email=${this.$nuxt.$route.query.email}`);

            setTimeout( () => this.$router.push(`/register/user_change_password_first_login?email=${this.$nuxt.$route.query.email}`), 4);

          }
          // console.log(response.headers);
        })
        .catch((e) => {
          this.errors_form.push(
            "Login gagal, periksa kembali username atau password anda"
          );
        });
    },
    async setToken(token) {
      this.$auth
        .setUserToken(token)
        .then(() => {
          console.log("Token Sukses");
          return true;
        })
        .catch((e) => {
          console.log("Token Failes");
          return false;
        });
    },
  },
};
</script>
