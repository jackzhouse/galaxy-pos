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
          <h6 class="h2 text-white d-inline-block mb-0">Card Mapping</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
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
            <h3 class="mb-0">Mapping Kartu</h3>
            <!-- <p class="text-sm mb-0">Manajemen Data Member</p> -->
          </template>
          <div>
            <!-- Seaching -->
            <div class="row mb-3">
              <!-- search company name -->
              <div class="col-2 ml-2">
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
                    placeholder="Cari NIS"
                    v-on:keyup="changePageSize()"
                  >
                  </base-input>
                </div>
              </div>

              <!-- search  -->
              <div class="col-2"></div>

              <!-- search  -->
              <div class="col-1"></div>

              <div class="col-1"></div>

              <!-- Select Size Page -->
              <div class="col-2"></div>
            </div>

            <!-- <div
              v-for="data0 in tableData"
              :key="data0._id"
              forclass="row mb-3"
            >
              <div v-if="number === null && name === null" class="col">
                <el-table :data="tableData">
                  <el-table-column min-width="150" label="Nama">
                  </el-table-column>
                  <el-table-column min-width="200" label="NIS">
                  </el-table-column>
                </el-table>
              </div>
              <div v-else class="col">
                <el-table :data="tableData">
                  <el-table-column min-width="150" prop="name" label="Name">
                  </el-table-column>
                  <el-table-column min-width="200" prop="number" label="NIS">
                  </el-table-column>
                  <el-table-column min-width="200" label="NFC ID">
                    <form>
                      <base-input v-model="data0.nfcId"></base-input>
                    </form>
                  </el-table-column>
                </el-table>
              </div>
            </div> -->
            <div>
              <slot>
                <table
                  class="table table-hover-table-stripped thead-light"
                  width="100%"
                >
                  <thead>
                    <tr style="background-color: #f6f9fc">
                      <th>NAMA</th>
                      <th>NIS</th>
                      <th>NFC-ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="data0 in tableData" :key="data0._id">
                      <td>
                        {{ data0.name }}
                      </td>
                      <td>{{ data0.number }}</td>
                      <td>
                        <input
                          v-model="data0.nfcId"
                          placeholder="Tap Kartu NFC"
                          @change="scanNfcId(data0)"
                          ref="nfc"
                          type="text"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </slot>
            </div>
          </div>

          <!-- <div
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
          </div> -->
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
      datas: [],
      modals: {
        classic: false,
        foto: false,
      },
      datakartu: {
        nfcId: "",
        isMapping: false,
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
          label: "NIS",
          minWidth: 130,
          sortable: true,
        },
      ],
      tableData: [],
      tableInfo: {},
      name: null,
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
    };
  },
  beforeMount() {
    var customerId = this.$store.state.customer.customerId;
    // this.$store.state.user.user.activeCompany;
    if (customerId != "") {
      this.search.customer = customerId;
    }
    this.getDatas(this.paging.size, this.paging.page);
    this.getCustomer();

    // this.$axios.$get("main_b/pipeline/get_combo_pipeline").then((response) => {
    //   this.pipelineOptions = response;
    //   console.log(response);
    // });

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
    async scanNfcId(data0) {
      console.log(data0);
      delete data0.companyId;
      delete data0.customerId;
      delete data0.createTime;
      delete data0.creatorId;
      delete data0.creatorName;
      delete data0.updateTime;
      delete data0.isDeleted;
      delete data0.levelTipe;
      delete data0.dateOfBirth;
      delete data0._class;
      data0.isMapping = true;
      this.$axios
        .$put(
          `main_d/member_temp/member_temp_nfc?id_=${data0.id_}&nfcId=${data0.nfcId}`,
          data0
        )

        .then((response) => {
          swal.fire({
            title: `Success`,
            text: "Changes has been saved successfully",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          // this.getDatas(this.paging.size, this.paging.page);
        })
        .catch((e) => {
          // this.$router.push('general/dashboard');
        });
    },

    // async editData() {
    //   delete this.datakartu.companyId;
    //   delete this.datakartu.createTime;
    //   delete this.datakartu.creatorId;
    //   delete this.datakartu.creatorName;
    //   delete this.datakartu.updateTime;
    //   delete this.datakartu.isDeleted;
    //   delete this.datakartu.levelTipe;
    //   // delete this.datakartu.dateOfBirth;
    //   delete this.datakartu._class;
    //   this.$axios
    //     .$put(
    //       `main_d/member_temp/member_temp/${this.datakartu.id_}`,
    //       this.datakartu
    //     )
    //     .then((response) => {
    //       swal.fire({
    //         title: `Success`,
    //         text: "Changes has been saved successfully",
    //         buttonsStyling: false,
    //         confirmButtonClass: "btn btn-success",
    //         type: "success",
    //       });
    //       this.modals.classic = false;
    //       this.getDatas(this.paging.size, this.paging.page);
    //     })
    //     .catch((e) => {});
    // },
    getCustomer() {
      this.$axios
        .$get("main_b/pelanggan/get_combo_pelanggan")
        .then((response) => {
          // console.log(response);
          this.customerOptions = response;
          // console.log(response.length);
          if (response.length == 1) {
            this.search.customer = response[0].id_;
            this.getDatas(this.paging.size, this.paging.page);
          }
        });
    },
    onChangeCustomer() {
      this.getDatas(this.paging.size, this.paging.page);
      this.$store.commit("customer/SET_CUSTOMER_ID", this.search.customer);
      // this.getPipeline();
    },
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
      search.push({ field: "customerId", key: this.search.customer });
      search.push({ field: "pipelineProcessId", key: this.search.pipeline });
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
      this.$axios
        .$post(
          `/main_d/member_temp/upload_member_temp_pipeline/` +
            this.search.pipeline +
            `/` +
            this.search.customer,
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
    pilih(data0) {
      this.datakartu = data0;
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
