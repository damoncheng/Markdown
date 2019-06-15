<template>
  <div class="product_list">
    <el-row>
        <el-button type="text"
           v-for="one_product of product_list" 
           :key="one_product.id"
           v-on:click="enter_module_preview(one_product.id)"
        >
            {{one_product.name}}
        </el-button>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'product_list',
  data () {
    return {
      product_list : [
          {name : '产品1', id : 1},
          {name : '产品2', id : 2},
          {name : '产品3', id : 3}, 
      ]
    }
  },
  methods: {
      
    enter_module_preview: function(product){
      
      this.$router.push({ name: 'module_preview', params: { product: product }})
      
    }
  }

}

</script>

<style>
</style>
