<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Company</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            to="/admin_Server/company_office/add"
            class="btn btn-neutral btn-sm"
            >Tambah Data</nuxt-link
          >
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
            <h3 class="mb-0">Data Perusahaan</h3>
          </template>
          <div>
            <!-- Seaching -->
            <div class="row mt--3 mb--3">
              <!-- search company name -->
              <div class="col-2 ml-3">
                <div>
                  <base-input
                    v-model="companyName"
                    placeholder="Cari Perusahaan"
                    v-on:keyup="changePageSize(e)"
                  >
                  </base-input>
                </div>
              </div>

              <!-- search pic name -->
              <div class="col-2 ml-5">
                <div>
                  <base-input
                    v-model="picName"
                    placeholder="Cari Nama PIC"
                    v-on:keyup="changePageSize(e)"
                  >
                  </base-input>
                </div>
              </div>

              <!-- search pic Email -->
              <div class="col-2 ml-3">
                <div>
                  <base-input
                    v-model="picEmail"
                    placeholder="Cari Email PIC"
                    v-on:keyup="changePageSize(e)"
                  >
                  </base-input>
                </div>
              </div>

              <!-- search  -->
              <div class="col-2"></div>

              <!-- Select Size Page -->
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
              <el-table-column
                v-for="column in tableColumns"
                :key="column.label"
                v-bind="column"
              ></el-table-column>

              <el-table-column min-width="200px" align="right" label="Actions" v-if="show">
                <div slot-scope="{$index, row}" class="d-flex">
                  <!-- <nuxt-link :to="{name: 'admin_server-company_office-add?id=' + row.id_, params: {id: row.id_}}"> -->
                  <nuxt-link :to="'/admin_server/company_office/add?id=' + row.id_">

                <el-tooltip content="Edit" placement="top">
                      <base-button
                        size="sm" 
                        type="warning"
                      >
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
          </div>
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
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import swal from "sweetalert2";

export default {
  components: {
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      show: false,
      companyData: [],
      tableColumns: [
        {
          prop: "companyName",
          label: "Nama Perusahaan",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "picName",
          label: "Nama PIC",
          minWidth: 160,
          sortable: true,
        },
        {
          prop: "picEmail",
          label: "Email PIC",
          minWidth: 220,
          sortable: true,
        },
      ],
      tableData: [],
      tableInfo: {},
      companyName: "",
      picName: "",
      picEmail: "",
      selectedRows: [],
      url: "main_a/company/get_company",
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
    var role = this.$store.state.user.roles;
    if(role.includes('ROLE_SUPER_ADMIN')){
      this.show = true;
    }

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

      if (this.companyName) {
        search.push({ field: "companyName", key: this.companyName });
      } else if (this.picName) {
        search.push({ field: "picName", key: this.picName });
      } else if (this.picEmail) {
        search.push({ field: "picEmail", key: this.picEmail });
      }

      this.$axios
        .$post(this.url + "?size=" + size + "&page=" + page, { search })
        .then((response) => {
          this.tableData = response.content;
          this.tableInfo = response;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
        });
    },
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
        .$delete(`main_a/company/company/` + row.id_)
        .then((user) => {
          swal.fire({
            title: "Deleted!",
            text: `${row.companyName} has been deleted.`,
            type: "success",
            confirmButtonClass: "btn btn-success btn-fill",
            buttonsStyling: false,
          });
          this.getDatas(this.paging.size, this.paging.page);
        })

        .catch((error) => {
          swal.fire({
            title: "Delete Failed!",
            text: `Failed deleting ${row.companyName}`,
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
