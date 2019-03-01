import Moddle from 'moddle';
import {
  Reader,
  Writer
} from 'moddle-xml';

console.log("start meta moddle xml ...");

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
        { "name": "engine", "type": "Engine" },
        { "name": "similar", "type": "Car", "isMany": true, "isReference": true }
      ]
    },
    {
      "name": "Engine",
      "superClass": [ "Base" ],
      "properties": [
        { "name": "name", "type": "String", "isAttr": true, "default": "No Name" },
        { "name": "power", "type": "Integer", "isAttr": true },
        { "name": "fuelConsumption", "type": "Integer", "isAttr": true },
      ]
    }

  ]

}


var model = new Moddle([ carsJSON ]);

var xml =
  '<my:root xmlns:props="http://mypackage">' +
    '<my:car id="Car_1">' +
      '<my:engine power="121" fuelConsumption="10" />' +
    '</my:car>' +
'</my:root>';

/*
var xml =
  '<my:Root xmlns:props="http://mypackage">' +
    '<my:Car id="Car_1">' +
    '</my:Car>' +
'</my:Root>';
*/



var reader = new Reader(model);
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


