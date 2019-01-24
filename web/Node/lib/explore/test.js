import {
  assign,
  isArray,
  omit
} from 'min-dash';

import path from 'path';
import inherits from 'inherits';

console.log(path.join("123", "456", "789"));
console.log(assign(omit(["123", "456"], ["111", "789","456"]),{"123":"123", "456":"456"}, {"456":"456", "789":"789"}));


function print(){

	console.log(this.name);

}

function m(){

	var name = "m";

}

function n(){

	var name = "n";

}

print.call(n);

function su(){
}
su.prototype.haha = "su";

function ch(){
	this.hehe = "ch";
}

inherits(ch, su);

console.log(ch);
console.log(ch.prototype.__proto__==su.prototype);
var k = new ch();
console.log(k.hehe);
console.log(k.haha);
