<template
  ><div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Gambar</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link :to="{name: 'admin_server-data_gambar_office'}">
            <el-tooltip content="Mode Grid" placement="top">
                <base-button
                  size="md" 
                  type="white"
                >
                  <i class="text-primary ni ni-image"></i>
                </base-button>
              </el-tooltip>
          </nuxt-link>
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
            <h3 class="mb-0">Data Gambar</h3>
          </template>
          
          <!-- Seaching -->
            <div class="row mt--3 mb--3">
              <div
                class="col-2 mb-2"
              >
                <div>

                  <!-- <base-input>
                    <flat-picker slot-scope="{focus, blur}"
                                  @on-open="focus"
                                  @on-close="blur"
                                  :config="{allowInput: true}"
                                  class="form-control datepicker"
                                  placeholder="Filter Tanggal"
                                  v-model="createTime">
                    </flat-picker>
                   </base-input> -->

                </div>
              </div>
              <!-- search  -->
              <div
                class="col-8"
              >
              </div>

              <!-- Select Size Page -->
              <div
                class="col-2 mb-3"
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

            </div>
          <!-- end searching -->
          
          <div>
            <slot>
              <table class="table table-hover-table-stripped thead-light" width="100%">
                <thead>
                  <tr style="background-color: #f6f9fc">
                    <th>Gambar</th>
                    <th>Tanggal</th>
                    <th>Nama File</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in tableData" :key="index">
                    <td>
                        <a class="">
                            <img
                                class="gambarUkuran"
                                alt="gambar"
                                :src="`${$axios.defaults.baseURL}main_a/image/get/${item.name}/pas`"
                            />
                        </a>
                    </td>
                    <td>
                        {{ item.createTime | moment("DD-MMM-YYYY, h:mm:ss") }}
                    </td>
                    <td>{{ item.file_name }}</td>
                  </tr>
                </tbody>
              </table>
            </slot>
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
            </ul></div
        ></card>
      </div>
    </div>
  </div>
</template>

<script>

import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import swal from "sweetalert2";

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  components: {
    // BasePagination,
    flatPicker,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      createTime: new Date(),
      tableData: [],
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
        .$post("/main_a/image/get_image" + "?size=" + size + "&page=" + page, { search: [] })
        .then((response) => {
          this.tableData = response.content;
          this.tableInfo = response;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
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

<style>
.gambarUkuran {
  width: 100px;
  height: 100px;
  margin-top: 3px;
  border-radius: 10px;
}   
</style>
