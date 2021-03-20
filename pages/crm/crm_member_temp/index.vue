<template>
  <div class="content">
    <!-- <loading
       :active.sync="isLoading"
       :can-cancel="true"
       :on-cancel="onCancel"
       :is-full-page="fullPage"
       ></loading> -->

    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Member</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link
            to="/crm/crm_member_temp/add"
            class="btn btn-neutral btn-sm"
            >Tambah Data
          </nuxt-link>
          <base-button
            type="success"
            class="btn btn-sm"
            @click="templateExcel()"
          >
            Format Excel
          </base-button>
          <base-button
            class="btn btn-neutral btn-sm"
            @click="openModalClassic()"
          >
            Import Excel
          </base-button>

          <!--Classic modal-->
          <modal :show.sync="modals.classic">
            <h6 slot="header" class="modal-title">
              Upload File Excel Data Anda
            </h6>
            <v-form ref="importExcel">
              <base-input>
                <el-select
                  v-model="search.customer"
                  filterable
                  placeholder="Pilih Customer" 
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
              <input
                type="file"
                name="file"
                id="file"
                ref="file"
                class="form-control"
                @change="filesChange()"
              />
              <!-- <file-input
                class="text-left"
                ref="file"
                id="file"
                type="file"
                @change="filesChange()"
              ></file-input> -->
            </v-form>
            <hr />
            <div class="text-left">
              <template v-if="resp.upload">
                Berhasil Upload : {{ resp.upload.rowValid }} <br />
                Gagal Upload : {{ resp.upload.rowNonValid }} <br />
                <ul>
                  <li v-for="(itemUp, index) in resp.upload.error" :key="index">
                    {{ itemUp }}
                  </li>
                </ul>
              </template>
            </div>

            <template slot="footer">
              <base-button type="primary" @click="postFileExcel()"
                >Upload</base-button
              >
              <base-button
                type="danger"
                class="ml-auto"
                @click="modals.classic = false"
                >Batal</base-button
              >
            </template>
          </modal>

          <base-button
            class="btn btn-neutral btn-sm"
            @click="modals.foto = true"
          >
            Upload Foto
          </base-button>

          <!--Classic modal-->
          <modal :show.sync="modals.foto">
            <h6 slot="header" class="modal-title">Upload Seluruh Data Foto</h6>
            <form>
              <!-- <file-input
                class="text-left"
                ref="files"
                id="file"
                type="file"
                @change="filesChangeImage(e)"
                multiple
              ></file-input> -->
              <input type="file" name="file" id="file" ref="files" @change="filesChangeImage(e)" multiple class="form-control">
            </form>

            <template slot="footer">
              <base-button type="primary" @click="postFoto()"
                >Upload</base-button
              >
              <base-button
                type="danger"
                class="ml-auto"
                @click="modals.foto = false"
                >Batal</base-button
              >
            </template>
          </modal>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div>
        <card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <template slot="header">
            <h3 class="mb-0">Data Member</h3>
            <p class="text-sm mb-0">Manajemen Data Member</p>
          </template>
          <div>
            <div class="row mt-3 mb-2 pl-2">
              <div class="col-4">
                <div>
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
                </div>
              </div>

              <div class="col-4 ">
                <div>
                  <base-input>
                    <el-select
                      v-model="search.pipeline"
                      filterable
                      clearable
                      @change="onChangePipeline()"
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
                </div>
              </div>

              <div class="col-2">
                <div>
                  <base-input>
                    <el-select
                      v-model="search.status"                      
                      clearable
                      @change="getDatas(paging.size, paging.page)"
                      placeholder="Pilih Status Integrasi Katalis"
                    >
                      <el-option
                        v-for="option in statusOptions"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                  </base-input>
                </div>
              </div>

              <div class="col-2">
                <button type="button" class="btn btn-primary btn-mini " v-if="superUserId == $store.state.user.user.userId"  @click="openModalIntegrasi()">
                  <i class="el-icon-refresh-left"></i> &nbsp;
                  Integrasi Katalis
                </button>

                <modal :show.sync="modals.integrasi" data-backdrop="static">
                  <h6 slot="header" class="modal-title">Integrasi Member Temp dengan Katalis</h6>
                
                  <base-input>
                    <el-select
                      v-model="integrasi.type"                                                                  
                      placeholder="Pilih Status Integrasi Katalis"
                    >
                      <el-option label="Belum" value="belum"></el-option>
                      <el-option label="Semua" value="semua"></el-option>
                    </el-select>
                  </base-input>

                    <base-button type="primary" :disabled="isDisabledMigrasiButton" @click="doIntegrasiKatalis()"
                      >Mulai Integrasi</base-button
                    >
                    <br>
                    <center>
                      <h1>
                        {{integrasi.progress}} %
                      </h1>
                    </center>
                    Member sudah diintegrasi : {{integrasi.sudah}}<br>
                    Member belum diintegrasi : {{integrasi.belum}}<br>
                    Semua Data Member : {{integrasi.semua}}<br>
                  <template slot="footer">
                    <base-button
                      type="danger"
                      class="ml-auto" 
                      :disabled="isDisabledMigrasiButton"
                      @click="modals.integrasi = false"
                      >Batal</base-button
                    >
                  </template>
                </modal>
              </div>

            </div>
            <!-- Seaching -->
            <div class="row mb-3">
              <!-- search company name -->
              <div class="col-2 ml-2">
                <div>
                  <base-input
                    v-model="name"
                    placeholder="Cari Nama"
                    v-on:keyup="changePageSize()"
                  >
                  </base-input>
                </div>
              </div>

              <!-- search pic name -->
              <div class="col-2 ml--2">
                <div>
                  <base-input
                    v-model="number"
                    placeholder="Cari Account Number"
                    v-on:keyup="changePageSize()"
                  >
                  </base-input>
                </div>
              </div>

              <!-- search  -->
              <div class="col-2"></div>

              <!-- search  -->
              <div class="col-1"></div>

              <!-- search tags -->
              <div class="col-2">
                <base-input>
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
                </base-input>
              </div>

              <div class="col-1">
                <button
                  class="btn btn-neutral el-icon-refresh-left"
                  @click="refreshTags()"
                ></button>
              </div>

              <!-- Select Size Page -->
              <div class="col-2">
                <el-select
                  class="select-primary pagination-select"
                  v-model="paging.size"
                  placeholder="Per page"
                  @change="changePageSize()"
                >
                  <el-option
                    class="select-primary"
                    v-for="item in paging.perPageOptions"
                    :key="item"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <el-table
              class="mt--3"
              :data="tableData"
              row-key="id"
              header-row-class-name="thead-light"
            >
              <!-- @sort-change="sortChange" -->
              <!-- @selection-change="selectionChange" -->

              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                v-bind="column"
              ></el-table-column>

              <el-table-column min-width="200px" align="center" label="Actions">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <nuxt-link :to="`/crm/crm_member_temp/edit?id=` + row.id_">
                  <!-- <nuxt-link
                    :to="{
                      name: 'crm-crm_member_temp-edit',
                      params: { id: row.id_ },
                    }"
                  > -->
                    <el-tooltip content="Edit" placement="top">
                      <base-button size="sm" type="warning">
                        <i class="text-white ni ni-ruler-pencil"></i>
                      </base-button>
                    </el-tooltip> </nuxt-link
                  >&nbsp;&nbsp;

                  <el-tooltip content="Hapus" placement="top">
                    <base-button
                      @click.native="handleDelete($index, row)"
                      size="sm"
                      type="danger"
                      class="remove btn-link"
                    >
                      <i class="text-white ni ni-fat-remove"></i>
                    </base-button>
                  </el-tooltip>
                </div>
              </el-table-column>
            </el-table>
          </div>
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
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import swal from "sweetalert2";
import users from "~/components/tables/users2";
import Modal from "@/components/argon-core/Modal.vue";
import FileInput from "@/components/argon-core/Inputs/FileInput";
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  mixins: [clientPaginationMixin],
  // layout: "DashboardLayout",
  components: {
    FileInput,
    TagsInput,
    Modal,
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      superUserId: process.env.superUserId,
      search: {
        customer: "",
        pipeline: "",
        status: null
      },
      customerOptions: [],
      pipelineOptions: [],
      statusOptions: [
        {
          value : true,
          label : "Sudah"
        },
        {
          value : false,
          label : "Belum"
        }
      ],
      pipeline: "",
      pipeline_import_excel: "",
      tagsOptions: [],
      files: "",
      file: "",
      file0: "",
      file1: "",
      modals: {
        classic: false,
        foto: false,
        integrasi : false
      },
      memberTempData: [],
      propsToSearch: ["name"],
      tableColumns: [
        {
          prop: "name",
          label: "Nama",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "number",
          label: "Account Number",
          minWidth: 130,
          sortable: true,
        },
        {
          prop: "kelas",
          label: "kelas",
          minWidth: 90,
          sortable: true,
        },
        {
          prop: "address",
          label: "Alamat",
          minWidth: 190,
          sortable: true,
        },
        {
          prop: "Note",
          label: "note",
          minWidth: 120,
          sortable: true,
        },
        {
          prop: "tags",
          label: "Tags",
          minWidth: 160,
          sortable: true,
        },
       
      ],
      tableData: [],
      tableInfo: {},
      name: "",
      tags: "",
      number: null,
      selectedRows: [],
      url: "main_d/member_temp/get_member_temp",
      paging: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        page: 0,
        perPageOptions: [5, 10, 25, 50],
      },
      resp: {
        upload: "",
      },
      integrasi: {
        sudah :0,
        belum: 0,
        semua: 0,
        type: "belum",
        progress: 0
      },
      isDisabledMigrasiButton : false
    };
  },
  beforeMount() {
    this.getDatas(this.paging.size, this.paging.page);
    this.getCustomer();
    this.getPipeline();

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
  },
  methods: {
    getPipeline() {
      if(this.search.customer){
      this.$axios
        .$get("main_b/pelanggan/get_combo_pipeline/" + this.search.customer)
        .then((response) => {
          this.pipelineOptions = response;
          // console.log(response);
          if (response) {
            if (response.length > 1) {
              var pipelineId = this.$store.state.customer.pipelineId;
              // this.$store.state.user.user.activeCompany;
              if (pipelineId != "") {
                this.search.pipeline = pipelineId;
              }
            }
          }
        });
      }
    },
    getCustomer() {
      this.$axios
        .$get("main_b/pelanggan/get_combo_pelanggan")
        .then((response) => {
          // console.log(response);
          this.customerOptions = response;
          // console.log(response.length);
          if (response) {
            if (response.length == 1) {
              this.search.customer = response[0].id_;
              this.getDatas(this.paging.size, this.paging.page);
              // this.refreshTags();
              this.getTags();

            } else if (response.length > 1) {
              var customerId = this.$store.state.customer.customerId;
              // this.$store.state.user.user.activeCompany;
              if (customerId != "") {
                this.search.customer = customerId;
                this.getPipeline();
                this.getTags();
              }
              this.getDatas(this.paging.size, this.paging.page);
              // this.refreshTags();
            }
          }
        });
    },
    getTags(){
      this.$axios.$get(`main_d/member_temp/get_tag/tags?customerId=`+this.search.customer).then((response) => {
        this.tagsOptions = response;
        // console.log(response);
      });
    },
    onChangeCustomer() {
      this.getDatas(this.paging.size, this.paging.page);
      this.$store.commit("customer/SET_CUSTOMER_ID", this.search.customer);
      this.getPipeline();
      this.getTags();
    },
    onChangePipeline() {
      this.getDatas(this.paging.size, this.paging.page);
      this.$store.commit("customer/SET_PIPELINE_ID", this.search.pipeline); 
    },
    openModalClassic() {
      this.resp = {};
      // this.$refs.file.files = [];
      this.$refs.file.value = null;
      this.file = "";
      this.modals.classic = true;
    },
    openModalIntegrasi(){            
      this.$axios.get(`main_d/member_temp/member_temp/count_integrasi/` + this.search.customer).then((response) => {
        // console.log(response);
        this.integrasi.belum = response.data.belum;
        this.integrasi.sudah = response.data.sudah;
        this.integrasi.semua = response.data.semua;
        this.modals.integrasi = true;
      })
    },
    async doIntegrasiKatalis(){
      console.log("=== Start Integrasi ====");
      this.isDisabledMigrasiButton = true;
      var totalData = 0;
      if(this.integrasi.type == "belum"){
        if(this.integrasi.belum == 0){
          alert("Jumlah Member yang belum di integrasi 0, tidak bisa melakukan integrasi");
          this.isDisabledMigrasiButton = false;
          return false;
        }
        totalData = this.integrasi.belum;
      }else if(this.integrasi.type == "semua"){
        totalData = this.integrasi.semua;
      }

      var paging = Math.ceil(totalData / 100);
      var page = 1;
      for(var ii = 0; ii < paging; ii++){        
        await this.$axios.get(`main_d/member_temp/integrasi_member_temp?customerId=`+this.search.customer+`&type=` + this.integrasi.type + `&page=` + ii).then((response) => {
          this.integrasi.progress = Math.ceil((page / paging) * 100);
          page++;
          if(page == paging){
            this.openModalIntegrasi();
            this.isDisabledMigrasiButton = false;
          }
        }).catch(err => {
          // console.log(err);
          alert('Terdapat kesalahan sistem || ' + err.response.data.detail);
          this.isDisabledMigrasiButton = false;
          ii = paging - 1;
          return false;
        });
      }
      console.log("=== Finish Integrasi ====");
    },
    getDatas(size, page) {
      // search
      let search = [];
      search.push({ field: "customerId", key: this.search.customer });
      search.push({ field: "pipelineProcessId", key: this.search.pipeline });

      if (this.search.status){
        search.push({ field: "statusMigrasiKatalis", key: this.search.status });
      }

      if (this.name) {
        search.push({ field: "name", key: this.name });
      } else if (this.number) {
        search.push({ field: "number", key: this.number });
      }

      // search tag
      let tagSearch = [];
      if (this.tags.length > 0) {
        tagSearch.push({ field: "tags", key: this.tags });
      }

      this.$axios
        .$post(this.url + "?size=" + size + "&page=" + page, {
          search,
          tagSearch,
        })
        .then((response) => {
          this.tableData = response.content;
          this.tableInfo = response;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
        });
    },

    refreshTags() {
      this.$axios.$get("main_d/member_temp/refresh_tag/tags?customerId="+this.search.customer, {
        size: 1000,
        page: 0,
      }).then((response) => {
        this.getTags();
        // this.getTags = response;
      });
    },

    filesChange() {
      // this.inputs.file = files;
      const allowTypes0 = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      this.file = this.$refs.file.files[0];
      if (!allowTypes0.includes(this.file.type)) {
        swal.fire({
          title: "File Bukan Excel, Harap Masukan File Excel !",
          type: "failed",
          confirmButtonClass: "btn btn-danger btn-fill",
          buttonsStyling: false,
        });
        this.$refs.file.files = [];
      }
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
      // if (this.$refs.files.size > 1000) {
      //   swal.fire({
      //     title: "File Terlalu Besar",
      //     type: "failed",
      //     confirmButtonClass: "btn btn-danger btn-fill",
      //     buttonsStyling: false,
      //   });
      //   this.$refs.files.files = [];
      // }
      //  let uploadedFiles = this.$refs.files.files;
      //    for( var i = 0; i < uploadedFiles.length; i++ ){
      //       this.files.push( uploadedFiles[i])}
      //
      // this.files = event.target.files
    },

    postFileExcel() {
      let formData = new FormData();
      formData.append("file", this.file);
      var pipeline = "x";
      if (this.search.pipeline != "") {
        pipeline = this.search.pipeline;
      }

      var customer = "x";
      if (this.search.customer != "") {
        customer = this.search.customer;
      } else {
        alert("Customer belum di pilih");
        return false;
        // break;
      }
      this.$axios
        .$post(
          `/main_d/member_temp/upload_member_temp_pipeline/` +
            pipeline +
            `/` +
            customer,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((response) => {
          swal.fire({
            title: `Berhasil`,
            text: "Upload Data Berhasil",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.resp.upload = response;
          this.getDatas(this.paging.size, this.paging.page);
          // this.pipeline_import_excel = "";
          //this.$refs.importExcel.reset();
          // this.file = "";
          // this.$refs.file.value=null;
          // this.$refs.file.files="";
          // this.$refs.file.reset();
          // this.modals.classic = false;
        })
        .catch((e) => {
          swal.fire({
            title: "Gagal Upload !",
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
          this.getDatas(this.paging.size, this.paging.page);
        });
    },

    async postFoto() {
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files", file);
      }
      await this.$axios
        .$post(`/main_d/image_temp/multi_image/number/`+this.search.customer, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          swal.fire({
            title: `Berhasil`,
            text: "Berhasil Tersimpan",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          // console.log();
          this.getDatas(this.paging.size, this.paging.page);
          this.$refs.files.value = null;
          this.files = "";
          // this.modals.foto = false;
        })
        .catch(() => {
          // console.log();
          swal.fire({
            title: "Gagal Upload !",
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
        });
    },

    handleDelete(index, row) {
      swal
        .fire({
          title: "Apakah Anda Yakin ?",
          text: `Data yang dihapus tidak dapat dikembalikan`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-success btn-fill",
          cancelButtonClass: "btn btn-danger btn-fill",
          confirmButtonText: "Hapus",
          cancelButtonText: "Batal",
          buttonsStyling: false,
        })
        .then((result) => {
          if (result.value) {
            this.deleteRow(row);
          }
        });
    },

    deleteRow(row) {
      this.$axios
        .$delete(`main_d/member_temp/member_temp/` + row.id_)
        .then((user) => {
          swal.fire({
            title: "Terhapus",
            text: `Data telah berhasil dihapus`,
            type: "success",
            confirmButtonClass: "btn btn-success btn-fill",
            buttonsStyling: false,
          });
          this.getDatas(this.paging.size, this.paging.page);
        })

        .catch((error) => {
          swal.fire({
            title: "Gagal Terhapus!",
            text: `Gagal Menghapus Data`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
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
    changePageSize() {
      const page = this.paging.page;
      this.getDatas(this.paging.size, page);
    },
    templateExcel() {
      window.open(
        "https://docs.google.com/spreadsheets/d/17V20y95lK5jZGsA5Rqu0KLiVjFw_fit2/edit#gid=2118399873",
        "_blank"
      );
    },
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}

.fontvue {
  background-color: red;
}
</style>
