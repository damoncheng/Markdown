<template>

<div id="QflowViewer">

    <div id="QflowViewerTool">

        <button v-on:click="addViewer">add</button>    
        <button v-on:click="subViewer">sub</button>

    </div>

    <div id="QflowViewerContent">

        <div
        id="QflowViewerShow" 
        v-bind:style="{
            width: containerSize + '%', 
            height: containerSize + '%'
        }"
        >
        
            <div class="containers" ref="content">
                <div class="canvas" ref="canvas"></div>
            </div>
            

        </div>

    </div>

    <div style="clear:both"></div>

</div>

</template>
<script>

import Vue from 'vue'
import BpmnJS from 'bpmn-js'

var viewer = null;

export default {
  name: 'QflowViewer',
  props: ['qflow_viewer_bpmn'],
  data () {
    return {
      container: null,
      canvas: null,
      viewer: null,
      containerSize: 100,
    }
  },
  watch: {
     
  },
  methods: {
      addViewer: function (event) {
        
        this.containerSize += 10;
        
      },
      subViewer: function (event) {
        
        this.containerSize -= 10;

      }
  },
  mounted(){

    this.container = this.$refs.content
    const canvas = this.$refs.canvas
    // the diagram you are going to display

    // BpmnJS is the BPMN viewer instance
    viewer = new BpmnJS({

        container: canvas,

    });

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

            //refresh canvas
            var canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport');

            //register element click event
            var eventBus = viewer.get('eventBus');

            eventBus.on('element.click', function (e) {
                console.log('element.click', 'on', e.element.id)
            });

            eventBus.on('element.hover', function (e) {
                console.log(e.element.constructor.name)
            });

          }
        });
          
      }
    };

    xhr.open('GET', this.qflow_viewer_bpmn, true);
    xhr.send(null);

  },
  updated(){
      console.log(this.$el)
      console.log(this.$data)
      var canvas = viewer.get('canvas');
      canvas.zoom('fit-viewport');
  }
}

</script>

<style lang="scss">

 
  #QflowViewer {
    width: 100%;
    height: 100vh;
  }

  #QflowViewerContent{
    width: 95%;
    height: 95%;
    margin: 0 auto;
    overflow: scroll;
  }

  #QflowViewerShow {
    position: relative;
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

  g.djs-shape:hover {
      cursor: pointer;
  }

</style>

