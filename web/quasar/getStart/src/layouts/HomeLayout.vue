<template>
    <el-container>
        <el-header>
            <el-menu ref="home_menu" mode="horizontal" @select="handleSelect" router>
                <el-menu-item index="/">首页</el-menu-item>
                <el-menu-item :index="module_preview" v-if="show_module_preview">功能模块</el-menu-item>
                <el-submenu :index="`${module_path}`" v-if="show_module">
                    <template slot="title">{{module_route_dict[active_module_path]}}</template>
                    <el-menu-item 
                        v-for="(one_module_name,one_module) in module_route_dict" 
                        v-show="one_module != module_route_path"
                        :key="one_module"
                        :index="`${module_preview}/${one_module}`"
                    >
                        {{one_module_name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      product : '',
      module_prefix : 'product',
      module_preview : '/',
      module_path : '',
      module_route_path : '',
      module_route_dict : {
          'apply' : '流程申请',
          'config' : '管理员配置模块'
      }
    }
  },
  mounted: function(){

    this.update_route();

  },
  methods: {

    update_route: function(){

        if("product" in this.$route.params){

            this.product = this.$route.params.product

            this.module_preview = `/${this.module_prefix}/${this.product}`

            let path_list = this.$route.path.split('/')

            if(path_list.length > 3){

                path_list = path_list.slice(0, 4)
           
                this.module_path = path_list.join('/')
                this.module_route_path = path_list[3]

            }else{
                this.module_path = ''
                this.module_route_path  = ''
            }
            
        }else{
            
            this.product = ''
            this.module_preview = '/'
            this.module_path = ''
            this.module_route_path= ''

        }

        if(this.show_module){
            this.$refs.home_menu.activeIndex = this.module_path
        }else if(this.show_module_preview){
            this.$refs.home_menu.activeIndex = this.module_preview
        }else{
            this.$refs.home_menu.activeIndex = "/"
        }

    },
    handleSelect: function(key, keyPath) {
      console.log("$route : ", this.$route.path)
      console.log(key, keyPath);
    },

  },
  computed: {

    show_module_preview : function(){

        return this.module_preview != '/'

    },

    show_module : function(){
        return this.module_path.length > 0
    },

    active_module_path : function(){
        return (this.module_route_path in this.module_route_dict) ? this.module_route_path : 'apply';
    }

  },
  watch: {
    
    $route (to, from) {
        this.update_route();
        console.log("this.$router : ", this.$router);
        console.log("this.product : ", this.product);
        console.log("this.module_preview : ", this.module_preview);
        console.log("this.module_path : ", this.module_path);
    }

  }

}
</script>

<style>
</style>
