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

              <div class="col-1"></div>

              <!-- Select Size Page -->
              <div class="col-2"></div>
            </div>

            <div>
              <slot>
                <table
                  class="table table-hover-table-stripped thead-light"
                  width="100%"
                >
                  <thead>
                    <tr style="background-color: #f6f9fc">
                      <th>NAMA</th>
                      <th>Account Number</th>
                      <th>NFC-ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- <tr v-for="data0 in tableData" :key="data0._id"> -->

                    <tr v-for="(data0, index) in tableData" :key="`input${index}`">

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
                          class="input-items"
                          @keyup="autoTab($refs.nfc[index], 10, $event)"
                          maxLength="11"
                        />
                      </td>
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
              label: "Account Number",
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
  },
  computed: {
    elements() {
        return document.getElementsByClassName("input-items");
    },
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
             .$put(`main_d/member_temp/member_temp_nfc?id_=${data0.id_}&nfcId=${data0.nfcId}`, data0)
          
                .then((response) => {
                    
                })
                .catch((e) => {

                });
        },
        
        autoTab(input, len, e) {
          const index = this.findIndex(e.target);
          if (input.value.length >= len) {
            this.moveFocus(index + 1);
          }
        },
        findIndex(target) {
          return [].findIndex.call(this.elements, (e) => e === target);
        },
        moveFocus(index) {
          if (this.elements[index]) {
            this.elements[index].focus();
          }
        },
       
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
