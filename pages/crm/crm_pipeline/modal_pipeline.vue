<template>
  <div>
    <div
      class="form-group row"
      v-for="(item2, index2) in item.form"
      :key="index2"
    >
      <label class="col-md-3 col-form-label form-control-label">{{
        item2.name
      }}</label>
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
            :rules="item2.isRequired == true ? 'required' : ''"
            v-model="item2.value"
          ></base-input>
          <!-- v-model="form.key[item.nomor + '-'+ index2]" -->
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {},
  },
};
</script>