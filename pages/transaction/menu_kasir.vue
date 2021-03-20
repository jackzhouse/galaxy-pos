<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Menu Kasir</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb></route-bread-crumb>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div>
        <!-- action -->
        <!-- Card stats -->
        <card class="no-border-card" body-classes="px-4 pb--13">
          <div class="row mb--4 mt--2">
            <card gradient="" no-body="" class="ml-4">
              <div class="card-body">
                <div class="mb-2">
                  <center>
                    <span class="h3 text-blue text">Register</span>
                  </center>
                </div>
                <!-- <nuxt-link to="#" class="btn btn-md btn-block btn-neutral">
                    <img src="img/transaction/icon3.png" class="kasirSize">
                </nuxt-link> -->

                <base-button
                  @click="modal.register = true"
                  class="btn btn-md btn-block btn-neutral"
                  type="success"
                  size="md"
                  icon
                >
                  <img src="img/transaction/icon3.png" class="kasirSize" />
                </base-button>
              </div>
            </card>

            <card gradient="" no-body="" class="ml-4">
              <div class="card-body">
                <div class="mb-2">
                  <center>
                    <span class="h3 text-blue text">Transaksi</span>
                  </center>
                </div>
                <!-- <nuxt-link to="#" class="btn btn-md btn-block btn-neutral">
                  <img src="img/transaction/icon1.png" class="kasirSize" />
                </nuxt-link> -->

                <base-button
                  @click="modal.transaksi = true"
                  class="btn btn-md btn-block btn-neutral"
                  type="success"
                  size="md"
                  icon
                >
                  <img src="img/transaction/icon1.png" class="kasirSize" />
                </base-button>
              </div>
            </card>

            <card gradient="" no-body="" class="ml-4">
              <div class="card-body">
                <div class="mb-2">
                  <center><span class="h3 text-blue">Top Up</span></center>
                </div>
                <!-- <nuxt-link to="#" class="btn btn-md btn-block btn-neutral">
                  <img src="img/transaction/icon2.png" class="kasirSize" />
                </nuxt-link> -->

                <base-button
                  @click="modal.topUp = true"
                  class="btn btn-md btn-block btn-neutral"
                  type="success"
                  size="md"
                  icon
                >
                  <img src="img/transaction/icon2.png" class="kasirSize" />
                </base-button>
              </div>
            </card>
          </div>
        </card>

        <!-- Table -->
        <card
          class="no-border-card"
          body-classes="px-0 pb-1"
          footer-classes="pb-2"
        >
          <template slot="header">
            <h3 class="mb-0">Menu Kasir</h3>
            <p class="text-sm mb-0">Manajemen Menu Kasir</p>
          </template>
          <div>
            <!-- Column Seaching -->
            <div class="row mt--3 mb-2">
              <!-- search user -->
              <div class="col-2 ml-2">
                <div>
                  <!-- <base-input>
                    <flat-picker slot-scope="{focus, blur}"
                                  @on-open="focus"
                                  @on-close="blur"
                                  :config="{allowInput: true, mode: 'range',}"
                                  class="form-control datepicker"
                                  v-model="range"
                                  placeholder="2020-11-01 to 2020-12-31"
                                  v-on:keyup="changePageSize(e)"
                                  >
                    </flat-picker>
                  </base-input>
                     -->
                </div>
              </div>

              <!-- search  -->
              <div class="col-7 ml-5"></div>

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
                <table
                  class="table table-hover-table-stripped thead-light"
                  width="100%"
                >
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
                      <td>
                        {{ item.createTime | moment("DD-MMM-YYYY, h:mm:ss") }}
                      </td>
                      <td>{{ item.ownerName }}</td>
                      <td>Rp. {{ formatPrice(item.debt) }}</td>
                      <td>Rp. {{ formatPrice(item.credit) }}</td>
                      <td>Rp. {{ formatPrice(item.balance) }}</td>
                      <td>{{ item.message }}</td>
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
                <a
                  class="page-link"
                  @click="changePage(item)"
                  v-if="Math.abs(item - paging.page) <= 2"
                >
                  {{ item }}
                </a>
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

    <modal :show.sync="modal.register">
      <h6 slot="header" class="modal-title">Register</h6>
      <form>

          <input v-on:keyup.enter="$event.target.nextElementSibling.focus()" type="text">
          <input type="text">
          <input type="text">

          <div class="form-group row">
            <label class="col-md-2 col-form-label form-control-label"
              >NFC ID</label
            >
            <div class="col-md-10">
              <base-input
                name="idNfc"
                placeholder="ID NFC"
                success-message="Looks good!"
                rules="required"
                v-model="form.idNfc"
              ></base-input>
            </div>
          </div> 
          <div class="form-group row">
            <label class="col-md-2 col-form-label form-control-label"
              >Nama</label
            >
            <div class="col-md-10">
              <base-input
                name="name"
                placeholder="Isi Nama"
                success-message="Looks good!"
                rules="required"
                v-model="form.name"
              ></base-input>
            </div>
          </div>
          
          <div class="form-group row">
            <label class="col-md-2 col-form-label form-control-label"
              >Saldo</label
            >
            <div class="col-md-10">
              <base-input
                name="balance"
                placeholder="Isi Saldo"
                success-message="Looks good!"
                rules="required"
                v-model="form.balance"
              ></base-input>
            </div>
          </div>
          
          <div class="col-md-12 text-center">
            <base-button type="primary" class="my-2" @click="registerSubmit()"
              >Submit</base-button
            >
            <base-button type="warning" class="my-2" @click="closeModal()"
              >Batal</base-button
            >
          </div>
      </form>

    </modal>

    <modal :show.sync="modal.transaksi">
      <h6 slot="header" class="modal-title">Transaksi</h6>

      <form>
          <div class="form-group row">
            <label class="col-md-2 col-form-label form-control-label"
              >Nama</label
            >
            <div class="col-md-10">
              <base-input
                name="name"
                placeholder="Isi Nama"
                success-message="Looks good!"
                rules="required"
                v-model="form.name"
              ></base-input>
            </div>
          </div>
          
          <div class="form-group row">
            <label class="col-md-2 col-form-label form-control-label"
              >Saldo</label
            >
            <div class="col-md-10">
              <base-input
                name="balance"
                placeholder="Isi Saldo"
                success-message="Looks good!"
                rules="required"
                v-model="form.balance"
              ></base-input>
            </div>
          </div>
          
          <div class="col-md-12 text-center">
            <base-button type="primary" class="my-2" @click="transaksiSubmit()"
              >Submit</base-button
            >
            <base-button type="warning" class="my-2" @click="closeModal()"
              >Batal</base-button
            >
          </div>
      </form>

    </modal>

    <modal :show.sync="modal.topUp">
      <h6 slot="header" class="modal-title">Top Up</h6>

      <form>
          <div class="form-group row">
            <label class="col-md-2 col-form-label form-control-label"
              >Nama</label
            >
            <div class="col-md-10">
              <base-input
                name="name"
                placeholder="Isi Nama"
                success-message="Looks good!"
                rules="required"
                v-model="form.name"
              ></base-input>
            </div>
          </div>
          
          <div class="form-group row">
            <label class="col-md-2 col-form-label form-control-label"
              >Saldo</label
            >
            <div class="col-md-10">
              <base-input
                name="balance"
                placeholder="Isi Saldo"
                success-message="Looks good!"
                rules="required"
                v-model="form.balance"
              ></base-input>
            </div>
          </div>
          
          <div class="col-md-12 text-center">
            <base-button type="primary" class="my-2" @click="topUpSubmit()"
              >Submit</base-button
            >
            <base-button type="warning" class="my-2" @click="closeModal()"
              >Batal</base-button
            >
          </div>
      </form>
    </modal>
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import swal from "sweetalert2";
import { Modal, BaseAlert } from "@/components/argon-core";

// import moment from 'moment'

export default {
  components: {
    // BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    flatPicker,
    Modal,
  },
  data() {
    return {
      validated: false,
      modal: {
        register: false,
        transaksi: false,
        topUp: false,
      },
      Modal,
      tableData: [],
      form: {
        nama: "",
      },
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

    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
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

      if (this.user) {
        search.push({ field: "user", key: this.user });
      }

      this.$axios
        .$post(`` + "?size=" + size + "&page=" + page, { search })
        .then((response) => {
          this.tableData = response.content;
          this.paging.totalElements = response.totalElements;
          this.paging.totalPages = response.totalPages;
          this.paging.page = page;
          this.paging.size = size;
        });
    },
    registerSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          this.$axios
            .$post(``, this.form)
            .then((response) => {
              swal.fire({
                title: `Saved`,
                text: "Data berhasil di simpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.modal.register = false;
            })
            .catch((e) => {});
        });
      }
    },
    transaksiSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          this.$axios
            .$post(``, this.form)
            .then((response) => {
              swal.fire({
                title: `Saved`,
                text: "Data berhasil di simpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.modal.transaksi = false;
            })
            .catch((e) => {});
        });
      }
    },
    topUpSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          this.$axios
            .$post(``, this.form)
            .then((response) => {
              swal.fire({
                title: `Saved`,
                text: "Data berhasil di simpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.modal.topUp = false;
            })
            .catch((e) => {});
        });
      }
    },
    closeModal() {
      this.modal.register = false;
      this.modal.transaksi = false;
      this.modal.topUp = false;
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
        .$delete(`` + row.id_)
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

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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

.div1 {
  width: 200px;
  height: 100px;
  border: 1px solid blue;
  padding: 50px;
}

.kasirSize {
  width: 50px;
  height: 50px;
}
</style>
