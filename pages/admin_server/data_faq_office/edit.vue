<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-1">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>

        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link
            to="/admin_server/data_faq_office"
            class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Edit FAQ</h3>
              <validation-observer v-slot="{ handleSubmit }" ref="form">
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(updateFAQ)"
                >
                  <div class="col-md-8">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Pertanyaan</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="question"
                          placeholder="Masukkan Pertanyaan"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.question"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Jawaban</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="answer"
                          placeholder="Masukan Jawaban"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.answer"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Kategori</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="category"
                          placeholder="Masukkan Kategori"
                          success-message="Looks good!"
                          v-model="form.category"
                        ></base-input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Urutan</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="urutan"
                          placeholder="Masukkan urutan"
                          success-message="Looks good!"
                          v-model="form.urutan"
                        ></base-input>
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Simpan</base-button
                  >
                  <nuxt-link
                    class="btn btn-warning"
                    to="/admin_server/data_faq_office"
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

export default {
  name: "CompanyForm",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      GET_SOLUTION_OPTION: [],
      validated: false,
      form: {
        question: "",
        answer: "",
        category: "",
        urutan: "",
      },
      validated: false,
    };
  },
  beforeMount() {
    this.$axios.$get("/main_a/company/company_solution").then((response) => {
      this.GET_SOLUTION_OPTION = response;
      console.log(response);
    });

    this.$axios
      .$get(`main_a/faq/faq/${this.$route.params.id}`)
      .then((response) => {
        this.form.question = response.question;
        this.form.answer = response.answer;
        this.form.category = response.category;
        this.form.urutan = response.urutan;
      });

    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
  },
  methods: {
    async updateFAQ() {
      this.$axios
        .$put(`main_a/faq/faq/${this.$route.params.id}`, this.form)
        .then((response) => {
          swal.fire({
            title: `Success`,
            text: "Data Berhasil Di Update",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.$router.push("/admin_server/data_faq_office");
        })
        .catch((e) => {});
    },
  },
};
</script>
