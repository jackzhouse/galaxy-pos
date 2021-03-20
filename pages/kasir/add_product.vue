<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Product</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>

        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/kasir/product" class="btn btn-neutral btn-sm"
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
              <h3 slot="header" class="mb-0">Tambah Data Product</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form
                  class="needs-validation"
                  @submit.prevent="memberTempFormSubmit"
                >
                  <div class="col-md-8">
                    <!-- <div class="form-group row"> -->
                    <!--   <label class="col-md-3 col-form-label form-control-label">Customer</label> -->
                    <!--   <div class="col-md-9"> -->
                    <!--     <base-input> -->
                    <!--       <el-select -->
                    <!--         v-model="customer" -->
                    <!--         filterable -->
                    <!--         clearable -->
                    <!--         placeholder="Pilih Customer" -->
                    <!--         @change="onChangeCustomer()" -->
                    <!--       > -->
                    <!--         <el-option -->
                    <!--           v-for="option in customerOptions" -->
                    <!--           :key="option.id_" -->
                    <!--           :label="option.perusahaanName" -->
                    <!--           :value="option.id_" -->
                    <!--         ></el-option> -->
                    <!--       </el-select> -->
                    <!--     </base-input> -->
                    <!--   </div> -->
                    <!-- </div> -->

                    <!-- <div class="form-group row"> -->
                    <!--   <label class="col-md-3 col-form-label form-control-label">Pipeline</label> -->
                    <!--   <div class="col-md-9"> -->
                    <!--     <base-input> -->
                    <!--       <el-select -->
                    <!--         v-model="pipeline" -->
                    <!--         filterable -->
                    <!--         clearable -->
                    <!--         placeholder="Pilih Pipeline terlebih dahulu" -->
                    <!--       > -->
                    <!--         <el-option -->
                    <!--           v-for="option in pipelineOptions" -->
                    <!--           :key="option.id_" -->
                    <!--           :label="option.title" -->
                    <!--           :value="option.id_" -->
                    <!--         ></el-option> -->
                    <!--       </el-select> -->
                    <!--     </base-input> -->
                    <!--   </div> -->
                    <!-- </div> -->

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama Produk</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="name"
                          placeholder="Nama Produk"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.name"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Barcode</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="barcode"
                          placeholder="Barcode"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.barcode"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Harga</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="price"
                          placeholder="Harga"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.price"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Stock Barang</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="stock"
                          placeholder="Jumlah Barang Yang Ada"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.stock"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Harga Diskon</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="discountPrice"
                          placeholder="Harga Diskon"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.discountPrice"
                        ></base-input>
                      </div>
                    </div>
                    <!-- <div class="form-group row"> -->
                    <!--   <label class="col-md-3 col-form-label form-control-label">Jenis Kelamin</label> -->
                    <!--   <div class="col-md-9"> -->
                    <!--     <base-input -->
                    <!--       <el-select v-model="form.gender" -->
                    <!--         placeholder="Jenis Kelamin"> -->
                    <!--         <el-option -->
                    <!--           v-for="option in genderOptions" -->
                    <!--           :key="option.label" -->
                    <!--           :label="option.label" -->
                    <!--           :value="option.value" -->
                    <!--         ></el-option> -->
                    <!--       </el-select> -->
                    <!--     </base-input> -->
                    <!--   </div> -->
                    <!-- </div> -->

                    <!-- <div class="form-group row"> -->
                    <!--   <label class="col-md-3 col-form-label form-control-label">Tanggal Lahir</label> -->
                    <!--   <div class="col-md-9"> -->

                    <!--     <base-input> -->
                    <!--       <flat-picker slot-scope="{focus, blur}" -->
                    <!--                   @on-open="focus" -->
                    <!--                   @on-close="blur" -->
                    <!--                   :config="{allowInput: true}" -->
                    <!--                   class="form-control datepicker" -->
                    <!--                   placeholder="Tanggal Lahir" -->
                    <!--                   name="dateOfBirth" -->
                    <!--                   rules="required" -->
                    <!--                   v-model="form.dateOfBirth"> -->
                    <!--       </flat-picker> -->
                    <!--     </base-input> -->

                    <!--   </div> -->
                    <!-- </div> -->

                    <!-- <div class="form-group row"> -->
                    <!--   <label class="col-md-3 col-form-label form-control-label">Tempat Lahir</label> -->
                    <!--   <div class="col-md-9"> -->
                    <!--     <base-input -->
                    <!--       name="placeOfBirth" -->
                    <!--       placeholder="Tempat Lahir" -->
                    <!--       success-message="Looks good!" -->
                    <!--       rules="required" -->
                    <!--       v-model="form.placeOfBirth" -->
                    <!--     ></base-input> -->
                    <!--   </div> -->
                    <!-- </div> -->

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Deskripsi Barang</label
                      >
                      <div class="col-md-9">
                        <textarea
                          class="form-control"
                          name="description"
                          placeholder="Deskripsi Produk"
                          success-message="Looks good!"
                          :rules="{ required: true }"
                          v-model="form.description"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">tags</label>
                      <div class="col-md-9">
                        <tags-input
                        v-model="form.tags"
                        placeholder="Tags / Jenis Barang"
                        success-message="Looks good!"
                        rules="required"
                        >
                        </tags-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >volume</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="volume"
                          placeholder="volume"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.volume"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >volType</label
                      >
                      <div class="col-md-9">
                        <base-input
                          <el-select v-model="form.volType"
                            placeholder="Tipe Volume">
                            <el-option
                              v-for="option in volTypeOptions"
                              :key="option.label"
                              :label="option.label"
                              :value="option.value"
                            ></el-option>
                          </el-select>
                        </base-input>
                      </div>
                      </div>
                    <!-- </div> -->

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Gambar Product</label
                      >
                      <div class="col-md-9">
                        <!-- <base-input -->
                        <!--   name="volType" -->
                        <!--   placeholder="volType" -->
                        <!--   success-message="Looks good!" -->
                        <!--   rules="required" -->
                        <!--   v-model="form.volType" -->
                        <!-- ></base-input> -->
                        <dropzone-file-upload
                          v-model="fileImage"
                          ref="fileImage"
                          type="file"
                          @change="uploadImage"
                        ></dropzone-file-upload>
                      </div>
                    </div>
                    <!-- <div class="form-group row"> -->
                    <!--   <label class="col-md-3 col-form-label form-control-label text-uppercase">Kelas</label> -->
                    <!--   <div class="col-md-9"> -->
                    <!--     <base-input -->
                    <!--       name="kelas" -->
                    <!--       placeholder="Kelas" -->
                    <!--       success-message="Looks good!" -->
                    <!--       rules="required" -->
                    <!--       v-model="form.kelas" -->
                    <!--     ></base-input> -->
                    <!--   </div> -->
                    <!-- </div> -->

                    <!-- <div class="form-group row"> -->
                    <!--   <label class="col-md-3 col-form-label form-control-label">tags</label> -->
                    <!--   <div class="col-md-9"> -->
                    <!--     <tags-input v-model="form.tags"></tags-input> -->
                    <!--   </div> -->
                    <!-- </div> -->
                  </div>
                  <base-button type="primary" native-type="submit"
                    >Simpan</base-button
                  >
                  <nuxt-link class="btn btn-warning" to="/kasir/product"
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
import DropzoneFileUpload from "@/components/argon-core/Inputs/DropzoneFileUpload";
//import Multiselect from "vue-multiselect";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "PelangganForm",
  // layout: "DashboardLayout",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    flatPicker,
    DropzoneFileUpload,
    //        Multiselect,
  },
  data() {
    return {
      pipeline: "",
      customer: "",
      pipelineOptions: [],
      customerOptions: [],
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
      volTypeOptions: [
        {
          label: "miligram",
          value: "miligram",
        },
        {
          label: "gram",
          value: "gram",
        },
        {
          label: "kilogram",
          value: "kilogram",
        },
        {
          label: "cc",
          value: "cc",
        },
        {
          label: "liter",
          value: "liter",
        },
        {
          label: "ikat",
          value: "ikat",
        },
        {
          label: "biji",
          value: "biji",
        },
        {
          label: "pcs",
          value: "pcs",
        },
      ],
      validated: false,
      form: {
        name: "",
        barcode: "",
        price: "",
        description: "",
        discountPrice: "",
        volume: "",
        volType: "",
        images: "",
        stock: "",
        tags: "",
      },
      doSubmit: true,
      fileImage: "",
      options: [{ name: "Makanan" }, { name: "Minuman" }],
    };
  },
  beforeMount() {
    // var customerId = this.$store.state.customer.customerId;
    // this.$store.state.user.user.activeCompany;
    // if (customerId != ""){
    //     this.customer = customerId;
    // }

    // this.getCustomer();
    // this.getPipeline();

    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
  },
  methods: {
    uploadImage() {
      const formData = new FormData();
      for (var i = 0; i < this.fileImage.length; i++) {
        let file = this.fileImage[i];
        formData.append("file", file);
      }
      const allowTypes = ["image/jpeg", "image/jpg", "image/png"];
      this.fileImage = this.$refs.fileImage.files[0];
      if (!allowTypes.includes(this.fileImage.type)) {
        swal.fire({
          title: "File Bukan Image, Harap Masukan File Image!",
          type: "failed",
          confirmButtonClass: "btn btn-danger btn-fill",
          buttonsStyling: false,
        });
        this.$refs.fileImage.files = [];
      } else {
        this.$axios
          .$post(`/main_a/image/uploadimage`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })

          .then((response) => {
            console.log(response.name);
            this.form.images = response.name;
            // console.log(
            // this.getDatas(this.serverParams.size, this.serverParams.page);
          });
        // .catch(() => {
        //   // console.log();
        //   swal.fire({
        //     title: "Failed Upload!",
        //     type: "failed",
        //     confirmButtonClass: "btn btn-danger btn-fill",
        //     buttonsStyling: false,
        //   });
        // });
      }
    },
    onChangeCustomer() {
      this.$store.commit("customer/SET_CUSTOMER_ID", this.customer);
      this.getPipeline();
    },
    getPipeline() {
      this.$axios
        .$get("main_b/pelanggan/get_combo_pipeline/" + this.customer)
        .then((response) => {
          this.pipelineOptions = response;
          console.log(response);
        });
    },
    getCustomer() {
      this.$axios
        .$get("main_b/pelanggan/get_combo_pelanggan")
        .then((response) => {
          console.log(response);
          this.customerOptions = response;
        });
    },
    async memberTempFormSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          // if (!success) {
          //   return;
          // }

          this.$axios
            .$post(`/main_c/product/product`, this.form)
            .then((response) => {
              swal.fire({
                title: `Berhasil`,
                text: "Data Member Telah Berhasil Disimpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/kasir/product");
            })
            .catch((e) => {});
        });
      }
    },
  },
};
</script>
