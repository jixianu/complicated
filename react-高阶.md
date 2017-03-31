#react高阶
微软一篇文章中提过：
> 一份Bing的研究发现一个页面加载时间增加10ms就是花费站点250美元。

所以优化很重要

## react懒加载
- 根据判断页面高度与监听页面滚动事件、页面尺寸，渲染加载组件
[http://w33ble.github.io/understanding-react/demos/lazy-load.html](http://w33ble.github.io/understanding-react/demos/lazy-load.html)
- 使用插件lazyload  
[https://github.com/jasonslyvia/react-lazyload](https://github.com/jasonslyvia/react-lazyload)


##同构方案
因为SPA使用，客户端下载量大，网络爬虫抓取不到，所以有了同构方案。  
编写一次代码，在服务器上执行它来实施静态页面，同时执行于客户端以允许快速的交互。
使用Meteor是一个开源的JavaScript框架，基础构架是Node.JS + MongoDB
###服务器渲染
服务端渲染好处:

- SEO，让搜索引擎更容易读取页面内容
- 首屏渲染速度更快（重点），无需等待js文件下载执行的过程
- 更易于维护，服务端和客户端可以共享某些代码

###静态资源处理方案
###动态加载方案
###优化方案/CDN
###部署方案
[http://www.jianshu.com/p/0ecd727107bb](http://www.jianshu.com/p/0ecd727107bb)  