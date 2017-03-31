#webpack整理
-demo:webpack-firstDemo,webpack1~4
-[入门1](http://www.cnblogs.com/LIUYANZUO/p/5184424.html)
-[入门2](http://www.tuicool.com/articles/BNVZN3)
##安装
1. 生成项目依赖文件配置package.json
` npm init`
1.  项目安装webpack
` npm install webpack --save-dev` //
1. 在项目根目录下，新建 webpack.config.js 文件(window系统下是type NUL)
` type NUL > webpack.config.js`

##配置文件
- html配置
引用JS与CSS引用最后打包后的文件，JS如bundle.js
- css配置
- webpack打包配置
        module.exports = {
        // 入口：要进行处理的实例（js）
        entry: './src/pages/index/index.js',
        // 出口：输出配置
        output: {
            // 输出到哪个目录
            path: './dist/',
            // 静态资源的引用路径
            publicpath: './dist/',
            // 实例最终输出的名字
            filename: 'bundle.js'
            }
        };
entry:入口文件，通过key，value的方式，确定入口文件的文件名及其对应的文件路径。
output:
path:webpack打包后，生成的js文件，css文件，字符文件，图片文件会打包放在path字段所指定的文件目录中。
publicPath:css文件中，我们通常都会引入图片或者字符文件，而webpack打包过程中，
其引用的文件可通过file-loader(loader部分会介绍)进行打包，并对其文件名进行处理。
而webpack打包的时候，遇到通过相对路径或者绝对路径进行引用的文件，
其路径可通过publicPath中指定的路径重新合成。
##运行
`webpack`

##webpack的module.exports=config,config的配置参数

###resolve
- 相对路径或绝对路径的简化
        module.exports = {
            resolve:{
                //定义别名
                alias:{
                    plugins:'D:/your/path/webpack_demo/src/plugins'
                }
            }
        };
        //当var Dialog = require('plugins/dialog/dialog.js');
        //当require() 的第一单词是alias中的单词将被匹配。 

###module
[相关文章](https://segmentfault.com/a/1190000005742111#articleHeader0 "相关文档")
- loaders之 预处理
    1. css-loader 处理css中路径引用等问题
    1. style-loader 动态把样式写入css
    1. sass-loader scss编译器
    1. less-loader less编译器
    1. postcss-loader scss再处理
        //第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST
        //第二个就是调用插件来处理 AST 并得到结果。
- loaders之 js处理
- loaders之 图片处理
- loaders之 文件处理
- loaders之 json处理
- loaders之 html处理
引入不同类型的文件加载器，需要安装loader 
预处理：`npm install --save -dev css-loader style-loader sass-loader less-loader postcss-loader`
JS处理：`npm install --save-dev babel-core babel-preset-es2015 babel-loader jsx-loader`
图片处理：`npm install --save-dev url-loadr`
文件处理：`npm install --save-dev file-loader`
json处理：`npm install --save-dev json-loader`
html处理：`npm install --save-dev raw-loader`
        module.exports = {
            module: {
                loaders: [{
                        //引入css样式文件
                        test: /\.css$/,
                        loader: 'style!css'
                    }, {
                        //引入解析ES6文件
                        test: /\.js$/,
                        loader: 'babel'
                    },{
                        //以下三个引入解析sass与less文件
                        //PostCSS 的主要功能只有两个：
                        
                        test: /\.sass/,
                        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax'
                    },{
                        test: /\.scss/,
                        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
                    },{
                        test: /\.less/,
                        loader: 'style-loader!css-loader!postcss-loader!less-loader'
                    },{
                        //一般限制小于8K小图片转 base64，减少一次http请求
                        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                        loader: 'url-loader?limit=8192'
                    },{
                        test: /\.json$/,
                        loader:'json-loader'
                    },{
                        test: /\.(mp4|ogg|svg)$/,
                        loader: 'file-loader'
                    },
            ]},
            preLoaders: [{
                        test: /\.(js|jsx)$/,
                        include: srcPath, //需要定义变量srcPath
                        loader: 'eslint-loader' //基于react的代码校验可以校验JSX
            ]};
完整的写法是： style-loader!css-loader , 其中， -loader 可以省略。
style!css 这边中间有一个感叹号，意思是：先是用 css 加载器处理，然后使用 style 加载器处理


##自动编译 + 浏览器同步刷新

1. 需要安装 webpack-dev-server 这个包。
` npm install webpack-dev-server`
1. 行内参数说明：
    inline: 使用命令行模式。
    content-base: 指定网站的根地址，如果你想指定为项目根目录，那么 --content-base ./
    hot: 开启热替换。一般用在 React 和 Vue 当中，我们这里不用。
1. 启动服务器:
`webpack-dev-server --progress --colors --inline

通过配置package.json可以快速配置启动服务
  "scripts": {
    "start": "webpack-dev-server --inline --hot",
    "build": "webpack --display-error-details",
    "watch": "webpack --progress --colors --watch"`
配置快速热启动与实时编译
"scripts": {
    "dev": "webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./dist",
    "build": "webpack --progress --colors"
  },
生产环境，
$ webpack -p --config webpack.config.build.js
上线环境，
多页面打包就是在filename:[name].js// 实例最终输出的名字

注意：通常我们设置好webpack-dev-server服务自动刷新预览功能之后，发现手机预览不了，其实是由于webpack-pack-server服务安全机制导致的，只允许本机访问，我们可以把host设置为0.0.0.0就可以允许或者设置为本机地址。