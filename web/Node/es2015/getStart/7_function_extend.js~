/*
 *  ES6 
 *
 *  1. 允许为函数的参数设置默认值，即直接写在参数定义的后面
 *  2. 与解构赋值默认值结合使用
 *  3. 函数的length属性
 *  4. 作用域
 *  5. 函数的name属性, 表示函数名称
 *  6. 普通函数的this 指向外层document, 而箭头函数里面的this 指向最外层函数
 *  7. 双冒号运算符
 *  //对于内存有极大的优化
 *  8. 尾调式优化
 *  9. 尾递归
 *  10. 函数参数的尾逗号
 *
 * */

{

    //rest 参数
    function add(...value){
        let sum = 0;

        for(var val of value) {
            sum += val;
        }

        return sum;
    }

    console.log(add(2, 5, 3));


    //arguments 和 rest比较
    
    // arguments变量的写法, arguments是类似对组对象，要使用数组方法，必须先转义
    function sortNumbers() {
      return Array.prototype.slice.call(arguments).sort();
    }

    // rest参数的写法
    const sortNumbers2 = (...numbers) => numbers.sort();

    //函数的length属性，不包括默认参数和rest参数

}


//严格模式
//name 属性

{

    //ES6 允许使用 箭头 定义函数
    /*
     *箭头函数几个要注意的地方：

     （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

     （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

     （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
 
     （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
     *
     *
     */

    //函数f 带一个参数, 有返回值
    var f = v => v;
    console.log(f(123));

    //函数f 不带参数, 有返回值
    var f = () =>5;

    //函数sum 带参数num1, num2， 有返回值
    var sum = (num1, num2) => num1 + num2;
    console.log(sum(2,3));

    //函数sum 带参数num1, num2, 代码块里面返回
    var sum2 = (num1, num2) => {return num1 + num2}
    console.log(sum2(2,3));

    //函数getTempItem 带参数，不带返回值
    let  getTempItem = id => ({id : id, name : "temp"})
    getTempItem(123)

    //参数默认值的应用
    function throwIfMissing(){
        throw new Error('Missing parameter')
    }

    function foo(mustBeProvided = throwIfMissing()) {
        return mustBeProvided;
    }

    //foo();

    //可以将参数默认值设为undefined, 表面这个参数是可以省略的
    function foo1(optional = undefined){
        console.log("undefined");
    }
    foo1();


}

{

    //箭头函数可以绑定this 对象，大大减少了显示绑定this 对象的写法(call, apply, bind)

    //foo::bar 等同于 bar.bind(foo) 调用bar时，this 指向 foo

    //foo::bar(..arguments); 等同于 bar.apply(foo, arguments) , this 指向 foo 调用 bar
    
    /*
    　  obj.myFun.call(db,'成都','上海')；　　　　 //德玛 年龄 99  来自 成都去往上海

    　　obj.myFun.apply(db,['成都','上海']);        //德玛 年龄 99  来自 成都去往上海  

    　　obj.myFun.bind(db,'成都','上海')();         //德玛 年龄 99  来自 成都去往上海

     　 obj.myFun.bind(db,['成都','上海'])();　　 //德玛 年龄 99  来自 成都,上海去往undefined
    */

}
