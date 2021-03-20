<template>
  <div>
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
          <nuxt-link
            to="/admin_server/data_admin_office"
            class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Tambah Akun Admin</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="firstSubmit">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Nama</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="name"
                            placeholder="Masukkan Nama"
                            success-message="Looks good!"
                            rules="required"
                            v-model="form.name"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Hak Akses</label
                        >
                        <div class="col-md-9">
                          <!-- <base-input
                            name="role"
                            placeholder="ROLE_ADMIN"
                            success-message="Looks good!"
                            :disabled="true"
                            rules="required"
                            v-model="form.role"
                          ></base-input> -->

                          <base-input>
                            <el-select
                              rules="required"
                              v-model="form.role"
                              placeholder="Silahkan Dipilih"
                              @change="setRole()"
                            >
                              <el-option
                                v-for="option in GET_ROLE_OPTION"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value"
                              >
                              </el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Jenis Kelamin</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              rules="required"
                              v-model="form.gender"
                              placeholder="Silahkan Dipilih"
                            >
                              <el-option
                                v-for="option in GET_GENDER_OPTION"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value"
                              >
                              </el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Tanggal Lahir</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <flat-picker
                              slot-scope="{ focus, blur }"
                              @on-open="focus"
                              @on-close="blur"
                              :config="{ allowInput: true }"
                              class="form-control datepicker"
                              placeholder="Tanggal Lahir"
                              name="dateOfBirth"
                              rules="required"
                              v-model="form.dateOfBirth"
                            >
                            </flat-picker>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Tempat Lahir</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="placeOfBirth"
                            placeholder="Masukan Tempat Lahir"
                            success-message="Looks good!"
                            rules="required"
                            v-model="form.placeOfBirth"
                          ></base-input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Agama</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              rules="required"
                              v-model="form.religion"
                              placeholder="Silahkan Dipilih"
                            >
                              <el-option
                                v-for="option in GET_RELIGIONS_OPTION"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value"
                              >
                              </el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <!-- <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Status Pernikahan</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              rules="required"
                              v-model="form.maritalStatus"
                              placeholder="Silahkan Dipilih"
                            >
                              <el-option
                                v-for="option in GET_MARTIAL_STATUS_OPTION"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value"
                              >
                              </el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div> -->
                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Alamat</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="address"
                            placeholder="Masukkan Alamat"
                            success-message="Looks good!"
                            rules="required"
                            v-model="form.address"
                          ></base-input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Telepon</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="phone"
                            type="number"
                            placeholder="Masukkan Telepon"
                            success-message="Looks good!"
                            v-model="form.phone"
                          ></base-input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Email</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="email"
                            placeholder="Masukkan Email"
                            success-message="Looks good!"
                            :rules="{ required: true, email: true }"
                            v-model="form.email"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Level</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="levelUser"
                              filterable
                              placeholder="Pilih Wilayah"
                              @change="onChangeLevel()"
                            >
                              <el-option
                                v-for="option in levelOptions"
                                :key="option"
                                :label="option"
                                :value="option"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row" v-if="show.wilayah">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Wilayah</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="level.wilayah"
                              filterable
                              placeholder="Pilih Wilayah"
                              @change="getCabang"
                            >
                              <el-option
                                v-for="option in wilayahOptions"
                                :key="option.id"
                                :label="option.value"
                                :value="option.id"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row" v-if="show.cabang">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Cabang</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="level.cabang"
                              filterable
                              placeholder="Pilih Cabang"
                            >
                              <el-option
                                v-for="option in cabangOptions"
                                :key="option"
                                :label="option"
                                :value="option"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <!-- <div class="form-group row mt--4">
                      <label class="col-md-3 col-form-label form-control-label">Tags</label>
                      <div class="col-md-9">
                        <tags-input v-model="form.tags"
                         placeholder="Tambah Tags"></tags-input>
                      </div>
                    </div> -->
                    </div>
                  </div>
                  <base-button
                    type="primary"
                    native-type="submit"
                    :disabled="disabledSubmitButton"
                    >Simpan</base-button
                  >
                  <nuxt-link
                    class="btn btn-warning"
                    to="/admin_server/data_admin_office"
                    >Batal</nuxt-link
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
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { json } from "d3";

export default {
  name: "DataAkunForm",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    flatPicker,
  },
  data() {
    return {
      // ------------------------Event Function----------------------
      disabledSubmitButton: false,
      levelSelect: "",
      levelOptions: ["PUSAT", "WILAYAH", "CABANG", "SALES"],
      GET_GENDER_OPTION: [
        {
          label: "Laki-laki",
          value: "MALE",
        },
        {
          label: "Perempuan",
          value: "FEMALE",
        },
      ],
      GET_ROLE_OPTION: [
        {
          label: "Admin",
          value: ["ROLE_ADMIN"],
        },
        {
          label: "Implementator",
          value: ["ROLE_ADMIN", "ROLE_IMPLEMENTATOR"],
        },
        {
          label: "Back Office",
          value: ["ROLE_ADMIN", "ROLE_ADMIN_PARTNER"],
        },
        {
          label: "Sales",
          value: ["ROLE_SALES"],
        },
      ],
      GET_RELIGIONS_OPTION: [
        { value: "ISLAM", label: "Islam" },
        { value: "KRISTEN", label: "Kristen" },
        { value: "KATOLIK", label: "Katolik" },
        { value: "HINDU", label: "Hindu" },
        { value: "BUDHA", label: "Budha" },
        { value: "KONGHUCU", label: "Konghucu" },
        { value: "OTHER", label: "Lainnya" },
      ],
      GET_MARTIAL_STATUS_OPTION: [
        { value: "SINGLE", label: "Lajang" },
        { value: "MARRIED", label: "Menikah" },
        { value: "DIVORCED", label: "Cerai" },
        { value: "WIDOWED", label: "Duda/Janda" },
        { value: "OTHER", label: "Lainnya" },
      ],
      validated: false,
      wilayahOptions: [],
      cabangOptions: [],
      levelUser: "",
      show: {
        wilayah: false,
        cabang: false,
      },
      form: {
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        placeOfBirth: "",
        religion: "",
        dateOfBirth: "",
        role: ["ROLE_ADMIN"],
        level: "",
        levelTipe: [],
        maritalStatus: "OTHER",
        // tags: [],
      },
      level: {
        wilayah: "",
        cabang: "",
      },
      doSubmit: true,
    };
  },
  beforeMount() {
    this.getWilayah();
    this.$axios.$get("/main_a/company/company_solution").then((response) => {
      this.GET_SOLUTION_OPTION = response;
      // console.log(response);
    });

    if (this.$route.query.id) {
      this.$axios
        // .$get(`main_d/member_temp/member_temp/${this.$route.params.row}`)
        .$get(`main_a/user/user/${this.$route.query.id}`)
        .then((response) => {
          this.form.name = response.name;
          this.form.phone = response.phone;
          this.form.email = response.email;
          this.form.address = response.address;
          this.form.gender = response.gender;
          this.form.maritalStatus = response.maritalStatus;
          this.form.placeOfBirth = response.placeOfBirth;
          this.form.religion = response.religion;
          this.form.dateOfBirth = response.dateOfBirth;
          var accounts = response.akun[0];
          // console.log(accounts);
          // this.form.tags = response.tags;
          var indexRole = this.GET_ROLE_OPTION.findIndex(
            (x) => JSON.stringify(x.value) == JSON.stringify(accounts.role)
          );
          this.form.role = accounts.role;//this.GET_ROLE_OPTION[indexRole];
          console.log(this.form.role);
          // console.log(JSON.stringify(accounts.role));

          this.levelUser = accounts.level;
          if (accounts.levelTipe.length > 0) {
            if (accounts.levelTipe.length == 1) {
              this.show.wilayah = true;
              this.show.cabang = true;

              this.level.wilayah = accounts.levelTipe[1];
              this.getCabang();
              this.level.cabang = accounts.levelTipe[2];
            } else if (accounts.levelTipe.length == 2) {
              this.show.wilayah = false;
              this.show.cabang = false;
            } else if (accounts.levelTipe.length == 3) {
              this.show.wilayah = true;
              this.show.cabang = false;

              this.level.wilayah = accounts.levelTipe[1];
              this.getCabang();
              // this.level.cabang = accounts.levelTipe[2];
            } else if (accounts.levelTipe.length == 4) {
              this.show.wilayah = true;
              this.show.cabang = true;
              this.level.wilayah = accounts.levelTipe[1];
              this.getCabang();
              this.level.cabang = accounts.levelTipe[2];
            }
            // this.level.wilayah = accounts.levelTipe[1];
            // this.getCabang();
            // this.level.cabang = accounts.levelTipe[2];
          }
        });
    }
  },

  methods: {
    setRole() {
      this.form.role;
      // console.log(this.form.role);
      if (this.form.role.includes("ROLE_SALES")) {
        this.levelUser = "SALES";
        this.onChangeLevel();
      } else {
        this.levelUser = "";
        this.onChangeLevel();
        this.show.wilayah = false;
        this.show.cabang = false;
      }
    },
    onChangeLevel() {
      this.level.wilayah = "";
      this.level.cabang = "";
      this.form.levelTipe = [];
      this.form.level = "";

      if (this.levelUser == "PUSAT") {
        this.show.wilayah = false;
        this.show.cabang = false;
      } else if (this.levelUser == "WILAYAH") {
        this.show.wilayah = true;
        this.show.cabang = false;
      } else if (this.levelUser == "CABANG") {
        this.show.wilayah = true;
        this.show.cabang = true;
      } else if (this.levelUser == "SALES") {
        this.show.wilayah = true;
        this.show.cabang = true;
      }
    },
    getWilayah() {
      this.$axios.$get("main_a/company/get_wilayah").then((response) => {
        // console.log(response);
        this.wilayahOptions = response;
      });
    },

    getCabang() {
      this.$axios
        .$get("main_a/company/get_cabang/" + this.level.wilayah)
        .then((response) => {
          // console.log(response);
          this.cabangOptions = response;
        });
    },
    async firstSubmit() {
      this.disabledSubmitButton = true;
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }
          if (this.levelUser == "PUSAT") {
            this.form.level = "PUSAT";
            this.form.levelTipe.push("PUSAT");
          } else if (this.levelUser == "WILAYAH") {
            this.form.level = this.level.wilayah;

            this.form.levelTipe.push("PUSAT");
            this.form.levelTipe.push(this.level.wilayah);
          } else if (this.levelUser == "CABANG") {
            this.form.level = this.level.cabang;

            this.form.levelTipe.push("PUSAT");
            this.form.levelTipe.push(this.level.wilayah);
            this.form.levelTipe.push(this.level.cabang);
          } else if (this.levelUser == "SALES") {
            this.form.level = "";

            this.form.levelTipe.push("PUSAT");
            this.form.levelTipe.push(this.level.wilayah);
            this.form.levelTipe.push(this.level.cabang);
          } else {
            this.form.level = "";
            this.form.levelTipe = [];
          }
          if (this.$route.query.id) {
            this.$axios
              .$put(`main_a/user/user/${this.$route.query.id}`, this.form)
              .then((response) => {
                swal.fire({
                  title: `Saved`,
                  text: "Data Berhasil Di Simpan",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/admin_server/data_admin_office");
              })
              .catch((e) => {
                swal.fire({
                  title: `Failed`,
                  text: "Data Gagal Di Simpan",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-danger",
                  type: "danger",
                });
                this.disabledSubmitButton = false;
              });
          } else {
            this.$axios
              .$post(`main_a/user/user`, this.form)
              .then((response) => {
                swal.fire({
                  title: `Saved`,
                  text: "Data Berhasil Di Simpan",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/admin_server/data_admin_office");
              })
              .catch((e) => {
                swal.fire({
                  title: `Failed`,
                  text: "Data Gagal Di Simpan",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-danger",
                  type: "danger",
                });
                this.disabledSubmitButton = false;
              });
          }
        });
      }
    },
  },
};
</script>
