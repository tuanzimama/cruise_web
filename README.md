# Cruise 

## 设计思路

	1.界面结构：主界面 + 视图模块(填充主界面内容区域) + 公共工具类
	2.开发语言：HTML 、ES6、CSS、SASS(基础) 、Flex布局
	3.构建工具：Webpack、Babel
	
## 项目访问方式：

    点击 dist 文件夹下 index.html 查看显示效果

## 环境搭建步骤

	1.生成package.json文件：npm init -y
	2.安装webpack: cnpm i webpack -g --save-dev
		  webpack-cli：cnpm i webpack-cli -g  --save-dev
		  webpack-merge: cnpm i webpack-merge -g --save-dev
          across-env:  cnpm install cross-env --save-dev 
	3.配置webpack文件,开发环境和生产环境分开...
	4.安装 babel：cnpm i babel-core --save-dev
				  cnpm i babel-preset-env babel-preset-stage-0 --save-dev
				  cnpm i babel-loader --save-dev
	5.安装webpack-dev-server：cnpm i webpack-dev-server --save-dev
	6.安装HtmlWebpackPlugin：cnpm i html-webpack-plugin --save-dev
	7.webpack.config.js 中启用 HtmlWebpackPlugin
	8.安装node-sass  cnpm i node-sass --save-dev 
					 cnpm i sass-loader --save-dev 
					 cnpm i css-loader --save-dev 
					 cnpm i style-loader --save-dev 									 
	9.安装 extract-text-webpack-plugin：cnpm i extract-text-webpack-plugin --save-dev
    10.安装 clean-webpack-plugin: cnpm i clean-webpack-plugin --save-dev

## 项目文件结构简介
 
    index.js 项目入口文件

    index.html 项目主界面

    app     -------项目内容
        business  -------业务模块
             agent-----agent模块（template.js模板文件、app.css样式文件、index.js业务逻辑）
        styles   -------样式文件
        utils   -------公共类工具

    assets  -------静态资源文件夹
        dummy-data  -------模拟数据
        images      -------静态图片

	
## 项目源码启动方式：
    npm/cnpm install 安装依赖包
    开发模式：npm start
	生产模式：npm run build
