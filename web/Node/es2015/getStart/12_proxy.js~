SECTION = 4;

{

    //Proxy 修改操作的默认行为


    //案例 ： 在执行默认行为前打印一条输出 
    

    //1. Proxy(target, handler) target 是被拦截的目标对象， handler对象中定义拦截行为
    //  要使得Proxy 起作用，必须针对Proxy 实例(上例是Proxy 对象)进行操作，而不是针对目标对象进行操作。
    

    if(SECTION == 1)
    {

        console.log("#-代理：完全代理 |  对象原型链：proxy => obj => 对象原型链...Object-#");

        let obj = { m : 3, func : function (a) {console.log(`function func ${a}`)}};
        var proxy = new Proxy(obj, {
        
            get : function (target, key, receiver) {
                console.log(`proxy ... getting ${key}`);
                return Reflect.get(target, key, receiver);
            },

            set : function (target, key, value, receiver) {
                console.log(`proxy ... settings ${key}`);
                return Reflect.set(target, key, value, receiver);
            },

        });

        //直接操作对象，不会被代理拦截
        console.log("obj.m:", obj.m);
        obj.time = 2;

        //基于代理操作对象，会被代理拦截
        console.log("proxy.m:", proxy.m);
        proxy.time = 2;
        proxy.func(22222);

    }


}


{

    if (SECTION == 2)
    {


        console.log("#-代理：原型代理 | 对象原型链 : obj=>proxy obj=>对象原型链...Object-#")

        var proxy = new Proxy( {m1 : 4 , func1 : function (a) {console.log(`function func1 ${a}`)}}, {
        
            get : function (target, key, receiver) {
                console.log(`proxy ... getting ${key}`);
                return Reflect.get(target, key, receiver);
            },

            set : function (target, key, value, receiver) {
                console.log(`proxy ... settings ${key}`);
                return Reflect.set(target, key, value, receiver);
            }
        
        
        });

        let obj = { m : 3, func : function (a) {console.log(`function func ${a}`)}};

        //将proxy 插入到对象的原型链
        Object.setPrototypeOf(proxy, Object.getPrototypeOf(obj));
        Object.setPrototypeOf(obj, proxy); //  ES5 : obj.__proto__ = proxy 
        
        //访问对象拥有的属性，不被代理
        console.log(obj.m);
        console.log(obj.m1);
        obj.func(2222222);

        //访问 对象原型 的属性, 被代理
        obj.func1(2222222); //Object属性
        console.log(obj.hasOwnProperty("m")); //Object的属性依然被代理


    }


}

{

    if(SECTION == 3)
    {


        console.log("#-代理： 其他内置操作的代理-#");
        var proxy = new Proxy( {m1 : 4 , func1 : function (a) {console.log(`function func1 ${a}`)}}, {
        
            get : function (target, key, receiver) {
                console.log(`proxy ... getting ${key}`);
                return Reflect.get(target, key, receiver);
            },

            set : function (target, key, value, receiver) {
                console.log(`proxy ... settings ${key}`);
                return Reflect.set(target, key, value, receiver);
            },

            has : function (target, key) {
                console.log(`proxy ... has ${key}`);
                return key in target;
            }
        
        
        });

        let obj = { m : 3, func : function (a) {console.log(`function func ${a}`)}};

        //将proxy 插入到对象的原型链
        Object.setPrototypeOf(proxy, Object.getPrototypeOf(obj));
        Object.setPrototypeOf(obj, proxy); //  ES5 : obj.__proto__ = proxy 
        
        //判断对象是否存在
        console.log("m in obj : ", "m" in obj);
        console.log("m1 in obj : ", "m1" in obj);


    }

}

{

    if(SECTION == 4)
    {


        console.log("#-代理：可取消代理-#");

        let obj = { m : 3, func : function (a) {console.log(`function func ${a}`)}};
        let {proxy,revoke} = Proxy.revocable(obj, {
        
            get : function (target, key, receiver) {
                console.log(`proxy ... getting ${key}`);
                return Reflect.get(target, key, receiver);
            },

            set : function (target, key, value, receiver) {
                console.log(`proxy ... settings ${key}`);
                return Reflect.set(target, key, value, receiver);
            },

        });

        //通过代理访问属性
        console.log("proxy.m:", proxy.m);

        //取消代理
        revoke();

        //再次通过代理访问属性会失败
        console.log("proxy.m:", proxy.m);

    
    }


}

{


    if( SECTION == 5 )
    {


        console.log("#-代理：this问题-#");

        const target = new Date('2015-01-01');
        const handler = {
          get(target, prop) {
            /*
            if (prop === 'getDate') {
              return target.getDate.bind(target);
            }
            */
            return Reflect.get(target, prop);
          }
        };
        const proxy = new Proxy(target, handler);

        console.log(proxy.getDate());


    }


}




