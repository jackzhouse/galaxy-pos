<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <!-- <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6> -->
          <h6 class="h2 text-white d-inline-block mb-0">Data Slider - Edit</h6>
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
              <h3 slot="header" class="mb-0">Edit Slider</h3>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(updateSlider)"
                >
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Judul</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="title"
                          placeholder="Masukkan Judul"
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
                        <input 
                          type="text" 
                          name="subtitle" 
                          class="form-control" 
                          v-model="form.subtitle"
                          placeholder="Masukkan Sub Judul"
                          @input="inputanCek"
                          :class="{borderWar : !minLimit}"><span>{{ minLimit }}/{{ maxLimit }}</span>
                      </div>
                    </div>

                    <!-- <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label">Tags</label>
                      <div class="col-md-7">
                        <tags-input v-model="form.tags"></tags-input>
                      </div>
                    </div> -->

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

                    <!-- <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label">Deskripsi</label>
                      <div class="col-md-10">
                        <vue-editor v-model="form.description"></vue-editor>
                      </div>
                    </div> -->
            
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link
                    class="btn btn-warning"
                    to="/website/website_slider"
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
  name: "sliderForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    VueEditor,
  },
  data() {
    return {
      maxLimit: 100,
      validated: false,
      form: {
        title: "",
        subtitle: "",
        // tags: [],
        // description: "",
        imageUrl: ""
      },
      image: "",
    };
  },
  beforeMount() {
    this.$axios
      .$get(`main_b/slider/slider/${this.$route.params.id}`)
      .then((response) => {
        this.form.title = response.title;
        this.form.subtitle = response.subtitle;
        // this.form.tags = response.tags;
        // this.form.description = response.description;
        this.form.imageUrl = response.imageUrl;
      });
  },
  computed: {
    minLimit(){
      return this.maxLimit - this.form.subtitle.length
    }
  },
  methods: {
    inputanCek(){
      this.form.subtitle = this.form.subtitle.substr(0, this.maxLimit)
    },

    handleUploadImage() {
      this.image = this.$refs.image.files[0];
    },

    async updateSlider() {
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

      this.$axios
        .$put(`main_b/slider/slider/${this.$route.params.id}`, this.form)
        .then((response) => {
          swal.fire({
            title: `Sukses`,
            text: "Data Berhasil Diubah",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.$router.push("/website/website_slider");
        })
        .catch((e) => {});
    },
  },
};
</script>
