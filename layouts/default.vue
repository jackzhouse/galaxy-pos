<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <!-- {{$store.state.user.user.accounts}} -->
      <!-- {{$store.state.user.user.accounts[0].solutions}} -->

      <template slot-scope="props" slot="links">
        <template v-for="(item, key) in navItems">
          <template v-if="item.isParent">
            <h6
              class="navbar-heading p-0 text-muted pl-3 mt-3"
              v-bind:key="key"
            >
              {{ item.name }}
            </h6>
          </template>

          <template v-if="item.child.length == 0">
            <sidebar-item
              :link="{
                name: item.name,
                icon: item.icon,
                path: item.url,
              }"
              v-bind:key="key"
            >
            </sidebar-item>
          </template>

          <template v-else>
            <sidebar-item
              :link="{
                name: item.name,
                icon: item.icon,
              }"
              v-bind:key="key"
            >
              <template v-for="(itemChild, key2) in item.child">
                <sidebar-item
                  :link="{
                    name: itemChild.name,
                    path: itemChild.url,
                  }"
                  v-bind:key="key2"
                ></sidebar-item>
              </template>
            </sidebar-item>
          </template>
        </template>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar
        :type="$route.name === 'alternative' ? 'light' : 'default'"
      ></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import nav from "./menu";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "~/components/layouts/argon/DashboardNavbar.vue";
import ContentFooter from "~/components/layouts/argon/ContentFooter.vue";
import DashboardContent from "~/components/layouts/argon/Content.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
  },
  data() {
    return {
      navItems: [],
    };
  },
  beforeMount() {
    this.filterMenu(nav.items);
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("scrollbar-inner");
      }
    },
    getUserSolution(solution) {      
      var result = false;
      if (this.$store.state.user.solutions) {
        var solutionsMenu = solution;
        var solutionsUser = this.$store.state.user.solutions;

        if (solutionsUser.length > 0) {
          // var result = solutionsMenu
          //   .filter(function (o1) {
          //     return solutionsUser.some(function (o2) {
          //       return o1 === o2;
          //     });
          //   })
          //   .map(function (o) {
          //     return o;
          //   });
          // console.log("filter role: " + result.length);
          if (solutionsMenu != "") {
            if (solutionsUser.includes(solutionsMenu)) {
              result = true;
            }else{
              result = false;
            }
          } else {
            result = true;
          }
        } else {
          result = true;
        }
      }

      // console.log("============");
      // var result = false;
      // if (this.$store.state.user.solutions) {
      //   var solutions = this.$store.state.user.solutions;
      //   if (solutions.length > 0 && solution != "") {
      //     if (solutions.includes(solution)) {
      //       result = true;
      //     } else {
      //       result = false;
      //     }
      //   } else {
      //     result = true;
      //   }
      // } else {
      //   result = false;
      // }
      // console.log(result);
      // console.log("============");
      return result;
    },
    getUserRoles(role) {
      var result = false;
      if (this.$store.state.user.roles) {
        var rolesMenu = role;
        var rolesUser = this.$store.state.user.roles;
        var props = [];
        if (rolesMenu.length > 0) {
          var result = rolesMenu
            .filter(function (o1) {
              return rolesUser.some(function (o2) {
                return o1 === o2;
              });
            })
            .map(function (o) {
              return o;
            });
          // console.log("filter role: " + result.length);
          if (result.length > 0) {
            result = true;
          }
        } else {
          result = true;
        }

        // ====================================
        // var roles = this.$store.state.user.roles;
        // if (roles.length > 0 && role.length > 0) {
        //   result = role.some((ii) => {
        //     roles.some((e) => {
        //       e === ii;
        //     });
        //   });
        // } else {
        //   result = true;
        // }
      }
      // if (this.$store.state.user.roles.find((row) => row == "ROLE_SUPER_ADMIN")) {
      //   result = true;
      // }
      return result;
    },
    getUserCompany(companyId) {
      // console.log("============");
      console.log("companyId", companyId);
      var result = false;
      if (this.$store.state.user.company) {
        var company = this.$store.state.user.company;
        if (company.companyId == companyId) result = true;
      } else {
        result = false;
      }
      return result;
    },
    filterMenu(menus) {
      this.navItems = [];
      let returnedmenus = [];
      menus.map((row) => {
        let child = [];
        let menu = {};
        if (row.child.length > 0) {
          row.child.map((subrow) => {
            let submenu = {};
            if (subrow.companyId) {
              if (this.getUserCompany(subrow.companyId)) {
                submenu = {
                  name: subrow.name,
                  url: subrow.url,
                  icon: subrow.url,
                };
              }
            } else {
              submenu = {
                name: subrow.name,
                url: subrow.url,
                icon: subrow.icon,
              };
            }
            // console.log(subrow.role);
            if (
              this.getUserRoles(subrow.role) == true &&
              this.getUserSolution(subrow.solutions)
            ) {
              child.push(submenu);
            }
          });
          menu = {
            name: row.name,
            icon: row.icon,
            child: child,
            isParent: false,
          };
        } else {
          menu = {
            name: row.name,
            icon: row.icon,
            url: row.url,
            child: [],
            isParent: false,
          };
          console.log("menu", menu);
          console.log("row.isParent", row.isParent);
          if (row.isParent != undefined) {
            menu.isParent = row.isParent;
            // this.$delete(menu, "url");
            // this.$delete(menu, "icon");
          }
        }

        if (
          this.getUserRoles(row.role) == true &&
          this.getUserSolution(row.solutions)
        ) {
          returnedmenus.push(menu);
        }
      });

      console.log(returnedmenus);
      this.navItems = returnedmenus;
    },
  },
  mounted() {
    this.initScrollbar();
  },
};
</script>
<style lang="scss"></style>
