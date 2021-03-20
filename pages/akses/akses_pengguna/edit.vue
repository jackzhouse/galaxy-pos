<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <!-- <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6> -->
          <h6 class="h2 text-white d-inline-block mb-0"> Akses - Edit </h6>
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
              <h3 slot="header" class="mb-0">Create Akses Pengguna</h3>
              <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <form class="needs-validation" @submit.prevent="handleSubmit(updateAksesPengguna)">
                  <div class="col-md-8">

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Name</label>
                      <div class="col-md-9">
                        <base-input
                          name="name"
                          placeholder="Name"
                          success-message="Looks good!"
                          :rules="{required: true}"
                          v-model="form.name"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">ID Pengguna</label>
                      <div class="col-md-9">
                        <base-input
                          name="idPengguna"
                          placeholder="ID Pengguna"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.idPengguna"
                        ></base-input>
                      </div>
                    </div>
            
                  </div>
                  <base-button type="primary" native-type="submit">Save</base-button>
                  <nuxt-link class="btn btn-warning" to="/akses/akses_pengguna">Cancel</nuxt-link>
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
  import { Select, Option } from 'element-ui'

export default {
  name: "aksesPenggunaForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
      [Select.name]: Select,
      [Option.name]: Option,
  },
  data() {
    return {
      validated: false,
      form: {
        name: "",
        idPengguna: "",
      },
    };
  },
  beforeMount() {
    this.$axios
      .$get(`main_c/akses_pengguna/pengguna/${this.$route.params.id}`)

      .then((response) => {
        this.form.name = response.name;
        this.form.idPengguna = response.idPengguna;
      });
  },
  methods: {
    async updateAksesPengguna() {
      this.$axios
        .$put(`main_c/akses_pengguna/pengguna/${this.$route.params.id}`, this.form)
        .then((response) => {
          swal.fire({
            title: `Success`,
            text: "Your work has been saved",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.$router.push("/akses/akses_pengguna");
        })
        .catch((e) => {});
    },
  },
};
</script>
