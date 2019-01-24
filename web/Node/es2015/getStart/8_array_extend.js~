{

    //数组的扩展运算符，拆分数组作为参数

    console.log(...[1,2,3]);

    console.log(1, ...[2,3,4], 5);

    //[...document.querySelectorAll('div')]

    //复制数组(注意：扩展运算符的拷贝是浅拷贝)
    const a1 = [1 ,2];

    const a2 = [...a1];
    console.log(a2);


    //合并数组
    console.log([...a1, ...a2]);


    //与解构赋值结合
    const [first, ...rest] = [1, 2, 3, 4, 5]
    console.log(rest);

    //字符串
    console.log(..."hello");

    //Map 和 Set 解构，Generator函数
    //扩展运算符内部调用的是数据解构的Iterator接口，因此只要具有Iterator接口的对象，都可以使用扩展运算符
    let map = new Map([
        [1, "one"],
        [2, "two"],
        [3, "three"]
    ]);

    console.log(...map.keys());

    const go = function*(){
        
        yield 1;
        yield 2;
        yield 3;

    };
    console.log([...go()]);
    
}

{

    /*
        Array.from() : 将两类对象转为真正的数组。
        Array.of()   : 用于将一组值，转换为数组。
        CopyWithin   : 将制定位置的成员赋值到其他位置(会覆盖原有成员)
        find  find_Index
        fill : 使用指定值填充一个数组
        数组实例的entries keys values
        数组实例的includes
        数组实例的flat() flatMap()
        数组的空位
    */

    

}
