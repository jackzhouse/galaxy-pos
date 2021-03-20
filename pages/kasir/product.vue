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
          <h6 class="h2 text-white d-inline-block mb-0">Data Product</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link to="/kasir/add_product" class="btn btn-neutral btn-sm"
            >Tambah Data Produk
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
              <!-- <base-input>
                <el-select
                  v-model="pipeline_import_excel"
                  filterable
                  placeholder="Pilih Pipeline terlebih dahulu"
                >
                  <el-option
                    v-for="option in pipelineOptions"
                    :key="option.id_"
                    :label="option.title"
                    :value="option.id_"
                  ></el-option>
                </el-select>
              </base-input> -->

              <file-input
                class="text-left"
                ref="file"
                id="file"
                type="file"
                @change="filesChange()"
              ></file-input>
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
            <h3 class="mb-0">Data Product</h3>
            <p class="text-sm mb-0">Manajemen Data Product</p>
          </template>
          <div>
            <div class="row mt--3 mb-2">
              <!-- <div class="col-4 ml-2"> -->
              <!--   <div> -->
              <!--     <base-input> -->
              <!--       <el-select -->
              <!--         v-model="search.customer" -->
              <!--         filterable -->
              <!--         clearable -->
              <!--         placeholder="Pilih Customer terlebih dahulu" -->
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

              <!-- <div class="col-4 ml-2"> -->
              <!--   <div> -->
              <!--     <base-input> -->
              <!--       <el-select -->
              <!--         v-model="search.pipeline" -->
              <!--         filterable -->
              <!--         clearable -->
              <!--         @change="getDatas(paging.size, paging.page)" -->
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
                    v-model="barcode"
                    placeholder="Cari Barcode"
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
                <!-- <base-input> -->
                <!--   <el-select -->
                <!--     v-model="tags" -->
                <!--     multiple -->
                <!--     filterable -->
                <!--     placeholder="Pilih Tags" -->
                <!--     @change="changePageSize()" -->
                <!--   > -->
                <!--     <el-option -->
                <!--       v-for="item in getTags" -->
                <!--       :key="item" -->
                <!--       :label="item" -->
                <!--       :value="item" -->
                <!--     > -->
                <!--     </el-option> -->
                <!--   </el-select> -->
                <!-- </base-input> -->
              </div>

              <div class="col-1">
                <!-- <button -->
                <!--   class="btn btn-neutral el-icon-refresh-left" -->
                <!--   @click="refreshTags()" -->
                <!-- ></button> -->
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
              <!-- <el-table-column
              :key="Image"
              >
                <a
                  href="#"
                  class="avatar avatar-sm rounded-circle"
                  data-toggle="tooltip"
                  data-original-title="Ryan Tompson"
                >
                  <img
                    alt="Image placeholder"
                    src="https://demos.creative-tim.com/vue-argon-dashboard-pro/img/theme/team-1.jpg"
                  />
                </a>
              </el-table-column> -->

              <el-table-column min-width="200px" align="center" label="Actions">
                <div slot-scope="{ $index, row }" class="d-flex">
                  <nuxt-link
                    :to="{
                      name: 'crm-crm_member_temp-edit',
                      params: { id: row.id_ },
                    }"
                  >
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
      search: {
        customer: "",
        pipeline: "",
      },
      customerOptions: [],
      pipelineOptions: [],
      pipeline: "",
      pipeline_import_excel: "",
      getTags: [],
      files: "",
      file: "",
      file0: "",
      file1: "",
      modals: {
        classic: false,
        foto: false,
      },
      memberTempData: [],
      propsToSearch: ["name", "barcode"],
      tableColumns: [
        {
          prop: "name",
          label: "Nama",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "barcode",
          label: "barcode",
          minWidth: 130,
          sortable: true,
        },
        {
          prop: "price",
          label: "harga",
          minWidth: 130,
          sortable: true,
        },
        {
          prop: "images",
          label: "gambar",
          minWidth: 160,
          sortable: false,
        },
        {
          prop: "description",
          label: "deskrepsi produk",
          minWidth: 190,
          sortable: true,
        },
      ],
      tableData: [],
      tableInfo: {},
      name: "",
      tags: "",
      barcode: null,
      selectedRows: [],
      url: "main_c/product/get_product",
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
    };
  },
  beforeMount() {
    // var customerId = this.$store.state.customer.customerId;
    // this.$store.state.user.user.activeCompany;
    // if (customerId != ""){
    //  this.search.customer = customerId;
    // }
    this.getDatas(this.paging.size, this.paging.page);
    // this.getCustomer();
    // this.getPipeline();

    // this.$axios.$get(`main_d/member_temp/get_tag/tags`).then((response) => {
    //   this.getTags = response;
    //   console.log(response);
    // });
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
    // getPipeline(){
    //   this.$axios.$get("main_b/pelanggan/get_combo_pipeline/"+ this.search.customer).then((response) => {
    //     this.pipelineOptions = response;
    //     console.log(response);
    //   });
    // },
    // getCustomer() {
    //   this.$axios.$get("main_b/pelanggan/get_combo_pelanggan").then((response) => {
    //     console.log(response);
    //     this.customerOptions = response;
    //     console.log(response.length);
    //     if (response.length == 1) {
    //       this.search.customer = response[0].id_;
    //       this.getDatas(this.paging.size, this.paging.page);
    //     }
    //   });
    // },
    // onChangeCustomer(){
    //   this.getDatas(this.paging.size, this.paging.page);
    //   this.$store.commit("customer/SET_CUSTOMER_ID", this.search.customer);
    //   this.getPipeline();
    // },
    openModalClassic() {
      this.pipeline_import_excel = "";
      this.$refs.file.value = null;
      //      this.$refs.importExcel.reset();
      this.file = "";
      this.modals.classic = true;
    },
    getDatas(size, page) {
      // search
      let search = [];
      // search.push({ field: "customerId", key: this.search.customer });
      // search.push({ field: "pipelineProcessId", key: this.search.pipeline });
      if (this.name) {
        search.push({ field: "name", key: this.name });
      } else if (this.barcode) {
        search.push({ field: "barcode", key: this.barcode });
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

    // refreshTags() {
    //   this.$axios.$get("main_d/member_temp/refresh_tag/tags", {
    //     size: 1000,
    //     page: 0,
    //   });
    // },

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
      // var pipeline = "x"
      // if(this.search.pipeline != ""){
      //     pipeline = this.search.pipeline;
      // }

      // var customer = "x"
      // if(this.search.customer != ""){
      //     customer = this.search.customer;
      // }else{
      //     alert('Customer belum di pilih');
      //     return false;
      //     // break;
      // }
      this.$axios
        .$post(`/main_c/product/product_upload/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        })
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
          this.pipeline_import_excel = "";
          //this.$refs.importExcel.reset();
          this.file = "";
          this.$refs.file.value = null;
          this.$refs.file.files = "";
          this.$refs.file.reset();
          // this.modals.classic = false;
        })
        .catch((error) => {
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
        .$post(`/main_d/image_temp/by_bulk_uploadpasphoto/number`, formData, {
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
          // this.getDatas(this.serverParams.size, this.serverParams.page);
          this.files = "";
          this.$refs.files.files = [];
          this.modals.foto = false;
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
        .$delete(`/main_c/product/product/` + row.id_)
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
