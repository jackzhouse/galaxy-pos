<template>
  <div>
    <!-- Header -->
    <!-- <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9"> -->
    <div class="header bg-gradient-info py-3 py-lg-5">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Creating a Company Account</h1>
              <p class="text-lead text-white">Create new account for your company.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary border-0">
           
            <div class="card-body px-lg-5 py-lg-5">
              
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <form role="form" @submit.prevent="handleSubmit(onSubmit)"> -->

                <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="registerCompanySubmit">

                  <input type="hidden" name="companyId" v-model="form.companyId">

                  <input type="hidden" name="crmPipeline" v-model="form.crmPipeline">

                  <input type="hidden" name="solution" v-model="form.solution">

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-box-2"
                              placeholder="Company Name"
                              name="companyRegister"
                              :rules="{required: true}"
                              v-model="form.companyRegister">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-align-left-2"
                              placeholder="Company Address"
                              name="address"
                              :rules="{required: true}"
                              v-model="form.address">
                  </base-input>
                  
                   <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-circle-08"
                              placeholder="PIC Name"
                              name="name"
                              :rules="{required: true}"
                              v-model="form.name">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-mobile-button"
                              placeholder="PIC Phone"
                              name="phone"
                              :rules="{required: true}"
                              v-model="form.phone">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              prepend-icon="ni ni-email-83"
                              placeholder="PIC Email"
                              name="email"
                              :rules="{required: true, email: true}"
                              v-model="form.email">
                  </base-input>
                  
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary mt-4">Create account</button>
                  </div>
                </form>
              </validation-observer>
            </div>
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
  layout: "AuthLayout",
  name: "registerCompany",
  data() {
    return {
      form: {
        // companyCode: "0001",
        companyId: "5f647d690ef6417438035ae5",
        crmPipeline: "IMPLEMENTASI KATALIS",
        solution: "CRM",
        // hardcode companyId, solution & crmPipeline
        companyRegister: "",
        address: "",
        phone: "",
        name: "",
        email: ""
      },
      doSubmit: true
    };
  },
  beforeMount() {
      window.addEventListener("keypress", (e) => {
        if (e.keyCode == 13) {
          this.doSubmit == false;
          e.preventDefault();
          return false;
        }
      })
  },
  methods: {
    async registerCompanySubmit() {
      if(this.doSubmit){
          this.$refs.form.validate().then((success) => {
            if (!success) {
              return; 
            }

            this.$axios
            .$post(`main_a/user/user_self_register`, this.form)
              .then((response) => {
                // confirm sweat alert
                swal.fire({
                  title: `Thank you for registration.`,
                  text: "Please check your email address and verify to complete setting up your account.",
                  buttonsStyling: false,
                  confirmButtonClass: "btn btn-success",
                  type: "success",
                });
                this.$router.push("/register/temp_validate");
              })
              .catch((e) => {});
          });
      }
    },
  },
};
</script>
