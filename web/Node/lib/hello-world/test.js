/*
import {
	isFunction,
	forEach,
	merge
} from 'min-dash';

require('bpmn-js/test/helper');

*/

var forEach = require('lodash/forEach');

forEach({1:2, 3:4}, function(value,key){

    console.log("key:",key, ",value:", value);

})
