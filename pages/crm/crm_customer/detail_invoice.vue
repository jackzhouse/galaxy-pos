<template>
  <div>
    <table class="table">
      <tr>
        <td width="150px">Nama Invoice</td>
        <td>
          {{ invoiceData.title }}
        </td>
      </tr>
      <tr>
        <td>Tanggal Jatuh Tempo</td>
        <td>
          {{ invoiceData.expiredDate }}
        </td>
      </tr>
      <tr>
        <td>Tags</td>
        <td>
          {{ invoiceData.tags }}
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <table class="table table-bordered">
            <tr>
              <td>No</td>
              <td>Item</td>
              <td>Harga</td>
              <td>Qty</td>
              <td>Subtotal</td>
            </tr>
            <tr v-for="(item, index) in invoiceData.detail" :key="index">
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
            </tr>
            <tr>
              <td colspan="4"></td>
              <td>
                {{ invoiceData.amount }}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button type="button" class="btn btn-sm btn-success">
            Proses Pembayaran
          </button>
          <button type="button" class="btn btn-sm btn-warning">
            History Pembayaran
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: {
    invoiceId: "",
  },
  data() {
    return {
      invoiceData: {},
    };
  },
  beforeMount() {
    this.getDetailInvoice();
  },
  methods: {
    async getDetailInvoice() {
      await this.$axios
        .$get(`main_b/invoice/invoice/${this.invoiceId}`)
        .then((response) => {
          this.invoiceData = response;
        });
    },
  },
};
</script>