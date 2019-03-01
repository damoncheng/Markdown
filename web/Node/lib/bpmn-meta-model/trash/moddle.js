import Moddel from 'moddle';

var carJSON = {
  "name": "Cars",
  "uri": "http://cars",
  "prefix": "c",
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
        { "name": "similar", "type": "Car", "isMany": true, "isReference": true }
      ]
    }
  ]
};

import Moddle from 'moddle';

var cars = new Moddle([ carsJSON ]);

var taiga = cars.create('c:Car', { name: 'Taiga' });

console.log(taiga);
// { $type: 'c:Car', name: 'Taiga' };


var cheapCar = cars.create('c:Car');

console.log(cheapCar.name);
// "No Name"


// really?
cheapCar.get('similar').push(taiga);
