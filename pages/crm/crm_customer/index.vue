<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Customer</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <nuxt-link to="/crm/crm_customer/add" class="btn btn-neutral btn-sm"
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
            <h3 class="mb-0">Data Customer</h3>
            <p class="text-sm mb-0">Manajemen Data Customer</p>
          </template>

          <!-- Seaching -->
          <div class="row mt--3">
            <!-- search name -->
            <div class="col-2 ml-2">
              <div>
                <base-input
                  v-model="perusahaanName"
                  placeholder="Cari Nama"
                  v-on:keyup="changePageSize()"
                >
                </base-input>
              </div>
            </div>

            <!-- search implementator -->
            <div class="col-2 ml--2">
              <div>
                <base-input
                  v-model="namaImplementator"
                  placeholder="Implementator"
                  v-on:keyup="changePageSize()"
                >
                </base-input>
              </div>
            </div>

            <!-- search no hp -->
            <div class="col-2 ml--1">
              <div>
                <base-input
                  v-model="phone"
                  placeholder="Cari No HP"
                  v-on:keyup="changePageSize()"
                >
                </base-input>
              </div>
            </div>

            <!-- search email -->
            <div class="col-2 ml--2">
              <div>
                <base-input
                  v-model="email"
                  placeholder="Cari Email"
                  v-on:keyup="changePageSize()"
                >
                </base-input>
              </div>
            </div>

            <!-- search select Pipeline -->
            <div class="col-2 ml--2">
              <base-input>
                <el-select
                  class="select-primary pagination-select"
                  v-model="searchpipeline"
                  placeholder="Pilih Pipeline"
                  @change="changePageSize()"
                >
                  <el-option
                    class="select-primary"
                    v-for="option in getComboPipeline"
                    :key="option.title"
                    :label="option.title"
                    :value="option.title"
                  ></el-option>
                </el-select>
              </base-input>
            </div>

            <!-- Select Size Page -->
            <div class="col-2 ml-2">
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
            <el-table-column
              align="left"
              min-width="140px"
              label="Create Time"
            >
              <div slot-scope="{ $index, row }">
                {{ row.createTime | moment("DD-MMM-YYYY, h:mm:ss") }}
              </div>
            </el-table-column>
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              v-bind="column"
            ></el-table-column>

            <!-- action pipeline -->
            <el-table-column
              align="left"
              min-width="140px"
              label="Implementator"
            >
              <div slot-scope="{ $index, row }">
                {{ getName(row.implementators) }}
              </div>
            </el-table-column>

            <el-table-column align="left" min-width="110px" label="Level">
              <div slot-scope="{ $index, row }">
                {{
                  row.levelTipe.length == 4 || row.levelTipe.length == 1
                    ? row.levelTipe.pop()
                    : row.levelTipe.join(", ")
                }}
              </div>
            </el-table-column>

            <el-table-column align="right" min-width="140px" label="Pipeline">
              <div slot-scope="{ $index, row }">
                <div v-for="(item2, index2) in row.pipeline" :key="index2">
                  <div
                    class="btn-group btn-sm"
                    role="group"
                    style="float: left"
                  >
                    <nuxt-link
                      :to="
                        `/crm/crm_customer/pipeline?id=` +
                        row.id_ +
                        `&idProcess=` +
                        item2.idProcess
                      "
                      class="btn btn-primary btn-sm"
                    >
                      {{ item2.title }}
                    </nuxt-link>

                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="handleRemovePipeline(item2, row)"
                    >
                      <i class="text-white ni ni-fat-delete"></i>
                    </button>
                  </div>
                </div>

                <div class="btn-group btn-sm" role="group" style="float: left">
                  <base-button
                    @click.native="handleAddPipeline($index, row)"
                    class="remove btn-link"
                    type="success"
                    size="sm"
                    icon
                  >
                    +
                  </base-button>
                </div>
              </div>
            </el-table-column>

            <!-- action data -->

            <el-table-column min-width="80px" align="left" label="Actions">
              <div slot-scope="{ $index, row }">
                <el-tooltip content="Assign Ke Sales" placement="top">
                  <base-button
                    size="sm"
                    type="success"
                    @click="handleAssign($index, row)"
                  >
                    <i class="text-white ni ni-curved-next"></i>
                  </base-button>
                </el-tooltip>
                <el-tooltip
                  content="Integrasi Menjadi Company Katalis"
                  placement="top"
                >
                  <base-button
                    size="sm"
                    type="primary" 
                    v-if="row.idCompanyKatalis == null && superUserId == $store.state.user.user.userId"
                    @click="handleIntegrasi($index, row)"
                  >
                    <i class="text-white fa fa-sync"></i>
                  </base-button> </el-tooltip
                ><br />

                <!-- <nuxt-link
                  :to="{
                    name: 'crm-crm_customer-add',
                    params: { id: row.id_ },
                  }"
                > -->
                <el-tooltip content="Edit" placement="top">
                  <nuxt-link :to="`/crm/crm_customer/add?id=` + row.id_">
                    <base-button size="sm" type="warning">
                      <i class="text-white ni ni-ruler-pencil"></i>
                    </base-button> </nuxt-link></el-tooltip
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
                  class="page-link"
                  @click="changePage(item)"
                  v-if="Math.abs(item - paging.page) <= 2"
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

    <modal :show.sync="modal.pipeline" size="sm" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-transparent pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <!-- <template slot="header">Tambah Pipeline</template> -->

        <template>
          <form role="form">
            <div><center>Pilih Pipeline</center></div>
            <br />
            <base-input>
              <el-select
                v-model="pipeline.idPipeline_"
                filterable
                placeholder="Pilih Pipeline"
              >
                <el-option
                  v-for="option in pipelineOptions"
                  :key="option.id_"
                  :label="option.title"
                  :value="option.id_"
                ></el-option>
              </el-select>
            </base-input>

            <div class="text-center">
              <base-button type="primary" class="my-2" @click="addPipelines()"
                >Simpan</base-button
              >
              <base-button type="warning" class="my-2" @click="closePipelines()"
                >Batal</base-button
              >
            </div>
          </form>
        </template>
      </card>
    </modal>

    <modal :show.sync="modal.assign" size="sm" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-transparent pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <!-- <template slot="header">Tambah Pipeline</template> -->

        <template>
          <form role="form">
            <div><center>Pilih Sales</center></div>
            <br />
            <base-input>
              <el-select
                v-model="assign.salesId"
                filterable
                placeholder="Pilih Sales"
              >
                <el-option
                  v-for="option in salesOptions"
                  :key="option.accountId"
                  :label="option.name"
                  :value="option.accountId"
                ></el-option>
              </el-select>
            </base-input>

            <div class="text-center">
              <base-button type="primary" class="my-2" @click="addAssign()"
                >Simpan</base-button
              >
              <base-button
                type="warning"
                class="my-2"
                @click="modal.assign = false"
                >Batal</base-button
              >
            </div>
          </form>
        </template>
      </card>
    </modal>
    <modal :show.sync="modal.integrasi" size="sm" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-transparent pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <!-- <template slot="header">Tambah Pipeline</template> -->

        <template>
          <form role="form">
            <div><center>Integrasi Customer</center></div>
            <br />
            - Pastikan di Katalis belum ada Nama Company yang sama dengan Nama
            Pelanggan <br />
            - Pastikan Data Customer sudah di isi semua

            <div class="text-center">
              <base-input
                name="initial"
                placeholder="Initial Company"
                success-message="Looks good!"
                v-model="integrasi.initials"
                rules="required"
              ></base-input>
              <base-button
                type="primary"
                :disabled="isDisabledButtonIntegrasi"
                class="my-2"
                @click="integrasiCustomer()"
                >Integrasi Customer ke Company Katalis</base-button
              >
              <br />
              <br />
              <base-button
                type="warning"
                class="my-2"
                @click="modal.integrasi = false"
                >Batal</base-button
              >
            </div>
          </form>
        </template>
      </card>
    </modal>
  </div>
</template>

<script>
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import swal from "sweetalert2";
import { Modal, BaseAlert } from "@/components/argon-core";
export default {
  components: {
    // BasePagination,
    RouteBreadCrumb,
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      superUserId: process.env.superUserId,
      isDisabledButtonIntegrasi: false,
      getComboPipeline: [],
      salesOptions: [],
      Modal,
      BaseAlert,
      modal: {
        pipeline: false,
        assign: false,
        integrasi: false,
      },
      pipelineOptions: [],
      pipeline: {
        idPipeline_: "",
        idPelanggan_: "",
        idProcess_: "",
      },
      assign: {
        salesId: "",
        customerId: "",
      },
      tableColumns: [
        {
          prop: "perusahaanName",
          label: "Nama Perusahaan",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "name",
          label: "Nama PIC",
          minWidth: 100,
          sortable: true,
        },
        // {
        //   prop: "address",
        //   label: "Alamat",
        //   minWidth: 120,
        //   sortable: true
        // },
        {
          prop: "phone",
          label: "No Hp PIC",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "email",
          label: "Email PIC",
          minWidth: 100,
          sortable: true,
        },
        // {
        //   prop: "namaImplementator",
        //   label: "Implementator",
        //   minWidth: 130,
        //   sortable: true,
        // },
      ],
      tableData: [],
      name: "",
      perusahaanName: "",
      namaImplementator: "",
      phone: "",
      email: "",
      searchpipeline: "",
      integrasi: {
        customerId: "",
        initials: ""
      },
      url: "/main_b/pelanggan/get_pelanggan",
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
    // this.getPipelines();

    this.$axios.$get("main_b/pipeline/get_combo_pipeline").then((response) => {
      this.getComboPipeline = response;
      console.log(response);
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
    getName(implementators) {
      if (implementators) {
        if (implementators.length > 0) {
          var names = [];
          implementators.map(function (impl) {
            names.push(impl.name);
          });
          return names.join(",");
        } else {
          return "";
        }
      }

      // return implementators.map((x) => x.name).join(",");
    },
    getDatas(size, page) {
      // search column
      let search = [];
      if (this.name) {
        search.push({ field: "name", key: this.name });
      } else if (this.namaImplementator) {
        search.push({
          field: "namaImplementator",
          key: this.namaImplementator,
        });
      } else if (this.phone) {
        search.push({ field: "phone", key: this.phone });
      } else if (this.email) {
        search.push({ field: "email", key: this.email });
      } else if (this.perusahaanName) {
        search.push({ field: "perusahaanName", key: this.perusahaanName });
      }

      // search Pipeline
      let tagSearch = [];
      if (this.searchpipeline.length > 0) {
        tagSearch.push({ field: "pipeline", key: [this.searchpipeline] });
      }

      this.$axios
        // .$post(this.url, { size: size, page: page })
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
    getPipelines() {
      this.$axios
        .$post("/main_b/pipeline/get_pipeline", { size: 1000, page: 0 })
        .then((response) => {
          this.pipelineOptions = response.content;
        });
    },
    getComboUserSales() {
      this.$axios.$get("/main_a/user/get_user_combo_sales").then((response) => {
        this.salesOptions = response;
      });
    },

    addPipelines() {
      this.$axios
        .$put(
          "/main_b/pelanggan/add_pipeline_to_pelanggan/" +
            this.pipeline.idPelanggan_ +
            "/" +
            this.pipeline.idPipeline_
        )
        .then((response) => {
          swal
            .fire({
              title: `Berhasil`,
              text: "Pipeline Telah Berhasil disimpan",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success",
            })
            .then((result) => {
              this.modal.pipeline = 0;
              // this.modal.pipeline = close();
              this.pipeline.idPelanggan_ = "";
              this.pipeline.idPipeline_ = "";
            });
          this.getDatas(this.paging.size, this.paging.page);
        })
        .catch((e) => {});
    },

    addAssign() {
      this.$axios
        .$put(
          "/main_b/pelanggan/add_sales_to_pelanggan/" +
            this.assign.customerId +
            "/" +
            this.assign.salesId
        )
        .then((response) => {
          swal
            .fire({
              title: `Berhasil`,
              text: "Data Berhasil Di rubah",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success",
            })
            .then((result) => {
              this.modal.assign = 0;
              // this.modal.pipeline = close();
              this.assign.customerId = "";
              this.assign.salesId = "";
            });
          this.getDatas(this.paging.size, this.paging.page);
        })
        .catch((e) => {});
    },
    async integrasiCustomer() {
      this.isDisabledButtonIntegrasi = true;
      console.log(this.integrasi);
      console.log(this.integrasi.initials);
      if (this.integrasi.initials == "" || this.integrasi.initials == undefined) {
        alert("Inisial Company tidak boleh kosong");
        this.isDisabledButtonIntegrasi = false;
        return;
      }
      await this.$axios
        .get(
          `main_b/pelanggan/integrasi_katalis/` +
            this.integrasi.customerId +
            `/` +
            this.integrasi.initials
        )
        .then((response) => {
          swal.fire({
            title: `Berhasil`,
            text: "Customer berhasil di integrasi dengan Company Katalis",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            type: "success",
          });
          this.getDatas(this.paging.size, this.paging.page);
          this.modal.integrasi = false;
          this.isDisabledButtonIntegrasi = false;
          this.integrasi.initials = "";
        })
        .catch((error) => {
          swal.fire({
            title: `Gagal`,
            text:
              "Customer gagal di integrasi dengan Company Katalis || " +
              error.response.data.detail,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-danger",
            type: "danger",
          });
          this.isDisabledButtonIntegrasi = false;
          this.integrasi.initials = "";
        });
    },
    handleRemovePipeline(item2, row) {
      swal
        .fire({
          title: "Apakah Anda Yakin ?",
          text: `Menghapus Pipeline ${item2.title} ?`,
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
            this.removePipelines(item2, row);
          }
        });
    },

    removePipelines(item2, row) {
      this.$axios
        .$put(
          `/main_b/pelanggan/remove_pipeline_from_pelanggan/` +
            row.id_ +
            "/" +
            item2.idProcess
        )
        .then((user) => {
          swal.fire({
            title: "Terhapus",
            text: `Pipeline ${item2.title} Telah Terhapus`,
            type: "success",
            confirmButtonClass: "btn btn-success btn-fill",
            buttonsStyling: false,
          });
          this.getDatas(this.paging.size, this.paging.page);
        })
        .catch((error) => {
          swal.fire({
            title: "Gagal Terhapus!",
            text: `Gagal Menghapus Pipeline ${item2.title}`,
            type: "failed",
            confirmButtonClass: "btn btn-danger btn-fill",
            buttonsStyling: false,
          });
        });
    },
    closePipelines() {
      this.modal.pipeline = 0;
    },
    handleAddPipeline(index, row) {
      // console.log(row);
      this.getPipelines();
      this.pipeline.idPelanggan_ = row.id_;
      this.modal.pipeline = true;
    },
    handleAssign(index, row) {
      // console.log(row);
      this.getComboUserSales();
      this.assign.customerId = row.id_;
      this.modal.assign = true;
    },
    handleIntegrasi(index, row) {
      // console.log(row);
      // this.getComboUserSales();
      this.integrasi.customerId = row.id_;
      this.integrasi.initials = row.initials;
      this.modal.integrasi = true;
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
        .$delete("/main_b/pelanggan/pelanggan/" + row.id_)
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
  },
};
</script>
