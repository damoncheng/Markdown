<template>

<div id="BpmnStart">
  <div class="containers" ref="content">
    <div class="canvas" ref="canvas"></div>
  </div>
</div>

</template>
<script>

import Vue from 'vue'
import BpmnJS from 'bpmn-js'

export default {
  name: 'BpmnStart',
  data () {
    return {
      container: null,
      canvas: null,
      message: 'BpmnStart'
    }
  },

  mounted(){

    this.container = this.$refs.content
    const canvas = this.$refs.canvas
    // the diagram you are going to display

    // BpmnJS is the BPMN viewer instance
    var viewer = new BpmnJS({ container: canvas});

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {

            // import a BPMN 2.0 diagram
        viewer.importXML(xhr.response, function(err) {
          if (err) {
            // import failed :-(
            console.log("failed")
            console.log(err)
          } else {
            // we did well!
            console.log("success")
            var canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport');

          }
        });
          
      }
    };

    xhr.open('GET', 'http://127.0.0.1:8000/html/start.bpmn', true);
    xhr.send(null);

  }
}

</script>

<style lang="scss">

  .containers{
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }
  .canvas{
    width: 100%;
    height: 100%;
  }

</style>

