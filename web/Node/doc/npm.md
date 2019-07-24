# npm教程

## npm基础命令

### npm模块实例

- npm init

		初始化模块package.json文件
		
- 制造模块index.js

		exports.printMsg = function() {
		  console.log("This is a message from the demo package");
		}

- npm publish

	推送模块到npm包管理器 (先npm login登录)

- 增加README.md文件

- npm version patch

	增加patch文件（然后npm publish提交）
	
### npm依赖
	
	"dependencies": Packages required by your application in production.
	"devDependencies": Packages that are only needed for local development and testing.
	
- To add an entry to the "dependencies" attribute of a package.json file

		npm install <package-name> [--save-prod]
		
- add an entry to the "devDependencies" attribute of a package.json file

		npm install <package-name> --save-dev
		

### npm 断言 assert

- 利用assert进行断言时，如果断言失败，会抛出AssertionError异常。AssertionError是Error的一个子类, 因此所有AssertionError实例包含内置Error属性(`message` and `name`), 以及具体属性:

		- actual <any> Set to the actual value in case. e.g., assert.strictEqual() is used
		- expected <any> Set to the expected value in case. e.g., assert.strictEqual() is used
		- generatedMessage <boolean> indicates if the message was auto-generated(true) or not.
		- code <string> This is always set to the string ERR_ASSERTION to indicate that the error is actually an assertion error.
		- operator <string> Set to the passed in operator value.

- 示例

		const assert = require('assert');
		
		// Generate an AssertionError to compare the error message later:
		const { message } = new assert.AssertionError({
		  actual: 1,
		  expected: 2,
		  operator: 'strictEqual'
		});
		
		// Verify error output:
		try {
		  assert.strictEqual(1, 2);
		} catch (err) {
		  assert(err instanceof assert.AssertionError);
		  assert.strictEqual(err.message, message);
		  assert.strictEqual(err.name, 'AssertionError [ERR_ASSERTION]');
		  assert.strictEqual(err.actual, 1);
		  assert.strictEqual(err.expected, 2);
		  assert.strictEqual(err.code, 'ERR_ASSERTION');
		  assert.strictEqual(err.operator, 'strictEqual');
		  assert.strictEqual(err.generatedMessage, true);
		} 
		
- 功能列表	

		assert(value[, message]) : assert.ok() 的别名。
		
			value <any> The input that is checked for being truthy.
			message <string> | <Error>
			
		assert.deepEqual(actual, expected[, message])
		
			actual <any>
			expected <any>
			message <string> | <Error>
			
		...其他后续看
		
