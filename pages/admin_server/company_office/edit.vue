<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-1">
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
              <h3 slot="header" class="mb-0">Edit Perusahaan</h3>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(updateCompany)"
                >
                  <div class="col-md-8">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama Perusahaan</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="companyName"
                          placeholder="Nama Perusahaan"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.companyName"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row mt--4">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama PIC</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="picName"
                          placeholder="Masukan Nama PIC"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.picName"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row mt--4">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Email PIC</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="picEmail"
                          placeholder="Masukan Email PIC"
                          success-message="Looks good!"
                          :rules="{ required: true, email: true }"
                          v-model="form.picEmail"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row mt--4">
                      <label class="col-md-3 col-form-label form-control-label"
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
                    <div class="form-group row mt--4">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Tags</label
                      >
                      <div class="col-md-9">
                        <tags-input v-model="form.tags"></tags-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Wilayah</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="form.wilayah"
                            filterable
                            placeholder="Pilih Wilayah"
                            @change="getCabang"
                          >
                            <el-option
                              v-for="option in wilayahOptions"
                              :key="option"
                              :label="option"
                              :value="option"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>

                    <div class="col-md-6" v-if="form.wilayah === ''"></div>

                    <div class="form-group row mt--4" v-else>
                      <label class="col-md-3 col-form-label form-control-label"
                        >Cabang</label
                      >
                      <div class="col-md-9">
                        <base-input>
                          <el-select
                            v-model="form.cabang"
                            filterable
                            placeholder="Pilih Cabang"
                          >
                            <el-option
                              v-for="option in cabangOptions"
                              :key="option.id_"
                              :label="option.cabang"
                              :value="option.id_"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
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

export default {
  name: "CompanyForm",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      wilayahOptions: [],
      cabangOptions: [],

      GET_SOLUTION_OPTION: [],
      validated: false,
      form: {
        companyName: "",
        picName: "",
        picEmail: "",
        solution: [],
        tags: [],

        wilayah: "",
        cabang: "",
      },
      validated: false,
    };
  },
  beforeMount() {
    this.getWilayah();

    this.$axios.$get("/main_a/company/company_solution").then((response) => {
      this.GET_SOLUTION_OPTION = response;
      console.log(response);
    });

    this.$axios
      .$get(`main_a/company/company/${this.$route.params.id}`)
      .then((response) => {
        this.form.companyName = response.companyName;
        this.form.picName = response.picName;
        this.form.picEmail = response.picEmail;
        this.form.solution = response.solution;
        this.form.tags = response.tags;
      });
  },
  methods: {
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

    updateCompany() {
      this.$axios
        .$put(`main_a/company/company/${this.$route.params.id}`, this.form)
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
        .catch((e) => {});
    },
  },
};
</script>
