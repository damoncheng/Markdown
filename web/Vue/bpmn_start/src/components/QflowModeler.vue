<template>

<div id="QflowModeler">
    <div class="containers" ref="content">
        <div class="canvas" ref="canvas"></div>
    </div>
</div>

</template>
<script>

import Vue from 'vue'
import BpmnJS from 'bpmn-js'
import Modeler from 'bpmn-js/lib/Modeler';
import OriginModule from 'diagram-js-origin';
import minimapModule from 'diagram-js-minimap';

var modeler = null;

export default {
  name: 'QflowModeler',
  props: ['qflow_modeler_bpmn'],
  data () {
    return {
      container: null,
      canvas: null,
      viewer: null,
    }
  },
  watch: {
     
  },
  mounted(){

    this.container = this.$refs.content;
    const canvas = this.$refs.canvas;

    modeler = new Modeler({ 
      
        container: canvas,
      
        additionalModules: [
          OriginModule,
          minimapModule
          //require('./custom-rules'),
          //require('./custom-context-pad')
        ]
      }  
    );

    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {

            // import a BPMN 2.0 diagram
        modeler.importXML(xhr.response, function(err) {
          if (err) {
            // import failed :-(
            console.log("failed")
            console.log(err)
          } else {

            // we did well!
            console.log("success")

            modeler.on('commandStack.changed', function() {
                // user modeled something or
                // performed an undo/redo operation
                console.log("#-----commandStack")

            });

            modeler.on('element.changed', function(event) {
              var element = event.element;

              // the element was changed by the user
              console.log("#-----element.changed")


            });

          }
        });
          
      }

    }

    xhr.open('GET', this.qflow_modeler_bpmn, true);
    xhr.send(null);

  },
  updated(){
      
  }
}

</script>

<style lang="scss">

  @import 'bpmn-js/dist/assets/diagram-js.css';
  @import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import 'diagram-js-minimap/assets/diagram-js-minimap.css';
 
  #QflowModeler {
    width: 100%;
    height: 100vh;
  }
  
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

  a.bjs-powered-by{
    visibility: hidden;
  }

</style>

