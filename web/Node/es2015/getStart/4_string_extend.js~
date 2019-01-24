{

    //Javascript的允许通过码点(Unicode码)表示字符串 : 
    console.log("\u0061");

    //码点表示法仅局限于\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示
    console.log("\uD842\uDFB7");

    //超出范围的字符，不能通过码点输出
    console.log("\u20BB7");

    //ES6对码点输出做了改进，支持通过大括号来界限码点
    console.log("\u{20BB7}");

    //node consle  这个特性有问题，后面再研究
    
    /*
     *相关函数:

        codePointAt

        String.fromCodePoint

        字符串的遍历器接口

        normalize
     *
    * */

}

{

    //传统javascript只有indexof方法判断字符串包含，ES6新增三种弄方法:includes, startsWith, endsWith
    console.log("123".includes("23"));
    //startsWith和endsWith支持第二个参数，表示开始搜索位置
    console.log("123".startsWith("12"));
    console.log("123".endsWith("23"));
    console.log('x'.repeat(3));

    //字符串补全，头部补全或者尾部补全, 参数1：最低长度。参数2：补全字符串(默认空格补全)。
    console.log('x'.padStart(5, 'ab'));
    console.log('x'.padEnd(5, 'ab'));

    //模版字符串 : 这个非常有用，终于不同字符串拼接了, 模版字符串中可以用 变量，表达式，函数
    //模版字符串还能嵌套
    let m = "one";
    let n = "two";
    console.log(`${m} hello ${n}`); //反引号包含，可以使用模版字符串

    const tmpl = addrs => `
        <table>

            ${addrs.map(addr => `
                <tr><td>${addr.first}</td></tr>
                <tr><td>${addr.last}</td></tr>
            `).join('')}

        </table>
    `

    const data = [
        { first : '<Jane>', last : 'Bond'},
        { first : 'Lars',   last : '<Croft>'},
    ]

    console.log(tmpl(data));



    /*
     * 模版字符串高级功能：
     *
     *  1. 模版编译 -- 待续
     *  2. 标签模版 -- 待续
     *  3. String.raw
     * */

}


{

    //String.raw , 可以通过标签模版的方式解析版字符串，并且转义 转义字符，从而获取字符串原始呈现
    x = "one"
    y = "two"

    console.log(String.raw`Hi\n The number is ${ 2 + 3 }`)

    //String.raw 也可以作为正常函数调用
    /*
     *其定义：
         String.raw = function (strings, ...values) {
              let output = '';
              let index;
              for (index = 0; index < values.length; index++) {
                output += strings.raw[index] + values[index];
              }

              output += strings.raw[index]
              return output;
        }
     */
    console.log(String.raw({ raw: 'test' }, 0, 1, 2));

}
