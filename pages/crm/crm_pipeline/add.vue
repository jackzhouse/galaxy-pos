<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">

        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Customer</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>

        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/crm/crm_customer" class="btn btn-neutral btn-sm">Kembali</nuxt-link>
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
                <form class="needs-validation" @submit.prevent="customerFormSubmit">
                   <div class="col-md-8">
                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label"
                      >Nama Pelanggan</label
                    >
                    <div class="col-md-9">
                      <base-input
                        name="name"
                        placeholder="Nama Pelanggan"
                        success-message="Looks good!"
                        rules="required"
                        v-model="form.name"
                      ></base-input>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label"
                      >Nama Implementator</label
                    >
                    <div class="col-md-9">
                      <base-input
                        name="namaImplementator"
                        placeholder="Nama Implementator"
                        success-message="Looks good!"
                        rules="required"
                        v-model="form.namaImplementator"
                      ></base-input>
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
                          :rules="{required: true}"
                          v-model="form.address"
                          rows="3"
                          ></textarea>

                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label"
                      >No Hp</label
                    >
                    <div class="col-md-9">
                      <base-input
                        name="phone"
                        placeholder="No Hp"
                        success-message="Looks good!"
                        rules="required"
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
                        placeholder="Email"
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
                  <base-button type="primary" native-type="submit">Simpan</base-button>
                  <nuxt-link class="btn btn-warning" to="/crm/crm_customer">Batal</nuxt-link>
                </div>
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
      validated: false,
      form: {
        id: "",
        name: "",
        namaImplementator: "",
        address: "",
        phone: "",
        email: "",
        keterangan: "",
      },
      doSubmit: true
    };
  },
  beforeMount() {
      window.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
          this.doSubmit == false;
          e.preventDefault();
          return false;
        }
      })
  },
  methods: {
    async customerFormSubmit() {
      if(this.doSubmit){
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
                this.$router.push("/crm/crm_customer");
              })
              .catch((e) => {});
          });
      }
    },
  },
};
</script>
