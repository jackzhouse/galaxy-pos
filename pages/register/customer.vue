<template>
  <div>
    <!-- Header -->
    <!-- <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9"> -->
    <div class="header bg-gradient-info py-3 py-lg-5">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">
                Formulir Pendaftaran <br />
                PLATFORM SEKOLAH PINTAR
              </h1>
              <!-- <p class="text-lead text-white">Create new account for your company.</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-8">
          <div class="card bg-secondary border-0">
            <div class="card-body px-lg-5 py-lg-5">
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <form role="form" @submit.prevent="handleSubmit(onSubmit)"> -->

              <validation-observer ref="form">
                <img
                  src="https://lh6.googleusercontent.com/POUIN8AeBrLY_jwgmrS4NmBiZd-gzsLqzVjLQf0Y2chv6mZKUgpc0sFpEFI9wG3Emjs_G5PfQKilGnv3RPoYTZ_ryW0D2q0EWyBy_sGr7o76NFInAlvshi9jp7E-=w1188"
                  alt=""
                  width="100%"
                />
                <a
                  href="https://www.google.com/url?q=https://drive.google.com/drive/folders/1HDPfAOKwAhnhJAhYC215lfX7vRATyro0&sa=D&ust=1607059206261000&usg=AFQjCNHmGBAAK9rp0i4MrnVezLmmzLRwpQ"
                  target="_blank"
                >
                  <button
                    class="btn btn-success btn-sm mt-2 mb-2"
                    type="button"
                  >
                    Format yang di butuhkan untuk Implementasi PSP
                  </button>
                </a>
                <form
                  class="needs-validation"
                  @submit.prevent="registerCompanySubmit"
                >
                  <!-- <input
                    type="hidden"
                    name="companyId"
                    v-model="form.companyId"
                  />

                  <input
                    type="hidden"
                    name="crmPipeline"
                    v-model="form.crmPipeline"
                  />

                  <input
                    type="hidden"
                    name="solution"
                    v-model="form.solution"
                  /> -->
                  Kantor Cabang
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Kantor Cabang"
                    name="kantorCabang"
                    :rules="{ required: true }"
                    v-model="form.kantorCabang"
                  >
                  </base-input>
                  Nama Sekolah/Perusahaan
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Company Name"
                    name="perusahaanName"
                    :rules="{ required: true }"
                    v-model="form.perusahaanName"
                  >
                  </base-input>
                  Nama Yayasan
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Company Name"
                    name="yayasanName"
                    :rules="{ required: true }"
                    v-model="form.yayasanName"
                  >
                  </base-input>
                  Alamat
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Company Address"
                    name="address"
                    :rules="{ required: true }"
                    v-model="form.address"
                  >
                  </base-input>
                  Provinsi
                  
                  <base-input>
                    <el-select
                      v-model="form.province"
                      filterable
                      placeholder="Pilih Provinsi"
                      @change="getCity()"
                    >
                      <el-option
                        v-for="option in provinceOptions"
                        :key="option.id"
                        :label="option.name"
                        :value="option.name"
                      ></el-option>
                    </el-select>
                  </base-input>
                  Kota
                  <base-input>
                    <el-select
                      v-model="form.city"
                      filterable
                      placeholder="Pilih Kota"
                    >
                      <el-option
                        v-for="option in citiOptions"
                        :key="option.id"
                        :label="option.name"
                        :value="option.name"
                      ></el-option>
                    </el-select>
                  </base-input>
                  PIC Name
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="PIC Name"
                    name="name"
                    :rules="{ required: true }"
                    v-model="form.name"
                  >
                  </base-input>
                  No Telepon PIC
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="PIC Phone"
                    name="phone"
                    :rules="{ required: true }"
                    v-model="form.phone"
                  >
                  </base-input>
                  Email PIC
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="PIC Email"
                    name="email"
                    :rules="{ required: true, email: true }"
                    v-model="form.email"
                  >
                  </base-input>

                  <!-- Perjanjian Object -->

                  Tipe Perjanjian
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Tipe Perjanjian"
                    name="perjanjian.tipe"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.tipe"
                  >
                  </base-input>
                  Nama Yang Bertanda Tangan
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Nama Yang Bertanda Tangan"
                    name="namaTtd"
                    :rules="{ required: true }"
                    v-model="form.namaTtd"
                  >
                  </base-input>
                  Jabatan
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Jabaran Penandatangan"
                    name="perjanjian.jabatanTtd"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.jabatanTtd"
                  >
                  </base-input>
                  NIK(No Induk KTP)
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="NIK"
                    name="perjanjian.nikTtd"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.nikTtd"
                  >
                  </base-input>
                  Alamat Yang Bertanda Tangan
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Alamat Penanda Tangan"
                    name="perjanjian.addressTtd"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.addressTtd"
                  >
                  </base-input>

                  Jumlah Siswa
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Jumlah Siswa"
                    name="perjanjian.jumlahSiswa"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.jumlahSiswa"
                  >
                  </base-input>
                  Lama Kontrak PKS / MOU
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Lama Kontrak"
                    name="perjanjian.lamaKontrak"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.lamaKontrak"
                  >
                  </base-input>
                  Modul / Fitur
                  <base-input>
                    <el-select
                      v-model="form.perjanjian.moduls"
                      filterable
                      multiple
                      placeholder="Pilih Modul"
                    >
                      <el-option
                        v-for="option in modulOptions"
                        :key="option"
                        :label="option"
                        :value="option"
                      ></el-option>
                    </el-select>
                  </base-input>
                  Target Live
                  <base-input
                    type="date"
                    alternative
                    class="mb-3"
                    
                    placeholder="Target Live"
                    name="perjanjian.targetLive"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.targetLive"
                  >
                  </base-input>
                  Nomor Rekening Sekolah/Perusahaan/Yayasan
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Nomor Rekening Sekolah/Perusahaan/Yayasan"
                    name="perjanjian.noRek"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.noRek"
                  >
                  </base-input>
                  Nama Marketing Bank
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Nama Marketing Bank"
                    name="perjanjian.marketingName"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.marketingName"
                  >
                  </base-input>
                  No Hp Marketing Bank
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="No Hp Marketing Bank"
                    name="perjanjian.marketingPhone"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.marketingPhone"
                  >
                  </base-input>
                  Email Marketing Bank
                  <base-input
                    alternative
                    class="mb-3"
                    
                    placeholder="Email Marketing Bank"
                    name="perjanjian.marketingEmail"
                    :rules="{ required: true }"
                    v-model="form.perjanjian.marketingEmail"
                  >
                  </base-input>

                  <div class="text-center">
                    <button type="submit" :disabled="isDisabledSubmitButton" class="btn btn-primary mt-4">
                      Kirim
                    </button>
                  </div>
                </form>
              </validation-observer>
            </div>
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
  layout: "AuthLayout",
  name: "registerCompany",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  head() {
    return {
      title: "Form Pendaftaran Katalis",
    }
  },
  data() {
    return {
      isDisabledSubmitButton: false,
      modulOptions : ["Kartu Digital: transaksi, absensi", "Tagihan & Revenue Stream Management (POS)", "Akuntansi", "Akademik & Sistem Silabus", "HRD"],
      provinceOptions: [],
      citiOptions: [],
      companyId: "5f647d690ef6417438035ae5",
      crmPipeline: "IMPLEMENTASI KATALIS",
      solution: "CRM",
      form: {
        // companyCode: "0001",
        // hardcode companyId, solution & crmPipeline
        kantorCabang: "",
        companyRegister: "",
        perusahaanName: "",
        yayasanName: "",
        address: "",
        province: "",
        city: "",
        phone: "",
        name: "",
        email: "",
        perjanjian : {
          tipe: "",
          namaTtd: "",
          jabatanTtd: "",
          nikTtd: "",
          addressTtd: "",
          jumlahSiswa: "",
          lamaKontrak: "",
          moduls: [],
          targetLive: "",
          noRek: "",
          marketingName: "",
          marketingPhone: "",
          marketingEmail: ""
        }
      },
      doSubmit: true,
    };
  },
  beforeMount() {
    this.getProvince();

  },
  methods: {
    getProvince() {
      this.$axios
        .$get("https://api.katalis.info/wilayah/getAllProvinces")
        .then((response) => {
          this.provinceOptions = response;
          // console.log(response);
        });
    },
    getCity() {
      var indexProv = this.provinceOptions.findIndex(
        (x) => x.name === this.form.province
      );
      if (indexProv != null) {
        var provId = this.provinceOptions[indexProv].id;
        this.$axios
          .$get("https://api.katalis.info/wilayah/getRegencies/" + provId)
          .then((response) => {
            this.citiOptions = response;
            // console.log(response);
          });
      }
    },
    async registerCompanySubmit() {
      this.isDisabledSubmitButton = true;
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }

          this.$axios
            .$post(`main_b/pelanggan/pelanggan_self_register`, this.form)
            .then((response) => {
              // confirm sweat alert
              this.isDisabledSubmitButton = false;
              swal.fire({
                title: `Thank you for registration.`,
                text:
                  "Please check your email address and verify to complete setting up your account.",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              }).then(response => {
                location.reload();
              });
            })
            .catch((e) => {
              swal.fire({
                title: `Thank you for registration.`,
                text: e.response.status + " || " + e.response.data.detail,
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "danger",
              });
              this.isDisabledSubmitButton = false;
            });
        });
      }
    },
  },
};
</script>
