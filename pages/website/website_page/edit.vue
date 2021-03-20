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
          <h6 class="h2 text-white d-inline-block mb-0">Page - Edit</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/website/website_page" class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Edit Page</h3>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(updateMenu)"
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
                        >Sub Judul</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="subTitle"
                          placeholder="Sub Judul"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.subTitle"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Tipe Konten</label
                      >
                      <div class="col-md-7">
                        <!-- <div class="col-md-9"> -->
                        <base-input>
                          <el-select
                            v-model="form.contentType"
                            filterable
                            placeholder="Pilih Page terlebih dahulu"
                          >
                            <el-option
                              v-for="option in contentOptions"
                              :key="option.value"
                              :label="option.label"
                              :value="option.value"
                            ></el-option>
                          </el-select>
                        </base-input>
                        <!-- </div> -->
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
                  </div>
                  <hr />
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/website/website_page"
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
import HtmlEditor from "@/components/argon-core/Inputs/HtmlEditor";
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "MenuForm",
  // layout: "DashboardLayout",
  components: {
    HtmlEditor,
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
        contentType: "",
        content: "",
        title: "",
        subTitle: "",
        pageImage: [],
        tags: [],
      },
      contentOptions: [
        { value: "CONTENT", label: "CONTENT" },
        { value: "TABLE", label: "TABLE" },
        { value: "IMAGE", label: "IMAGE" },
        { value: "VIDEO", label: "VIDEO" },
        { value: "NEWS", label: "NEWS" },
        { value: "FORM", label: "FORM" },
      ],
      pageId: "",
      imageContent: "",
      image: "",
      doSubmit: true,
    };
  },
  beforeMount() {
    this.loading = true;
    this.getPageList();
    this.$axios
      .$get(`main_b/page/page/${this.$route.params.id}`)
      .then((response) => {
        this.form.title = response.title;
        this.form.subTitle = response.subTitle;
        this.form.contentType = response.contentType;
        this.form.content = response.content;
        this.form.tags = response.tags;
        this.loading = false;
      });
  },
  methods: {
    getPageList() {
      this.$axios.$get("main_b/page/list").then((response) => {
        this.pageList = response;
      });
    },
    handleUploadImage() {
      this.image = this.$refs.image.files[0];
      // this.image = files[0].name;
    },
    async updateMenu() {
      this.loading = true;
      if (this.image) {
        let image = this.$refs.image.files;
        console.log(this.$refs.image.files);
        const formData = new FormData();
        for (var i = 0; i < image.length; i++) {
          formData.append("files", image[i]);
        }
        // let formDataImage = new FormData();
        // formDataImage.append("file", this.image);
        await this.$axios
          .$post("/main_a/image/bulk_uploadimages", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resp1) => {
            console.log(resp1.name);
            this.imageContent = {
              fileName: resp1.name,
              fileurl: resp1.file_name,
            };
            // result = true;
          });
        this.$axios
          .$put(`main_b/page/page/${this.$route.params.id}`, this.form)
          .then((response) => {
            this.loading = false;
            // this.pageId = response.id;
            // swal.fire({
            //   title: `Success`,
            //   text: "Your work has been saved",
            //   buttonsStyling: false,
            //   confirmButtonClass: "btn btn-success",
            //   type: "success",
            // });
            // this.$router.push("/website/website_menu");
            this.$axios
              .$post(
                `main_b/page/content/image/${this.$route.params.id}`,
                this.imageContent
              )
              .then((response) => {
                this.loading = false;
                swal.fire({
                  title: `Saved`,
                  text: "Your work has been saved",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/website/website_page");
              });
          })
          .catch((e) => {});
      } else {
        this.$axios
          .$put(`main_b/page/page/${this.$route.params.id}`, this.form)
          .then((response) => {
            this.loading = false;
            swal.fire({
              title: `Success`,
              text: "Your work has been saved",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success",
            });
            this.$router.push("/website/website_menu");
          })
          .catch((e) => {});
      }
    },
  },
};
</script>
