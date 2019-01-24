
// 二进制 和 八进制数值的 新的写法

{

console.log(0b111110111 === 503);

console.log(0o767 === 503);

console.log(Number('0b111'))


}


/*
 *
 * Number.isFinite() 和 Number.isNan() :
 *
 *    Number.isFinite() : 用来检查一个数值是否为有限的(finite)
 *    如果参数类型不是数值，Number.isFinite 一律返回false
 *
 *    Number.isNaN()  :  如果类型不是NaN ，Number.isNaN 一律返回false 
 *    如果参数类型不是数值，Number.isNaN一律返回false
 *
 */



/*
 *
 *ES6 将全局方法 Number.parseInt(), Number.parseFloat() 
    这样做的目的是逐步减少全局性方法，使得语言逐步模块化
 *
 * */

/*
 * Number.isInteger() : 用来判断一个数值是否为整数
 *
 * Javascript 内部， 整数和浮点数采用的是同样的存储方法，所以25和25.0 被视为同一个值
 *
 * 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，
 * 数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。
 * 如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。
 *
 * Number.isInteger(3.0000000000000002) // true
 *
 * ES6  在Number对象上面，新增一个极小的常量Number.EPSILON。根据规格，它表示 1 与大于 1 的最小浮点数之间的差。
 *
 * Number.isSafeInteger() 
 *
 *
 * #---看来ES6 加大了对基础数学的支持
 * Math 对象的扩展
 *
 * 对数方法
 *
 * 双曲函数方法
 * 
 * */


