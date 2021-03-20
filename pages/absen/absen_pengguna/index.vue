<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Pengguna</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link
            to="/absen/absen_pengguna/add"
            class="btn btn-neutral btn-sm"
            >Tambah Data</nuxt-link
          >
          <!-- <base-button size="sm" type="neutral">Filters</base-button> -->
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
            <h3 class="mb-0">Data Pengguna</h3>
          </template>

          <!-- <div> -->
          <div class="row mt--3">
            <div class="col-2 ml-3">
              <div>
                <base-input
                  v-model="name"
                  placeholder="Cari Nama"
                  v-on:keyup="changePageSize(e)"
                >
                </base-input>
              </div>
            </div>

            <div class="col-8"></div>

            <div class="col-2 ml--4">
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

            <!-- kolom cuti -->
            <el-table-column
              min-width="180px"
              align="right"
              label="Actions Cuti"
            >
              <div slot-scope="{ $index, row }" class="d-flex">
                <div class="col">
                  <div v-for="(item2, index2) in row.cuti" :key="index2">
                    <div
                      class="btn-group btn-sm"
                      role="group"
                      style="float: left"
                    >
                      <el-tooltip content="Edit Cuti" placement="top">
                        <nuxt-link
                          v-on:click="handle((this.cutiUpdate = item2))"
                          :to="{}"
                          @click.native="handleUpdateCuti(item2, row)"
                          class="btn btn-primary btn-sm"
                        >
                          {{ item2.keterangan }}
                        </nuxt-link>
                      </el-tooltip>
                      <el-tooltip content="Delete Cuti" placement="top">
                        <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="handleRemoveCuti(item2, row)"
                        >
                          <i class="text-white ni ni-fat-delete"></i>
                        </button>
                      </el-tooltip>
                    </div>
                  </div>

                  <div
                    class="btn-group btn-sm"
                    role="group"
                    style="float: left"
                  >
                    <el-tooltip content="Add Cuti" placement="top">
                      <base-button
                        @click.native="handleAddCuti($index, row)"
                        size="sm"
                        type="primary"
                      >
                        <i class="text-white ni ni-fat-add"></i>
                      </base-button>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </el-table-column>

            <!-- kolom action -->

            <el-table-column min-width="130px" align="right" label="Actions">
              <div slot-scope="{ $index, row }" class="d-flex">
                <nuxt-link
                  :to="{
                    name: 'absen-absen_pengguna-edit',
                    params: { id: row.id_ },
                  }"
                >
                  <el-tooltip content="Edit" placement="top">
                    <base-button size="sm" type="warning">
                      <i class="text-white ni ni-ruler-pencil"></i>
                    </base-button>
                  </el-tooltip> </nuxt-link
                >&nbsp;&nbsp;

                <el-tooltip content="Delete" placement="top">
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
          <!-- </div> -->
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class>
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of
                {{ paging.totalElements }} entries
                <span v-if="selectedRows.length"
                  >&nbsp; &nbsp; {{ selectedRows.length }} rows selected</span
                >
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
                <a class="page-link" @click="changePage(item)">{{ item }}</a>
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

    <modal :show.sync="modal.cuti" size="sm" body-classes="p-0">
      <loading
        :active.sync="loading"
        :can-cancel="false"
        :is-full-page="fullPage"
      ></loading>
      <card
        type="secondary"
        header-classes="bg-transparent pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <!-- <template slot="header">Tambah Cuti</template> -->

        <template>
          <form role="form" @submit.prevent="handleCuti">
            <div v-if="this.modalType === 'update'">
              <center>Edit Cuti</center>
            </div>
            <div v-else><center>Tambah Cuti</center></div>
            <br />
            <base-input>
              <flat-picker
                slot-scope="{ focus, blur }"
                @on-open="focus"
                @on-close="blur"
                :config="{ allowInput: true }"
                class="form-control datepicker"
                placeholder="Tanggal"
                name="dateOfBirth"
                rules="required"
                v-model="cuti.tglCuti"
              >
              </flat-picker>
            </base-input>
            <textarea
              class="form-control"
              placeholder="Keterangan"
              v-model="cuti.keterangan"
            >
            </textarea>

            <div class="text-center">
              <base-button type="primary" native-type="submit" class="my-2"
                >Simpan</base-button
              >
              <base-button type="warning" class="my-2" @click="closeCuti()"
                >Batal</base-button
              >
            </div>
          </form>
        </template>
      </card>
      <!-- </loading> -->
    </modal>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
// import { BasePagination } from "@/components/argon-core";
// import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import swal from "sweetalert2";
import { Modal, BaseAlert } from "@/components/argon-core";

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  //   mixins: [clientPaginationMixin],
  // layout: "DashboardLayout",
  components: {
    // BasePagination,
    Loading,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    flatPicker,
  },
  data() {
    return {
      Modal,
      BaseAlert,
      modal: {
        cuti: false,
      },
      loading: false,
      fullPage: false,
      tglCuti: "",
      idPengguna: "",
      absenPenggunaData: [],
      propsToSearch: ["name", "idPengguna", "namaShift", "tags"],
      cutiUpdate: "",
      deleteCuti: {},
      cuti: {
        tglCuti: "",
        keterangan: "",
      },
      tableColumns: [
        {
          prop: "name",
          label: "Nama",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "idPengguna",
          label: "Id Pengguna",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "namaShift",
          label: "Nama Shift",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "tags",
          label: "Tags",
          minWidth: 160,
          sortable: true,
        },
      ],
      name: "",
      modalType: "",
      tableData: [],
      tableInfo: {},
      selectedRows: [],
      url: "main_c/akses_pengguna/get_pengguna",
      paging: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        page: 0,
        perPageOptions: [5, 10, 25, 50],
      },
    };
  },
  beforeMount() {
    this.getDatas(this.paging.size, this.paging.page);
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
    getDatas(size, page) {
      let search = [];

      if (this.name) {
        search.push({ field: "name", key: this.name });
      }

      this.$axios
        .$post(this.url + "?size=" + size + "&page=" + page, { search })
        // .$get(this.url + "?size=" + size + "&page=" + page, { search: [] })
        .then((response) => {
          // this.cutiUpdate = response.content.cuti;
          this.tableData = response.content;
          this.tableInfo = response;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
        });
    },
    handleEdit(index, row) {
      console.log(row);
      swal.fire({
        title: `Do you want to edit ${row.name} ?`,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
      });
    },
    // delete data
    handleDelete(index, row) {
      swal
        .fire({
          title: "Are you sure ?",
          text: `You won't be able to revert this!`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-success btn-fill",
          cancelButtonClass: "btn btn-danger btn-fill",
          confirmButtonText: "Yes, delete it!",
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
        .$delete(`main_c/akses_pengguna/pengguna/` + row.id_, this.cuti)
        .then((user) => {
          swal.fire({
            title: "Deleted!",
            text: `${row.name} has been deleted.`,
            type: "success",
            confirmButtonClass: "btn btn-success btn-fill",
            buttonsStyling: false,
          });
          this.getDatas(this.paging.size, this.paging.page);
        })

        .catch((error) => {
          swal.fire({
            title: "Delete Failed!",
            text: `Failed deleting ${row.name}`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
        });
    },

    // end delete data

    async handleCuti() {
      // if(this.doSubmit){
      //     this.$refs.form.validate().then((success) => {
      //       if (!success) {
      //         return;
      //       }
      this.loading = true;
      if (this.modalType === "update") {
        this.$axios
          .$put(
            "/main_c/akses_pengguna/cuti/" +
              this.idPengguna +
              "?tgl=" +
              this.cuti.tglCuti,
            this.cuti
          )
          .then((response) => {
            swal
              .fire({
                title: `Saved`,
                text: "Your work has been saved",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
              .then((result) => {
                this.modal.cuti = false;
                this.loading = false;
                // this.modal.cuti = close();
                this.cuti.idPengguna = "";
              });
            this.getDatas(this.paging.size, this.paging.page);
          })
          .catch((e) => {});
      } else {
        // this.loading = true
        this.$axios
          .$post(
            "/main_c/akses_pengguna/cuti/" +
              this.idPengguna +
              "?tgl=" +
              this.cuti.tglCuti,
            this.cuti
          )
          .then((response) => {
            this.loading = false;
            swal
              .fire({
                title: `Saved`,
                text: "Your work has been saved",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              })
              .then((result) => {
                this.modal.cuti = false;
                // this.modal.cuti = close();
                this.cuti.idPengguna = "";
              });
            this.getDatas(this.paging.size, this.paging.page);
          })
          .catch((e) => {});
      }
      //     });
      // }
    },
    handleRemoveCuti(item2, row) {
      this.tglCuti = item2.tglCuti;
      this.deleteCuti = item2;
      swal
        .fire({
          title: "Apakah Anda Yakin ?",
          text: `Menghapus Cuti ${item2.keterangan} ?`,
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
            this.removeCuti(item2, row);
          }
        });
    },

    removeCuti(item2, row) {
      this.loading = true;
      this.$axios
        .$delete(
          "/main_c/akses_pengguna/cuti/" +
            row.id_ +
            "?tgl=" +
            this.tglCuti.split("T")[0]
        )
        .then((user) => {
          this.loading = false;
          swal.fire({
            title: "Terhapus",
            text: `Cuti ${item2.keterangan} Telah Terhapus`,
            type: "success",
            confirmButtonClass: "btn btn-success btn-fill",
            buttonsStyling: false,
          });
          this.getDatas(this.paging.size, this.paging.page);
        })
        .catch((error) => {
          swal.fire({
            title: "Gagal Terhapus!",
            text: `Gagal Menghapus Cuti ${item2.keterangan}`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
        });
    },

    // end delete cuti

    // cuti
    closeCuti() {
      this.modal.cuti = false;
      this.modalType = "";
      this.cuti.tglCuti = "";
      this.cuti.keterangan = "";
    },
    handleUpdateCuti(item2, row) {
      // this.getCuti();
      this.modal.cuti = true;
      this.cuti.tglCuti = item2.tglCuti;
      this.cuti.keterangan = item2.keterangan;
      this.modalType = "update";
      this.idPengguna = row.id_;
    },
    handleAddCuti(index, row) {
      console.log(row);
      // this.getPipelines();
      this.idPengguna = row.id_;
      this.modal.cuti = true;
      this.cuti.tglCuti = "";
      this.cuti.keterangan = "";
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
  },
};
</script>
<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
