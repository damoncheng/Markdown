 <template>
  <div class="module_preview">
    <el-row>
        <el-button type="text"
           v-for="one_module of module_list" 
           :key="one_module.module_name"
           v-on:click="enter_module(one_module.module_name)"
        >
            {{one_module.name}}
        </el-button>
    </el-row>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'module_preview',
  data () {
    return {
      module_list : [
          {name : '申请模块', module_name : "module_apply"},
          {name : '管理员配置模块', module_name : "module_administrator"},
      ]
    }
  },
  methods: {
      
    enter_module: function(module_name){

      let product = this.$route.params.product
      
      this.$router.push({ name: module_name, params: { product: product }})
      
    }
  }
}
</script>

<style>
</style>
