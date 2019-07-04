##通过 npm 使用 React##

我们建议在 React 中使用 CommonJS 模块系统，比如 browserify 或 webpack，本教程使用 webpack。

国内使用 npm 速度很慢，你可以使用淘宝定制的 cnpm (gzip 压缩支持) 命令行工具代替默认的 npm:

	$ npm install -g cnpm --registry=https://registry.npm.taobao.org
	$ npm config set registry https://registry.npm.taobao.org
	
这样就可以使用 cnpm 命令来安装模块了：

	$ cnpm install [name]
	
更多信息可以查阅：[http://npm.taobao.org/](http://npm.taobao.org/)

## 使用 create-react-app 快速构建 React 开发环境 ##

create-react-app 是来自于 Facebook，通过该命令我们无需配置就能快速构建 React 开发环境。

create-react-app 自动创建的项目是基于 Webpack + ES6 。

执行以下命令创建项目：

	$ cnpm install -g create-react-app
	$ create-react-app my-app
	$ cd my-app/
	$ npm start

在浏览器中打开 http://localhost:3000/

## visual studio code + react 开发环境搭建

- VS Code 提供 Debugger for Chrome 插件 可以支持使用chrome内核debug。

- 使用Debugger for Chrome 进行debug 需要对项目进行额外的配置(**launch.json**)

		{
		    // Use IntelliSense to learn about possible attributes.
		    // Hover to view descriptions of existing attributes.
		    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
		    "version": "0.2.0",
		    "configurations": [
		        {
		            "type": "chrome",
		            "request": "launch",
		            "name": "Launch Chrome against localhost",
		            "url": "http://localhost:3000",
		            "webRoot": "${workspaceFolder}"
		        }
		    ]
		}

- 启动项目npm start 然后打开debug工具栏

		选择之前添加的 chrome 节点启动 ，此时会打开一个新的chrome页面
	
- 在项目源代码种找到index.js文件打上断点在行号前面点左键即可 之后刷新页面，则可进入端点


