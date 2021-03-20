<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Data Company</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>

        <div class="col-lg-6 col-5 text-right">
          <!-- <base-button size="sm" type="neutral">New</base-button> -->
          <nuxt-link
            to="/crm/crm_invoice"
            class="btn btn-neutral btn-sm"
            >Kembali</nuxt-link
          >
          <!-- <base-button size="sm" type="neutral">Filters</base-button> -->
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Tambah Perusahaan</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="firstSubmit">
                  <div class="col-md-12">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Customer ID</label
                      >
                      <div class="col-md-9">
                          <base-input>
                            <el-select
                              v-model="form.customerId"
                              filterable
                              placeholder="Pilih Customer"                              
                            >
                              <el-option
                                v-for="(option, index) in customerOptions"
                                :key="index"
                                :label="option.perusahaanName"
                                :value="option.id_"
                              ></el-option>
                            </el-select>
                          </base-input>
                      </div>
                    </div>

                    <div class="form-group row mt-2">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Nama Invoice</label
                      >
                      <div class="col-md-9">
                        <base-input
                          name="title"
                          placeholder="Nama Invoice"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.title"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row mt-2">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Tanggal Jatuh Tempo</label
                      >
                      <div class="col-md-9">
                        <base-input
                        type="date"
                          name="expiredDate"
                          placeholder="Tanggal Kadaluarsa"
                          success-message="Looks good!"
                          :rules="{ required: true }"
                          v-model="form.expiredDate"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row mt-2">
                      <label class="col-md-3 col-form-label form-control-label"
                        >Tags</label
                      >
                      <div class="col-md-9">
                        <tags-input
                          v-model="form.tags"
                          placeholder="Tambah Tags"
                        ></tags-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <table class="table table-bordered">
                      <tr>
                        <td width="40px">No</td>
                        <td>Item</td>
                        <td>Harga @</td>
                        <td width="120px">Qty</td>
                        <td>Subtotal</td>
                        <td width="50px"></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <base-input>
                            <el-select
                              v-model="formDetail.item"
                              filterable
                              placeholder="Pilih Item"                              
                            >
                              <el-option
                                v-for="(option, index) in itemOptions"
                                :key="index"
                                :label="option"
                                :value="option"
                              ></el-option>
                            </el-select>
                          </base-input>
                        </td>
                        <td>
                          <base-input
                            type="number"
                            name="price"
                            placeholder="Harga"
                            success-message="Looks good!"
                            @change="countSubtotal()"
                            :rules="{ required: true }"
                            v-model="formDetail.price"
                          ></base-input>
                        </td>
                        <td>
                          <base-input
                            type="number"
                            name="qty"
                            placeholder="Qty"
                            @change="countSubtotal()"
                            success-message="Looks good!"
                            :rules="{ required: true }"
                            v-model="formDetail.qty"
                          ></base-input>
                        </td>
                        <td>
                          <base-input
                          readonly
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            success-message="Looks good!"
                            :rules="{ required: true }"
                            v-model="formDetail.amount"
                          ></base-input>
                        </td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-mini btn-primary"
                            @click="addItem"
                          >
                            <i class="fa fa-plus"></i>
                          </button>
                        </td>
                      </tr>
                      <tr v-for="(item, index) in form.detail" :key="index">
                        <td>
                          {{ index + 1 }}
                        </td>
                        <td>
                          {{ item.item }}
                        </td>
                        <td>
                          {{ item.price }}
                        </td>
                        <td>
                          {{ item.qty }}
                        </td>
                        <td>
                          {{ item.amount }}
                        </td>
                        <td>

                          <button
                            type="button"
                            class="btn btn-mini btn-danger"
                            @click="deleteItem(index)"
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="4">Total</td>
                        <td>
                            {{ form.amount }}
                        </td>
                      </tr>
                    </table>
                  </div>
                  <div style="clear: both"></div>
                  <br />
                  <base-button
                    type="primary"
                    :disabled="disabledSubmitButton"
                    native-type="submit"
                    >Simpan</base-button
                  >
                  <nuxt-link
                    class="btn btn-warning"
                    to="/admin_server/company_office"
                    >Batal</nuxt-link
                  >
                </form>
              </validation-observer>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagsInput from "@/components/argon-core/Inputs/TagsInput";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";

export default {
  name: "companyForm",
  components: {
    TagsInput,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      disabledSubmitButton: false,
      customerOptions: [],
      itemOptions: [],

      validated: false,
      formDetail: {
        item: "",
        qty: 0,
        price: 0,
        amount: 0,
      },
      form: {
        customerId: "",
        title: "",
        expiredDate: "",
        tags: [],
        detail: [],
        amount: 0
      },
      doSubmit: true,
    };
  },
  beforeMount() {
    this.getCustomer();
    this.getItem();

    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
  },

  methods: {
    addItem(){
        if((this.formDetail.item != "") && (this.formDetail.price != 0) && (this.formDetail.qty != 0)){
            // console.log(this.formDetail);
            var detail = {
                item : this.formDetail.item,
                price : this.formDetail.price,
                qty : this.formDetail.qty,
                amount : this.formDetail.amount,
            }
            this.form.detail.push(detail);
            this.formDetail.item = "";
            this.formDetail.price = 0;
            this.formDetail.qty = 0;
            this.formDetail.amount = 0;
            this.setTotal()
        }
    },
    setTotal(){
        var total = 0
        this.form.detail.forEach((value, index) => {            
            // console.log(value);
            total += value.amount;
        });
        this.form.amount = total;
    },
    deleteItem(index){
        this.form.detail.splice(index);
    },
    countSubtotal(){
        var amount = this.formDetail.price * this.formDetail.qty;
        this.formDetail.amount = amount;
    },
    getCustomer() {
      this.$axios.$get("main_b/pelanggan/get_combo_pelanggan").then((response) => {
        console.log(response);
        this.customerOptions = response;
      });
    },
    getItem() {
      this.$axios.$get("main_b/invoice/getItem").then((response) => {
        console.log(response);
        this.itemOptions = response;
      });
    },

    firstSubmit() {
      this.disabledSubmitButton = true;
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }

          this.$axios
            .$post(`main_b/invoice/invoice`, this.form)
            .then((response) => {
              swal.fire({
                title: `Saved`,
                text: "Data Berhasil Di Simpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/crm/crm_invoice");
            })
            .catch((e) => {
              swal.fire({
                title: `Failed`,
                text: "Data Gagal Di Simpan",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-danger",
                type: "danger",
              });
              this.disabledSubmitButton = false;
            });
        });
      }
    },
  },
};
</script>
