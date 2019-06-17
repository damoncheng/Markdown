import {
  addStyle,
  addDiv,
  appendDiv
} from '../Helper';

var helloLess = require("./hello.less");

addStyle(helloLess)

describe('Hello Group', function() {
  describe('Hello Description', function() {
    it('Hello World', function() {
        
        addDiv("hello");
        appendDiv("hello", "hello1");


    });
  });
});
