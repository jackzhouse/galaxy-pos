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
          <nuxt-link to="/absen/absen_mesin" class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Create Mesin Absen</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form
                  class="needs-validation"
                  @submit.prevent="mesinAbsenFormSubmit"
                >
                  <div class="col-md-8">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Id Mesin</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="idMesin"
                          placeholder="Id Mesin"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.idMesin"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama Mesin</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="namaMesin"
                          placeholder="Nama Mesin"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.namaMesin"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Biaya Tap</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="biayaTap"
                          placeholder="Biaya Tap"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.biayaTap"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Max Free</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="maxFree"
                          placeholder="Max Free"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.maxFree"
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
                          rules="required"
                          v-model="form.keterangan"
                        ></base-input>
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/absen/absen_mesin"
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
  name: "MesinAbsenForm",
  // layout: "DashboardLayout",
  components: {
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
        idMesin: "",
        namaMesin: "",
        keterangan: "",
        biayaTap: "",
        maxFree: "",
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
    async mesinAbsenFormSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }
          this.loading = true;
          this.$axios
            .$post(`main_c/mesin/mesin`, this.form)
            .then((response) => {
              this.loading = false;
              swal.fire({
                title: `Saved`,
                text: "Your work has been saved",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/absen/absen_mesin");
            })
            .catch((e) => {});
        });
      }
    },
  },
};
</script>
