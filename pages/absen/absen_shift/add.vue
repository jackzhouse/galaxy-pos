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
          <nuxt-link to="/absen/absen_shift" class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Create Data Shift</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form
                  class="needs-validation"
                  @submit.prevent="shiftFormSubmit"
                >
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-md-6">
                        <base-input
                          label="Nama Shift"
                          name="namaShift"
                          placeholder="Nama Shift"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.namaShift"
                        ></base-input>
                      </div>
                      <!-- <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Pengguna</label>
                      <div class="col-md-9">
                        <base-input
                          name="pengguna"
                          placeholder="Pengguna"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.pengguna"
                        ></base-input>
                      </div>
                    </div> -->
                      <div class="col-md-6">
                        <base-input
                          success-message="Looks good!"
                          name="Hari"
                          rules="required"
                          label="Hari"
                        >
                          <el-select
                            v-model="form.hari"
                            placeholder="Pilihan Hari"
                          >
                            <el-option
                              v-for="option in hariOptions"
                              :key="option.label"
                              :label="option.label"
                              :value="option.value"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <base-input
                          label="Jam Sebelum Masuk"
                          name="sblmMasuk"
                          placeholder="Jam Sebelum Masuk"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.sblmMasuk"
                          type="time"
                        ></base-input>
                      </div>
                      <div class="col-md-4">
                        <base-input
                          label="Jam Masuk"
                          name="jamMasuk"
                          placeholder="Jam Masuk"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.jamMasuk"
                          type="time"
                        ></base-input>
                      </div>
                      <div class="col-md-4">
                        <base-input
                          label="Jam Setelah Masuk"
                          name="stlhMasuk"
                          placeholder="Jam Setelah Masuk"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.stlhMasuk"
                          type="time"
                        ></base-input>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4">
                        <base-input
                          label="Jam Sebelum Pulang"
                          name="sblmPulang"
                          placeholder="Jam Sebelum Pulang"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.sblmPulang"
                          type="time"
                        ></base-input>
                      </div>
                      <div class="col-md-4">
                        <base-input
                          label="Jam Pulang"
                          name="jamPulang"
                          placeholder="Jam Pulang"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.jamPulang"
                          type="time"
                        ></base-input>
                      </div>
                      <div class="col-md-4">
                        <base-input
                          label="Jam Setelah Pulang"
                          name="stlhPulang"
                          placeholder="Jam Setelah Pulang"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.stlhPulang"
                          type="time"
                        ></base-input>
                      </div>
                      <div class="col-md-4">
                        <base-input
                          label="Jam Pulang Lembur"
                          name="jamPulangLembur"
                          placeholder="Jam Pulang Lembur"
                          success-message="Looks good!"
                          rules=""
                          v-model="form.jamPulangLembur"
                          type="time"
                        ></base-input>
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/absen/absen_shift"
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
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "shiftForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      loading: false,
      hariOptions: [
        { value: "Monday", label: "Senin" },
        { value: "Tuesday", label: "Selasa" },
        { value: "Wednesday", label: "Rabu" },
        { value: "Thursday", label: "Kamis" },
        { value: "Friday", label: "Jumat" },
        { value: "Saturday", label: "Sabtu" },
        { value: "Sunday", label: "Minggu" },
      ],

      validated: false,
      form: {
        namaShift: "",
        // pengguna: "",
        hari: [],
        sblmMasuk: "",
        jamMasuk: "",
        stlhMasuk: "",
        sblmPulang: "",
        jamPulang: "",
        stlhPulang: "",
        jamPulangLembur: "",
      },
      doSubmit: true,
    };
  },
  beforeMount() {
    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
  },
  methods: {
    async shiftFormSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }

          this.loading = true;
          this.$axios
            .$post(`main_c/shift/shift`, this.form)
            .then((response) => {
              this.loading = false;
              // console.log(response);
              swal.fire({
                title: `Success`,
                text: "A few words about this sweet alert ...",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/absen/absen_shift");
            })
            .catch((e) => {});
        });
      }
    },
  },
};
</script>
