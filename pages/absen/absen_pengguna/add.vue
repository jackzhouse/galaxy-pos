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
          <nuxt-link to="/absen/absen_pengguna" class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Create Data Pengguna</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form
                  class="needs-validation"
                  @submit.prevent="absenPenggunaFormSubmit"
                >
                  <div class="col-md-8">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="name"
                          placeholder="Name"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.name"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Role</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="roleSelected"
                            placeholder="Pilih Role"
                          >
                            <el-option
                              v-for="option in roleOptions"
                              :key="option.label"
                              :label="option.label"
                              :value="option.value"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama Shift</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="form.namaShift"
                            filterable
                            placeholder="Pilih Shift terlebih dahulu"
                          >
                            <el-option
                              v-for="option in shiftOptions"
                              :key="option.id_"
                              :label="option.namaShift"
                              :value="option.namaShift"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >ID Pengguna</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="idPengguna"
                          placeholder="ID Pengguna"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.idPengguna"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >No Hp</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="phone"
                          placeholder="Nomor Telepon Pengguna"
                          success-message="Looks good!"
                          rules=""
                          v-model="form.phone"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Email</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="email"
                          placeholder="Email Pengguna"
                          success-message="Looks good!"
                          rules=""
                          v-model="form.email"
                        ></base-input>
                      </div>
                    </div>
                    <!-- <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Tags</label
                      >
                      <div class="col-md-9">
                        <tags-input v-model="form.tags"></tags-input>
                      </div>
                    </div> -->
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/absen/absen_pengguna"
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";

export default {
  name: "absenPenggunaForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      roleOptions: [
        // { value: "ROLE_SUPER_ADMIN", label: "SUPER ADMIN" },
        // { value: "ROLE_ADMIN", label: "ADMIN" },
        // { value: "ROLE_FINANCE", label: "FINANCE" },
        // { value: "ROLE_CS", label: "CS" },
        { value: "ROLE_USER", label: "USER" },
        { value: "ROLE_CUSTOMER", label: "CUSTOMER" },
        // { value: "ROLE_IMPLEMENTATOR", label: "IMPLEMENTATOR" },
        // { value: "ROLE_ADMIN_BNI", label: "ADMIN BNI" },
        // { value: "ROLE_DEVICE", label: "DEVICE" },
      ],
      roleSelected: "",
      validated: false,
      shiftOptions: [],
      loading: false,
      form: {
        name: "",
        idPengguna: "",
        // tags: [],
        namaShift: "",
        phone: "",
        email: "",
      },
      doSubmit: true,
      paging: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        page: 0,
        perPageOptions: [5, 10, 25, 50],
      },
    };
  },
  beforeMount() {
    this.getDatas(this.paging.size, this.paging.page);
    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
  },
  computed: {
    to() {
      let highBound = this.from + this.paging.size;

      if (this.paging.totalElements < highBound) {
        highBound = this.paging.totalElements;
      }
      return highBound;
    },
    from() {
      return this.paging.size * this.paging.page;
    },
  },
  methods: {
    getDatas(size, page) {
      this.$axios
        // .$get(this.url + "?size=" + size + "&page=" + page, { search: [] })
        .$post("main_c/shift/get_shift" + "?size=" + size + "&page=" + page, {
          search: [],
        })
        .then((response) => {
          this.shiftOptions = response.content;
          // this.tableData = response;
          this.tableData = response.content;
          this.tableInfo = response;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
        });
    },
    async absenPenggunaFormSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }

          this.loading = true;
          this.$axios
            .$post(
              `main_c/akses_pengguna/pengguna/` + this.roleSelected,
              this.form
            )
            .then((response) => {
              this.loading = false;
              swal.fire({
                title: `Saved`,
                text: "Your work has been saved",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/absen/absen_pengguna");
            })
            .catch((e) => {});
        });
      }
    },
  },
};
</script>
