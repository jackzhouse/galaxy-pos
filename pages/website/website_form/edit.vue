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
          <h6 class="h2 text-white d-inline-block mb-0">Data Form - Edit</h6>
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
              <h3 slot="header" class="mb-0">Edit Form</h3>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form
                  class="needs-validation"
                  @submit.prevent="handleSubmit(updateAgenda)"
                >
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Nama Form</label
                      >
                      <div class="col-md-7">
                        <base-input
                          name="name"
                          placeholder="Nama Form"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.name"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Tipe Form</label
                      >
                      <div class="col-md-7">
                        <base-input>
                          <el-select
                            v-model="form.tipe"
                            filterable
                            placeholder="Pilih Tipe Form terlebih dahulu"
                          >
                            <el-option
                              v-for="option in tipeOptions"
                              :key="option.value"
                              :label="option.label"
                              :value="option.value"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col">
                        <div class="form-group row">
                          <label
                            class="col-md-5 col-form-label form-control-label"
                            >Multiple Choice</label
                          >
                          <div
                            style="margin: auto; padding-left: 45px"
                            class="col-md-7"
                          >
                            <base-switch
                              class="mr-1"
                              v-model="form.isMultipleChoice"
                            ></base-switch>
                          </div>
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-group row">
                          <label
                            class="col-md-3 col-form-label form-control-label"
                            >Required</label
                          >
                          <div
                            style="margin: auto; padding-left: 45px"
                            class="col-md-7"
                          >
                            <base-switch
                              class="mr-1"
                              v-model="form.isRequired"
                            ></base-switch>
                          </div>
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-group row">
                          <label
                            class="col-md-3 col-form-label form-control-label"
                            >Disable</label
                          >
                          <div
                            style="margin: auto; padding-left: 45px"
                            class="col-md-7"
                          >
                            <base-switch
                              class="mr-1"
                              v-model="form.isDisabled"
                            ></base-switch>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="form.isMultipleChoice === true">
                      <div v-for="(row, index) in choices" :key="index">
                        <div class="form-group row">
                          <label
                            class="col-md-2 col-form-label form-control-label"
                          ></label>
                          <div class="col-md-7">
                            <base-input
                              placeholder="Pilihan"
                              success-message="Looks good!"
                              v-model="row.choice"
                              :name="`choices[${index}][choice]`"
                            ></base-input>
                          </div>
                          <button
                            style="height: fit-content"
                            class="btn btn-danger btn-sm"
                            type="button"
                            @click="deleteChoice(index)"
                          >
                            x
                          </button>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label
                          class="col-md-2 col-form-label form-control-label"
                          >Pilihan</label
                        >
                        <div class="col-md-7">
                          <button
                            @click="addChoice"
                            type="button"
                            class="btn btn-default btn-sm"
                          >
                            <i class="fas fa-plus-circle"></i>
                            Pilihan
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-2 col-form-label form-control-label"
                        >Tags</label
                      >
                      <div class="col-md-7">
                        <tags-input
                          v-model="form.tags"
                          placeholder="Tambah tags"
                        ></tags-input>
                      </div>
                    </div>
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/website/website_form"
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
import { VueEditor } from "vue2-editor";

export default {
  name: "Form",
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
        name: "",
        tipe: "",
        isMultipleChoice: false,
        isRequired: false,
        isDisabled: false,
        tags: [],
        choice: [],
      },
      choices: [],
      tipeOptions: [
        { value: "text", label: "TEXT" },
        { value: "email", label: "EMAIL" },
        { value: "date", label: "DATE" },
        { value: "number", label: "NUMBER" },
        { value: "choice", label: "CHOICE" },
        { value: "multi", label: "MULTI" },
      ],
    };
  },
  beforeMount() {
    this.loading = true;
    this.$axios
      .$get(`main_b/page/form/${this.$route.params.id}`)
      .then((response) => {
        this.form.name = response.name;
        this.form.tags = response.tags;
        this.form.isMultipleChoice = response.isMultipleChoice;
        this.form.isRequired = response.isRequired;
        this.form.isDisabled = response.isDisabled;
        this.form.tipe = response.tipe;
        response.choice.map((prop, index) => {
          this.choices.push({ choice: prop });
        });
        this.loading = false;
      });
  },
  methods: {
    async deleteChoice(index) {
      this.choices.splice(index, 1);
    },
    addChoice() {
      this.choices.push({
        choice: "",
      });
    },
    handleUploadImage() {
      this.image = this.$refs.image.files[0];
    },
    async updateAgenda() {
      var result = false;

      if (this.form.isMultipleChoice === true) {
        this.choices.map((row, index) => {
          return this.form.choice.push(row.choice);
        });
      }

      this.loading = true;
      this.$axios
        .$put(`main_b/page/form/${this.$route.params.id}`, this.form)
        .then((response) => {
          this.loading = false;
          swal.fire({
            title: "Success",
            text: "Your work has been saved",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.$router.push("/website/website_form");
        })
        .catch((e) => {});
    },
  },
};
</script>
