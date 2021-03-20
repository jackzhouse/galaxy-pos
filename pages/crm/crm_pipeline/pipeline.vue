<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-1">
        <div class="col-lg-6 col-7">
          <!-- <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6> -->
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 mb-3 mt-3 text-right">
          <nuxt-link to="/crm/crm_pipeline" class="btn btn-neutral btn-sm"
            >Kembali</nuxt-link
          >
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-12">
          <card header-classes="bg-transparent">
            <h3 slot="header" class="mb-0">Timeline</h3>

            <time-line type="one-side">
              <time-line-item
                disabled="disabled"
                v-for="(item, index) in pipeline.process"
                :key="index"
                :badge-type="getBadgeType(item.status)"
                :badge-title="item.nomor.toString()"
                :background-color="getBackgroundType(item.status)"
              >
                <div class="pull-right" style="float: right">
                  <base-input>
                    <el-select
                      v-model="item.status"
                      :old-data="item.status"
                      filterable
                      :placeholder="`Select `"
                      @change="firstFormSubmit(item.nomor, item, 'status')"
                    >
                      <el-option
                        v-for="option in status"
                        :key="option.value"
                        :label="option.label"
                        :value="option.value"
                      ></el-option>
                    </el-select>
                  </base-input>
                </div>
                <h4 class="mt-0 mb-0">{{ item.name }}</h4>
                <p class="text-sm mt-1 mb-0">{{ item.note }}</p>
                <br />
                <div>
                  <template v-if="item.isMultiForm == true">
                    <button
                      type="button"
                      class="btn btn-info btn-sm"
                      @click="handleModalDetail(item)"
                    >
                      <i class="fa fa-plus"></i>
                      Tambah {{ item.name }}
                    </button>
                    <div class="mt-3">
                      <badge
                        v-for="(formDetail, indexFormDetail) in item.formValue"
                        :key="indexFormDetail"
                        rounded
                        type="default" 
                        size="lg"
                        class="mr-2 mb-2"
                        >{{ indexFormDetail+1 }}.  {{ formDetail.creatorName }} - {{ formDetail.createTime }}</badge
                      >&nbsp;
                    </div>
                  </template>
                  <template v-else>
                    <collapse style="background: none !important">
                      <collapse-item
                        name="1"
                        style="background: none !important"
                      >
                        <h5 slot="title" class="mb-0">Form {{ item.name }}</h5>
                        <div>
                          <validation-observer ref="form">
                            <form
                              class="needs-validation"
                              @submit.prevent="
                                firstFormSubmit(item.nomor, item, 'form')
                              "
                            >
                              <div class="col-md-8">
                                <div
                                  class="form-group row"
                                  v-for="(item2, index2) in item.form"
                                  :key="index2"
                                >
                                  <label
                                    class="col-md-3 col-form-label form-control-label"
                                    >{{ item2.name }}</label
                                  >
                                  <div class="col-md-9">
                                    <template v-if="item2.tipe == 'choice'">
                                      <base-input>
                                        <el-select
                                          v-model="item2.value"
                                          filterable
                                          :placeholder="`Select ` + item2.name"
                                        >
                                          <el-option
                                            v-for="option in item2.choice"
                                            :key="option"
                                            :label="option"
                                            :value="option"
                                          ></el-option>
                                        </el-select>
                                      </base-input>
                                    </template>
                                    <template v-else>
                                      <base-input
                                        :type="item2.tipe"
                                        :name="item2.name"
                                        :placeholder="item2.name"
                                        success-message="Looks good!"
                                        :rules="
                                          item2.isRequired == true
                                            ? 'required'
                                            : ''
                                        "
                                        v-model="item2.value"
                                      ></base-input>
                                      <!-- v-model="form.key[item.nomor + '-'+ index2]" -->
                                    </template>
                                  </div>
                                </div>
                                <base-button type="primary" native-type="submit"
                                  >Save</base-button
                                >
                                <nuxt-link class="btn btn-warning" to="/company"
                                  >Cancel</nuxt-link
                                >
                              </div>
                            </form>
                          </validation-observer>
                        </div>
                      </collapse-item>
                    </collapse>
                  </template>
                </div>
                <div class="mt-3">
                  <badge rounded type="success"
                    >Planning Time : {{ item.planTime }}</badge
                  >&nbsp;
                  <!-- <badge rounded type="success">system</badge>&nbsp; -->
                  <!-- <badge rounded type="success">creative</badge> -->
                </div>
              </time-line-item>
            </time-line>
          </card>
        </div>
      </div>
    </div>

    <modal :show.sync="modalDetail" size="lg" body-classes="p-0">
      <card
        type="secondary"
        header-classes="bg-transparent pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <div>
          <validation-observer ref="form">
            <form
              class="needs-validation"
              @submit.prevent="firstFormSubmit(itemModal.nomor, itemModal, 'multi')"
            >
              <div class="col-md-12">
                <h3 slot="title" class="mb-0">{{ itemTitle }}</h3>
                <hr />
                <modal-pipeline :item="itemModal"></modal-pipeline>
                <hr />
                <base-button type="primary" size="mn" native-type="submit"
                  >Save</base-button
                >
                <button
                  type="button"
                  class="btn btn-mn btn-warning"
                  @click="modalDetail = false"
                >
                  Cancel
                </button>
              </div>
            </form>
          </validation-observer>
        </div>
      </card>
    </modal>
  </div>
</template>
<script>
import TimeLine from "@/components/argon-core/Timeline/TimeLine.vue";
import TimeLineItem from "@/components/argon-core/Timeline/TimeLineItem.vue";
import RouteBreadcrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import BaseHeader from "@/components/argon-core/BaseHeader";
import Badge from "@/components/argon-core/Badge";
import Collapse from "@/components/argon-core/Collapse/Collapse";
import CollapseItem from "@/components/argon-core/Collapse/CollapseItem";
import ModalPipeline from "@/pages/crm/crm_pipeline/modal_pipeline";
import { Select, Option } from "element-ui";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  components: {
    Badge,
    BaseHeader,
    TimeLine,
    TimeLineItem,
    RouteBreadcrumb,
    Collapse,
    CollapseItem,
    [Select.name]: Select,
    [Option.name]: Option,
    ModalPipeline,
  },
  data() {
    return {
      itemTitle: "",
      itemModal: {},
      modalDetail: false,
      pipeline: [],
      form: {
        key: [],
      },
      status: [
        {
          label: "None",
          value: "none",
        },
        {
          label: "Todo",
          value: "todo",
        },
        {
          label: "Doing",
          value: "doing",
        },
        {
          label: "Done",
          value: "done",
        },
      ],
    };
  },
  beforeMount() {
    this.getDatas();
  },
  methods: {
    async getDatas(){
      await this.$axios
      .$get(
        `main_b/pipeline_proc/get_pipeline_company/${this.$store.state.user.company.id}/${this.$route.params.pipelineTemplateId}`
      )
      .then((response) => {
        console.log(response);
        this.pipeline = response;
      });
    },
    handleModalDetail(item) {
      this.itemTitle = item.name;
      this.itemModal = item;
      this.modalDetail = true;
      console.log(this.modalDetail);
    },
    getBadgeType(status) {
      // console.log(status);
      if (status == "none") {
        return "primary";
      } else if (status == "todo") {
        return "info";
      } else if (status == "doing") {
        return "warning";
      } else if (status == "done") {
        return "success";
      } else {
        return "primary";
      }
    },
    getBackgroundType(status) {
      // console.log(status);
      if (status == "none") {
        return "#eaecfb";
      } else if (status == "todo") {
        return "#aaedf9";
      } else if (status == "doing") {
        return "#fee6e0";
      } else if (status == "done") {
        return "#b0eed3";
      } else {
        return "#eaecfb";
      }
    },
    firstFormSubmit(noProcess, process, type) {
      console.log(process);
      var statusBefore = "done";
      if (noProcess == 1) {
        statusBefore = "done";
      } else if (noProcess > 1) {
        var processBefore = noProcess - 2;
        statusBefore = this.pipeline.process[processBefore].status;
      }

      if (statusBefore == "done") {
        this.$axios
          .$put(
            `/main_b/pipeline_proc/update_pipeline_to_company/${this.$store.state.user.company.id}/${this.$route.params.pipelineTemplateId}/` +
              noProcess +`/`+type,
            process
          )
          .then((response) => {
            swal.fire({
              title: `Success`,
              text: "Changes has been saved successfully",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-success",
              type: "success",
            });
            this.getDatas();
          })
          .catch((e) => {
            swal.fire({
              title: `Gagal`,
              text: "Gagal merubah status",
              buttonsStyling: false,
              confirmButtonClass: "btn btn-danger",
              type: "danger",
            });
          });
      } else {
        swal.fire({
          title: `Perhatian`,
          text:
            "Harap selesaikan proses sebelumnya terlebih dahulu, sebelum mengubah proses yang lain!",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-info",
          type: "info",
        });
      }
    },
  },
};
</script>
<style scoped>
.accordion .card {
  background: none !important;
}
.accordion .card .card-header {
  padding: 0px !important;
  background: #000;
}
</style>
