import {
  bootstrapModeler,
  inject
} from '../TestHelper';

import Moddle from 'moddle';

import {
  Reader,
  Writer
} from 'moddle-xml';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';

import BpmnPackage from './json/bpmn.json';


describe('bpmn properties', function() {


  var carsJSON = {

      "name": "Cars",
      "uri": "http://cars",
      "prefix": "my",
      "xml": {
        "tagAlias": "lowerCase",
        "typePrefix": "t"
      },
      "types": [
        {
          "name": "Base",
          "properties": [
            { "name": "id", "type": "String", "isAttr": true }
          ]
        },
        {
          "name": "Root",
          "superClass": [ "Base" ],
          "properties": [
            { "name": "cars", "type": "Car", "isMany": true }
          ]
        },
        {
          "name": "Car",
          "superClass": [ "Base" ],
          "properties": [
            { "name": "name", "type": "String", "isAttr": true, "default": "No Name" },
            { "name": "power", "type": "Integer", "isAttr": true },
            { "name": "similar", "type": "Car", "isMany": true, "isReference": true },
            { "name": "field", "type": "qflow:Field", "isMany": true},
          ]
        }
      ]

  };

  var qflow = {

    "name": "qflow",
    "uri": "http://qflow",
    "prefix": "qflow",
    "xml": {
        "tagAlias": "lowerCase",
    },
    "types": [
        {
          "name": "Base",
          "properties": [
            { "name": "id", "type": "String", "isAttr": true },
            { "name": "name", "type": "String", "isAttr": true },
            { "name": "link", "type": "String", "isAttr": true , "default" : ''},
            { "name": "description", "type": "String", "isAttr": true, "default" : ''},
            { "name": "submit_var_name", "type": "String", "isAttr": true, "default" : ''},
            { "name": "field_type", "type": "String", "isAttr": true, "default" : 'input'},
            { "name": "field_option", "type": "String", "isAttr": true, "default" : ''},
            { "name": "field_option_description", "type": "String", "isAttr": true, "default" : ''},
            { "name": "option_json", "type": "String", "isAttr": true, "default" : ''},
            { "name": "is_required", "type": "String", "isAttr": true, "default" : 'Y'},
            { "name": "is_on_task_top", "type": "String", "isAttr": true, "default" : 'N'},
            { "name": "default_value", "type": "String", "isAttr": true, "default" : ''},
            { "name": "default_init", "type": "String", "isAttr": true, "default" : 'N'},
            { "name": "is_on_apply_fill", "type": "String", "isAttr": true, "default" : 'N'},
            { "name": "is_pushed", "type": "String", "isAttr": true, "default" : 'N'},
            { "name": "is_inherited", "type": "String", "isAttr": true, "default" : 'N'},
            { "name": "is_task_name", "type": "String", "isAttr": true, "default" : 'N'},
            { "name": "is_encrypt", "type": "String", "isAttr": true, "default" : 'N'},
          ]
        },
        {
          "name": "Field",
          "superClass": [ "Base" ],
          "properties": [
          ]
        },
        {
          "name": "BewitchedTask",
          "extends": [
            "bpmn:Task"
          ],
          "properties": [
            {
              "name": "fields",
              "type": "qflow:Field",
              "isMany": true
            },
            { "name": "submit_var_name", "type": "String", "isAttr": true, "default" : '123'},
          ]
        },
    ]

  };

  var testModules = [
    coreModule,
    modelingModule
  ];


  var diagramXML = require('./diagram.bpmn');

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules,
    moddleExtensions: {
        'qflow' : qflow,
        //'bpmn'  : BpmnPackage
    }
  }));

  describe('meta-moddle', function() {

    it('start meta moddle', inject(function() {

        console.log("start meta moddle...");

        var cars = new Moddle([ carsJSON, BpmnPackage, qflow ]);

        var cheapCar = cars.create('my:Car');

        var field = cars.create('qflow:Field');
        console.log("field.is_required:", field.is_required);

        cheapCar.get('field').push(field);
        console.log("car field: ", cheapCar.get('field'));

        var taiga = cars.create('my:Car', { name: 'Taiga', id : "test" , hh : "123" });
        console.log("taiga : ", taiga);
        // { $type: 'c:Car', name: 'Taiga' };


        //console.log(cheapCar.name);
        // "No Name"
        //console.log("similar one: ", cheapCar.get('similar'));
        // really?
        cheapCar.get('similar').push(taiga);
        console.log("car similar: ", cheapCar.get('similar'));

    }));


    it('start meta moddle xml', inject(function() {

        console.log("start meta moddle xml ...");

        var model = new Moddle([ carsJSON, BpmnPackage , qflow ]);

        var xml =
          '<my:root>' +
            '<my:car id="Car_1">' +
                '<qflow:field></qflow:field>' +
            '</my:car>' +
          '</my:root>';

        var reader = new Reader({ model: model, lax: true });
        var rootHandler = reader.handler('my:Root');


        console.log("before reader fromXML....");

        // when
        reader.fromXML(xml, rootHandler, function(err, cars, context) {

          console.log("#-----here");

          if (err) {
            console.log('import error', err);
          } else {

            if (context.warnings.length) {
              console.log('import warnings', context.warnings);
            }

            console.log("cars : ", cars);

            // {
            //  $type: 'my:Root',
            //  cars: [
            //    {
            //      $type: 'my:Car',
            //      id: 'Car_1',
            //      engine: [
            //        { $type: 'my:Engine', powser: 121, fuelConsumption: 10 }
            //      ]
            //    }
            //  ]
            // }
          }
        });

    }));


    it('should read conditionExpression', inject(function(elementRegistry) {

      // given
      var sequenceFlowElement = elementRegistry.get('SequenceFlow_1'),
          sequenceFlow = sequenceFlowElement.businessObject;

      // when
      var condition = sequenceFlow.conditionExpression;

      // then
      expect(condition.body).to.eql('${foo > bar}');
    }));


    it('should write custom properties', inject(
      function(elementRegistry, moddle, modeling, bpmnjs) {

        console.log("....should write custom properties.");

        // given
        var shapeElement = elementRegistry.get('Task_1'),
            shape = shapeElement.businessObject;

        var field_input = moddle.create('qflow:Field', {
          name: 'test'
        });

        var field_select = moddle.create('qflow:Field', {
          name: 'test',
          field_type: 'select',
        });

        // assume
        // expect(sequenceFlow.conditionExpression).not.to.exist;
        
        shape.get('fields').push(field_input);
        shape.get('fields').push(field_select);

        console.log("shape : ", shape);

        console.log("fields[0].type : ", shape["fields"][0].field_type);
        console.log("fields[1].type : ", shape["fields"][1].field_type);
        delete shape["fields"].splice(0, 1);

        console.log("shape : ", shape);

        // when
        //modeling.updateProperties(shapeElement, {
        //    fields: newData,
        //    input: 123
        //});

        bpmnjs.saveXML({ format: true }, function(err, xml) {
          if (err) {
            return console.error('could not save BPMN 2.0 diagram', err);
          }
          alert('Diagram exported. Check the developer tools!');
          console.log('DIAGRAM', xml);
        });


        // then
        //expect(sequenceFlow.conditionExpression).to.equal(newCondition);

      }
    ));


  });

/*

  describe('read properties', function() {

    it('should read name', inject(function(elementRegistry) {

      // given
      var sequenceFlowElement = elementRegistry.get('SequenceFlow_1'),
          sequenceFlow = sequenceFlowElement.businessObject;

      // when
      var name = sequenceFlow.name;

      // then
      expect(name).to.eql('FOO > BAR?');
    }));


    it('should read conditionExpression', inject(function(elementRegistry) {

      // given
      var sequenceFlowElement = elementRegistry.get('SequenceFlow_1'),
          sequenceFlow = sequenceFlowElement.businessObject;

      // when
      var condition = sequenceFlow.conditionExpression;

      // then
      expect(condition.body).to.eql('${foo > bar}');
    }));

  });


  describe('write properties', function() {

    it('should write conditionExpression', inject(
      function(elementRegistry, moddle, modeling, bpmnjs) {

        // given
        var sequenceFlowElement = elementRegistry.get('SequenceFlow_2'),
            sequenceFlow = sequenceFlowElement.businessObject;

        var newCondition = moddle.create('bpmn:FormalExpression', {
          body: '${ value > 100 }'
        });

        // assume
        expect(sequenceFlow.conditionExpression).not.to.exist;

        // when
        modeling.updateProperties(sequenceFlowElement, {
          conditionExpression: newCondition
        });

        bpmnjs.saveXML({ format: true }, function(err, xml) {
          if (err) {
            return console.error('could not save BPMN 2.0 diagram', err);
          }
          alert('Diagram exported. Check the developer tools!');
          console.log('DIAGRAM', xml);
        });


        // then
        expect(sequenceFlow.conditionExpression).to.equal(newCondition);

      }
    ));

    it('should write custom properties', inject(
      function(elementRegistry, moddle, modeling, bpmnjs) {

        // given
        var shapeElement = elementRegistry.get('StartEvent_1'),
            shape = shapeElement.businessObject;

        //var newData = moddle.create('qflow:input', {
        //  body: 'test'
        //});

        // assume
        // expect(sequenceFlow.conditionExpression).not.to.exist;

        // when
        modeling.updateProperties(shapeElement, {
          input: "123"
        });

        bpmnjs.saveXML({ format: true }, function(err, xml) {
          if (err) {
            return console.error('could not save BPMN 2.0 diagram', err);
          }
          alert('Diagram exported. Check the developer tools!');
          console.log('DIAGRAM', xml);
        });


        // then
        expect(sequenceFlow.conditionExpression).to.equal(newCondition);

      }
    ));

    it('should undo write conditionExpression', inject(
      function(elementRegistry, moddle, modeling, commandStack) {

        // given
        var sequenceFlowElement = elementRegistry.get('SequenceFlow_2'),
            sequenceFlow = sequenceFlowElement.businessObject;

        var newCondition = moddle.create('bpmn:FormalExpression', {
          body: '${ value > 100 }'
        });

        modeling.updateProperties(sequenceFlowElement, {
          conditionExpression: newCondition
        });


        // when
        commandStack.undo();

        // then
        expect(sequenceFlow.conditionExpression).not.to.exist;
      }
    ));

  });

*/

});

