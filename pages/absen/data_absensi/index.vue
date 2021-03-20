<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Absensi</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <!-- <a v-bind:href="$axios.$get(
          "/main_c/akses_pengguna/download_absen.xls?" +
            "companyId=" +
            companyCode +
            "&tahun=" +
            startDate.split("-")[0] +
            "&bulan=" +
            startDate.split("-")[1]
        )"> -->
          <a
            v-bind:href="
              hostName +
              'main_c/akses_pengguna/download_absen.xls?companyId=' +
              companyCode +
              '&tahun=' +
              startDate.split('-')[0] +
              '&bulan=' +
              startDate.split('-')[1]
            "
          >
            <base-button type="secondary" native-type="submit"
              >Download Absensi</base-button
            >
          </a>
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
            <h3 class="mb-0">Data Absensi</h3>
            <p class="text-sm mb-0">Management page for Absensi data</p>
          </template>
          <div>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
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
              <base-input>
                <flat-picker
                  slot-scope="{ focus, blur }"
                  @on-open="focus"
                  @on-close="blur"
                  class="form-control datepicker"
                  placeholder="Tanggal"
                  name="date"
                  v-model="startDate"
                  @on-change="dateSelected()"
                >
                </flat-picker>
              </base-input>
            </div>
            <div style="overflow-x: auto; height: 500px">
              <slot>
                <table
                  class="table table-hover-table-stripped thead-light table-flush"
                  width="10%"
                >
                  <thead>
                    <tr style="background-color: #e9ecef">
                      <th>Nama Pengguna</th>
                      <th v-for="(item, index) in headerDate" :key="index">
                        {{ item.dateDay }} <br />
                        {{ item.dateLabel }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in customData" :key="index">
                      <td style="padding-top: 54px">
                        <div>{{ item.name }}</div>
                      </td>

                      <td
                        v-for="(item, index) in customData[index].absen"
                        :key="index"
                      >
                        <template>
                          <div>
                            <div class="row">
                              <div class="col">{{ item.first }}</div>
                              <div class="col">
                                <div v-if="item.suhuFirst >= 38">
                                  <div style="color: firebrick">
                                    {{ item.suhuFirst }}&#8451;
                                  </div>
                                </div>

                                <div v-else>
                                  <div>{{ item.suhuFirst }}&#8451;</div>
                                </div>
                              </div>
                            </div>
                            <!-- <br /> -->
                            <div v-if="item.masuk === 'datang_terlambat'">
                              <div style="color: firebrick">
                                {{ item.masuk }}
                              </div>
                            </div>
                            <div v-if="item.masuk === 'datang_tepat'">
                              <div style="color: darkgreen">
                                {{ item.masuk }}
                              </div>
                            </div>
                            <div v-if="item.masuk === 'none'">
                              <div style="color: darkorange">
                                {{ item.masuk }}
                              </div>
                            </div>
                            <div v-if="item.masuk === '-'">
                              <div style="color: firebrick">
                                {{ item.masuk }}
                              </div>
                            </div>
                            <hr style="margin-top: 10px; margin-bottom: 10px" />
                            <div class="row">
                              <div class="col">{{ item.last }}</div>
                              <div class="col">
                                <div v-if="item.suhuLast >= 38">
                                  <div style="color: firebrick">
                                    {{ item.suhuLast }}&#8451;
                                  </div>
                                </div>

                                <div v-else>
                                  <div>{{ item.suhuLast }}&#8451;</div>
                                </div>
                              </div>
                            </div>
                            <!-- <br /> -->
                            <div v-if="item.pulang === 'pulang_tepat'">
                              <div style="color: darkgreen">
                                {{ item.pulang }}
                              </div>
                            </div>
                            <div v-if="item.pulang === 'pulang_awal'">
                              <div style="color: firebrick">
                                {{ item.pulang }}
                              </div>
                            </div>
                            <div v-if="item.pulang === 'none'">
                              <div style="color: darkorange">
                                {{ item.pulang }}
                              </div>
                            </div>
                          </div>
                        </template>
                        <!-- <template v-else>
                          <div class="col">
                            {{ item.first }} - {{ item.suhuFirst }}&#8451;
                            <br />
                            {{ item.masuk }}
                            <hr style="margin-top: 10px; margin-bottom: 10px" />
                            {{ item.last }} - {{ item.suhuLast }}&#8451;
                            <br />
                            {{ item.pulang }}
                          </div>
                        </template> -->
                      </td>
                    </tr>
                  </tbody>
                </table>
              </slot>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import VueScrollingTable from "vue-scrolling-table";
// import { BasePagination } from "@/components/argon-core";
// import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import swal from "sweetalert2";
import moment from "moment";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import Datepicker from "vuejs-datepicker";
import { formatDate } from "@fullcalendar/core";

export default {
  //   mixins: [clientPaginationMixin],
  // layout: "DashboardLayout",
  components: {
    VueScrollingTable,
    // BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    flatPicker,
    Datepicker,
  },
  data() {
    return {
      absenData: [],
      propsToSearch: ["namaPengguna"],
      tableColumns: [
        {
          prop: "name",
          label: "Nama Pengguna",
          minWidth: 160,
          sortable: true,
        },
      ],
      hostName: "",
      startDate: "",
      customData: [],
      customColumn: [],
      tableData: [],
      selectedRows: [],
      date: new Date(),
      headerDate: [],
      headerDay: [],
      firstWeek: "",
      companyCode: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).company.id
        : "",
      startDateRange: moment().startOf("isoWeek"),
      endDateRange: moment().endOf("isoWeek"),
      url:
        "main_c/akses_pengguna/get_data_absen/" +
        this.companyCode +
        "/" +
        this.startDate,
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
    this.getData();
    this.getHostname();
    // this.getDatas(this.paging.size, this.paging.page);
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
    fixscroll() {
      const thead = document.getElementById("myhead");
      const tbodyScroll = document.getElementById("mybody").scrollLeft;
      thead.scrollLeft = tbodyScroll;
      //document.getElementById("frozen").scrollLeft = 0;
    },
    // getDataByDate(indexCustomData, dateTemp) {
    //   const date = moment(dateTemp); // Thursday Feb 2015
    //   const dow = date.day();
    //   var customDateTemp = this.customData[index];
    //   var index = customDateTemp.absen.findIndex((x) => x.hari === dow);
    //   console.log(index);
    // },
    getHostname(wfh) {
      let hostname = "http://192.168.1.102/";
      if (window.location.hostname.includes("192.168.1.102")) {
        hostname = "http://192.168.1.102/";
      } else if (window.location.hostname.includes("erp.katalis.info")) {
        hostname = "https://api.katalis.info/";
      }
      console.log("host", hostname);
      return (this.hostName = hostname);
    },
    getDatas(size, page) {
      (this.customColumn = []),
        this.$axios
          // .$get(this.url + "?size=" + size + "&page=" + page, { search: [] })
          .$get(
            "main_c/akses_pengguna/get_data_absen/" +
              this.companyCode +
              "/" +
              this.firstWeek
          )
          .then((response) => {
            this.arrayGroup(response);
            // this.tableData = response;
            this.tableData = response;
            this.paging.totalElements = response.totalElements;
            this.paging.totalPages = response.totalPages;
            this.paging.page = page;
            this.paging.size = size;
          });
    },
    getData() {
      this.$axios
        .$get(
          "main_c/akses_pengguna/get_tanggal_awal_minggu/" +
            this.formatDate(this.date)
        )
        .then((response) => {
          this.startDate = response;
        });
    },
    arrayGroup(arr) {
      let result = [];
      let body = [];
      let dateContentEach = [];
      let dateContent = [];

      arr.forEach((element) => {
        if (!this[element.name]) {
          this[element.name] = {
            name: element.name,
            companyCode: element.companyCode,
            idPengguna: element.idPengguna,
            hari: element.hari,
            absen: [],
          };
          result.push(this[element.name]);
        }
        this[element.name].absen.push(element.absen);
      });
      this.customData = result;
      //   this.customColumn = this.customData[0].absen;
      result.map((row) => {
        delete this[row.name];
      });

      this.customData.map((row, index) => {
        var tempData = [];
        let cek = true;

        this.headerDate.map((row2, index2) => {
          let a = row.absen.find((rowAbsen, indexAbsen) => {
            if (moment(rowAbsen.tanggal).format("ll") == row2.dateLabel) {
              console.log(
                moment(rowAbsen.tanggal).format("ll"),
                row2.dateLabel
              );
              return rowAbsen;
            }
          });
          if (!a) {
            a = {
              first: "-",
              keterangan: "-",
              last: "-",
              masuk: "-",
              namaShift: "-",
              pulang: "-",
              suhuFirst: "-",
              suhuLast: "-",
              tanggal: "-",
            };
          }
          console.log(a);
          tempData[index2] = a;
        });
        row.absen = tempData;
        // console.log(tempData);
      });
    },
    download() {
      this.$axios.$get(
        "/main_c/akses_pengguna/download_absen.xls?" +
          "companyId=" +
          this.companyCode +
          "&tahun=" +
          this.startDate.split("-")[0] +
          "&bulan=" +
          this.startDate.split("-")[1]
      );
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      if (date != null) {
        return [year, month, day].join("-");
      } else {
        return null;
      }
    },
    dateSelected() {
      let startDatet = new Date(this.startDate);
      let dateHead = [];
      let dayHead = [];
      let dateTemp = [];
      this.$axios
        .$get("main_c/akses_pengguna/get_tanggal_awal_minggu/" + this.startDate)
        .then((res) => {
          this.firstWeek = res;
          this.getDatas(this.paging.size, this.paging.page);

          for (let index = 0; index < 7; index++) {
            let tempDate = startDatet.setDate(startDatet.getDate());
            dateTemp.push(this.formatDate(tempDate));
            var objDate = {
              dateValue: tempDate,
              dateLabel: moment(tempDate).format("ll"),
              dateDay: moment(tempDate).format("dddd"),
            };
            var objDay = {
              dateValue: tempDate,
              dateLabel: moment(tempDate).format("dddd"),
            };
            dateHead.push(objDate);
            dayHead.push(objDay);
            startDatet.setDate(startDatet.getDate() + 1);
          }

          this.headerDate = dateHead;
          this.headerDay = dayHead;

          // this.setState({
          //   startDate: res.data,
          // });
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
