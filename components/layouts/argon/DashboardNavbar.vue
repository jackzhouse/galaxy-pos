<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{ 'bg-default navbar-dark': type === 'default' }"
  >
    <!-- Search form -->
    <form
      class="navbar-search form-inline mr-sm-3"
      :class="{
        'navbar-search-light': type === 'default',
        'navbar-search-dark': type === 'light',
      }"
      id="navbar-search-main"
    >
      <!-- <div class="form-group mb-0">
        <div class="input-group input-group-alternative input-group-merge">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
            </span>
          </div>
          <input class="form-control" placeholder="Search" type="text" />
        </div>
      </div> -->
      <button
        type="button"
        class="close"
        data-action="search-close"
        data-target="#navbar-search-main"
        aria-label="Close"
      >
        <span aria-hidden="true">×</span>
      </button>
    </form>
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center ml-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div
          class="pr-3 sidenav-toggler"
          :class="{
            active: $sidebar.showSidebar,
            'sidenav-toggler-dark': type === 'default',
            'sidenav-toggler-light': type === 'light',
          }"
          @click="toggleSidebar"
        >
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main"
        >
          <i class="ni ni-zoom-split-in"></i>
        </a>
      </li>
      <base-dropdown
        class="nav-item"
        tag="li"
        title-classes="nav-link"
        title-tag="a"
        :title="$store.state.user.company.name"
        menu-classes="dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden"
      >
        <template>
          <!-- Dropdown header -->
          <div
            class="px-3 py-3 list-company"
            v-for="(item, index) in $store.state.user.listCompany"
            :key="index"
            @click="changeCompany(item)"
          >
            <h6 class="text-sm text-muted m-0">{{ item.name }}</h6>
          </div>
        </template>
      </base-dropdown>
      <!-- <base-dropdown
        class="nav-item"
        tag="li"
        title-classes="nav-link"
        title-tag="a"
        icon="ni ni-bell-55"
        menu-classes="dropdown-menu-xl dropdown-menu-right py-0 overflow-hidden"
      >
        <template>
          <! Dropdown header -->
      <!-- <div class="px-3 py-3">
            <h6 class="text-sm text-muted m-0">
              You have
              <strong class="text-primary">13</strong> notifications.
            </h6>
          </div> -->
      <!-- List group -->
      <!-- <div class="list-group list-group-flush">
            <a href="#!" class="list-group-item list-group-item-action">
              <div class="row align-items-center">
                <div class="col-auto">
                  
                  <img alt="Image placeholder" src="img/theme/team-1.jpg" class="avatar rounded-circle">
                </div>
                <div class="col ml--2">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 class="mb-0 text-sm">John Snow</h4>
                    </div>
                    <div class="text-right text-muted">
                      <small>2 hrs ago</small>
                    </div>
                  </div>
                  <p class="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                </div>
              </div>
            </a>
            <a href="#!" class="list-group-item list-group-item-action">
              <div class="row align-items-center">
                <div class="col-auto">
                  
                  <img alt="Image placeholder" src="img/theme/team-2.jpg" class="avatar rounded-circle">
                </div>
                <div class="col ml--2">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 class="mb-0 text-sm">John Snow</h4>
                    </div>
                    <div class="text-right text-muted">
                      <small>3 hrs ago</small>
                    </div>
                  </div>
                  <p class="text-sm mb-0">A new issue has been reported for Argon.</p>
                </div>
              </div>
            </a>
            <a href="#!" class="list-group-item list-group-item-action">
              <div class="row align-items-center">
                <div class="col-auto">
                  
                  <img alt="Image placeholder" src="img/theme/team-3.jpg" class="avatar rounded-circle">
                </div>
                <div class="col ml--2">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 class="mb-0 text-sm">John Snow</h4>
                    </div>
                    <div class="text-right text-muted">
                      <small>5 hrs ago</small>
                    </div>
                  </div>
                  <p class="text-sm mb-0">Your posts have been liked a lot.</p>
                </div>
              </div>
            </a>
            <a href="#!" class="list-group-item list-group-item-action">
              <div class="row align-items-center">
                <div class="col-auto">
                  
                  <img alt="Image placeholder" src="img/theme/team-4.jpg" class="avatar rounded-circle">
                </div>
                <div class="col ml--2">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 class="mb-0 text-sm">John Snow</h4>
                    </div>
                    <div class="text-right text-muted">
                      <small>2 hrs ago</small>
                    </div>
                  </div>
                  <p class="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                </div>
              </div>
            </a>
            <a href="#!" class="list-group-item list-group-item-action">
              <div class="row align-items-center">
                <div class="col-auto">
                  
                  <img alt="Image placeholder" src="img/theme/team-5.jpg" class="avatar rounded-circle">
                </div>
                <div class="col ml--2">
                  <div class="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 class="mb-0 text-sm">John Snow</h4>
                    </div>
                    <div class="text-right text-muted">
                      <small>3 hrs ago</small>
                    </div>
                  </div>
                  <p class="text-sm mb-0">A new issue has been reported for Argon.</p>
                </div>
              </div>
            </a>
          </div>-->
      <!-- View all -->
      <!-- <a href="#!" class="dropdown-item text-center text-primary font-weight-bold py-3">View all</a> -->
      <!-- </template>
      </base-dropdown> -->
    </ul>
    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <base-dropdown
        menu-on-right
        class="nav-item"
        tag="li"
        title-tag="a"
        title-classes="nav-link pr-0"
      >
        <a href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <div class="media align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <!-- <img alt="Image placeholder" src="img/theme/admin.png" /> -->
              <a v-if="form.image == null">
                <img src="img/theme/admin.png" class="avatar avatar-sm rounded-circle" />
              </a>
              <a v-else-if="form.image == ''">
                <img src="img/theme/admin.png" class="avatar avatar-sm rounded-circle" />
              </a>
              <a v-else>
                <img
                  class="avatar avatar-sm rounded-circle"
                  alt=""
                  :src="`${$axios.defaults.baseURL}main_a/image/get/${form.image}/pas`"
                />
              </a>
              <!-- <img
                class="rounded-circle"
                alt=""
                :src="`${$axios.defaults.baseURL}main_a/image/get/${form.image}/pas`"
              />  -->
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">
                {{ $store.state.user.user.name }}
              </span>
            </div>
          </div>
        </a>

        <template>
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Welcome</h6>
          </div>
          <!-- <a href="#" class="dropdown-item">
            <i class="ni ni-single-02"></i>
            <span>My profile</span>
          </a>
          <a href="#" class="dropdown-item">
            <i class="ni ni-settings-gear-65"></i>
            <span>Settings</span>
          </a> -->
          <!-- <a href="#!" class="dropdown-item">
            <i class="ni ni-calendar-grid-58"></i>
            <span>Activity</span>
          </a>-->
          <!-- <a href="#!" class="dropdown-item">
            <i class="ni ni-support-16"></i>
            <span>Support</span>
          </a>-->
          <div class="dropdown-divider"></div>
          <div @click="logout" class="dropdown-item">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </div>
        </template>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";
import BaseNav from "@/components/argon-core/Navbar/BaseNav.vue";
import Modal from "@/components/argon-core/Modal.vue";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import swal from "sweetalert2";

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal,
  },
  props: {
    type: {
      type: String,
      default: "default", // default|light
      description: "Look of the dashboard navbar. Default (Green) or light (gray)",
    },
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      // user: localStorage.getItem('active_account'),
      // active_company: localStorage.getItem('active_company'),
      // listCompany: localStorage.getItem('listCompany'),
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: "",

      form: {
        image: "",
      },
    };
  },
  beforeMount() {
    this.form.image = this.$store.state.user.photoUrl;
  },
  methods: {
    async setToken(token) {
      this.$auth
        .setUserToken(token)
        .then(() => {
          // console.log("Token Sukses");
          return true;
        })
        .catch((e) => {
          // console.log("Token Failes");
          return false;
        });
    },
    async changeCompany(item) {
      swal
        .fire({
          title: "Apakah anda yakin akan pindah Perusahaan?",
          text: ``,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-success btn-fill",
          cancelButtonClass: "btn btn-danger btn-fill",
          confirmButtonText: "Lanjutkan Pindah Perusahaan!",
          buttonsStyling: false,
        })
        .then((result) => {
          if (result.isConfirmed == true) {
            // console.log(result);
            this.$axios
              .get("main_a/user/user_change_company/" + item.companyId)
              .then((response) => {
                var token = response.data.access_token;
                token = token.replace("Bearer ", "");
                const user = response.data;
                if (this.setToken(token)) {
                  this.$auth.setUser(user);
                  this.$store.commit("user/SET_USER", response.data.active_account);
                  this.$store.commit("user/SET_COMPANY", response.data.active_company);
                  this.$store.commit("user/SET_LIST_COMPANY", response.data.companies);
                  this.$store.commit(
                    "user/SET_SOLUTIONS",
                    response.data.active_account.accounts[0].solutions
                  );
                  this.$store.commit(
                    "user/SET_ROLES",
                    response.data.active_account.accounts[0].role
                  );
                  this.$store.commit("customer/SET_CUSTOMER_ID", "");
                  window.location.reload();
                }
              })
              .catch((e) => {
                console.log("Pindah Company Gagal");
              });
          }
        });
    },
    logout() {
      swal
        .fire({
          title: "Apakah anda yakin akan logout?",
          text: ``,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-success btn-fill",
          cancelButtonClass: "btn btn-danger btn-fill",
          confirmButtonText: "Logout!",
          buttonsStyling: false,
        })
        .then((result) => {
          if (result.value) {
            this.$store.commit("user/SET_USER", {});
            this.$store.commit("user/SET_COMPANY", {});
            this.$store.commit("user/SET_LIST_COMPANY", []);
            this.$store.commit("user/SET_STATUS", false);
            this.$store.commit("user/SET_ROLES", []);
            this.$store.commit("user/SET_SOLUTIONS", []);
            this.$store.commit("customer/SET_CUSTOMER_ID", "");
            this.$auth.logout();
            this.$router.push("/");
          }
        });
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
  },
};
</script>
<style scoped>
.list-company :hover {
  background: #e7e7e7;
}
</style>
