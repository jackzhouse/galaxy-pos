<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Preview Member</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <!-- <route-bread-crumb></route-bread-crumb> -->
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right"></div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div>
        <div
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
        >
          <!-- <div> -->
          <!--   <el-select -->
          <!--       class="select-primary pagination-select" -->
          <!--       v-model="paging.size" -->
          <!--       placeholder="Per page" -->
          <!--       @change="changePageSize()" -->
          <!--     > -->
          <!--       <el-option -->
          <!--         class="select-primary" -->
          <!--         v-for="item in paging.perPageOptions" -->
          <!--         :key="item" -->
          <!--         :label="item" -->
          <!--         :value="item" -->
          <!--       ></el-option> -->
          <!--     </el-select> -->
          <!-- </div> -->

          <base-input>
            <el-select
              v-model="search.customer"
              filterable
              clearable
              placeholder="Pilih Customer terlebih dahulu"
              @change="onChangeCustomer()"
            >
              <el-option
                v-for="option in customerOptions"
                :key="option.id_"
                :label="option.perusahaanName"
                :value="option.id_"
              ></el-option>
            </el-select>
          </base-input>
          <base-input>
            <el-select
              v-model="search.pipeline"
              filterable
              clearable
              @change="
                getDatas(
                  paging.size,
                  paging.page,
                  paging.fotoStatus,
                  paging,
                  isPrint
                )
              "
              placeholder="Pilih Pipeline terlebih dahulu"
            >
              <el-option
                v-for="option in pipelineOptions"
                :key="option.id"
                :label="option.title"
                :value="option.id"
              ></el-option>
            </el-select>
          </base-input>
          <el-select
            class="select-primary pagination-select multimb mb--30"
            v-model="paging.fotoStatus"
            placeholder="pilih Status Foto"
            @change="changePageSize(e)"
            clearable
          >
            <el-option
              class="select-primary"
              v-for="item in this.paging.perstatusFoto"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>

          <el-select
            class="select-primary pagination-select multimb mb--30"
            v-model="paging.isPrint"
            placeholder="pilih Status Print"
            @change="changePageSize(e)"
            clearable
          >
            <el-option
              class="select-primary"
              v-for="item in this.paging.perisPrint"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
<label for="">
          <el-select
            v-model="tags"
            multiple
            filterable
            placeholder="Pilih Tags"
            @change="changePageSize()"
          >
            <el-option
              v-for="item in tagsOptions"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <button
          style="height: 44px"
            class="btn btn-neutral btn-sm el-icon-refresh-left"
            title="Refresh Tags"
            @click="refreshTags()"
          ></button>
        </label>
          <!-- searching -->
          <div>
            <base-input
              v-model="number"
              prepend-icon="fas fa-search"
              placeholder="Cari Account Number Disini ..."
              v-on:keyup="changePageSize(e)"
            >
            </base-input>
          </div>
        </div>
      </div>

      <div class="row card-wrapper mt-3">
        <!-- batas card -->
        <div class="col-lg-6" v-for="data in datas" :key="data._id">
          <card class="tinggiCard">
            <!-- Card body -->
            <div class="row align-items-center">
              <div class="col-auto">
                <a class="avatar avatar-xl avatar2">
                  <img
                    class="fotoUkuran"
                    alt=""
                    :src="
                      data.photoUrl || data.photoUrl != ''
                        ? `${$axios.defaults.baseURL}main_d/image_temp/get/${data.photoUrl}/pas`
                        : `${$axios.defaults.baseURL}main_d/image_temp/get/nophoto/pas`
                    "
                  />
                </a>
                <base-button
                  type="primary"
                  class="btn btn-sm col mt-2 mr--7"
                  @click="modals.editUploadFoto = true"
                  block
                >
                  Upload Foto
                </base-button>
              </div>
              <div class="col ml--2">
                <h4 class="mb-0 mt--3">{{ data.name }}</h4>
                <!-- <p class="text-sm text-muted mb-0 fontUbah">
                   <b></b> {{ data.createTime }}
              </p> -->
                <p class="text-sm text-muted mb-0 fontUbah">
                  <b>Account Number : </b> {{ data.number }}
                </p>
                <p class="text-sm text-muted mb-0 fontUbah">
                  <b>TTL : </b>{{ data.placeOfBirth }},
                  {{ data.dateOfBirth | moment("DD MMMM YYYY") }}
                </p>
                <p class="text-sm text-muted mb-0 fontUbah">
                  <b>Alamat : </b>{{ data.address }}
                </p>
                <p class="text-sm text-muted mb-0 fontUbah">
                  <b>Note : </b> {{ data.note }}
                </p>
                <p class="text-sm text-muted mb-0 fontUbah">
                  <b>Tags : </b>{{ data.tags }}
                </p>
                <div v-if="data.isPrint === false">
                  <p class="text-sm text-primary mb-0 fontUbah">
                    <b class="text-muted">Status Kartu : </b> Kartu Sudah
                    Tercetak
                  </p>
                </div>
                <div v-else>
                  <p class="text-sm text-danger mb-0 fontUbah">
                    <b class="text-muted">Status Kartu : </b
                    ><b>Kartu Belum Tercetak</b>
                  </p>
                </div>
              </div>

              <div class="col-auto">
                <base-button type="warning" size="sm" @click="pilihId(data)">
                  Edit
                </base-button>
              </div>
            </div>
          </card>
        </div>
        <div>
          <modal
            :show.sync="modals.classic"
            modal-classes=" modal-dialog modal-lg"
          >
            <h6 slot="header" class="modal-title">Edit Data Kartu</h6>
            <form class="boldfont" @submit.prevent="editData()">
              <div class="row mr-10 ml-10">
                <div class="col-sm-6 ml--2">
                  <div class="row kolom1">
                    <p>Kartu Belum Tercetak : &nbsp;</p>
                    <base-switch v-model="datakartu.isPrint"></base-switch>
                  </div>
                  <base-input v-model="datakartu.name"></base-input>
                  <base-input v-model="datakartu.number"></base-input>
                  <base-input v-model="datakartu.note"></base-input>
                  <base-input v-model="datakartu.placeOfBirth"></base-input>
                  <!-- <base-input
                     input-group-classes="input-group-merge"
                     v-model="datakartu.dateOfBirth"
                     type="date"
                     ></base-input> -->
                  <base-input
                    input-group-classes="input-group-merge"
                    v-model="datakartu.dateOfBirth"
                    type="date"
                  >
                    <!-- <flat-pickr -->
                    <!--   :config="config" -->
                    <!--   class="form-control" -->
                    <!-- > -->
                    <!-- </flat-pickr> -->
                  </base-input>
                </div>
                <div class="col-sm-6">
                  <tags-input v-model="datakartu.tags"></tags-input>
                  <br />
                  <base-input input-group-classes="input-group-merge">
                    <textarea
                      class="form-control"
                      aria-label="With textarea"
                      v-model="datakartu.address"
                    ></textarea>
                  </base-input>

                  <base-button type="primary" native-type="submit"
                    >Save</base-button
                  >
                  <base-button
                    type="danger"
                    class="ml-auto"
                    @click="modals.classic = false"
                    >Batal</base-button
                  >
                </div>
              </div>
            </form>
            <template slot="footer"> </template>
          </modal>
          <modal :show.sync="modals.editUploadFoto">
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
                name="file"
                id="file"
                ref="files"
                @change="filesChangeImage()"
                class="form-control"
              />
            </form>

            <template slot="footer">
              <base-button type="primary" @click="postFoto()"
                >Upload</base-button
              >
              <base-button
                type="danger"
                class="ml-auto"
                @click="modals.editUploadFoto = false"
                >Batal</base-button
              >
            </template>
          </modal>

          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class>
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of
                {{ paging.totalElements }} entries
              </p>
            </div>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            <ul class="pagination pagination-no-border">
              <li
                class="page-item prev-page"
                :class="{ disabled: paging.page + 1 === 1 }"
              >
                <a class="page-link" aria-label="Previous" @click="prevPage">
                  <span aria-hidden="true">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                  </span>
                </a>
              </li>

              <li
                class="page-item"
                :class="{ active: paging.page + 1 === item }"
                :key="item"
                v-for="item in range(1, paging.totalPages)"
              >
                <a
                  v-if="Math.abs(item - paging.page) <= 2"
                  class="page-link"
                  @click="changePage(item)"
                  >{{ item }}</a
                >
              </li>

              <li
                class="page-item next-page"
                :class="{ disabled: paging.page + 1 === paging.totalPages }"
              >
                <a class="page-link" aria-label="Next" @click="nextPage">
                  <span aria-hidden="true">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/argon-core/Modal.vue";
import { Table, TableColumn, Select, Option } from "element-ui";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Multiselect from "vue-multiselect";
import moment from "moment";
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { Indonesian } from "flatpickr/dist/l10n/id.js";
import FileInput from "@/components/argon-core/Inputs/FileInput";

export default {
  mixins: [clientPaginationMixin],
  components: {
    Modal,
    FileInput,
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    Multiselect,
    TagsInput,
    flatPickr,
  },
  data() {
    return {
      search: {
        customer: "",
        pipeline: "",
      },
      customerOptions: [],
      pipelineOptions: [],
      datakartu: {
        // number: "",
        name: "",
        number: "",
        note: "",
        placeOfBirth: "",
        dateOfBirth: "",
        address: "",
        id_: "",
        tags: [],
      },
      tags: [],
      number: null,
      name: null,
      infokartu: [],
      tagsOptions: [],
      datas: [],
      files: "",
      file0: "",
      modals: {
        classic: false,
        editUploadFoto: false,
      },
      selectedRows: [],
      paging: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        page: 0,
        fotoStatus: 0,
        perstatusFoto: [
          { value: 0, label: "Pilih Status Photo" },
          { value: 1, label: "ada foto" },
          { value: 2, label: "tidak ada foto" },
        ],
        isPrint: 0,
        perisPrint: [
          { value: 0, label: "Pilih Status Print" },
          { value: 1, label: "Belum Ter Cetak" },
          { value: 2, label: "Sudah Di Cetak" },
        ],
      },
      // bootstrapStyling: "",
      selected: "",
      config: {
        dateFormat: "d-m-Y",
        locale: Indonesian,
        // altFormat: 'j M Y',
        // altInput: true,
      },
    };
  },
  beforeMount() {
    // this.$image.ping();

    this.getCustomer();
    this.getPipeline();

    this.getDatas(
      this.paging.size,
      this.paging.page,
      this.paging.fotoStatus,
      this.paging.isPrint
    );
  },
  computed: {
    to() {
      let highBound = this.from + this.paging.size;

      if (this.paging.totalElements < highBound) {
        highBound = this.paging.totalElements;
      }
      return highBound;
    },
    from() {
      return this.paging.size * this.paging.page;
    },
    totalHalaman() {
      return this.paging.totalElements / this.paging.size;
    },
  },
  methods: {
    getTags() {
      this.$axios
        .$get(
          `main_d/member_temp/get_tag/tags?customerId=` + this.search.customer
        )
        .then((response) => {
          this.tagsOptions = response;
          // console.log(response);
        });
    },
    refreshTags() {
      this.$axios
        .$get(
          "main_d/member_temp/refresh_tag/tags?customerId=" +
            this.search.customer,
          {
            size: 1000,
            page: 0,
          }
        )
        .then((response) => {
          this.getTags();
          // this.getTags = response;
        });
    },
    getCustomer() {
      this.$axios
        .$get("main_b/pelanggan/get_combo_pelanggan")
        .then((response) => {
          // console.log(response);
          this.customerOptions = response;
          if (response) {
            if (response.length == 1) {
              this.search.customer = response[0].id_;
              this.getDatas(
                this.paging.size,
                this.paging.page,
                this.paging.fotoStatus,
                this.paging.isPrint
              );
              this.getPipeline();
              this.getTags();
            } else if (response.length > 1) {
              var customerId = this.$store.state.customer.customerId;
              // this.$store.state.user.user.activeCompany;
              if (customerId != "") {
                this.search.customer = customerId;
              }
              this.getDatas(
                this.paging.size,
                this.paging.page,
                this.paging.fotoStatus,
                this.paging.isPrint
              );
              this.getPipeline();
              this.getTags();
            }
          }
        });
    },
    getPipeline() {
      if (this.search.customer) {
        this.$axios
          .$get("main_b/pelanggan/get_combo_pipeline/" + this.search.customer)
          .then((response) => {
            this.pipelineOptions = response;
            // console.log(response);
          });
      }
    },
    onChangeCustomer() {
      this.getDatas(
        this.paging.size,
        this.paging.page,
        this.paging.fotoStatus,
        this.paging.isPrint
      );
      this.$store.commit("customer/SET_CUSTOMER_ID", this.search.customer);
      this.getPipeline();
      this.getTags();
    },
    async editData() {
        delete this.datakartu.companyId;
        delete this.datakartu.customerId;
      delete this.datakartu.createTime;
      delete this.datakartu.creatorId;
      delete this.datakartu.creatorName;
      delete this.datakartu.updateTime;
      delete this.datakartu.isDeleted;
      delete this.datakartu.levelTipe;
      // delete this.datakartu.dateOfBirth;
      delete this.datakartu._class;
      this.$axios
        .$put(
          `main_d/member_temp/member_temp/${this.datakartu.id_}`,
          this.datakartu
        )
        .then((response) => {
          swal.fire({
            title: `Success`,
            text: "Changes has been saved successfully",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.modals.classic = false;
          this.getDatas(this.paging.size, this.paging.page);
        })
        .catch((e) => {});
    },
    pilihId(data) {
      this.modals.classic = !this.modals.classic;
      data.dateOfBirth = moment(data.dateOfBirth).format("YYYY-MM-DD");
      this.datakartu = data;
    },
    getDatas(size, page, photoStatus = "", isPrint = "") {
      let search = [];
      search.push({ field: "customerId", key: this.search.customer });
      search.push({ field: "pipelineProcessId", key: this.search.pipeline });
      if (this.number) {
        search.push({
          field: "number",
          key: this.number,
        });
      }

      // search tag
      let tagSearch = [];
      if (this.tags.length > 0) {
        tagSearch.push({ field: "tags", key: this.tags });
      }

      this.$axios
        .$post(
          `main_d/member_temp/get_member_temp` +
            "?photoStatus=" +
            this.paging.fotoStatus +
            "&isPrint=" +
            this.paging.isPrint +
            "&size=" +
            size +
            "&page=" +
            page,
          { search, tagSearch }
        )
        .then((response) => {
          this.datas = response.content;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
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
      //  let uploadedFiles = this.$refs.files.files;
      //    for( var i = 0; i < uploadedFiles.length; i++ ){
      //       this.files.push( uploadedFiles[i])}
      //
      // this.files = event.target.files
    },

    async postFoto() {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files", file);
      }
      await this.$axios
        .$post(
          `/main_d/image_temp/multi_image/number/` + this.search.customer,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          swal.fire({
            title: `Success`,
            text: "Changes has been saved successfully",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          // console.log();
          this.getDatas(this.paging.size, this.paging.page);


          this.$refs.files.value = null;
          this.files = "";
        })
        .catch(() => {
          // console.log();
          swal.fire({
            title: "Failed Upload!",
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
          this.$refs.files.value = null;
          this.files = "";
        });
    },

    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    range(min, max) {
      let arr = [];
      for (let i = min; i <= max; i++) {
        arr.push(i);
      }
      return arr;
    },
    changePage(item) {
      const page = item - 1;
      this.getDatas(this.paging.size, page);
    },
    nextPage() {
      const page = this.paging.page + 1;
      this.getDatas(this.paging.size, page);
    },
    prevPage() {
      const page = this.paging.page - 1;
      this.getDatas(this.paging.size, page);
    },
    changePageSize(e) {
      const page = this.paging.page;
      this.getDatas(this.paging.size, page);
    },
    // end method
  },
};
</script>

<style>
.multimb {
  margin-bottom: 30px;
}

.avatar2 {
  width: 100px;
  /* height: 130px; */
}
.tinggiCard {
  height: 285px;
}
.fotoUkuran {
  width: 100px;
  height: 110px;
  margin-top: 10px;
}
.fontUbah {
  font-weight: 400;
  color: black;
}

.kolom1 {
  margin-left: 1px;
}

.modalSize {
  width: 700px;
  margin: auto;
}
</style>
