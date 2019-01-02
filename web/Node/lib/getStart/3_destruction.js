// ES5
{

    let a = 1;
    let b = 2;
    let c = 3;

}

//ES6 
//数组解耦赋值
{

    let arr = [1, 2, 3];
        
    //a = 1, b = 2, c = 3
    let [a, b, c] = arr;
    console.log(a,b,c)

    //m = 3
    let [ , , m] = arr;
    console.log(m)

    //head = 1, tail = [2 , 3, 4]
    let [head, ...tail] = [1,2,3,4];
    console.log(head,tail)

    //x = 'a', y = undefined, z = []
    //如果解构不成功，变量的值就等于undefined
    let [x, y, ...z] = ['a'];
    console.log(x, y , z)

    //解构赋值允许指定默认值
    //foo = true
    let [foo = true] = [];

    function f() {
        console.log('aaa')
    }
    let [h = f()] = [1];

}

//对象解耦赋值, 与数组相比，对象解耦赋值有以下特点：
/*
 *
 * 1) 无次序要求
 * 2）对象名必须和变量名相同
 *
 */
{

    //bar = "bbb"  foo = "aaa"
    let {bar, foo} = {foo : "aaa", bar : "bbb"};
    console.log(bar, foo);

    //bz = undefined
    //let {baz} = {foo : "aaa", bar : "bbb"}

    //当变量名和属性名不一样时，改写成以下形式
    let { foo: baz } = {foo : "aaa", bar : "bbb"};
    console.log(baz);

    //对象解构也可以使用默认值
    //y = 3
    let {x: y = 3} = {};
    console.log(y);

    //默认生效的条件是， 对象的属性严格等于undefined
    //x = 3
    var {x = 3} = {x : undefined};
    console.log(x);

    //x = null
    var {x = 3} = {x : null};
    console.log(x);

    //'{'开头javascript会解释为代码块，要想用解耦语法，必须使用中括号包含大括号
    ({x} = {x : 1});
    console.log(x);

    //对象的解构赋值，可以很方便的将现有对象的方法，赋值到某个变量
    let {log, sin, cos} = Math;

    //由于数组是特殊的对象，因此可以对数组进行对象属性的解构, 方括号的写法，属于'对象的扩展'
    let arr = [1, 2, 3]
    let {0 : first, [arr.length - 1] : last} = arr;
    console.log(first, last);


}


//字符串的解耦赋值
{

    const [a, b] = "ho";
    console.log(a);

    let {length : len} = 'hello';
    console.log(len);

}

//数值和布尔值的解构赋值
{
    //解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
    let {toString : s} = 123;
    console.log(s === Number.prototype.toString);

    let {toString : m} = true;
    console.log(m === Boolean.prototype.toString);

    //由于undefined 和 null 无法转为对象，所以对它们进行解构赋值，会报错
}


//函数解构
{

    function add([x, y = 3]){
        return x + y;
    }

    console.log(add([1, 2]));
    console.log(add([1]));

    console.log([[1,2], [3,4]].map(([a, b]) => a + b));

    function move({x, y} = {x : 0, y : 0}){
        return [x, y];
    }

    console.log(move({x : 3, y : 8})); //[3, 8]
    console.log(move({x : 3})); //[3, undefined]
    console.log(move({})); //[undefined, undefined]
    console.log(move()); //[0, 0]

}

//变量的解构赋值用法:
/**
 *
 *1)交换变量的值
  2)从函数返回多个值
  3)函数参数的定义
  4)提取JSON数据
  5)函数参数默认值
  6)遍历Map结构
  7)输入模块的指定方法
  const {SourceMapConsumer, SourceNode} = require("source-map")
 *
 *
 * /
