<template>
  <div id="Modeler">
    <QflowModeler
        v-bind:qflow_bpmn_url="qflow_bpmn_url"
    >
    </QflowModeler>
  </div>
</template>

<script>

import QflowModeler from '@/components/QflowModeler'


var data = {
    qflow_bpmn_url: 'http://127.0.0.1:9000/html/test.bpmn'
}

export default {
  name: 'Modeler',
  
  data () {
      return data
  },
  

  components: {
      QflowModeler
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
