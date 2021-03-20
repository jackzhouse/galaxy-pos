<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Company</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>

        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link
            to="/admin_server/company_office"
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
              <h3 slot="header" class="mb-0">Tambah Perusahaan</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="firstSubmit">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Nama Perusahaan</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="companyName"
                            placeholder="Masukkan Nama Perusahaan"
                            success-message="Looks good!"
                            rules="required"
                            v-model="form.companyName"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Company Code</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="companyCode"
                            placeholder="Company Code"
                            success-message="Looks good!"
                            v-model="form.companyCode"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Nama PIC</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="picName"
                            placeholder="Nama PIC"
                            success-message="Looks good!"
                            rules="required"
                            v-model="form.picName"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Email PIC</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="picEmail"
                            placeholder="Masukkan Email"
                            success-message="Looks good!"
                            :rules="{ required: true, email: true }"
                            v-model="form.picEmail"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Telepon PIC</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="picPhone"
                            placeholder="Masukkan Telepon Number"
                            success-message="Looks good!"
                            :rules="{ required: true }"
                            v-model="form.picPhone"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Solution</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="form.solution"
                              multiple
                              filterable
                              placeholder="Pilih Solution"
                            >
                              <el-option
                                v-for="option in GET_SOLUTION_OPTION"
                                :key="option"
                                :label="option"
                                :value="option"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Tags</label
                        >
                        <div class="col-md-9">
                          <tags-input
                            v-model="form.tags"
                            placeholder="Tambah Tags"
                          ></tags-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Tipe</label
                        >
                        <div class="col-md-9">
                          <vue-json-editor
                            name="process"
                            v-model="form.tipe"
                            :expandedOnStart="true"
                          ></vue-json-editor>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Inisial</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="initials"
                            placeholder="Masukkan Inisial Perusahaan"
                            success-message="Looks good!"
                            rules="required"
                            v-model="form.initials"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Provinsi</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="form.province"
                              filterable
                              placeholder="Pilih Provinsi"
                              @change="getCity()"
                            >
                              <el-option
                                v-for="option in provinceOptions"
                                :key="option.id"
                                :label="option.name"
                                :value="option.name"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Kota</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="form.city"
                              filterable
                              placeholder="Pilih Kota"
                            >
                              <el-option
                                v-for="option in citiOptions"
                                :key="option.id"
                                :label="option.name"
                                :value="option.name"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Alamat</label
                        >
                        <div class="col-md-9">
                          <base-input
                            name="alamat"
                            placeholder="Masukkan Alamat Perusahaan"
                            success-message="Looks good!"
                            rules="required"
                            v-model="form.address"
                          ></base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Jenis Pelanggan</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="form.type"
                              filterable
                              placeholder="Pilih Jenis Pelanggan"
                            >
                              <el-option
                                v-for="option in jenisOptions"
                                :key="option"
                                :label="option"
                                :value="option"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label
                          class="col-md-3 col-form-label form-control-label"
                          >Souce Of Fund</label
                        >
                        <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="form.tipeSourceFund"
                              filterable
                              placeholder="Pilih Source Of Fund"
                            >
                              <el-option
                                v-for="option in tipeSourceFundOptions"
                                :key="option"
                                :label="option"
                                :value="option"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>

                    </div>
                  </div>
                  <base-button
                    type="primary"
                    :disabled="disabledSubmitButton"
                    native-type="submit"
                    >Simpan</base-button
                  >
                  <nuxt-link
                    class="btn btn-warning"
                    to="/admin_server/company_office"
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
import vueJsonEditor from "vue-json-editor";

export default {
  name: "companyForm",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    vueJsonEditor,
  },
  data() {
    return {
      jenisOptions: [],
      provinceOptions: [],
      citiOptions: [],
      disabledSubmitButton: false,
      wilayahOptions: [],
      cabangOptions: [],
      tipeSourceFundOptions: ["KATALIS", "INTERNAL"],

      GET_SOLUTION_OPTION: [],

      validated: false,
      form: {
        id: "",
        companyName: "",
        companyCode: "",
        picName: "",
        picEmail: "",
        solution: [],
        tags: [],
        tipe: {},
        type: "",
        initials: "",
        province: "",
        city: "",
        address: "",
        picPhone: "",
        tipeSourceFund: ""
      },
      doSubmit: true,
    };
  },
  beforeMount() {
    this.getProvince();
    this.getJenis();
    this.getWilayah();

    this.$axios.$get("/main_a/company/company_solution").then((response) => {
      this.GET_SOLUTION_OPTION = response;
      console.log(response);
    });

    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
    if (this.$route.query.id) {
      this.$axios
        .$get(`main_a/company/company/${this.$route.query.id}`)
        .then((response) => {
          this.form.id = response.id_;
          this.form.companyName = response.companyName;
          this.form.picName = response.picName;
          this.form.picEmail = response.picEmail;
          this.form.picPhone = response.picPhone;
          this.form.solution = response.solution;
          this.form.tags = response.tags;
          this.form.tipe = response.tipe;
          this.form.companyCode =response.companyCode;
          this.form.initials = response.initials;
          this.form.province = response.province;
          this.form.city = response.city;
          this.form.address = response.address;
          this.form.type = response.type;
          this.form.tipeSourceFund = response.tipeSourceFund;
        });
    }
  },

  methods: {
    getProvince() {
      this.$axios
        .$get("https://api.katalis.info/wilayah/getAllProvinces")
        .then((response) => {
          this.provinceOptions = response;
          // console.log(response);
        });
    },
    getCity() {
      var indexProv = this.provinceOptions.findIndex(
        (x) => x.name === this.form.province
      );
      if (indexProv != null) {
        var provId = this.provinceOptions[indexProv].id;
        this.$axios
          .$get("https://api.katalis.info/wilayah/getRegencies/" + provId)
          .then((response) => {
            this.citiOptions = response;
            // console.log(response);
          });
      }
    },
    getJenis() {
      this.$axios.$get("/main_b/pelanggan/get_combo_jenis").then((response) => {
        this.jenisOptions = response;
        // console.log(response);
      });
    },
    getWilayah() {
      this.$axios.$get("main_a/company/get_wilayah").then((response) => {
        console.log(response);
        this.wilayahOptions = response;
      });
    },

    getCabang() {
      this.$axios
        .$get("main_a/company/get_cabang/" + this.form.wilayah)
        .then((response) => {
          console.log(response);
          this.cabangOptions = response;
        });
    },

    firstSubmit() {
      this.disabledSubmitButton = true;
      if (this.form.id == "") {
        if (this.doSubmit) {
          this.$refs.form.validate().then((success) => {
            if (!success) {
              return;
            }

            this.$axios
              .$post(`main_a/company/company/sso`, this.form)
              .then((response) => {
                swal.fire({
                  title: `Saved`,
                  text: "Data Berhasil Di Simpan",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/admin_server/company_office");
              })
              .catch((e) => {
                console.log(e.response);
                swal.fire({
                  title: `Failed`,
                  text: e.response.status + " || "+ e.response.data.detail,
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-danger",
                  type: "danger",
                });
                this.disabledSubmitButton = false;
              });
          });
        }
      } else {
        this.$axios
          .$put(`main_a/company/company/${this.$route.query.id}`, this.form)
          .then((response) => {
            swal.fire({
              title: `Success`,
              text: "Data Berhasil Di Update",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success",
            });
            this.$router.push("/admin_server/company_office");
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
    },
  },
};
</script>
