# 前段专业名词 #
-


##git版本管理工具
在相应目录里打开右键，Git Bash Here
1. 配置用户名,邮箱:$ git config --global user.name "Your Name"
1.                     $ git config --global user.email "email@example.com"
1.     创建版本库:gti init
1.     向版本库中添加文件:    $git add readme.txt（实际上是暂存了起来）
1.     git commit -m "备注信息在这里输入"，保存文件当前版本。因为commit可以一次提交很多文件，所以你可以多次add不同的文件
     在修改txt文件，即目标文件后，可以通过`git status`查看一下文件的状态，使用`git diff`来查看修改前后两个版本的区别，然后可以操作add 与 commit 新增版本
1.     用`git log`查看一下git总共保存了几个版本，确认自己想要回退到哪个版本。
1.         使用`git log --pretty=oneline`可以看到单行版本
         在git中HEAD代表当前版本，而HEAD^则代表上一版本。
        输入`git reset --hard HEAD^`可以回到上一版本。
1.         如果想要回到reset之前的版本怎么办？`git reflog`查看全部的版本号，然后使用`git reset --hard 31d71e8`就可以了，注意这里的31d71e8就是我们查到的版本号。
1.     git checkout -- readme.txt`意思就是，把readme.txt文件在工作区的修改全部撤销
1.     这里有两种情况：
    + 一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
    + 一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态
- 先在文件系统中删除，然后再用`git rm test.txt`在版本库里也删除。（仅限于当前的版本）


##CMD、AMD、UMD
- AMD (Asynchronous Module Definition)是 RequireJS 在推广过程中对模块定义的规范化产出。
- CMD (Common Module Definition) 是 SeaJS 在推广过程中对模块定义的规范化产出。
- UMD (Universal Module Definition) 是 使用 UMD 规范定义的模块，其实就是兼容了 CommonJS + AMD + CMD 这些常见的模块定义规范
    + CMD
    在 Sea.js 中，所有 JavaScript 模块都遵循 CMD 模块定义规范。该规范明确了模块的基本书写格式和基本交互规则。在 CMD 规范中，一个模块就是一个文件。
    + AMD
    这样模块和模块的依赖可以被异步加载。这和浏览器的异步加载模块的环境刚好适应（浏览器同步加载模块会导致性能、可用性、调试和跨域访问等问题）。
    主要有两个Javascript库实现了AMD规范：require.js和curl.js。
    + CMD与AMD
    + 相同点：都是模块加载器
    + 不同点：
        + 规范定义角度：
        + SeaJS 采用的是 CMD 模块定义规范，RequireJS 采用的是 AMD 模块定义规范
        
        + 代码加载执行角度：seajs 与 requirejs
        + 从文件模块的加载角度来说，两者都是预加载：在代码开始执行的时候，就通过异步并行的方式把所有的 js 脚本文件下载到了本地
        
        + SeaJS 是在预加载、懒执行
        + RequireJS 是预加载、预执行
        
        + RequireJS 是预先加载所有的文件，执行的时候，是从最后的一个依赖的模块开始执行，
        + 往前倒序执行，这种代码执行顺序不适合程序员的顺序编程思维。
-  Asynchronous Module Definition，异步模块定义，所有的模块将被异步加载，模块加载不影响后面语句运行。所有依赖某些模块的语句均放置在回调函数中。

  + 区别：

     1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
     2. CMD 推崇依赖就近，AMD 推崇依赖前置。看代码：


         // CMD
         define(function(require, exports, module) {
             var a = require('./a')
             a.doSomething()
             // 此处略去 100 行
             var b = require('./b') // 依赖可以就近书写
             b.doSomething()
             // ...
         })
        
         // AMD 默认推荐
         define(['./a', './b'], function(a, b) { // 依赖必须一开始就写好
             a.doSomething()
             // 此处略去 100 行
             b.doSomething()
             // ...
         })
    
   -  使用 gulp 对 SeaJS 模块进行打包，打包后所有的define在一个文件的时，得用use调用
      
##CommonJS规范
- 一个单独的文件就是一个模块
- 每一个模块都是一个单独的作用域
- 每个文件对外接口是 `module.exports` 对象
  + 还有一个别名 `exports` 指向了 `module.exports` 接口对象
- `require` 方法用于加载模块，得到模块的 `module.exports` 接口对象
- `exports`接受不能赋值，应该是赋值属性，否则他的指针会被覆盖，除非                                                        module.exports=exports=foo(){};//连接赋值

##npm
    
##Nodejs