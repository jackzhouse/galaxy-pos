<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Tambah Berita Baru</h6>
          <!-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav> -->
        </div>

        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/website/website_news" class="btn btn-neutral btn-sm"
            >Kembali</nuxt-link
          >
          <!-- <base-button size="sm" type="neutral">Filters</base-button> -->
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <validation-observer ref="form">
        <!-- <form class="needs-validation" @submit.prevent="newsSubmit"> -->
        <form class="needs-validation">
          <div class="row">
            <div class="col-lg-8">
              <div class="card-wrapper">
                <!-- Form controls -->
                <div class="card">
                  <!-- Card header -->
                  <div class="card-header">
                    <h3 class="mb-0">Berita Baru</h3>
                  </div>
                  <!-- Card body -->
                  <div class="card-body">
                    <div class="form-group row">
                      <!-- <div class="col-md-4" style="font-weight: 600;">
                        Judul
                      </div> -->
                      <br />
                      <div class="col-md-12">
                        <base-input
                          name="title"
                          placeholder="Tulis Judul Disini"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.title"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <!-- <div class="col-md-4" style="font-weight: 600;">
                        Berita
                      </div> -->
                      <br />
                      <div class="col-md-12">
                        <vue-editor
                          v-model="form.content"
                          rules="required"
                          placeholder="Tulis Berita Disini"
                        ></vue-editor>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card-wrapper">
                <!-- Deskripsi Konten -->
                <div class="card">
                  <!-- Card body -->
                  <div class="card-body">
                    <div class="mb-2" style="font-weight: 600;">
                      Deskripsi Berita
                    </div>
                    <base-input>
                      <textarea
                        v-model="form.description"
                        class="form-control"
                        placeholder="Isi Deskripsi Disini"
                        rows="3"
                        rules="required"
                      ></textarea>
                    </base-input>
                  </div>
                </div>

                <!-- Tags Konten -->
                <div class="card">
                  <!-- Card body -->
                  <div class="card-body">
                    <div class="mb-2" style="font-weight: 600;">Tags</div>

                    <div class="form-group row">
                      <div class="col-md-12">
                        <tags-input
                          v-model="form.tags"
                          rules="required"
                        ></tags-input>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Publish -->
                <div class="card">
                  <!-- Card header -->
                  <!-- <div class="card-header">
                    <div class="mb-2" style="font-weight: 600;">Publish</div>
                  </div> -->
                  <!-- Card body -->
                  <div class="card-body">
                     <base-button class="ml-6 " type="primary" @click.native="newsSubmit">Publish</base-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";
import { VueEditor } from "vue2-editor";

export default {
  name: "newsForm",
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
        id: "",
        title: "",
        description: "",
        content: "",
        tags: [],
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

    this.$axios
      .$get(`main_b/page/news/${this.$route.params.id}`)
      .then((response) => {
        this.form.id = response.id;
        this.form.title = response.title;
        this.form.description = response.description;
        this.form.content = response.content;
        this.form.tags = response.tags;
      });
  },
  methods: {
    async newsSubmit() {
      if (this.doSubmit) {
        if (this.form.id == "") {
          this.$refs.form.validate().then((success) => {
            if (!success) {
              return;
            }
            this.$axios
              .$post(`main_b/page/news`, this.form)
              .then((response) => {
                swal.fire({
                  title: `Berhasil`,
                  text: "Berita Berhasil Di Publish",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/website/website_news");
              })
              .catch((e) => {});
          });
        } else {
          this.$refs.form.validate().then((success) => {
            if (!success) {
              return;
            }
            this.$axios
              .$put(`/main_b/page/news/${this.$route.params.id}`, this.form)
              .then((response) => {
                swal.fire({
                  title: `Berhasil`,
                  text: "Berita Berhasil Di Ubah",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/website/website_news");
              })
              .catch((e) => {});
          });
        }
      }
    },

  },
};
</script>
