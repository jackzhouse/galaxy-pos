<template
  ><div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Tabel</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
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
            <h3 class="mb-0">Tambah Tabel</h3>
          </template>
          
          <div>
            <slot>
              <table class="table table-hover-table-stripped thead-light" width="100%">
                <tr v-for="(item, k) in form" :key="k">
                    <td>
                        <input class="form-control" type="text" v-model="item.data[0]" />
                    </td> 
                    <td>
                        <input class="form-control" type="text" v-model="item.data[1]" />
                    </td> 
                    <td>
                        <input class="form-control" type="text" v-model="item.data[2]" />
                    </td> 
                    <td>
                        <input class="form-control" type="text" v-model="item.data[3]" />
                    </td>
                    <td scope="row" class="trashIconContainer">
                        <button type="button" class="btn btn-sm btn-primary btn-icon" @click="addNewColumn()">
                            <span class="btn-inner--icon"><i class="ni ni-fat-add"></i></span>
                        </button>
                        <!-- <i class="far fa-trash-alt" @click="deleteRow(k, item)"></i> -->
                        <el-tooltip content="Delete" placement="top">
                            <base-button
                                @click="deleteRow(k, item)"
                                size="sm"
                                type="danger"
                                class="remove btn-link"
                                >
                                <i class="text-white ni ni-fat-remove"></i>
                            </base-button>
                        </el-tooltip>
                    </td>
                </tr>
                <button type='button' class="btn btn-info" @click="addNewRow">
                    <i class="fas fa-plus-circle"></i>
                    Baris
                </button>
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
        form: [{
            data : [],
        }],
        tableData: [],
        url: "",
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
    addNewRow() {
      this.form.push({
        data : [],
        });
    }, 
    addNewColumn() {
      },
    deleteRow(index, item) {
        var idx = this.form.indexOf(item);
        console.log(idx, index);
        if (idx > -1) {
            this.form.splice(idx, 1);
        }
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
