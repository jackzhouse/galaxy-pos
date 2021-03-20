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
              <h3 slot="header" class="mb-0">Edit Akun Admin</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="firstSubmit">
                  <div class="col-md-8">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
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
                      <label class="col-md-3 col-form-label form-control-label"
                        >Hak Akses</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="role"
                          placeholder="ROLE_SUPER_ADMIN"
                          success-message="Looks good!"
                          :disabled="true"
                          rules="required"
                          v-model="form.role"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
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
                      <label class="col-md-3 col-form-label form-control-label"
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
                      <label class="col-md-3 col-form-label form-control-label"
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
                      <label class="col-md-3 col-form-label form-control-label"
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
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
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
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
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
                      <label class="col-md-3 col-form-label form-control-label"
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
                      <label class="col-md-3 col-form-label form-control-label"
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

                    <!-- <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Tags</label
                      >
                      <div class="col-md-9">
                        <tags-input
                          v-model="form.tags"
                          placeholder="Tambah Tags"
                        ></tags-input>
                      </div>
                    </div> -->
                  </div>
                  <base-button type="primary" native-type="submit"
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

      form: {
        name: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        maritalStatus: "",
        placeOfBirth: "",
        religion: "",
        dateOfBirth: "",
        role: ["ROLE_SUPER_ADMIN"],
        // tags: [],
      },
      doSubmit: true,
    };
  },
  beforeMount() {
    this.$axios.$get("/main_a/company/company_solution").then((response) => {
      this.GET_SOLUTION_OPTION = response;
      console.log(response);
    });

    this.$axios
      // .$get(`main_d/member_temp/member_temp/${this.$route.params.row}`)
      .$get(`main_a/user/user/${this.$route.params.id}`)
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
        // this.form.tags = response.tags;
      });

  },

  methods: {
    async firstSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }

          this.$axios
            .$put(`main_a/user/user/${this.$route.params.id}`, this.form)
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
            .catch((e) => {});
        });
      }
    },
  },
};
</script>
