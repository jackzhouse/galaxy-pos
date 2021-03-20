<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-1">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Template Pipeline</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Tambah Data Pipeline</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form
                  class="needs-validation"
                  @submit.prevent="pipelineFormSubmit"
                >
                  <div class="col-md-8">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Judul</label
                      >
                      <div class="col-md-9">
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
                      <label class="col-md-3 col-form-label form-control-label"
                        >Keterangan</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="note"
                          placeholder="Keterangan"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.note"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Proses</label
                      >
                      <div class="col-md-9">
                        <vue-json-editor
                          name="process"
                          v-model="form.process"
                          :expandedOnStart="true"
                          @json-change="onJsonChange"
                        ></vue-json-editor>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Migrasi Ke Katalis</label
                      >
                      <div class="col-md-9">
                        <base-checkbox
                          class="mb-0 mt-2"
                          v-model="form.isMigrateKatalis"
                        >
                          Ya
                        </base-checkbox><span class="mt-0" style="font-size:12px !important; font-style:italic; color:red"> * setelah proses timeline selesai , data otomatis di tarik ke katalis</span>
                        
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Simpan</base-button
                  >
                  <nuxt-link
                    class="btn btn-warning"
                    to="/admin_server/crm_pipeline"
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
  name: "PipelineForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,

    vueJsonEditor,
  },
  data() {
    return {
      validated: false,
      form: {
        title: "",
        note: "",
        // process: [],
        process: [],
        isMigrateKatalis: false
      },
      doSubmit: true,
      disabledSubmitButton: false
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
    onJsonChange(value) {
      console.log("value:", value);
    },

    async pipelineFormSubmit() {
      this.disabledSubmitButton = true;
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          // if (!success) {
          //   return;
          // }

          this.$axios
            .$post(`main_b/pipeline/pipeline`, this.form)
            .then((response) => {
              swal.fire({
                title: `Berhasil`,
                text: "Data Pipeline Telah Berhasil Disimpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/admin_server/crm_pipeline");
            })
            .catch((e) => {
              swal.fire({
                title: `Gagal`,
                text: "Data Pipeline Gagal Disimpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "danger",
              });
              this.disabledSubmitButton = false;
            });
        });
      }
    },
  },
};
</script>
