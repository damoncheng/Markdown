/*
 * Es5只有全局作用域和函数作用域，ES6加了块级作用域
 * 且let 和 const只在声明的块级作用域有效, 且在作用域内不能重复声明
 * 
 *
 * 变量声明：
 *
 * ES5仅支持var 和 function 声明变量
 *
 * ES6声明变量的六种方法:
 * 
 * var function let const import class
 *
 *
 * 顶层对象：
 *
 * 在浏览器环境，顶层对象是window对象，在Node环境顶层对象是global对象
 *
 * ES5中顶层对象的属性赋值和全局变量的赋值是等价的
 *
 * 在ES6中为了保持兼容性，var和function命名声明的全局变量依然是顶层对象的属性。
 * 但是let, const , class声明的全局变量，不再属于顶层对象的属性
 *
 * 获取顶层对象:
 *
 * ES5兼容各个环境获取顶层对象：
 *
     *  // 方法一
    (typeof window !== 'undefined'
       ? window
       : (typeof process === 'object' &&
          typeof require === 'function' &&
          typeof global === 'object')
         ? global
         : this);

    // 方法二
    var getGlobal = function () {
      if (typeof self !== 'undefined') { return self; }
      if (typeof window !== 'undefined') { return window; }
      if (typeof global !== 'undefined') { return global; }
      throw new Error('unable to locate global object');
    };
 *
 *
 * ES6获取提议标准化为global的顶层对象
 *
    // CommonJS 的写法
    var global = require('system.global')();

    // ES6 模块的写法
    import getGlobal from 'system.global';
    const global = getGlobal();
 *
*/

m = 10;
//只读内存地址, 在这儿是只读变量，若PI为指针或对象，指针或对象指向的内容是可以变, 如果想冻结对象用: Object.freeze({})
const PI = 3.1415926 

function variable_one(){

    var m = 20;

    /*
     * let:
     *
     * 1. let只有块作用域，不会存在变量提升
     * 2. 定义必须在声明前
     * 3. 相同变量名不允许重复声明
     * 4. 在块级作用域的函数声明，如同let, 对块级外的作用域不可见
     *
     */
    for(let m = 0; m < 10; m++)
        console.log(m)

    console.log(PI)

}


function variable_two(){

    m = 20

}

console.log(m)
variable_one()
console.log(m)
variable_two()
console.log(m)

