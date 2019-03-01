<template>

<div id="QflowModeler">

    <div id="container" :class="container_class_object" ref="container">

        <div class="message error">
          <div class="note">
            <p>Ooops, we could not display the BPMN 2.0 diagram.</p>

            <div class="details">
              <span>cause of the problem</span>
              <pre></pre>
            </div>
          </div>
        </div>

        <div class="canvas" ref="canvas"></div>
          <div v-show="show_panel"
              class="properties-panel-parent" 
              id="js-properties-panel" 
              ref="panel"
          >
        </div>

    </div>

    <ul class="buttons">
        <li>
          <a 
            title="同步diagram文件到Server"
            :class="{active : sync_active}"
            v-on:click = "syncModeler()"
          >
             同步bpmn文件
          </a>
        </li>
        <li>
          <a id="js-download-diagram" 
             title="下载diagram文件"
             :class="{active : download_active}"
             :href = "download_xml_href"
             :download = "download_xml_name"
             
          >
             下载bpmn文件
          </a>
        </li>
        <li>
          <a id="js-download-svg"  
             title="下载svg图片"
             :class="{active : download_active}"
             :href = download_svg_href
             :download = download_svg_name
          >
             下载image
          </a>
        </li>
    </ul>

</div>

</template>
<script>

import {
  debounce
} from 'min-dash';

import Vue from 'vue'
import BpmnJS from 'bpmn-js'
import Modeler from 'bpmn-js/lib/Modeler';
import coreModule from 'bpmn-js/lib/core';
import bpmnPaletteModule from 'bpmn-js/lib/features/palette';
import modelingModule from 'bpmn-js/lib/features/modeling';
import OriginModule from 'diagram-js-origin';
import minimapModule from 'diagram-js-minimap';
import bpmnModule from 'bpmn-js/lib/features/rules';
import customModule from './custom';

//properties panel 相关
import propertiesPanelModule from 'bpmn-js-properties-panel';
//import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
//import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';

import propertiesProviderModule from './customPanel';
import qflowModdleDescriptor from './customDescriptors/qflow';
import {showPropertiesPanel} from './customPanel/Utils';

var is = require('bpmn-js/lib/util/ModelUtil').is;

export default {

  name: 'QflowModeler',
  props: ['qflow_bpmn_url'],
  data () {
    return {
      show_panel: false,
      modeler : null,
      container_class_object : {

        'with-diagram' : true,
        'with-error' : false

      },
      sync_active : false,
      download_active : false,
      download_xml_href : null,
      download_svg_href : null,
      download_xml_name : 'diagram.svg',
      download_svg_name : 'diagram.bpmn'
    }
  },
  methods: {

    preventBubble : function(e) {

      if (!this.download_active) {
          e.preventDefault();
          e.stopPropagation();
      }  

    },

    syncToServer : function(err, xml) {

      console.log(xml);

      this.sync_active = false;

    },

    syncModeler : function() {

      var component = this;

      if(this.sync_active){

        this.modeler.saveXML({ format: true }, function(err, xml) {

          component.syncToServer(err, xml);

        });

      }

    },

    saveSVG : function (done) {
      this.modeler.saveSVG(done);
    },

    saveDiagram : function (done) {

      this.modeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
      });

    },

    setEncoded : function (obj, name, data) {

      var encodedData = encodeURIComponent(data);

      if (data) {
        
        this.download_active = true;
        this.sync_active = true;
        this[obj.href] = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
        this[obj.name]= name;
        

      } else {
        
        this.download_active = false;
        this.sync_active = false;

      }

    },

    initModeler : function(event){

      var component = this;

      this.modeler = new Modeler({ 
        
          container: this.$refs.canvas,

          keyboard: {
            bindTo: document
          },

          propertiesPanel: {
            parent: this.$refs.panel
          },
        
          additionalModules: [

            OriginModule,
            minimapModule,
            propertiesPanelModule,
            propertiesProviderModule
            
            //require('./custom-context-pad')
          
          ],

          moddleExtensions: {
            qflow: qflowModdleDescriptor
          },

          modules: [].concat(
            Modeler.prototype._modules,
            [customModule] 
          )
          
        }  
      );

      this.modeler.on('propertiesPanel.changed', function(event) {

        var element = event.current.element;

        console.log("propertiesPanel.changed...", element);

        // the element was changed by the user
        if (showPropertiesPanel(element)) {
            component.show_panel = true;
        }
        else{
            component.show_panel = false;
        }

       });

      this.modeler.on('commandStack.changed', debounce(function() {

          component.saveSVG(function(err, svg) {
              component.setEncoded({href : "download_svg_href", name : "download_svg_name"}, 
              'diagram.svg', err ? null : svg);
          });

          component.saveDiagram(function(err, xml) {
              component.setEncoded({href : "download_xml_href", name : "download_xml_name"}, 
              'diagram.bpmn', err ? null : xml);
            });
          }, 500)

      );


    },

    loadXML : function(event){

      var xhr = new XMLHttpRequest();
      var modeler = this.modeler;

      xhr.onreadystatechange = function() {


        if (xhr.readyState === 4) {

          // import a BPMN 2.0 diagram
          modeler.importXML(xhr.response, function(err) {

            if (err) {

              // import failed :-(
              console.log("failed");
              console.log(err);

            } else {

              // we did well!
              console.log("success");

            
              modeler.on('commandStack.changed', function() {
                  // user modeled something or
                  // performed an undo/redo operation
                  console.log("#-----commandStack");

              });

              modeler.on('element.changed', function(event) {


              });

              modeler.on('element.click', function(event) {

                var element = event.element;

                console.log("element.click : ", element);
              

              });

            }
          
          });
              
        }

      }

      xhr.open('GET', this.qflow_bpmn_url, true);
      xhr.send(null);
      
    },



  },
  watch: {
     
  },
  mounted(){

    this.initModeler();
    this.loadXML();

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
    text-align: left;
  }
  
  #QflowModeler #container{
    position: absolute;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
  }

  #QflowModeler .canvas{
    width: 100%;
    height: 100%;
  }

  #QflowModeler #container > .message {

    text-align: center;
    display: table;

    font-size: 16px;
    color: #111;

  }

  #QflowModeler #container .error .details {

    max-width: 500px;
    font-size: 12px;
    margin: 20px auto;
    text-align: left;

  }

  #QflowModeler #container .error pre {
    border: solid 1px #CCC;
    background: #EEE;
    padding: 10px;
  }

  #QflowModeler #container:not(.with-error) .error,
  {
    display: none;
  }


  #QflowModeler #container .canvas,
  #QflowModeler #container.with-error .canvas {
    visibility: hidden;
  }

  #QflowModeler #container.with-diagram .canvas {
    visibility: visible;
  }

  #QflowModeler > .buttons {
    cursor : pointer;
  }

  a.bjs-powered-by{
    visibility: hidden;
  }

</style>

<style lang="less">

  @import 'customStyle/panel';

</style>

