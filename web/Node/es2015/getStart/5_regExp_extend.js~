//RegExp构造函数
{

    //ES5中, RegExp构造函数的参数有两种情况
    //method one
    var regex = new RegExp('xyz', 'ig');

    console.log("XYZxyz123".match(regex));

    //==

    //method two， 但是ES5不允许此时使用第二个参数添加修饰符，ES6改进了这点
    var regex = new RegExp(/xyz/ig);
    console.log("XYZxyz123".match(regex));

    // ==
    
    var regex = /xyz/ig;
    console.log("XYZxyz123".match(regex));


    //ES6支持第二个参数添加修饰符，覆盖第一个参数修饰符
    var regex = new RegExp(/xyz/i, 'ig');
    console.log("XYZxyz123".match(regex));

    console.log(/xyz/i.test("XYZxyz123"))


    //  u  修饰符处理大于\uFFFF的Unicode字符， 也就是说会正确处理四个字节的UTF-16 编码
    
    /* 
     * u 修饰符修改下列正则行为:
     *
     * 1) 点字符，含义是除了换行符以外的任意单个字符。对于码点大于0xFFFF的Unicode字符，点字符不能识别必须加上u修饰符.
     * 2) Unicode字符表示法，ES6新增了使用大括号表示Unicode字符
     * 3) 所有量词都会正确识别码点大于0xFFFF的Unicode字符
     * 4) 预定义模式
     * 5) i 修饰符号
     *
     */

    //1)
    var s = '吉';
    console.log(/^.$/.test(s)); //false
    console.log(/^.$/u.test(s)); //true

    //2)
    console.log(/\u{61}/.test('a'));  //false
    console.log(/\u{61}/u.test('a')); //true
    console.log(/\u{5668}/u.test('器')); //true, node对码点支持不太好, false了

    //RegExp.prototype.unicode
    const r1 = /hello/;
    const r2 = /hello/u;

    console.log(r1.unicode)
    console.log(r2.unicode)


}

{

    //y 修饰符，即 粘连 修饰符, 看下面示例
    var s = 'aaa_aa_a';

    var r1 = /a+/g;
    var r2 = /a+/y; // == /^a+/

    console.log("r1.lastIndex", r1.lastIndex); //开始匹配位置
    match = r1.exec(s);
    console.log(match);
    console.log("match.index", match.index); //匹配到的开始位置
    console.log(r2.exec(s));

    console.log("r1.lastIndex", r1.lastIndex); //开始匹配位置
    console.log(r1.exec(s));
    console.log(r2.exec(s));

    console.log('a1a2a3'.match(/a\d/y)); //"a1"
    console.log('a1a2a3'.match(/a\d/gy)); // ["a1", "a2", "a3"])

    //Es6 : y 修饰符等价于RegExp.prototype.sticky属性置为True
    var r = /hello\d/y;
    console.log(r.sticky); // true

    //Es6 : RegExp.prototype.flags属性包含正则的"修饰符"属性
    // ES5 的 source 属性
    // 返回正则表达式的正文
    console.log(/abc/ig.source);
    // "abc"

    // ES6 的 flags 属性
    // 返回正则表达式的修饰符
    console.log(/abc/ig.flags);
    // 'gi'

}

{

    //s 修饰符 dotAll模式
    /*
     *正则表达式中，点(.) 是一个特殊字符，代表任意的单个字符，但是有两个例外。
     *
     *      一个是四字节的UTF-16 字符， 这个可以用u 修饰符解决。
     *
     *      另一个是行终止符(line terminateor character), 以下四个字符属于"行终止符"。
     *
     *          - U + 000A 行换行符(\n)
     *          - U + 000D 回车符(\r)
     *          - U + 2028 行分隔符(line separator)
     *          - U + 2029 段分隔符(paragraph separator)
     *
     * RegExp 会多出一个dotAll 属性
     *
     *      RegExp.dotAll = true   表示使用了s 修饰符
     *      RegExp.dotAll = false  表示没有使用s 修饰符
     *
     * */

    console.log(/foo.bar/.test('foo\nbar'));
    console.log(/foo.bar/s.test('foo\nbar'));


}

{


    //Javascript 语言的表达式只支持先行断言(lookahead) 和 先行否定断言(negative lookahead)。

    //ES2018 引入后行断言，V8 引擎4.9 版（crhome 62）已经支持
    
    // 先行断言 ：匹配% 前面的数字, 执行顺序 从左到右
    console.log(/\d+(?=%)/.exec('100% of US presidents have been male'));
    console.log(/\d+(?!%)/.exec('that’s all 44 of them'));

    // 后行断言 ：匹配跟在$ 后的数字, 执行顺序从右到左, 在贪婪模式下匹配会和其他情况有些不一样
    console.log(/(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill'));
    console.log(/(?<!\$)\d+/.exec('it’s is worth about €90'));

    //后行断言的反斜杠引用，也与通常的顺序相反
    console.log(/(?<=(o)d\1)r/.exec('hodor'))  // null
    console.log(/(?<=\1d(o))r/.exec('hodor'))  // ["r", "o"]


}

{

    /**
     *
     *  Unicode 属性类：ES2018 引入了一种新的类写法：\p{...} 和 \p{...}, 允许正则表达式匹配符合Unicode某种属性的所有字符。
     *
     *  具别组匹配(Named Capture Groups)
     *
     *  解构赋值和替换
     *
     *  引用
     *
     *  String.prototype.matchAll 目前是一个提案，返回一个匹配所有规则的迭代器
     * 
     * */

     //const regex = /^\p{Decimal_Number}+$/u;
     //console.log(regex.test('1234567')); // true

    /*
    const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
    const matchObj = RE_DATE.exec('1999-12-31');
    const year = matchObj.groups.year; // 1999
    const month = matchObj.groups.month; // 12
    const day = matchObj.groups.day; // 31

    console.log("year => ", year);
    console.log("month => ", month);
    console.log("day => ", day);
    */



}
