<template>
<div>
  <base-header class="pb-6">
    <div class="row align-items-center py-4">

      <div class="col-lg-6 col-7">
        <!-- <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6> -->
        <h6 class="h2 text-white d-inline-block mb-0">Data Member</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <route-breadcrumb />
        </nav>
      </div>

      <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/crm/crm_member_temp" class="btn btn-neutral btn-sm">Kembali</nuxt-link>
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
            <h3 slot="header" class="mb-0">Edit Data Member</h3>
            <validation-observer v-slot="{handleSubmit}" ref="formValidator">
              <form class="needs-validation" @submit.prevent="handleSubmit(updateMemberTemp)">
                <div class="col-md-8">

                  <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Account Number</label>
                      <div class="col-md-9">
                        <base-input
                          name="number"
                          placeholder="Account Number"
                          success-message="Looks good!"
                          :rules="{required: true}"
                          v-model="form.number"
                          ></base-input>
                      </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">Nama</label>
                    <div class="col-md-9">
                      <base-input
                        name="name"
                        placeholder="Nama"
                        success-message="Looks good!"
                        :rules="{required: true}"
                        v-model="form.name"
                        ></base-input>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">Alamat</label>
                    <div class="col-md-9">
                        <textarea 
                          class="form-control" 
                          name="address"
                          placeholder="Alamat"
                          success-message="Looks good!"
                          :rules="{required: true}"
                          v-model="form.address"
                          rows="3"
                          ></textarea>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">Jenis Kelamin</label>
                    <div class="col-md-9">
                      <base-input
                        <el-select
                          v-model="form.gender"
                          placeholder="Jenis Kelamin"
                          >
                          <el-option
                            v-for="option in genderOptions"
                            :key="option.label"
                            :label="option.label"
                            :value="option.value"
                            ></el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">Tempat Lahir</label>
                    <div class="col-md-9">
                      <base-input
                        name="placeOfBirth"
                        placeholder="Tempat Lahir"
                        success-message="Looks good!"
                        rules="required"
                        v-model="form.placeOfBirth"
                        ></base-input>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">Tanggal Lahir</label>
                    <div class="col-md-9">
                      <base-input>
                        <flat-picker slot-scope="{focus, blur}"
                                    @on-open="focus"
                                    @on-close="blur"
                                    :config="{allowInput: true}"
                                    class="form-control datepicker"
                                    placeholder="Tanggal Lahir"
                                    name="dateOfBirth"
                                    rules="required"
                                    v-model="form.dateOfBirth">
                        </flat-picker>
                      </base-input>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">Kelas</label>
                    <div class="col-md-9">
                      <base-input
                        name="kelas"
                        placeholder="Kelas"
                        success-message="Looks good!"
                        v-model="form.kelas"
                        ></base-input>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">Note</label>
                    <div class="col-md-9">
                      <base-input
                        name="note"
                        placeholder="note"
                        success-message="Looks good!"
                        v-model="form.note"
                        ></base-input>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-md-3 col-form-label form-control-label">tags</label>
                    <div class="col-md-9">
                      <tags-input v-model="form.tags"></tags-input>
                    </div>
                  </div>

                </div>
              <base-button type="primary" native-type="submit">Simpan</base-button>
             <nuxt-link class="btn btn-warning" to="/crm/crm_member_temp">Batal</nuxt-link>
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

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "memberTempForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    flatPicker,
  },
  data() {
    return {
      genderOptions: [
        {
          label: "Laki-laki",
          value: "Laki-laki",
        },
        {
          label: "Perempuan",
          value: "Perempuan",
        },
      ],
      validated: false,
      form: {
        // number: "",
        name: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        kelas: "",
        note: "",
        placeOfBirth: "",
        tags: [],
      },
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

    if (Object.entries(this.$route.query).length > 0) {
      this.$axios
        // .$get(`main_d/member_temp/member_temp/${this.$route.params.row}`)
        .$get(`main_d/member_temp/member_temp/${this.$route.query.id}`)
        .then((response) => {
          this.form.number = response.number;
          this.form.name = response.name;
          this.form.dateOfBirth = response.dateOfBirth;
          this.form.address = response.address;
          this.form.gender = response.gender;
          this.form.kelas = response.kelas;
          this.form.note = response.note;
          this.form.placeOfBirth = response.placeOfBirth;
          this.form.tags = response.tags;
        });
    } else {
      this.$router.push("/crm/crm_member_temp");
    }
  },
  methods: {
    async updateMemberTemp() {
      this.$axios
        .$put(
          `main_d/member_temp/member_temp/${this.$route.query.id}`,
          this.form
        )
        .then((response) => {
          swal.fire({
            title: `Berhasil`,
            text: "Data Member Telah Berhasil Diubah",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.$router.push("/crm/crm_member_temp");
        })
        .catch((e) => {});
    },
  },
};
</script>
