<template>
  <div>
    <loading
      :active.sync="loading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/website/website_menu" class="btn btn-neutral btn-sm"
            >Kembali</nuxt-link
          >
          <!-- <base-button size="sm" type="neutral">Filters</base-button> -->
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Create Menu</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="menuFormSubmit">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Judul</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="title"
                          placeholder="Judul"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.title"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Sub Menu</label
                      >
                      <div class="col-md-7">
                        <base-switch
                          class="mr-1"
                          v-model="form.isHasChild"
                        ></base-switch>
                      </div>
                    </div>

                    <!-- <div v-if="form.isHasChild === true" class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Menu Id</label
                      >
                      <div class="col-md-7">
                        <base-input>
                          <el-select
                            v-model="menu"
                            filterable
                            placeholder="Pilih Menu terlebih dahulu"
                            multiple=""
                          >
                            <el-option
                              v-for="option in menuList"
                              :key="option.id"
                              :label="option.title"
                              :value="option.id"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div> -->
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Page Id</label
                      >
                      <div class="col-md-7">
                        <base-input>
                          <el-select
                            v-model="form.pageId"
                            filterable
                            placeholder="Pilih Page terlebih dahulu"
                          >
                            <el-option
                              v-for="option in pageList"
                              :key="option.id"
                              :label="option.title"
                              :value="option.id"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Ikon</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="ikon"
                          placeholder="Url"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.ikon"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Url</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="url"
                          placeholder="Url"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.url"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Status</label
                      >
                      <div class="col-md-7">
                        <base-switch
                          class="mr-1"
                          v-model="form.status"
                        ></base-switch>
                      </div>
                    </div>
                    <div v-if="form.isHasChild === true" class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Tambah Sub Menu</label
                      >
                      <table class="table table-bordered">
                        <thead>
                          <tr>
                            <th>Judul</th>
                            <th>Ikon</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                name="title"
                                id="title"
                                v-model="data.title"
                                class="form-control"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                name="ikon"
                                id="ikon"
                                v-model="data.ikon"
                                class="form-control"
                              />
                            </td>
                            <td>
                              <select
                                name="status"
                                id="status"
                                class="form-control"
                                v-model="data.status"
                              >
                                <option value="true">Aktif</option>
                                <option value="false">Tidak Aktif</option>
                              </select>
                            </td>
                            <td>
                              <button
                                class="btn btn-danger btn-lg"
                                type="button"
                                @click="addData()"
                              >
                                <i class="fa fa-plus"></i>
                              </button>
                            </td>
                          </tr>
                          <tr v-for="(item, index) in data" :key="index">
                            <td>{{ item.title }}</td>
                            <td>{{ item.ikon }}</td>
                            <td>{{ item.status }}</td>
                            <td>
                              <button
                                class="btn btn-danger btn-sm"
                                type="button"
                                @click="deleteData(index)"
                              >
                                <i class="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/website/website_menu"
                    >Cancel</nuxt-link
                  >
                </form>
              </validation-observer>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileInput from "@/components/argon-core/Inputs/FileInput";
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "MenuForm",
  // layout: "DashboardLayout",
  components: {
    FileInput,
    TagsInput,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      validated: false,
      loading: false,
      form: {
        title: "",
        isHasChild: false,
        icon: "",
        status: true,
        url: "",
        pageId: "",
        child: [],
      },
      data: [],
      menu: [],
      menuList: [],
      pageList: [],
      image: "",
      doSubmit: true,
    };
  },
  beforeMount() {
    this.getPageList();
    this.getMenuList();
    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
  },
  methods: {
    async addData() {
      // if(this.data.columnName == "" ||
      //    this.data.type == "" ||
      //    this.data.props == ""
      //   ){
      //       alert("Data belum lengkap")
      //       return;
      //   }
      const newData = {
        title: this.data.title,
        ikon: this.data.ikon,
        status: this.data.status,
      };
      this.data.push(newData);
      this.form.child.push(newData);
      this.data.title = "";
      this.data.ikon = "";
      this.data.status = "";
    },
    async deleteData(index) {
      this.data.splice(index, 1);
      this.form.child.splice(index, 1);
    },
    selectedOption(value) {
      console.log(value);
    },
    handleUploadImage() {
      this.image = this.$refs.image.files[0];
      // this.image = files[0].name;
    },
    getPageList() {
      this.$axios.$get("main_b/page/list").then((response) => {
        this.pageList = response;
      });
    },
    getMenuList() {
      this.$axios.$get("main_b/menu/list").then((response) => {
        this.menuList = response;
        if (response.length == 1) {
          this.menu.push(response[0].id);
        }
      });
    },
    async menuFormSubmit() {
      // this.menu.map(function (id) {
      //   var indexMenu = menuList.findIndex((x) => x.id === id);
      //   child.push(menuList[indexMenu]);
      // });
      // this.form.child = child;

      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }
          this.loading = true;
          this.$axios
            .$post(`main_b/menu`, this.form)
            .then((response) => {
              this.loading = false;
              swal.fire({
                title: `Saved`,
                text: "Your work has been saved",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/website/website_menu");
            })
            .catch((e) => {});
        });
      }
    },
  },
};
</script>
