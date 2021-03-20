<template>
    <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Proses Pipeline Pelanggan Perusahaan</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <button @click="handleAddPipeline()" class="btn btn-neutral btn-sm"
            >Tambah Data</button
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
            <h3 class="mb-0">Data Proses Pipeline Pelanggan Perusahaan</h3>
            <p class="text-sm mb-0">Manajemen Data Customer</p>
          </template>

          <el-table
            class="mt--3"
            :data="tableData"
            row-key="id"
            header-row-class-name="thead-light"
          >
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"               
              v-bind="column"
            ></el-table-column>
            <!-- Tanggal -->
            <el-table-column min-width="140px" label="Tanggal Daftar">
              <div slot-scope="{ $index, row }">
                {{ row.startDate | moment("DD MMMM YYYY h:mm:ss a") }}
              </div>
            </el-table-column>

            <el-table-column min-width="140px" label="Status Selesai">
              <div slot-scope="{ $index, row }">
                {{ row.isFinished == true ? "Selesai" : "Belum Selesai" }}
              </div>
            </el-table-column>

            <el-table-column min-width="140px" label="Tanggal Selesai">
              <div slot-scope="{ $index, row }">
                {{ row.finishDate | moment("DD MMMM YYYY h:mm:ss a") }}
              </div>
            </el-table-column>

            <!-- action data -->

            <el-table-column  align="right" label="Actions">
              <div slot-scope="{ $index, row }" class="d-flex">        
                  <nuxt-link
                      :to="{
                        name: 'crm-crm_pipeline-pipeline',
                        params: { pipelineTemplateId: row.pipelineTemplateId },
                      }"
                      class="btn btn-primary btn-sm"
                    >
                    <i class="text-white ni ni-bullet-list-67"></i>
                      Detail
                    </nuxt-link>        

                <el-tooltip content="Hapus" placement="top">

                  <base-button
                    @click.native="handleDelete($index, row)"
                    size="sm"
                    type="danger"
                    class="remove btn-link"
                    title="Hapus"
                  >
                    <i class="text-white ni ni-fat-remove"></i> 
                  </base-button>
                </el-tooltip>
              </div>
            </el-table-column>
          </el-table>
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
                <a class="page-link" @click="changePage(item)" v-if="Math.abs(item - paging.page) <= 2">{{ item }}</a>
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
            <div>Pilih PIC / Implementator</div>            
            <base-input>
              <el-select
                v-model="pic"
                filterable
                placeholder="Pilih Pipeline" 
              >
                <el-option
                  v-for="option in implementatorOptions"
                  :key="option.id_"
                  :label="option.name"
                  :value="option"
                ></el-option>
              </el-select>
            </base-input>

            <div>Pilih Pipeline</div>            
            <base-input>
              <el-select
                v-model="pipeline_proc.pipelineId"
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

            <div>Keterangan</div>            
            <textarea class="form-control" v-model="pipeline_proc.keterangan"></textarea>

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
  </div>
</template>

<script>
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import { Table, TableColumn, Select, Option } from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import swal from "sweetalert2";
import { Modal, BaseAlert } from "@/components/argon-core";
import moment from "moment";

// moment.tz.setDefault("Asia/Jakarta");

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
      getComboPipeline: [],
      getComboImplementator: [],
      Modal,
      BaseAlert,
      modal: {
        pipeline: false,
      },
      pipelineOptions: [],
      implementatorOptions: [],
      pipeline: {
        idPipeline_: "",
        idPelanggan_: "",
        idProcess_: "",
      },
      tableColumns: [
        {
          prop: "title",
          label: "PIPELINE Title",
          minWidth: 100,
          sortable: true,
        },
        {
          prop: "picName",
          label: "Nama PIC",
          minWidth: 130,
          sortable: true,
        },
        // {
        //   prop: "phone",
        //   label: "No Hp",
        //   minWidth: 100,
        //   sortable: true,
        // },
        // {
        //   prop: "email",
        //   label: "Email",
        //   minWidth: 100,
        //   sortable: true,
        // },
      ],
      tableData: [],
      name: "",
      namaImplementator: "",
      phone: "",
      email: "",
      searchpipeline: "",
      url: "/main_b/pipeline_proc/get_all_pipeline_company/",
      paging: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        page: 0,
        perPageOptions: [5, 10, 25, 50],
      },
      pipeline_proc: {
        companyId: "",
        pipelineId: "",
        picAccountId: "",
        picName: "",
        keterangan: ""
      },
      pic: ""
    };
  },
  beforeMount() {
    this.getDatas(this.paging.size, this.paging.page);
    // this.getPipelines();

    this.$axios.$get("main_b/pipeline/get_combo_pipeline").then((response) => {
      this.getComboPipeline = response;
      console.log(response);
    });


    this.$axios.$get("main_a/user/get_user_combo_implementator").then((response) => {
      this.implementatorOptions = response;
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
      }

      // search Pipeline
      let tagSearch = [];
      if (this.searchpipeline.length > 0) {
        tagSearch.push({ field: "pipeline", key: this.searchpipeline });
      }

      this.$axios
        // .$post(this.url, { size: size, page: page })
        .$get(this.url + this.$store.state.user.company.id + "?size=" + size + "&page=" + page, {
          search,
          tagSearch,
        })
        .then((response) => {
          this.tableData = response;
          // this.tableInfo = response;
          // this.paging.totalElements = response.totalElements;
          // this.paging.totalPages = response.totalPages;
          // this.paging.page = page;
          // this.paging.size = size;
        }).catch((e) => {
          this.tableData = [];
        });
    },
    getPipelines() {
      this.$axios
        .$post("/main_b/pipeline/get_pipeline", { size: 1000, page: 0 })
        .then((response) => {
          this.pipelineOptions = response.content;
        });
    },

    addPipelines() {
      // console.log(this.pic);
      this.pipeline_proc.picAccountId = this.pic.accountId;
      this.pipeline_proc.picName = this.pic.name;
      this.pipeline_proc.companyId = this.$store.state.user.company.id;
      this.$axios
        .$post("/main_b/pipeline_proc/add_pipeline_to_company", this.pipeline_proc)
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
        .catch((e) => {
          swal
            .fire({
              title: `Gagal`,
              text: e,
              buttonsStyling: false,
              confirmButtonClass: "btn btn-danger",
              type: "danger",
            })
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
    handleAddPipeline() {
      // console.log(row);
      this.getPipelines();
      // this.pipeline.idPelanggan_ = row.id_;
      this.modal.pipeline = true;
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
      console.log(row);
      var companyId = this.$store.state.user.company.id;
      this.$axios
        .$delete("/main_b/pipeline_proc/remove_pipeline_from_company/"+companyId+"/" + row.pipelineTemplateId)
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
    changeDate(row, column){
      console.log(row);
      console.log(column);
      alert(column)
      return 123;
      // return moment(row.c).format("YYYY-MM-DD")
    }
  },
};
</script>
