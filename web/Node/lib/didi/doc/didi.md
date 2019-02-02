#didi教程

## 简介依赖注入

### 依赖注入模式

依赖注入模式将 对象的实现 从业务逻辑中 分开。 这个模式有如下益处：

- 明确依赖(explicit dependencies) : 所有依赖被传递到构造函数，这更容易了解环境需要依赖的对象。
- 代码重用(code reuse): 对象更容易在其他环境被重用，因为它没有连接到一个特别的逻辑实现。
- 容易测试(much easier to test): 仅基于对象测试，没有使用其他环境.

### 依赖注入框架

It make wiring the appliation declarative rather than imperative.

通过依赖注入模式，最终可以通过所有实现的对象得到简洁的main方法(即逻辑处理函数)。依赖注入框架让你摆脱公共调用代码，专注于业务逻辑实现。每个组件声明它的依赖， 框架透明解析这些依赖。

## 官方教程

### example

	var Car = function(engine) {
	  this.start = function() {
	    engine.start();
	  };
	};
	
	var createPetrolEngine = function(power) {
	  return {
	    start: function() {
	      console.log('Starting engine with ' + power + 'hp');
	    }
	  };
	};
	
	
	// a module is just a plain JavaScript object
	// it is a recipe for the injector, how to instantiate stuff
	var module = {
	  // if an object asks for 'car', the injector will call new Car(...) to produce it
	  'car': ['type', Car],
	  // if an object asks for 'engine', the injector will call createPetrolEngine(...) to produce it
	  'engine': ['factory', createPetrolEngine],
	  // if an object asks for 'power', the injector will give it number 1184
	  'power': ['value', 1184] // probably Bugatti Veyron
	};
	
	
	var di = require('di');
	var injector = new di.Injector([module]);
	
	injector.invoke(function(car) {
	  car.start();
	});

### Usage

- On the web

	If you are working on the web use the minification save array notation to declare types or factories and their respective dependencies:
	
		var module = {
		  'car': ['type', [ 'engine', Car ]],
		  ...
		};
		
		var di = require('di');
		var injector = new di.Injector([module]);
		
		injector.invoke(['car', function(car) {
		  car.start();
		}]);
		
- Registering stuff

	`type(token, Constructor)`
	
	To produce the instance, Constructor will be called with `new` operator.

		var module = {
		  'engine': ['type', DieselEngine]
		};
		
	`factory(token, factoryFn)`
	
	To produce the instance, `factoryFn` will be called (without any context) and its result will be used.
	
		var module = {
		  'engine': ['factory', createDieselEngine]
		};
		
	`value(token, value)`
	
	Register the final value.
	
		var module = {
		  'power': ['value', 1184]
		};
		
- Annotation

	The injector looks up tokens based on argument names:
	
		var Car = function(engine, license) {
		  // will inject objects bound to 'engine' and 'license' tokens
		};
		
	You can also use comments:
	
		var Car = function(/* engine */ e, /* x._weird */ x) {
		  // will inject objects bound to 'engine' and 'x._weird' tokens
		};
		
	You can also the minification save array notation known from AngularJS:
	
		var Car = [ 'engine', 'trunk', function(e, t) {
		  // will inject objects bound to 'engine' and 'trunk'
		}];
		
	Sometimes it is helpful to inject only a specific property of some object:
	
		var Engine = function(/* config.engine.power */ power) {
		  // will inject 1184 (config.engine.power),
		  // assuming there is no direct binding for 'config.engine.power' token
		};
		
		var module = {
		  'config': ['value', {engine: {power: 1184}, other : {}}]
		};
		
