<template>
  <div id="Bpmn">
    <QflowViewer
        v-bind:qflow_viewer_bpmn="qflow_viewer_bpmn"
    >
    </QflowViewer>
  </div>
</template>

<script>

import QflowViewer from '@/components/QflowViewer'

var data = {
    qflow_viewer_bpmn: 'http://127.0.0.1:8000/html/test.bpmn'
}

export default {
  name: 'Bpmn',
  
  data () {
      return data
  },

  components: {
      QflowViewer
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