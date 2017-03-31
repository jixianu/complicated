# 前段专业名词 #
-
##单页面应用

单页面应用程序（single page application），简称SPA，指大部分用户交互和网络访问都在同一张页面内完成，不需要浏览器去刷新页面的网页应用程序        
##AngularJS
- 一种构建动态Web应用的结构化框架
- AngularJS会把数据放置在名为作用域（scope）的对象里面，并把作用域对象通过指令绑定到一个HTML标签上
- 模块`var app = angular.module('s7.app', [])`，第一个参数是项目名.模块名，第二个参数是模块依赖项，AngularJs用于组织代码的方式，就是它自带的模块系统，先创建模块，再根据不同需求把不同代码写在不同的模块部件里面。
- 控制器`app.controller('MainController', function ($scope, $rootScope) {})`最常见的应用就是提供一个作用域对象，用于把它绑定到HTML标签上,$scope当前控制器的作用域, $rootScope根作用域，代码启动会自动生成

- 服务是给Controller等AngularJs模块部件提供服务对象,封装一些程序全局各处都会共享的对象。
    app.factory('modelService',function(){ 
    var serviceObject = {} 
    // 这个被返回的对象，就可以在创建Controller的回调中，它的参数表里直接写服务名，就可以拿到这个服务对象。
    // 其实也不只是Controller，其他的app.xxx创建出来的AngularJs模块部件也可以用类似的方式来使用服务
    return serviceObject;
    })
    // 这里的modelService就是我们创建的modelService服务的服务对象
    app.controller('MainController',function($scope,modelService){})
    
    app.service('modelService',function(){

        // service和factory的区别
        // service服务对象是直接以构造函数的方式执行回调函数，得到的对象作为服务对象，返回构造函数
        // factory的服务对象则是回调函数的返回值，返回对象
        this.msg = 'hello world';
        this.name = 'model service';
    });
    
- MVVM思想：把程序分成三个曾
    + 模型（Model）：数据层，提供绝大多数的数据与操作数据方法
    + 视图（View）：视图层，在MVVM模式下， View层通过某种书写好的模板和View Model连接起来
    + 视图模型（View Model）：和界面息息相关的数据，只要操作视图模型中的代码，通过单双项绑定就可以生成View层
- MVC思想:
    + 模型（Model）：数据层，提供绝大多数的数据与操作数据方法,通过DOM操作生成视图层
    + 视图（View）：视图层
    + 控制(Controller):控制层,监视用户对界面的操作,触发控制层里的函数(Action),修改Model层
- MVVM编程思想:
    + 分析应用的需求,列出我们要实现的功能
    + 思考实现这些功能时,背后必要的数据有哪些,并确定Model层的雏形
    + 逐个分析界面,确定View Model层的雏形
    + 写界面,把M>VM>V的数据流打通,并逐个完整整个程序
- 指令的用途:
    + 把HTML的一些片段封装起来，以后用的时候直接写指令对应的标签就可以了，不需要复制代码，也不需要复制之后再去重新写绑定。
    + 可以把AngularJs的指令和JavaScript的函数对比着来看：
    相似点：
      1. 它们都封装了代码，重复利用。（AngularJs的指令封装的是HTML和一些跟标签相关的绑定,函数封装的是JavaScript代码）
     2. 它们为了能够最大限度的重复利用，都有一个从外部传数据到内部的机制。（AngularJs的指令用的是scope字段里面的对象，函数用的是传参）
+ 自定义指令:
    - app.directive用于创建AngularJS的指令,第一个参数是:指令的名字,在网页中应用时解析时会把驼峰式命名变成-连接的模式,第二个参数是回调函数,回调函数返回的对象,其中字段名都是angular规定好的
    - 
            app.directive('s7Demo', function () {
                return {
                    template:`
                        <div>demoAt：{{demoAt}}</div>
                        <div>demoEqual：<input type="text" ng-model="demoEqual"></div>
                        <div>demoLess：<input type="text" ng-model="demoLess"></div>
                        <div>demoAnd：{{demoAnd()}}</div>`,
                    scope:{
                        demoAt:"@", // 直接绑定字符串
                        demoEqual:"=",
                        demoLess:"<", // 绑定的是AngularJs表达式的值，单向绑定
                        demoAnd:"&" // 它绑定到指令内部作用域的，不是一个值，而是一个函数，函数执行之后能够得到值
                    },
                    // 约束:
                    //      输入A，代表用属性的方式，指定被指令绑定的标签。
                    //      输入E，代表用标签名的方式，指定标签。
                    // 下面两种尽量避免使用：
                    //      输入C，代表用css类的方式指定标签。ng-cloak
                    //      输入M，代表用注释的方式指定标签。
                    restrict: "AE",
                    link: function (scope, ele, attrs) {
                        // 监听作用域上的数据变化，完成一个手动的数据绑定功能
                        // 当数据变化时，手动更新视图，需要用到作用域上的$watch函数
                        scope.$watch('demoData', function () { });
            }
            });
- 路由
    - 单页面应用大量使用了ajax技术，完成页面的局部刷新,解决页面内容变化时,url也跟着变化,便于分享
    - 怎么解决路由问题:用锚点的方式，来解决路由问题。锚点是链接到本页面上的某些元素的位置，
 所以说，锚点链接是不刷新页面的，但是会改变URL。所以，依据这个特性，我们就可以用hash来存储当前页面的状态。
    -  AngularJs本身的路由机制：
    指定一份HTML模板，再指定一给controller，当用户访问我们注册好的"#/...."类型的path（AngularJs的path而不是浏览器的path）时，把控制器的作用域绑定到HTML模板上，再展示给用户看。
+ **ng-route详细的使用方法**
    - 准备每一个分页面的template（HTML代码）和controller。
    - 写主页面：
        1. 引入AngularJs包，引入ng-route的包，创建s7.app的模块时，别忘了依赖ngRoute模块。（`var app = angualr.module('s7.app',['ngRoute'])`）
        2. 在页面上挖个坑，用来填我们的分页面。（ng-view）一个页面上，只能有一个坑。
        3. 用config来设置如何做路由,设置地址与路由如何绑定。（如何根据路径来填坑）
                // $routeProvider就是我们路由的“设置器”
                app.config(function($routeProvider){
                    $routeProvider
                        .when('/index',{
                            templateUrl:'....', // HTML片段的文件路径
                            controller:'....', // 控制器的名字
                        })
                        .when( .... )
                        .otherwise({
                            // 如果所有的路径配置都没有满足，就访问otherwise里面的内容
                            template:"<div>您所访问的页面不存在</div>"
                        })
                })

+ 路由的参数
    1. 我们在设置路由的路径时，还可以用冒号的方式来设置路由的参数：
            $routeProvider.when('/detail/:id/:name',{....})
    2. 我们在这里设置了`id`和`name`两个参数。
    3. 我们可以在路由的控制器里，获得这些路由参数：
            detailModule.controller('DetailController',function($scope,$routeParams){
                    // 着这里$routeParams就存储着路由的参数和参数的值
            })

+ 路由的重定向 
         $routeProvider       
            .when('/default',{
                redirectTo:'/detail/4'
        })
