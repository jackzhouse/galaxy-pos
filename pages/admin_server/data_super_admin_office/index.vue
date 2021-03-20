<template
  ><div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ $route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            to="data_super_admin_office/form"
            class="btn btn-neutral btn-sm"
            >Tambah</nuxt-link
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
            <h3 class="mb-0">Akun Admin</h3>
          </template>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap mt--3 mb-2"
          >
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
          <el-table
            :data="tableData"
            row-key="id"
            header-row-class-name="thead-light"
            ><el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              v-bind="column"
            ></el-table-column>
            <el-table-column min-width="180px" align="right" label="Actions">
              <div slot-scope="{ $index, row }" class="d-flex">
                <nuxt-link
                  :to="{
                    name: 'data_super_admin_office-form',
                    params: { id: row.id_ },
                  }"
                >
                  <button class="btn btn-warning btn-sm" type="button">
                    <i class="text-white ni ni-ruler-pencil"></i> Edit
                  </button> </nuxt-link
                >&nbsp;&nbsp;
                <base-button
                  @click.native="handleDelete($index, row)"
                  class="remove btn-link"
                  type="danger"
                  size="sm"
                  icon
                >
                  <i class="text-white ni ni-fat-remove"></i> Delete
                </base-button>
              </div>
            </el-table-column>
          </el-table>
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
    // BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      tableColumns: [
        // { prop: "num", label: "No", minWidth: 150, sortable: true },
        { prop: "name", label: "Nama", minWidth: 150, sortable: true },

        {
          prop: "gender",
          label: "Jenis Kelamin",
          minWidth: 150,
          sortable: true,
        },
        {
         
         prop: "accountNumber",
          label: "No Akun",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "phone",
          label: "No Telepon",
          minWidth: 150,
          sortable: true,
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 150,
          sortable: true,
        },
      ],
      tableData: [],
      url: "/main_a/user/get_user_superadmin",
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
      this.$axios
        .$post(this.url + "?size=" + size + "&page=" + page, { search: [] })
        .then((response) => {
          this.tableData = response.content;
          this.tableInfo = response;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
        });
    },
    handleLike(index, row) {
      swal({
        title: `You liked ${row.name}`,
        buttonsStyling: false,
        type: "success",
        confirmButtonClass: "btn btn-success btn-fill",
      });
    },
    handleEdit(index, row) {
      console.log(row);
      swal.fire({
        title: `You want to edit ${row.companyName}`,
        buttonsStyling: false,
        confirmButtonClass: "btn btn-info btn-fill",
      });
    },
    handleDelete(index, row) {
      swal
        .fire({
          title: "Are you sure?",
          text: `You wont be able to revert this!`,
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
        .$delete("/main_a/user/user/" + row.id_)
        .then((user) => {
          swal.fire({
            title: "Deleted!",
            text: `You deleted ${row.companyName}`,
            type: "success",
            confirmButtonClass: "btn btn-success btn-fill",
            buttonsStyling: false,
          });
        })
        .catch((error) => {
          swal.fire({
            title: "Delete Failed!",
            text: `Failed to delete ${row.companyName}`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
        });
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
