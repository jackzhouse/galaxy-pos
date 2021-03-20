<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Mutasi Saldo</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
          <template slot="header">
            <h3 class="mb-0">Data Mutasi Saldo</h3>
            <p class="text-sm mb-0">Manajemen Data Mutasi Saldo</p>
          </template>
          <div>

            <!-- Column Seaching -->
            <div class="row mt--3 mb-2">
              <!-- search  -->
              <div class="col-9 ml-5"></div>
              <!-- Select Size Page -->
              <div class="col-2 ml-3">
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

            <div>
              <slot>
              <table class="table table-hover-table-stripped thead-light" width="100%">
                <thead>
                  <tr style="background-color: #f6f9fc">
                    <th>Waktu</th>
                    <th>Nama Akun</th>
                    <th>Debet</th>
                    <th>Kredit</th>
                    <th>Saldo</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <td>{{ item.createTime | moment("DD-MMM-YYYY, h:mm:ss") }}</td>
                    <td>{{item.ownerName}}</td>
                    <td>Rp. {{ formatPrice(item.debt) }}</td>
                    <td>Rp. {{ formatPrice(item.credit) }}</td>
                    <td>Rp. {{ formatPrice(item.balance) }}</td>
                    <td>{{item.message}}</td>
                    
                  </tr>
                </tbody>
              </table>
              </slot>
            </div>
              
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

// import moment from 'moment'

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
      tableData: [],
      user: "",
      selectedRows: [],
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

      if (this.user){
        search.push({ field: "user", key: this.user });
      };

      this.$axios
        .$post(`/mutation/get_mutations` + "?size=" + size + "&page=" + page, { search })
        .then((response) => {
          this.tableData = response.content;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
        });
    },

    formatPrice(value) {
        let val = ((value/1)).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
