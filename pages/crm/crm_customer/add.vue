<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">
            Data Proses Pipeline Pelanggan Perusahaan
          </h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>

        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/crm/crm_customer" class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Tambah Data Customer</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form
                  class="needs-validation row"
                  @submit.prevent="customerFormSubmit"
                >
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama Perusahaan / Lembaga</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="name"
                          placeholder="Nama Perusahaan / Lembaga"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.perusahaanName"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama Implementator</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="implementator"
                            filterable
                            multiple
                            placeholder="Pilih Implementator"
                          >
                            <el-option
                              v-for="(option, keyImp) in implementatorOptions"
                              :key="keyImp"
                              :label="option.name"
                              :value="option.accountId"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Alamat</label
                      >
                      <div class="col-md-9">
                        <textarea
                          class="form-control"
                          name="address"
                          placeholder="Alamat"
                          success-message="Looks good!"
                          :rules="{ required: true }"
                          v-model="form.address"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama PIC</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="name"
                          placeholder="Nama PIC"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.name"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >No Hp PIC</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="phone"
                          placeholder="No Hp PIC"
                          success-message="Looks good!"
                          v-model="form.phone"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Email PIC</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="email"
                          placeholder="Email PIC"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.email"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Keterangan</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="keterangan"
                          placeholder="Keterangan"
                          success-message="Looks good!"
                          v-model="form.keterangan"
                        ></base-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">

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
                      <label class="col-md-3 col-form-label form-control-label"
                        >Solution</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="form.solutions"
                            multiple
                            filterable
                            placeholder="Pilih Solution"
                          >
                            <el-option
                              v-for="option in solutionOptions"
                              :key="option"
                              :label="option"
                              :value="option"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Jenis Pelanggan</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="form.jenis"
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
                      <label class="col-md-3 col-form-label form-control-label"
                        >Tipe Yayasan Pelanggan</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="form.tipe"
                            filterable
                            placeholder="Pilih Tipe Yayasan Pelanggan"
                          >
                            <el-option
                              v-for="option in ['ISLAM', 'KRISTEN', 'OTHER']"
                              :key="option"
                              :label="option"
                              :value="option"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>

                    <div class="form-group row" v-if="show.wilayah">
                      <label class="col-md-3 col-form-label form-control-label"
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
                      <label class="col-md-3 col-form-label form-control-label"
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
                  </div>
                    <base-button type="primary" native-type="submit" :disabled="isDisabledSubmitButton"
                      >Simpan</base-button
                    >
                    <nuxt-link class="btn btn-warning" to="/crm/crm_customer"
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
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";

export default {
  name: "customerForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      isDisabledSubmitButton: false,
      jenisOptions: [],
      provinceOptions: [],
      citiOptions: [],
      solutionOptions: [],
      wilayahOptions: [],
      cabangOptions: [],
      implementator: [],
      validated: false,
      implementatorOptions: [],
      form: {
        perusahaanName: "",
        id: "",
        name: "",
        address: "",
        phone: "",
        email: "",
        keterangan: "",
        implementators: [],
        levelTipe: [],
        solutions: [],
        jenis: "",
        tipe: "",
        province: "",
        city: "",
      },
      level: {
        wilayah: "",
        cabang: "",
      },
      show: {
        wilayah: true,
        cabang: true,
      },
      doSubmit: true,
    };
  },
  beforeMount() {
    this.getProvince();
    this.getSolution();
    this.getJenis();
    var level = this.$store.state.user.user.accounts[0].level;
    var levelType = this.$store.state.user.user.accounts[0].levelType;
    if (levelType) {
      console.log("length " + levelType.length);

      if (levelType.length > 0) {
        if (levelType.length == 4) {
          // Bisa Cabang Bisa Sales (AccountId)
          console.log("sales / cabang");

          var indexLevelType = levelType.findIndex((x) => x === level);
          this.show.wilayah = false;
          this.show.cabang = false;
          // if(indexLevelType == 3){ //sales
          this.level.wilayah = levelType[1];
          this.level.cabang = levelType[2];
          // }else{ // cabang

          // }
          this.show.wilayah = false;
          this.show.cabang = false;
        } else if (levelType.length == 3) {
          // WILAYAH
          console.log("wilayah");
          this.show.wilayah = false;
          this.show.cabang = true;
          this.level.wilayah = levelType[1];
          this.getCabang();
        } else if (levelType.length == 2) {
          // PUSAT
          console.log("pusat");
          this.show.wilayah = true;
          this.show.cabang = true;
        }
      }
    }
    // this.level.wilayah = level;

    this.getWilayah();

    this.$axios
      .$get("main_a/user/get_user_combo_implementator")
      .then((response) => {
        this.implementatorOptions = response;
        if (response.length == 1) {
          this.implementator.push(response[0].accountId);
        }
      });

    if (Object.entries(this.$route.query).length > 0) {
      console.log(this.$route.query);
      this.$axios
        .$get(`main_b/pelanggan/pelanggan/${this.$route.query.id}`)
        .then((response) => {
          this.form.id = response.id;
          this.form.name = response.name;
          this.form.perusahaanName = response.perusahaanName;
          this.implementator = response.implementators;
          if (response.implementators.length > 0) {
            var accountId = [];
            response.implementators.map(function (impl) {
              accountId.push(impl.accountId);
            });
            this.implementator = accountId;
          }
          this.form.address = response.address;
          this.form.phone = response.phone;
          this.form.email = response.email;
          this.form.keterangan = response.keterangan;
          if (response.levelTipe.length > 0) {
            this.level.wilayah = response.levelTipe[1];
            this.getCabang();
            this.level.cabang = response.levelTipe[2];
          }
          this.form.solutions = response.solutions;
          this.form.jenis = response.jenis;
          this.form.tipe = response.tipe;
          this.form.province = response.province;
          this.form.city = response.city;
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
    getWilayah() {
      this.$axios.$get("main_a/company/get_wilayah").then((response) => {
        console.log(response);
        this.wilayahOptions = response;
      });
    },

    getCabang() {
      this.level.cabang = "";
      this.$axios
        .$get("main_a/company/get_cabang/" + this.level.wilayah)
        .then((response) => {
          console.log(response);
          this.cabangOptions = response;
        });
    },

    getSolution() {
      this.$axios.$get("/main_a/company/company_solution").then((response) => {
        this.solutionOptions = response;
        // console.log(response);
      });
    },

    getJenis() {
      this.$axios.$get("/main_b/pelanggan/get_combo_jenis").then((response) => {
        this.jenisOptions = response;
        // console.log(response);
      });
    },
    async customerFormSubmit() {
      this.isDisabledSubmitButton = true;
      var levelTipe = [];
      levelTipe.push("PUSAT");
      levelTipe.push(this.level.wilayah);
      levelTipe.push(this.level.cabang);
      this.form.levelTipe = levelTipe;

      var implementators = [];
      var implementatorOptions = this.implementatorOptions;

      this.implementator.map(function (impl) {
        var indexImplementator = implementatorOptions.findIndex(
          (x) => x.accountId === impl
        );
        implementators.push(implementatorOptions[indexImplementator]);
      });
      this.form.implementators = implementators;

      if (this.form.id == "") {
        if (this.doSubmit) {
          this.$refs.form.validate().then((success) => {
            if (!success) {
              return;
            }

            this.$axios
              .$post(`main_b/pelanggan/pelanggan`, this.form)
              .then((response) => {
                swal.fire({
                  title: `Berhasil`,
                  text: "Data Customer Telah Berhasil Disimpan",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.isDisabledSubmitButton = false;
                this.$router.push("/crm/crm_customer");
              })
              .catch((e) => {
                swal.fire({
                  title: `Gagal`,
                  text: "Data Customer Gagal Di Simpan",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-danger",
                  type: "danger",
                });
                this.isDisabledSubmitButton = false;
              });
          });
        }
      } else {
        this.$axios
          .$put(
            `main_b/pelanggan/pelanggan/${this.$route.query.id}`,
            this.form
          )
          .then((response) => {
            swal.fire({
              title: `Berhasil`,
              text: "Data Customer Telah Berhasil Diubah",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success",
            });
            this.$router.push("/crm/crm_customer");
            this.isDisabledSubmitButton = false;
          })
          .catch((e) => {
            swal.fire({
              title: `Gagal`,
              text: "Data Customer Gagal Di Simpan",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-danger",
              type: "danger",
            });
            this.isDisabledSubmitButton = false;
          });
      }
    },
  },
};
</script>
