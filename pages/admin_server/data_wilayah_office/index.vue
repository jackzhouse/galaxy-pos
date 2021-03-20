<template
  ><div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Wilayah</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <!-- <div class="col-lg-6 col-5 text-right">
          <nuxt-link
            to="/admin_server/data_wilayah_office/form"
            class="btn btn-neutral btn-sm"
            >Tambah</nuxt-link
          >
        </div> -->
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
            <h3 class="mb-0">Data Wilayah</h3>
          </template>
          <div
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap mt--3 mb-2"
          >
            <!-- <el-select
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
            </el-select> -->
          </div>
          
          <div>
            <slot>
              <!-- <table class="table table-hover-table-stripped thead-light" width="100%">
                <thead>
                  <tr style="background-color: #f6f9fc">
                    <th>Id</th>
                    <th>Provinsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in provinsiOptions" :key="index">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                  </tr>
                </tbody>
              </table> -->

             <table class="table table-hover-table-stripped thead-light" width="100%">
                <thead>
                  <tr style="background-color: #f6f9fc" align="center">
                    <th>Provinsi</th>
                    <th>Kabupaten</th>
                    <th>Kecamatan</th>
                    <th>Kelurahan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                        <base-input>
                        <el-select v-model="form.provinsi" filterable placeholder="Pilih Provinsi" @change="getKabupaten">
                          <el-option
                            v-for="option in provinsiOptions"
                            :key="option.id"
                            :label="option.name"
                            :value="option.id"
                          ></el-option>
                        </el-select>
                      </base-input>
                    </td>

                    <td>
                      <base-input>
                        <el-select v-model="form.kabupaten" filterable placeholder="Pilih Kabupaten" @change="getKecamatan">
                              <el-option
                                v-for="option in kabupatenOptions"
                                :key="option.id"
                                :label="option.name"
                                :value="option.id"
                              ></el-option>
                          </el-select>
                      </base-input>
                    </td>

                    <td>
                      <base-input>
                      <el-select v-model="form.kecamatan" filterable placeholder="Pilih Kecamatan" @change="getKelurahan">
                          <el-option
                            v-for="option in kecamatanOptions"
                            :key="option.id"
                            :label="option.name"
                            :value="option.id"
                          ></el-option>
                        </el-select>
                      </base-input>
                    </td>

                    <td>
                      <base-input>
                        <el-select v-model="form.kelurahan" filterable placeholder="Pilih Kelurahan">
                          <el-option
                            v-for="option in kelurahanOptions"
                            :key="option.id"
                            :label="option.name"
                            :value="option.id"
                          ></el-option>
                        </el-select>
                      </base-input>
                    </td>

                  </tr>
                </tbody>
              </table>
              
              </slot>
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
      provinsiOptions: [],
      kabupatenOptions: [],
      kecamatanOptions: [],
      kelurahanOptions: [],

      form: {
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: ""
      },
      
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
    this.getProvinsi();
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
     getProvinsi() {
        this.$axios
          .$get("https://api.katalis.info/wilayah/getAllProvinces")
          .then((response) => {
            console.log(response);
            this.provinsiOptions = response;
          });
      },

      getKabupaten() {
        this.$axios
          .$get("https://api.katalis.info/wilayah/getRegencies/"+this.form.provinsi)
          .then((response) => {
            console.log(response);
            this.kabupatenOptions = response;
          });
      },

      getKecamatan() {
        this.$axios
          .$get("https://api.katalis.info/wilayah/getDistricts/"+this.form.kabupaten)
          .then((response) => {
            console.log(response);
            this.kecamatanOptions = response;
          });
      },

      getKelurahan() {
        this.$axios
          .$get("https://api.katalis.info/wilayah/getVillages/"+this.form.kecamatan)
          .then((response) => {
            console.log(response);
            this.kelurahanOptions = response;
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
</style>
