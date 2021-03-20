<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{$route.name}}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb />
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card-wrapper">
            <card>
              <!-- Card header -->
              <h3 slot="header" class="mb-0">Create CRUD Module</h3>
              <!-- <validation-observer v-slot="{handleSubmit}" ref="formValidator"> -->
              <validation-observer ref="form">
                <form class="needs-validation" @submit.prevent="firstFormSubmit">
                    <div class="row">
                  <div class="col-md-6">
                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Module Name</label>
                      <div class="col-md-9">
                        <base-input
                          name="moduleName"
                          placeholder="Module Name"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.moduleName"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Url Get All Data</label>
                      <div class="col-md-9">
                        <base-input
                          name="moduleName"
                          placeholder="Module Name"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.urlGetAllData"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Url Get Data</label>
                      <div class="col-md-9">
                        <base-input
                          name="moduleName"
                          placeholder="Module Name"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.urlGetData"
                        ></base-input>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <!-- <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Page</label>
                      <div class="col-md-3">
                        <base-checkbox v-model="form.pageData" class="mb-3">Data</base-checkbox>
                      </div>
                      <div class="col-md-3">
                        <base-checkbox v-model="form.pageCreate" class="mb-3">Create  & Edit</base-checkbox>
                      </div>
                    </div><br> -->


                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Url Create Data</label>
                      <div class="col-md-9">
                        <base-input
                          name="moduleName"
                          placeholder="Module Name"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.urlPostData"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Url Update Data</label>
                      <div class="col-md-9">
                        <base-input
                          name="moduleName"
                          placeholder="Module Name"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.urlPutData"
                        ></base-input>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label class="col-md-3 col-form-label form-control-label">Url Delete Data</label>
                      <div class="col-md-9">
                        <base-input
                          name="urlDeleteData"
                          placeholder="Module Name"
                          success-message="Looks good!"
                          rules="required"
                          v-model="form.urlDeleteData"
                        ></base-input>
                      </div>
                    </div>

                  </div>
                  <div class="col-md-12">
                    <tabs
                      tabNavClasses="nav-fill flex-column flex-sm-row nav-wrapper"
                      tabContentClasses="card shadow"
                    >
                      <tab-pane id="home">
                        <span slot="title">
                          <i class="ni ni-cloud-upload-96"></i>
                          Data
                        </span>

                        <p class="card-body description">
                            <div class="col-md-3">
                                <base-checkbox v-model="form.rowNumber" class="mb-3">Row Number</base-checkbox>
                            </div>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Search</th>
                                        <th>Column Name</th>
                                        <th>Type</th>
                                        <th>Props</th>
                                        <th>Width</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input type="text" name="columnName" id="columnName" v-model="data.columnName" class="form-control">
                                        </td>
                                        <td>
                                            <!-- <input type="text" name="columnName" id="columnName" v-model="data.type" class="form-control"> -->
                                            <select name="type" id="type" class="form-control" v-model="data.type">
                                                <option value="string">String</option>
                                                <option value="number">Number</option>
                                                <option value="currency">Currency</option>
                                                <option value="date">Date</option>
                                                <option value="bool">Boolean True False</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" name="props" id="props" v-model="data.props" class="form-control">
                                        </td>
                                        <td>
                                            <input type="number" name="width" id="width" v-model="data.width" class="form-control">
                                        </td>
                                        <td>
                                            <button class="btn btn-danger btn-lg" type="button" @click="addDataSpec()">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in form.data" :key="index">
                                        <td></td>
                                        <td>{{item.columnName}}</td>
                                        <td>{{item.type}}</td>
                                        <td>{{item.props}}</td>
                                        <td>{{item.width}}</td>
                                        <td>
                                            <button class="btn btn-danger btn-sm" type="button" @click="deleteDataSpec(index)">
                                                <i class="fa fa-trash"></i>
                                            </button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>
                      </tab-pane>

                      <tab-pane id="profile">
                        <span slot="title">
                          <i class="ni ni-bell-55 mr-2"></i>
                          Create & Edit
                        </span>
                        <p class="card-body description">

                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Search</th>
                                        <th>Column Name</th>
                                        <th>Type</th>
                                        <th>Model</th>
                                        <th>Config</th>
                                        <th>Validation</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input type="text" name="columnName" id="columnName" v-model="create.columnName" class="form-control">
                                        </td>
                                        <td>
                                            <!-- <input type="text" name="columnName" id="columnName" v-model="data.type" class="form-control"> -->
                                            <select name="type" id="type" class="form-control" v-model="create.type">
                                                <option value="text">Text</option>
                                                <option value="number">Number</option>  
                                                <option value="dropdown">Dropdown</option>                                               
                                                <option value="date">Date</option>
                                                <option value="time">Time</option>
                                                <option value="textarea">Textarea</option>
                                                <option value="checkbox">Checkbox</option>
                                                <option value="radio">Radio</option>
                                                <option value="tags">Tags</option>
                                                <option value="multiple">Select Multiple</option>
                                                <option value="file">File</option>
                                                <option value="bool">Boolean True False</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" name="props" id="props" v-model="create.props" class="form-control">
                                        </td>
                                        <td>
                                            <input type="text" name="config" id="config" v-model="create.config" class="form-control">
                                        </td>
                                        <td>
                                            <input type="text" name="validation" id="validation" v-model="create.validation" class="form-control">
                                        </td>
                                        <td> 
                                            <button class="btn btn-danger btn-lg" type="button" @click="addCreateSpec()">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in form.create" :key="index">
                                        <td></td>
                                        <td>{{item.columnName}}</td>
                                        <td>{{item.type}}</td>
                                        <td>{{item.props}}</td>
                                        <td>{{item.config}}</td>
                                        <td>{{item.validation}}</td>
                                        <td>
                                            <button class="btn btn-danger btn-sm" type="button" @click="deleteCreateSpec(index)">
                                                <i class="fa fa-trash"></i>
                                            </button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </p>
                      </tab-pane>

                    </tabs>
                  </div>
                  <base-button type="primary" native-type="submit" v-on:click="firstFormSubmit">Save</base-button>
                  <nuxt-link class="btn btn-warning" to="/company">Cancel</nuxt-link>
                  </div>
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
import { Tabs, TabPane } from "@/components/argon-core";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { Select, Option } from "element-ui";

export default {
  name: "CompanyForm",
  components: {
    TagsInput,
    Tabs,
    TabPane,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      validated: false,
      form: {
        moduleName: "",
        pageData: true,
        pageCreate: true,
        pageEdit: true,
        rowNumber: true,
        data: [],
        create: [],
        urlGetAllData: "",
        urlGetData: "",
        urlPostData: "",
        urlPutData: "",
        urlDeleteData: ""
      },
      data:{
          columnName: "",
          type: "",
          width: "",
          props: ""
      },
      create:{
          columnName: "",
          type: "",
          props: "",
          validation: [],
          config: ""
      },

      doSubmit: true,
    };
  },
  beforeMount() {
    window.addEventListener("keypress", (e) => {
      if (e.keyCode == 13) {
        this.doSubmit == false;
        e.preventDefault();
        return false;
      }
    });
  },
  methods: {
      async addDataSpec(){
          if(this.data.columnName == "" ||
             this.data.type == "" ||
             this.data.props == "" 
            ){
                alert("Data belum lengkap")
                return;
            }
          const newData = {
              columnName : this.data.columnName,
              type : this.data.type,
              width : this.data.width,
              props : this.data.props,
          }          
          this.form.data.push(newData);
          this.data.columnName = "";
          this.data.type = "";
          this.data.width = "";
          this.data.props = "";
      },
      async deleteDataSpec(index){
          this.form.data.splice(index, 1);
      },
      async addCreateSpec(){
          if(this.create.columnName == "" ||
             this.create.type == "" ||
             this.create.props == "" 
            ){
                alert("Data belum lengkap")
                return;
            }
          const newData = {
              columnName : this.create.columnName,
              type : this.create.type,
              props : this.create.props,
              validation: this.create.validation,
              config: this.create.config
          }          
          this.form.create.push(newData);
          this.create.columnName = "";
          this.create.type = "";
          this.create.props = "";
          this.create.validation = "";
          this.create.config = "";
      },
      async deleteCreateSpec(index){
          this.form.create.splice(index, 1);
      },
      
    async firstFormSubmit() {
      if (this.doSubmit) {
        this.$refs.form.validate().then((success) => {
          if (!success) {
            return;
          }

          this.$axios
            .$post("generator", this.form)
            .then((response) => {
              swal.fire({
                title: `Success`,
                text: "A few words about this sweet alert ...",
                buttonsStyling: false,
                confirmButtonClass: "btn btn-success",
                type: "success",
              });
              this.$router.push("/generator");
            })
            .catch((e) => {});
        });
      }
    },
  },
};
</script>
