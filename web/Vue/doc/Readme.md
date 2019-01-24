#Vue教程

## 基于VScode搭建Vue环境

### 使用NPM安装vue-cli

	npm install -g vue-cli
	
### 使用Vue-cli创建一个新的Vue.js app环境

	vue init webpack vuejs-webpack-project
	
### 进入新的创建的application目录，打开 VS Code.

	cd vuejs-webpack-project
	code .
	
### 更新webpack配置，通过devtool debug组件

- Vue CLI 2.X

		Go to config/index.js and find the devtool property. Update it to:
		
			devtool: 'source-map',
			
		Make sure you updated both your build and dev configuration!
		
- Vue CLI 3.X

		The devtool property needs to be set inside vue.config.js. 
		Create the file in your project's root directory if it doesn't already exist.
		
			module.exports = {
			  configureWebpack: {
			    devtool: 'source-map'
			  }
			}
			
### 配置launch.json文件

- Click on the Debugging icon in the Activity Bar to bring up the Debug view. Then click on the gear icon to configure a launch.json file, selecting Chrome for the environment.

- Update the generated launch.json's configurations to include the "vuejs: chrome" configuration as seen below:
		
		{
		  "version": "0.2.0",
		  "configurations": [
		    {
		      "type": "chrome",
		      "request": "launch",
		      "name": "vuejs: chrome",
		      "url": "http://localhost:8080",
		      "webRoot": "${workspaceFolder}/src",
		      "breakOnLoad": true,
		      "sourceMapPathOverrides": {
		        "webpack:///./src/*": "${webRoot}/*"
		      }
		    }
		  ]
		}
		
### 开始Debugging

	Set a breakpoint in src/components/HelloWorld.
	vue on line 90 where the data function returns a string