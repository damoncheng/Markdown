import {
  assign,
  isArray,
  omit
} from 'min-dash';

import path from 'path';
import inherits from 'inherits';


console.log("assign : ", assign( {} , {"hello" : {1 : 1}}, {"hello" : {2 : 2} , "world" : {3 : 3}}));
console.log(path.join("123", "456", "789"));
//console.log(assign(omit(["123", "456"], ["111", "789","456"]),{"123":"123", "456":"456"}, {"456":"456", "789":"789"}));
var start_list = [1,2];
console.log("begin start_list : ", start_list);
console.log(omit(["123", "456"], ["456", "789"]));
console.log(start_list.includes(3));


function print(){

	console.log(this.name);

}

function m(){

	var name = "m";

}

function n(){

	var name = "n";

}

console.log("func m :", m)

print.call(n);

function su(){
}
su.prototype.haha = "haha";

function ch(){
	this.hehe = "hehe";
}
ch.prototype.huhu = 'huhu';

inherits(ch, su);

console.log(ch);
console.log(ch.prototype.__proto__==su.prototype);
console.log(ch.prototype.haha);
var k = new ch();
console.log(k.__proto__ == ch.prototype);
console.log(k.hehe);
console.log(k.haha);
console.log(k.huhu);
