<template>
<div>
  <base-header class="pb-6">
    <div class="row align-items-center py-4">
      <div class="col-lg-6 col-7">
        <!-- <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6> -->
        <h6 class="h2 text-white d-inline-block mb-0">Pembayaran</h6>
        <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
          <route-breadcrumb />
        </nav>
      </div>
      <div class="col-lg-6 col-5 text-right">
        <!-- <base-button size="sm" type="neutral">New</base-button> -->
        <nuxt-link to="/kasir" class="btn btn-neutral btn-sm">Kembali</nuxt-link>
        <!-- <base-button size="sm" type="neutral">Filters</base-button> -->
      </div>
    </div>
  </base-header>

  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col">
        <div class="card-wrapper">
          <card>
            <h3 slot="header" class="mb-0">Pembayaran</h3>
            <div class="row">
              <div class="col-md-4">
                <table
                  class=" table table-hover-table-stripped thead-light"
                  width="100%"
                  >
                  <thead>
                    <tr class="text-center" style="background-color: #f6f9fc">
                      <th>Nama Barang</th>
                      <th>Qty</th>
                      <th>Harga</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="product in productOrder">
                      <td>
                        {{product.product.name}}
                      </td>
                      <td class="text-center">
                        {{product.jumlahOrder}}
                      </td>
                      <td class="text-center">
                        {{toCurrencyString (product.product.price)}}
                      </td>
                      <td class="text-right">
                        {{toCurrencyString (product.product.price * product.jumlahOrder)}}
                      </td>
                    </tr>
                    <tr class="display-4">
                      <td><b><h4>TOTAL ITEM = </h4></b> </td>
                      <td><b><h4>{{this.totalItem}}</h4></b></td>
                      <td><b><h4>TOTAL HARGA =</h4></b></td>
                      <td class="text-right"><b><h4>{{toCurrencyString (this.totalPrice)}}</h4></b></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-md-6">
                <validation-observer ref="form">
                  <form class="needs-validation" @submit.prevent="payButton">
                    <div class="col-md-8">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label form-control-label">Cara Bayar</label>
                        <div class="col-md-4">
                          <base-input>
                            <el-select v-model="form.paymentType" placeholder="Pilih Cara Bayar">
                              <el-option
                                v-for= "option in paymentOptions "
                                :key= "option.label"
                                :label= "option.label"
                                :value= "option.value"
                                ></el-option>
                            </el-select>
                          </base-input>
                        </div>
                      </div>
                    </div>

                    <div v-if="form.paymentType === 'cash'" class="col-md-8">
                      <div class="form-group row">
                        <label class="col-md-3 col-form-label form-control-label">Nominal Bayar</label>
                        <div class="col-md-6">
                          <base-input
                            v-model="form.paid"
                            nama="paid"
                            placeholder="Input Nominal Bayar "
                            >
                          </base-input>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label class="col-md-3 col-form-label form-control-label">Kembalian</label>
                        <div class="col-md-6">
                          <base-input
                            v-model="form.changes"
                            nama="paid"
                            placeholder="Masukkan Bayar Dulu"
                            >
                          </base-input>
                        </div>
                      </div>
                    </div>
                  </form>
                </validation-observer>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>


</div>
</template>
<script src="./bayar.js">
</script>
<style></style>
