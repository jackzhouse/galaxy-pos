<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <!-- <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6> -->
          <h6 class="h2 text-white d-inline-block mb-0">Data Gallery - Edit</h6>
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
              <h3 slot="header" class="mb-0">Edit Gallery</h3>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(updateGallery)"
                >
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
      image: "",
    };
  },
  beforeMount() {
    this.$axios
      .$get(`main_b/page/image/${this.$route.params.id}`)
      .then((response) => {
        this.form.tags = response.tags;
        this.form.desc = response.desc;
        this.form.fileUrl = response.fileUrl;
        this.form.fileName = response.fileName;
      });
  },
  methods: {
    handleUploadImage() {
      this.image = this.$refs.image.files[0];
    },

    async updateGallery() {
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
            (this.form.fileName = resp1.file_name),
              (this.form.fileUrl = resp1.name),
              (result = true);
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

      this.$axios
        .$put(`main_b/page/image/${this.$route.params.id}`, this.form)
        .then((response) => {
          swal.fire({
            title: `Success`,
            text: "Your work has been saved",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.$router.push("/website/website_gallery");
        })
        .catch((e) => {});
    },
  },
};
</script>
