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
              <h3 slot="header" class="mb-0">Create Gallery</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="gallerySubmit">
                  <div class="col-md-12">
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
                          multiple
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Deskripsi</label
                      >
                      <div class="col-md-10">
                        <vue-editor v-model="form.desc"></vue-editor>
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link
                    class="btn btn-warning"
                    to="/website/website_gallery"
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
  name: "galleryForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    VueEditor,
  },

  data() {
    return {
      validated: false,
      form: {
        tags: [],
        desc: "",
        fileName: "",
        fileUrl: "",
      },
      tags: [],
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

    async gallerySubmit() {
      var result = false;

      let res = [];
      let image = this.$refs.image.files;
      console.log(this.$refs.image.files);
      const formData = new FormData();
      for (var i = 0; i < image.length; i++) {
        formData.append("file", image[i]);
        await this.$axios
          .$post("/main_a/image/uploadimage", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp1) => {
            console.log("RESP", resp1);
            res.push({
              // resp1,
              fileName: resp1.file_name,
              fileUrl: resp1.name,
              tags: this.form.tags,
              desc: this.form.desc,
            });
          });
        // this.form
        console.log("RES", res);
      }
      for (var i = 0; i < res.length; i++) {
        await this.$axios
          .$post(`main_b/page/image/`, res[i])
          .then((response) => {
            this.loading = false;
            swal.fire({
              title: `Saved`,
              text: "Your work has been saved",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success",
            });
            this.$router.push("/website/website_gallery");
          });
      }
    },
  },
};
</script>
