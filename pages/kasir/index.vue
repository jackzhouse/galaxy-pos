<template>
  <div>
    <base-header class="pb-6"> </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-4">
          <card style="height: 260px">
            <div class="card-body m-0 p-0">
              <form>
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label"
                    >Tanggal</label
                  >
                  <input
                    class="form-control form-control-sm"
                    type="date"
                    v-model="data.date"
                    id="example-date-input"
                  />
                </div>
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label">Kasir</label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    placeholder="John Doe"
                    readonly
                    id="example-text-input"
                  />
                </div>
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label"
                    >Pelanggan</label
                  >
                  <select class="form-control form-control-sm">
                    <option>Umum</option>
                    <option>Member</option>
                  </select>
                </div>
              </form>
            </div>
          </card>
        </div>
        <div class="col-xl-4">
          <card style="height: 260px">
            <div class="card-body m-0 p-0">
              <div class="form-group">
                <label for="example-text-input" class="form-control-label">Barcode</label>
                <div class="input-group mb-3">
                  <input
                    ref="barcode"
                    v-model="data.barcode"
                    v-on:keyup.enter="addCart()"
                    type="text"
                    class="form-control"
                    aria-describedby="button-addon2"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="example-text-input" class="form-control-label">Qty</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="data.qty"
                  v-on:keyup.enter="addCart()"
                  id="example-text-input"
                />
              </div>
              <!-- <div class="form-group">
                <button type="button" class="btn btn-primary btn-sm">Add</button>
              </div> -->
            </div>
          </card>
        </div>

        <div class="col-xl-4">
          <card style="height: 260px">
            <div class="card-body m-0 p-0">
              <div class="card-header" style="text-align: right">Inv #12345678</div>
              <h1 class="display-1" style="text-align: right">
                {{ toCurrencyString(total) }}
              </h1>
            </div>
          </card>
        </div>

        <div class="col-xl-12">
          <card style="height: 240px; max-height: 240px; overflow: scroll">
            <div class="card-body m-0 p-0">
              <table class="table m-0">
                <thead class="thead-light">
                  <tr>
                    <th
                      style="
                        width: 10px;
                        padding-left: 1px !important;
                        padding-right: 0 !important;
                      "
                    ></th>
                    <th>Kode Barang</th>
                    <th>Nama Barang</th>
                    <th>Harga</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody v-for="(item, index) in carts" :key="index">
                  <tr>
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.kodeProduk }}</td>
                    <td>
                      <span class="name mb-0 text-sm">{{ item.namaBarang }}</span>
                    </td>
                    <td>{{ toCurrencyString(item.hargaSat) }}</td>
                    <td>{{ item.qty }}</td>
                    <td>
                      <dt>{{ toCurrencyString(item.jmlHarga) }}</dt>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row" style="overflow-y: scroll; max-height: 550px">
              <div class="col-md-2" v-for="(item, index) in products" :key="index">
                <div class="product" style="border-radius: 5px" @click="addCart(item)">
                  <div class="text-center text-bold mb-4 mt-0">
                    <h5 class="m-0">
                      {{ item.name }}
                    </h5>
                    <h4 class="m-0">
                      {{ toCurrencyString(item.price) }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </card>

          <!-- <div class="row p-3" style="float: right">
            <button
              class="btn btn-lg btn-danger"
              style="width: 150px"
              @click="cancelOrder"
            >
              Cancel Order
            </button>
            <button
              class="btn btn-lg btn-success"
              style="width: 150px"
              @click="holdOrder"
            >
              Hold Order
            </button>
          </div> -->
        </div>
        <div class="col-xl-4">
          <card style="height: 120px">
            <div class="card-body m-0 p-0">
              <form>
                <div class="form-group">
                  <label for="example-text-input" class="form-control-label"
                    >Sub Total</label
                  >
                  <input
                    class="form-control"
                    type="text"
                    placeholder=""
                    :value="toCurrencyString(total)"
                    readonly
                    id="example-text-input"
                  />
                </div>
              </form>
            </div>
          </card>
        </div>
        <div class="col-xl-4">
          <card style="height: 120px">
            <div class="card-body m-0 p-0">
              <div class="form-group">
                <label for="example-text-input" class="form-control-label"
                  >Discount</label
                >
                <input
                  class="form-control"
                  type="text"
                  id="example-text-input"
                  value="0"
                />
              </div>
            </div>
          </card>
        </div>

        <div class="col-xl-4">
          <card style="height: 120px">
            <div class="card-body m-0 p-0">
              <div class="form-group">
                <label for="example-text-input" class="form-control-label">Cash</label>
                <input
                  v-model="data.cash"
                  v-on:keyup.enter="addTransaction()"
                  class="form-control"
                  type="text"
                  value="0"
                  id="example-text-input"
                />
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Charts

import { Table, TableColumn, Select, Option } from "element-ui";
import Vue from "vue";
import swal from "sweetalert2";
export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      data: {
        barcode: "",
        date: new Date().toISOString().substr(0, 10),
        qty: 1,
        cash: "",
      },
      tempIdCart: "",
      orderId: "",
      tagsKategori: [],
      tagsWidth: "19%",
      products: [],
      carts: [],
      discount: 0,
      total: 0,
      kembalian: 0,
      // posId: "",
      cart: {
        kodeProduk: "",
        barcode: "",
        kodeKategori: "",
        kodeMerk: "",
        satuan: "",
        device: "",
        jasa: "",
        namaBarang: "",
        namaKategori: "",
        namaMerk: "",
        hargaRetail: 0,
        hargaGrosir: 0,
        akunCOA: [],
        qty: 0,
        hargaSat: 0,
        hpp: 0,
        jmlHarga: 0,
        ppn: 0,
        dpp: 0,
        ongkir: 0,
        discount: "",
      },
      amountCart: 0,
      search: {
        key: "",
      },
      searchAll: [],
      field: {
        field: "",
        key: "",
      },
      paging: {
        size: 10,
        totalElements: 0,
        totalPages: 0,
        page: 0,
        perPageOptions: [5, 10, 25, 50],
      },
      modal: {
        pay: false,
        hold: false,
      },
      posId: "",
    };
  },
  beforeMount() {},
  methods: {
    checkEnter(tes) {
      console.log("CHECKING ENTER");
      console.log(tes);
    },
    focusInput() {
      this.$refs.barcode.focus();
    },
    toCurrencyString(number) {
      return number.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      });
    },
    addTransaction() {
      this.kembalian = 0;
      this.kembalian = this.data.cash - this.total;
      var kembalianCur = this.toCurrencyString(parseInt(this.kembalian));
      swal
        .fire({
          title: "Uang Kembali :" + kembalianCur,
          text: "",
          type: "success",
          confirmButtonClass: "btn btn-success btn-fill",
          confirmButtonText: "Oke",
          buttonsStyling: false,
        })
        .then((result) => {});
      this.SendTransaction();
    },

    addCart() {
      if (this.data.barcode) {
        this.$axios
          .$get("pos/combobox/produk?key=" + this.data.barcode)
          // .$get(this.url + "?size=" + size + "&page=" + page, { search: [] })
          .then((response) => {
            this.cart.kodeProduk = response[0].kodeProduk;
            this.cart.barcode = response[0].kodeProduk;
            this.cart.kodeKategori = response[0].kodeKategori;
            this.cart.kodeMerk = response[0].kodeMerk;
            this.cart.satuan = response[0].satuan;
            this.cart.device = response[0].device;
            this.cart.jasa = response[0].jasa;
            this.cart.namaKategori = response[0].namaKategori;
            this.cart.namaMerk = response[0].namaMerk;
            this.cart.hargaRetail = response[0].hargaRetail;
            this.cart.hargaGrosir = response[0].hargaGrosir;
            this.cart.akunCOA = response[0].akunCOA;
            this.cart.hpp = response[0].hargaRetail;
            this.cart.jmlHarga = response[0].jmlHarga;
            this.cart.ppn = response[0].ppn;
            this.cart.dpp = response[0].dpp;
            this.cart.ongkir = response[0].ongkir;
            this.cart.namaBarang = response[0].namaBarang;
            this.cart.qty = this.data.qty;
            this.cart.hargaSat = parseInt(
              response[0].hargaRetail.toString().replace(".00000000", "")
            );
            var total = this.cart.hargaSat * this.data.qty;
            this.cart.jmlHarga = parseInt(total.toString().replace(".00000000", ""));

            this.carts.push(this.cart);
            // console.log(this.carts);
            this.getTotalCart(total);
          });
        this.cart = {};
        this.data.barcode = "";
      }
      // this.data.qty = 1;
    },
    SendTransaction() {
      this.$axios
        .$get("pos/combobox/coa?key=Kas Kasir")
        // .$get(this.url + "?size=" + size + "&page=" + page, { search: [] })
        .then((response) => {
          console.log(JSON.stringify(response));
          var data = {
            tgl: this.data.date,
            kodePartner: "NonMember",
            member: "N",
            cabID: "",
            ct: "kasir",
            jnsTrx: "J",
            total: this.total,
            uangBayar: this.data.cash,
            kembalian: this.kembalian,
            akunBayar: [
              {
                kodeAkun: response[0].kodeAkun,
                namaAkun: response[0].namaAkun,
                DK: "D",
                nilai: this.total,
              },
            ],
            detTrans: this.carts,
          };
          console.log(JSON.stringify(data));
          this.$axios.post("pos/trx", data).then((response) => {});
        });

      this.carts = [];
      this.total = 0;
      this.data.cash = 0;
    },
    getTotalCart(total) {
      this.total = total + this.total;
    },
  },

  mounted() {
    this.focusInput();
  },
};
</script>
<style>
.card-active {
  border: 2px solid #22c9ea;
  color: #22c9ea;
  font-weight: bold;
}
.product {
  border: 1px solid none;
  cursor: pointer;
}
.product:hover {
  border: 1px solid #22c9ea;
}

/* .product:hover >div {
  border: none;
} */
</style>
