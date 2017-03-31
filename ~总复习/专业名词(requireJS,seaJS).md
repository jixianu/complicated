# 前段专业名词 #
-
##模块化
JavaScript没有提供类似Java强类型语言的包的功能，每个包都是相互独立的，开发者需要模拟出类似的功能，
来隔离、组织复杂的JavaScript代码，我们称为模块化。
模块化历程：
+ 函数：只要把不同的函数（以及记录状态的变量）简单地放在一起，就算是一个模块
        function m1(){
        　　　　//...
        }
        function m2(){
        　　　　//...
        }
+ 对象：把模块写成一个对象，所有的模块成员都放到这个对象里面
        var module1 = new Object({       
        　　　　_count : 0,        
        　　　　m1 : function (){
        　　　　　　//...
        　　　　},        
        　　　　m2 : function (){
        　　　　　　//...
        　　　　}        
        　　});
        使用：module1.m1(),直接调用这个对象的属性
        弊端：暴露所有模块成员，内部状态可以被外部改写
+ 立即执行函数写法，可以达到不暴露私有成员的目的
        var module1 = (function(){
            var _count = 0;
            var m1 = function(){
                //...
            };
            var m2 = function(){
                //...
            };
            return {
                m1 : m1,
                m2 : m2
            };
        })();
        优点：外部代码无法读取内部的变量
+ 放大模式（augmentation）：一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用"放大模式"
        var module1 = (function (mod){
                mod.m3 = function () {
        　　　　　　//...
        };
                return mod;
        })(module1);
+ 宽放大模式（Loose augmentation）:在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。
如果采用上一节的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"。
        var module1 = ( function (mod){
            //...
            return mod;
       })(window.module1 || {});
       与"放大模式"相比，＂宽放大模式＂就是"立即执行函数"的参数可以是空对象。
+ 输入全局变量，为了在模块内部调用全局变量，必须显式地将其他变量输入模块。
        var module1 = (function ($, YAHOO) {
        　　//...
        })(jQuery, YAHOO);




##requireJS
requireJS的诞生解决了两个问题：
    + 实现js文件的异步加载，避免网页失去响应
    + 管理模块之间的依赖性，便于代码的编写和维护

###requireJS的加载：
+ 直接在head标签中引包
    `<script src="js/require.js"></script>`
    缺点：可能造成网页失去响应，解决办法1：把标签放在网页底部加载，2：是写成下面写法
 `<script src="js/require.js" defer async="true" ></script>`
    async属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持defer，所以把defer也写上。

###requireJS的入口模块，即主模块main.js:
+ `<script src="js/require.js" data-main="js/main"></script>`
data-main属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的main.js，这个文件会第一个被require.js加载。由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。

+ 写法：如果我们的代码不依赖任何其他模块，就没必要使用require.js了。
真正常见的情况是，主模块依赖于其他模块，这时就要使用AMD规范定义的的require()函数。
        // main.js        
       require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){       
        　// some code here       
       });
require()函数接受两个参数。第一个参数是一个数组，表示所依赖的模块，上例就是['moduleA', 'moduleB', 'moduleC']，即主模块依赖这三个模块；
第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块。

require()异步加载moduleA，moduleB和moduleC，浏览器不会失去响应；它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

        require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone){    
    　　　　// some code here    
    　　});
require.js会先加载jQuery、underscore和backbone，然后再运行回调函数。主模块的代码就写在回调函数中。

###requireJS的模块加载：
使用require.config()方法，我们可以对模块的加载行为进行自定义。require.config()就写在主模块（main.js）的头部。参数就是一个对象，这个对象的paths属性指定各个模块的加载路径。

        require.config({    
    　　　　baseUrl: "js/lib",    
    　　　　paths: {    
    　　　　　　"jquery": "jquery.min",
    　　　　　　"underscore": "underscore.min",
    　　　　　　"backbone": "backbone.min"   
    　　　　}    
    　　});
        三个模块的文件名，路径默认与main.js在同一个目录（js子目录）。如果这些模块在其他目录，比如js/lib目录
模块也可以使用绝对地址，但这样会增加HTTP请求，需要使用模块优化工具来合并一个文件，减少HTTP请求

###requireJS加载AMD规范模块：
+ 如果一个模块不依赖其他模块，那么可以直接定义在define()函数之中
+ 如果这个模块还依赖其他模块，那么define()函数的第一个参数，必须是一个数组，指明该模块的依赖性。 
        define(['myLib'], function(myLib){
        　　function foo(){
        　　　　　　myLib.doSomething();
        　　　　}
        　　　　return {
        　　　　　　foo : foo
        　　　　};
        　　});
当require()函数加载上面这个模块的时候，就会先加载myLib.js文件。

###requireJS加载非AMD规范模块：

符合AMD规范库：jQuery
不符合AMD规范库：underscore、backbone

不符合AMD规范的库，框架需要在require()加载之前，要先用require.config()方法，定义它们的一些特征：

    require.config({
    　　　　shim: {
    　　　　　　'underscore':{
    　　　　　　　　exports: '_'
    　　　　　　},
    　　　　　　'backbone': {
    　　　　　　　　deps: ['underscore', 'jquery'],
    　　　　　　　　exports: 'Backbone'
    　　　　　　}
    　　　　}
    });
require.config()接受一个配置对象还有一个shim属性，专门用来配置不兼容的模块。
具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。
比如，jQuery的插件可以这样定义：

    require.config({
    　　  shim: {
    　　　　    'jquery.scroll': {
    　　　　　　    deps: ['jquery'],
    　　　　　　    exports: 'jQuery.fn.scroll'
    　　　　    }
    　　  }
    })

###requireJS插件：

domready插件，可以让回调函数在页面DOM结构加载完成后再运行。

    　　require(['domready!'], function (doc){
    　　　　// called once the DOM is ready
    　　});

text和image插件，则是允许require.js加载文本和图片文件。

    　　define([
    　　　　'text!review.txt',
    　　　　'image!cat.jpg'
    　　　　],
    　　　　function(review,cat){
    　　　　　　console.log(review);
    　　　　　　document.body.appendChild(cat);
    　　　　}
    　　);

类似的插件还有json和mdown，用于加载json文件和markdown文件。


###requireJS 自带的前端优化工具

RequireJS Optimizer 对脚本的优化支持目前流行的 UglifyJS 和 Closure Compiler 两种压缩方式，UglifyJS 需要 NodeJS 环境支持，而 Closure Compiler 则需要 Java 环境。
这篇文章是以运行于 NodeJS 的 UglifyJS 来优化的，这也是 RequireJS Optimizer 默认的压缩方法

+ 新建一个配置文件，一个build.js文件，这样配置更方便：
  `  node r.js -o build.js`
build.js 的配置代码如下：	


    {
        baseUrl: "../js",
        dir: "../dist",
        optimize: "uglify",
        optimizeCss: "standard.keepLines",
        mainConfigFile: "../js/main.js",
        removeCombined: true,
        fileExclusionRegExp: /^\./,
        modules: [
            {
                name: "app/dispatcher",
            },
            {
                name: "app/in-storage",
                exclude: [
                    "jquery",
                    "app/common",
                    "pkg/DatePicker/app"
                ]
            }
        ]
    }
+ 基本参数介绍

　　appDir

　　应用程序的最顶层目录。可选的，如果设置了的话，r.js 会认为脚本在这个路径的子目录中，应用程序的文件都会被拷贝到输出目录（dir 定义的路径）。如果不设置，则使用下面的 baseUrl 路径。

　　baseUrl

　　默认情况下，所有的模块都是相对于这个路径的。如果没有设置，则模块的加载是相对于 build 文件所在的目录。另外，如果设置了appDir，那么 baseUrl 应该定义为相对于 appDir 的路径。

　　dir

　　输出目录的路径。如果不设置，则默认为和 build 文件同级的 build 目录。

　　optimize

　　JavaScript 代码优化方式。可设置的值：

    "uglify：使用 UglifyJS 压缩代码，默认值；
    "uglify2"：使用 2.1.2+ 版本进行压缩；
    "closure"： 使用 Google's Closure Compiler 进行压缩合并，需要 Java 环境；
    "closure.keepLines"：使用 Closure Compiler 进行压缩合并并保留换行；
    "none"：不做压缩合并；

　　optimizeCss

　　CSS 代码优化方式，可选的值有：

    "standard"：标准的压缩方式；
    "standard.keepLines"：保留换行；
    "standard.keepComments"：保留注释；
    "standard.keepComments.keepLines"：保留换行；
    "none"：不压缩；

　　mainConfigFile

　　如果不想重复定义的话，可以使用这个参数配置 RequireJS 的配置文件路径。

　　removeCombined

　　删除之前压缩合并的文件，默认值 false。

　　fileExclusionRegExp

　　要排除的文件的正则匹配的表达式。

　　modules

　　定义要被优化的模块数组。每一项是模块优化的配置，常用的几个参数如下：

　　　　name：模块名；

　　　　create：如果不存在，是否创建。默认 false；

　　　　include：额外引入的模块，和 name 定义的模块一起压缩合并；

　　　　exclude：要排除的模块。有些模块有公共的依赖模块，在合并的时候每个都会压缩进去，例如一些基础库。使用 exclude 就可以把这些模块在压缩在一个更早之前加载的模块中，其它模块不用重复引入。

##seaJS

