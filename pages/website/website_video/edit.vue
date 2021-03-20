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
          <!-- <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6> -->
          <h6 class="h2 text-white d-inline-block mb-0">Data Video - Edit</h6>
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
              <h3 slot="header" class="mb-0">Edit video</h3>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(updateVideo)"
                >
                  <div class="col-md-12">
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
                        >Tags</label
                      >
                      <div class="col-md-7">
                        <tags-input v-model="form.tags"></tags-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Url</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="url"
                          placeholder="Url Video"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.url"
                        ></base-input>
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
                  <nuxt-link class="btn btn-warning" to="/website/website_video"
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
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";

export default {
  name: "videoForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    Loading,
    [Select.name]: Select,
    [Option.name]: Option,
    VueEditor,
  },
  data() {
    return {
      validated: false,
      loading: false,
      form: {
        title: "",
        tags: [],
        desc: "",
        url: "",
      },
      image: "",
    };
  },
  beforeMount() {
    this.loading = true;
    this.$axios
      .$get(`main_b/page/video/${this.$route.params.id}`)
      .then((response) => {
        this.loading = false;
        this.form.title = response.title;
        this.form.tags = response.tags;
        this.form.desc = response.desc;
        this.form.url = response.url;
      });
  },
  methods: {
    handleUploadImage() {
      this.image = this.$refs.image.files[0];
    },

    async updateVideo() {
      var result = false;

      this.loading = true;
      this.$axios
        .$put(`main_b/page/video/${this.$route.params.id}`, this.form)
        .then((response) => {
          this.loading = false;
          swal.fire({
            title: `Success`,
            text: "Your work has been saved",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.$router.push("/website/website_video");
        })
        .catch((e) => {});
    },
  },
};
</script>
