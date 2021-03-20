const pkg = require("./package");
// console.log('ENV', process.env.NODE_ENV)
// console.log("test");
import firebase from "firebase";

const configInit = {
  mode: "spa",
  router: {
    base: "/",
    linkExactActiveClass: "active",
  },
  /*
   ** Headers of the page
   */
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  head: {
    title: "Galaxy System",
    meta: [{
      charset: "utf-8"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    },
    {
      hid: "description",
      name: "description",
      content: "Galaxy System",
    },
    ],
    link: [{
      rel: "icon",
      type: "image/png",
      href: "favicon.png"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
    },
    {
      rel: "stylesheet",
      href: "https://use.fontawesome.com/releases/v5.6.3/css/all.css",
      integrity: "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/",
      crossorigin: "anonymous",
    },
    {
      // rel: "stylesheet",
      // href: "https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css",
    },
    ],
    script: [{
      // src: "https://unpkg.com/vue-multiselect@2.1.0",
    },],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },

  /*
   ** Global CSS
   */
  css: ["assets/css/nucleo/css/nucleo.css", "assets/sass/argon.scss"],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios.js',
    "~/plugins/dashboard/dashboard-plugin",
    {
      src: "~/plugins/dashboard/full-calendar",
      ssr: false
    },
    {
      src: "~/plugins/dashboard/world-map",
      ssr: false
    },
    {
      src: '~/plugins/vue-good-table',
      ssr: false
    },
    {
      src: "~/plugins/vue-datepicker",
      ssr: false
    },
    {
      src: "~/plugins/vue-paginate",
      ssr: false
    },
    {
      src: "~/plugins/vue-multiselect",
      ssr: false
    },
    {
      src: "~/plugins/vue-moment.js",
      ssr: false
    },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    "@nuxtjs/auth",
    [
      "nuxt-vuex-localstorage",
      {
        mode: "debug",
        localStorage: ["user", "customer", "card"],
      },
      'nuxt-vue-multiselect',
    ],

  ],



  /*
   ** Axios module configuration
   */
  env: {
    sso_env: "MANUAL", // SSO or MANUAL,
    ssoLoginUrl: "http://localhost:8000/pos/auth/login",
    redirectLogin: "/kasir"
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: "http://localhost:8000/",
    // baseURL: "http://192.168.1.102/",
    // baseURL: "http://192.168.1.111:8000/",
    // baseURL: "http://10.8.0.102/", //openvpn
    // baseURL: "https://api.katalis.info/"
    // baseURL: "http://localhost:8010/"
    // baseURL: ""

  },
  auth: {
    redirect: {
      logout: "/",
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "login",
            method: "post",
            propertyName: "access_token",
          },
          user: false,
          logout: false,
        },
      },
    },
  },



  /*
   ** Build configuration
   */
  build: {
    vendor: ["aframe"],
    transpile: ["vee-validate/dist/rules", "nuxt-vuex-localstorage"],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { },
    extractCSS: process.env.NODE_ENV === "production",
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },
};
module.exports = configInit;
