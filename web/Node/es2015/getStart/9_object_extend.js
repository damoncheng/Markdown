{
    /*
     *
     * 1. 属性的简洁表达式
     * 2. 属性名表达式
     * 3. 方法的name属性
     * 4. Object.is()
     * 5. Object.assign(()
     *     注意: 
     *          1) Object.assign是浅拷贝
     *          2) 同名属性的替换
     *          3) 数组的处理
     *          4) 取值函数的处理
     *
     */

    const foo = 'bar';
    const baz = {foo};

    console.log(baz);

    //属性的赋值器和取值器，事实上也是采用这种方法

    const cart = {
    
        _wheels : 4,

        get wheels() {
            return this._wheels;
        },

        set wheels(value) {
            if(value < this._wheels) {
                throw new Error('数值太小了!');
            }

            this._wheels = value;
        }
    
    }

    console.log(cart);


    let propKey = 'foo';

    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123
    };

    let obj_func = {
      ['h' + 'ello']() {
        return 'hi';
      }
    };

    console.log(obj_func.hello()); // hi

    //Same-Value equality 同值相等算法
    console.log(Object.is('foo','foo'));

    //Objects.assign 用于对象的合并，将源对象的(source)的所有可枚举属性，复制到目标对象
    const target = { a: 1 };

    const source1 = { b: 2 };
    const source2 = { c: 3 };

    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}
    console.log(target);

}

{

    //Object.assign的用途

    //为对象添加属性
    class Point {
        constructor(x,y) {
            //Object.assign(this, {x, y});
            this.x = x;
            this.y = y;
        }
    }

    point1 = new Point(1,2)
    point2 = new Point(3,4)
    console.log("x:", point1.x);
    console.log("y:", point1.y);
    console.log("x:", point2.x);
    console.log("y:", point2.y);

    //为对象添加方法


    //克隆对象


    //合并多个对象


    //为属性指定默认值 

}

{

    //属性的可枚举性和遍历


    //可没举性：对象的每个属性都有一个描述对象(Descriptor), 用来控制该属性的行为
    let obj = {foo : 123};
    console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));

    //目前，有四个操作会忽略enumerable 为false 的属性
    /*
        for...in循环：只遍历对象自身的和继承的可枚举的属性。
        Object.keys()：返回对象自身的所有可枚举的属性的键名。
        JSON.stringify()：只串行化对象自身的可枚举的属性。
        Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
    */

    //其中，只有for...in 会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性
    /*
      前面说过，
         * Object.getOwnPropertyDescriptor方法会返回某个对象属性的描述对象（descriptor）。
         * ES2017 引入了Object.getOwnPropertyDescriptors方法，返回指定对象所有自身属性（非继承属性）的描述对象。
    */

    //Object.assign方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或取值方法。
    //这时，Object.getOwnPropertyDescriptors方法配合Object.defineProperties方法，就可以实现正确拷贝。

    //Object.getOwnPropertyDescriptors方法的另一个用处，是配合Object.create方法，将对象属性克隆到一个新对象。这属于浅拷贝。
    //const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

}

{

    //__proto__属性(前后各两个下划线)， 用来读取或设置当前对象的prototype对象。 目前，所有浏览器都支持这个属性。

    o = {a : 1};
    console.log(o.prototype);
    console.log(o.__proto__ == Object.prototype);

    class Father {
        constructor(){
        }
    }

    Father.prototype.name = "123"

    class Son extends Father {
        
    }


    son1 = new Son();
    son2 = new Son();

    son1.name = "456"

    console.log("son1.name",son1.name);
    console.log("son2.name",son2.name);

    //检查实例对象是否有自己的属性
    console.log("son1 has own property:", son1.hasOwnProperty("name"))
    console.log("son2 has own property:", son2.hasOwnProperty("name"))

    console.log(Son.prototype)
    console.log(Father.prototype)
    console.log(Function.prototype)

    console.log("#------------start")
    console.log(son1.__proto__ == Son.prototype);
    console.log(son1.__proto__.__proto__ == Father.prototype)
    console.log(son1.__proto__.__proto__.__proto__ == Object.prototype)
    console.log(son1.__proto__.__proto__.__proto__.proto__ == null)

    //for ... in 循环遍历对象自身的和继承的可枚举属性(不含Symbol 属性)
    
    //Object.keys(obj) 返回有一个数组，包含对象自身的（不含继承的）所有可枚举属性（不含Symbol 属性）的键名。

    //Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

    //Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有Symbol 属性的键名

    //Reflect.ownKeys(obj) : 返回一个数组，包含对象自身的所有键名，不管健名是Symbol 或 字符串, 也不管是否可枚举

}

