<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Profil Saya</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4"
          ></nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-4 order-xl-1">
          <!-- user card -->

          <div class="card card-profile">
            <img
              src="img/theme/img-1-1000x600.jpg"
              alt="Image placeholder"
              class="card-img-top"
            />

            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <div class="card-profile-image">
                    <a v-if="form.image == null">
                      <img
                        src="img/theme/admin.png"
                        class="avatar-profil rounded-circle"
                      />
                    </a>
                    <a v-else-if="form.image == ''">
                      <img
                        src="img/theme/admin.png"
                        class="avatar-profil rounded-circle"
                      />
                    </a>
                    <a v-else>
                      <img
                        class="avatar-profil rounded-circle"
                        alt=""
                        :src="`${$axios.defaults.baseURL}main_a/image/get/${form.image}/pas`"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-sm mr-4"></a>
                <!-- <a href="#" class="btn btn-sm btn-primary float-right">Edit Foto</a> -->
                <a>
                  <base-button
                    type="primary"
                    class="btn btn-sm btn-primary float-right"
                    @click="modals.uploadFoto = true"
                    block
                  >
                    Upload Foto
                  </base-button>
                </a>
              </div>
            </div>

            <!-- mt-3 dibawah ini dihapus kalau ada button upload foto -->
            <div class="card-body pt-0 mt-3">
              <div class="text-center">
                <h5 class="h3">
                  <center>{{ form.name }}</center>
                </h5>

                <hr class="my-3 solid 3px" />

                <div class="h4">
                  <i class="ni location_pin mr-2"></i>
                  <a class="font-weight-300">Alamat Email : </a>
                  <a v-if="form.email == ''"> - </a>
                  <a v-else-if="form.email == null"> - </a>
                  <a v-else> {{ form.email }} </a>
                </div>

                <div class="h4">
                  <i class="ni location_pin mr-2"></i>
                  <a class="font-weight-300">Nomor Telepon : </a>
                  <a v-if="form.phone == ''"> - </a>
                  <a v-else-if="form.phone == null"> - </a>
                  <a v-else> {{ form.phone }} </a>
                </div>

                <div class="h4">
                  <i class="ni location_pin mr-2"></i>
                  <a class="font-weight-300">Alamat : </a>
                  <a v-if="form.address == ''"> - </a>
                  <a v-else-if="form.address == null"> - </a>
                  <a v-else> {{ form.address }} </a>
                </div>
              </div>
            </div>
          </div>

          <!-- end user card -->
        </div>

        <div class="col-xl-8 order-xl-2">
          <!-- start detail profil -->
          <card>
            <div slot="header" class="row align-items-center">
              <div class="col-8">
                <h3 class="mb-0">Edit Profil</h3>
              </div>

              <div class="col-4 text-right" v-if="disabled === true">
                <button
                  @click="disabled = !disabled"
                  class="btn btn-md btn-primary"
                >
                  Edit Profil
                </button>
              </div>
            </div>

            <validation-observer ref="form">
              <form class="needs-validation" @submit.prevent="UpdateProfile">
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        type="text"
                        label="Nama"
                        placeholder="Nama"
                        v-model="form.name"
                        :disabled="disabled"
                      >
                      </base-input>
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        label="Username"
                        placeholder="Username"
                        v-model="form.username"
                        :disabled="disabled"
                      >
                      </base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        type="text"
                        label="Nomor Telepon"
                        placeholder="Nomor Telepon"
                        v-model="form.phone"
                        :disabled="disabled"
                      >
                      </base-input>
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        type="email"
                        label="Email"
                        placeholder="Email"
                        v-model="form.email"
                        :rules="{ required: true, email: true }"
                        :disabled="disabled"
                      >
                      </base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        type="text"
                        label="Alamat"
                        placeholder="Alamat"
                        v-model="form.address"
                        :disabled="disabled"
                      >
                      </base-input>
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        type="text"
                        label="Tempat Lahir"
                        placeholder="Tempat Lahir"
                        v-model="form.placeOfBirth"
                        :disabled="disabled"
                      >
                      </base-input>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group row">
                        <div class="col-md-9">
                          <base-input type="text" label="Status Pernikahan">
                            <el-select
                              rules="required"
                              v-model="form.maritalStatus"
                              placeholder="Silahkan Dipilih"
                              :disabled="disabled"
                            >
                              <el-option
                                v-for="option in GET_MARTIAL_STATUS_OPTION"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value"
                              >
                              </el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group row">
                        <div class="col-md-9">
                          <base-input type="text" label="Jenis Kelamin">
                            <el-select
                              rules="required"
                              v-model="form.gender"
                              placeholder="Silahkan Dipilih"
                              :disabled="disabled"
                            >
                              <el-option
                                v-for="option in GET_GENDER_OPTION"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value"
                              >
                              </el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group row">
                        <div class="col-md-9">
                          <base-input type="text" label="Agama">
                            <el-select
                              rules="required"
                              v-model="form.religion"
                              placeholder="Silahkan Dipilih"
                              :disabled="disabled"
                            >
                              <el-option
                                v-for="option in GET_RELIGIONS_OPTION"
                                :key="option.label"
                                :label="option.label"
                                :value="option.value"
                              >
                              </el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="pl-lg-4">
                  <div class="row mt-3">
                    <div class="col-md-7"></div>

                    <div class="col-md-3" v-if="disabled === false">
                      <base-button type="primary" native-type="submit"
                        >Submit</base-button
                      >
                    </div>

                    <div class="col-md-2" v-if="disabled === false">
                      <button
                        @click="disabled = !disabled"
                        class="btn btn-md btn-warning"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </validation-observer>
          </card>

          <!-- end detail profil -->
        </div>
      </div>
    </div>

    <modal :show.sync="modals.uploadFoto">
      <h6 slot="header" class="modal-title">Upload Foto</h6>
      <form>
        <!-- <file-input
          ref="files"
          id="file"
          type="file"
          @change="filesChangeImage()"
        ></file-input> -->

        <input
          type="file"
          name="files"
          id="file"
          ref="files"
          @change="filesChangeImage()"
          class="form-control"
        />
      </form>

      <template slot="footer">
        <base-button type="primary" @click="postFoto()">Upload</base-button>
        <base-button
          type="warning"
          class="ml-auto"
          @click="modals.uploadFoto = false"
          >Batal</base-button
        >
      </template>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/argon-core/Modal.vue";
import FileInput from "@/components/argon-core/Inputs/FileInput";
import { Select, Option } from "element-ui";
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "Profile",
  components: {
    Modal,
    FileInput,
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    flatPicker,
  },
  data() {
    return {
      hide: false,
      notifications: {
        topCenter: false,
      },
      GET_RELIGIONS_OPTION: [
        { value: "ISLAM", label: "Islam" },
        { value: "KRISTEN", label: "Kristen" },
        { value: "KATOLIK", label: "Katolik" },
        { value: "HINDU", label: "Hindu" },
        { value: "BUDHA", label: "Budha" },
        { value: "KONGHUCU", label: "Konghucu" },
        { value: "OTHER", label: "Lainnya" },
      ],
      GET_MARTIAL_STATUS_OPTION: [
        { value: "SINGLE", label: "Lajang" },
        { value: "MARRIED", label: "Menikah" },
        { value: "DIVORCED", label: "Cerai" },
        { value: "WIDOWED", label: "Duda/Janda" },
        { value: "OTHER", label: "Lainnya" },
      ],
      GET_GENDER_OPTION: [
        { label: "Laki-laki", value: "MALE" },
        { label: "Perempuan", value: "FEMALE" },
      ],
      disabled: true,
      form: {
        // image: null,
        image: "",
        name: "",
        username: "",
        phone: "",
        email: "",
        address: "",
        gender: "",
        maritalStatus: "",
        placeOfBirth: "",
        religion: "",
        id_: "",
      },
      image: "",
      images: [],
      paging: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        page: 0,
      },
      file: "",
      files: "",
      file0: "",
      modals: {
        classic: false,
        uploadFoto: false,
      },
    };
  },
  beforeMount() {
    this.getDatas();
  },
  methods: {
    async getDatas() {
      this.$axios.$get(`main_a/general/my_profile`).then((response) => {
        this.form.image = response.image;
        this.form.name = response.name;
        this.form.username = response.username;
        this.form.phone = response.phone;
        this.form.email = response.email;
        this.form.address = response.address;
        this.form.gender = response.gender;
        this.form.maritalStatus = response.maritalStatus;
        this.form.placeOfBirth = response.placeOfBirth;
        this.form.religion = response.religion;
        this.form.id_ = response.id_;
      });
    },

    UpdateProfile() {
      this.$axios
        .$put(`main_a/general/update_my_profile`, this.form)
        .then((response) => {
          swal.fire({
            title: `Berhasil`,
            text: "Data Profil Berhasil Di Update",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          // this.$router.push("/general/myprofile");
          this.getDatas();
          // this.loadOnce();
        })
        .catch((e) => {
          swal.fire({
            title: "Gagal",
            text: `Profil Gagal Di Update`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
          // this.$router.push("/general/myprofile");
          this.getDatas();
          // this.loadOnce();
        });
    },

    filesChangeImage() {
      // this.inputs.file = files;
      const allowTypes = ["image/jpeg", "image/jpg", "image/png"];
      this.files = this.$refs.files.files;
      this.file0 = this.$refs.files.files[0];
      if (!allowTypes.includes(this.file0.type)) {
        swal.fire({
          title: "File Bukan Image, Harap Masukan File Image !",
          type: "failed",
          confirmButtonClass: "btn btn-danger btn-fill",
          buttonsStyling: false,
        });
        this.$refs.files.files = [];
      }
    },

    async postFoto() {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("file", file);
      }

      await this.$axios
        .$post(`main_a/image/uploadpasphoto`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.form.image = response.name;

          this.$store.commit("user/SET_PHOTO_URL", response.name);

          this.UpdatePhotoToProfile();

          // this.modals.uploadFoto = false;

          // this.loadOnce();
        })

        .catch(() => {
          swal.fire({
            title: "Failed Upload!",
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
        });
    },

    UpdatePhotoToProfile() {
      this.$axios
        .$put(`main_a/general/update_my_profile`, this.form)
        .then((response) => {
          swal.fire({
            title: `Berhasil`,
            text: "Foto Profil Berhasil Di Update",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.loadOnce();
        })
        .catch((e) => {
          swal.fire({
            title: "Gagal",
            text: `Profil Gagal Di Update`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
          // this.$router.push("/general/myprofile");
          this.getDatas();
          // this.loadOnce();
        });
    },

    loadOnce: function () {
      location.reload();
    },
  },
};
</script>
<style>
.profile-header {
  background-image: url(/~/static/img/theme/profile-cover.jpg);
  background-size: cover;
  background-position: center top;
  min-height: 500px;
}

.fotoProfilSize {
  width: 145px;
  height: 145px;
  /* border-radius: 5px; */
  border-radius: 100%;
}
</style>
