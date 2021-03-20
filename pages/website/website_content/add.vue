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
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Create Content</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="contentSubmit">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Tipe</label
                      >
                      <div class="col-md-3">
                        <base-input>
                          <el-select
                            v-model="form.tipe"
                            placeholder="Pilih Tipe"
                          >
                            <el-option
                              v-for="option in tipeOptions"
                              :key="option.label"
                              :label="option.label"
                              :value="option.value"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Judul</label
                      >
                      <div class="col-md-7">
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
                      <label class="col-md-2 col-form-label form-control-label"
                        >Sub Judul</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="subtitle"
                          placeholder="Sub Judul"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.subtitle"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Tags</label
                      >
                      <div class="col-md-7">
                        <tags-input v-model="form.tags"></tags-input>
                      </div>
                    </div>
                    
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Image</label
                      >
                      <div class="col-md-7">
                        <input
                          type="file"
                          id="image"
                          ref="image"
                          accept="image/*"
                          class="form-control"
                          v-on:change="handleUploadImage()"
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Deskripsi</label
                      >
                      <div class="col-md-10">
                        <vue-editor v-model="form.description"></vue-editor>
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/website/website_content"
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

// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";

export default {
  name: "contentForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    VueEditor,
  },

  data() {
    return {
      tipeOptions: [
        {
          label: "Visi",
          value: "visi",
        },
        {
          label: "Misi",
          value: "misi",
        },
        {
          label: "Kontak Kami",
          value: "contact_us",
        },
      ],

      validated: false,
      form: {
        tipe: [],
        title: "",
        subtitle: "",
        tags: [],
        description: "",
        imageUrl: "",
      },
      doSubmit: true,
      image: "",
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
    handleUploadImage() {
      this.image = this.$refs.image.files[0];
    },
    async contentSubmit() {
      var result = false;

      if (this.image != "") {
        let formDataImage = new FormData();
        formDataImage.append("file", this.image);
        await this.$axios
          .$post("/main_a/image/uploadimage", formDataImage, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp1) => {
            console.log(resp1.name);
            this.form.imageUrl = resp1.name;
            result = true;
          })
          .catch((e) => {
            console.log("error");
            this.form.imageUrl = "";
            swal.fire({
              title: `Failed to Upload`,
              text: "Failed to upload image, please try again or remove image",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-danger",
              type: "danger",
            });
            result = false;
          });
      }
      if (this.doSubmit) {
        await this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }
          console.log("result");
          console.log(result);
          if (result == true) {
            this.$axios
              .$post(`main_b/website/content`, this.form)
              .then((response) => {
                swal.fire({
                  title: `Saved`,
                  text: "Your work has been saved",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/website/website_content");
              })
              .catch((e) => {});
          }
        });
      }
    },
  },
};
</script>
