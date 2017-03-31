# 前段专业名词 #
-
##浏览器内核
浏览器内核主要分为两部分:渲染引擎和JS引擎
渲染引擎:负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。
JS引擎则：解析和执行javascript来实现网页的动态效果。
  最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。
常见浏览器内核:
Trident内核:IE,MAXThon,TT,搜狗
Gecko内核:FF,NetScape6及以上版
Presto内核:Opera7及以上版,Opera原为Presto,现在为Blink
Webkit内核:Safari,Chrome等 Chrome的:Blink(webkit的分支)
##SEO 
    seo是搜索引擎优化，是很多用户上网的入口，为了让用户更容易搜索到网站，提高网站搜索引擎
    的排名，就有了seo，搜索引擎抓取的是HTML文件，而单页面应用、AJAX动态加载是运行JavaScript之后才有的内容，所以搜索引擎抓取不到。
Meta标签优化
主要包括主题（Title)，网站描述(Description)，和关键词（Keywords）一般在5个上下。还有一些其它的隐藏文字比如Author（作者），Category（目录），Language（编码语种）等。
##CSS Hack
    解决不同浏览器不同页面效果的编程方法
    background-color:blue;      /*firefox*/
    后缀hack：
    background-color:red\9;      /*ie6~10*/
    background-color:red\0;      /*ie8~10*/
    background-color:red\9\0;   /*ie9,ie10*/
    background-color:red!important  /*ie7~10及其他非ie*/
    前缀hack：
    background-color:yellow;    /*ie8*/
    +background-color:pink;        /*ie7*/
    *background-color:pink;        /*ie7*/
    _background-color:orange;       /*ie6*/      
    :root #test { background-color:purple\9; }  /*ie9*/
    条件注释：
    gte 高等于 lte 低等于 ！非ie
    <!--[if gte ie 版本号]>要判断的内容<![endif]-->
    注意:因为当出现重复定义时，浏览器默认按最后一下渲染，所以一定要先正常，再*，最后_。
##BOM
+ window  是JS最顶层的对象,其他BOM对象都是window对象的属性
+ location 浏览器当前URL的信息
+ history 浏览器访问历史信息
+ screen 客户端屏幕信息
+ navigator 浏览器本身信息
+ document 文档对象
+ BOM对象中的一些方法:
//设置或获取对象指定的文件名或路径。	
    - alert(window.location.pathname);
//设置或获取整个 URL 为字符串。	
    - alert(window.location.href);
//设置或获取与 URL 关联的端口号码。	
    - alert(window.location.port);
//设置或获取 URL 的协议部分。
    - alert(window.location.protocol);
//设置或获取 href 属性中在井号“#”后面的分段。
    - alert(window.location.hash);
//设置或获取 location 或 URL 的 hostname 和 port 号码。
    - alert(window.location.host);
//设置或获取 href 属性中跟在问号后面的部分。
    - alert(window.location.search);
    
##全局对象
全局对象是预定义的对象(window)，作为 JavaScript 的全局函数和全局属性的占位符。通过使用全局对象，可以访问所有其他所有预定义的对象、函数和属性。全局对象不是任何对象的属性，所以它没有名称,全局属性和函数可用于所有内建的 JavaScript 对象。
全局对象中的方法有:
+ eval()  	计算 JavaScript 字符串，并把它作为脚本代码来执行。
+ isNaN() 	检查某个值是否是数字。
+ Number() 	把对象的值转换为数字。
+ parseFloat() 	解析一个字符串并返回一个浮点数。
+ parseInt() 	解析一个字符串并返回一个整数。
+ String()  	把对象的值转换为字符串。

##事件委托
    就是将子元素的事件绑定委托在父元素上，或者祖代元素上，如：
    在每个li元素上绑定鼠标移入事件
    $('#ul').on('mouseenter','.li',function(){})
##事件对象
在触发DOM上的某个事件时,会产生一个事件对象event,这个对象中包含着所有与事件有关的信息.
在事件对象函数中,对象this时钟等于currentTarget的值,而target则只包含事件的实际目标,
- IE9之前事件对象有很多需要兼容的地方

    + ie的事件对象保存在window中,而W3C中的事件对象保存在事件函数的形参中
    + ie的事件绑定,事件移除只支持attachEvent,detachEvent方法
    + ie的事件目标对象是event.srcElement
    + 阻止默认行为
    + 阻止冒泡
    + ie中没有事件捕获阶段
    
- Event对象的一些兼容写法

    + 获得event对象兼容性写法
    event || (event = window.event);
    + 获得target兼容型写法
    event.target||event.srcElement
    + 阻止浏览器默认行为兼容性写法
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    + 阻止冒泡写法
    event.stopPropagation ? event.stopPropagation() : (event.cancelBubble = true);
    + 注册和删除事件方法的形式
            // 绑定事件
            function on(id, eventType, fn) {
                var dom = this.isString(id) ? this.$id(id) : id;
                if(dom.addEventListener) {
                    dom.addEventListener(eventType, fn);
                } else {
                    if(dom.attachEvent) {
                        dom.attachEvent('on' + eventType, fn);
                    }
                }
            },
            // 解除绑定
            function un(id, eventType, fn) {
                var dom = this.$id(id);
                if(dom.removeEventListener) {
                    dom.removeEventListener(eventType, fn, false);
                } else {
                    if(dom.detachEvent) {
                        dom.detachEvent("on" + eventType, fn)
                    }
                }
            }
- Event对象的常用属性
    + pageX/pageY 光标相对于该页面的水平位置/垂直位置
    var pageX = event.pageX || event.clientX + document.documentElement.scrollTop;
    + clientX/clientY 光标相对于该客户区的水平位置/垂直位置
    + screenX/screenY 光标相对于该屏幕的水平位置/垂直位置
    + width/height 该窗口的宽度/高度
    + target 该事件被传送的到的对象
    + type 事件的类型
    
##内存泄漏
+ 内存泄漏是指我们已经无法再通过js代码来引用到某个对象，但垃圾回收器却认为这个对象还在被引用，因此在回收的时候不会释放它。导致了分配的这块内存永远也无法被释放出来。如果这样的情况越来越多，会导致内存不够用而系统崩溃.
+ 首先，能导致内存泄漏的一定是引用类型的变量，比如函数和其他自定义对象。而值类型的变量是不存在内存泄漏的，比如字符串、数字、布尔值等。
因为值类型是靠复制来传递的，而引用类型是靠类似c语言中的指针来传递的。
可以认为一个引用类型的变量就是一个指向某个具体的内存地址的指针。

+ 其次当我们用js代码创建一个引用类型的时候（以下简称对象），js引擎会在内存中开辟一块空间来存放数据，并把指针引用交给那个变量。内存是有限的，js引擎必须保证当开辟的对象没用的时候，把所分配的内存空间释放出来，这个过程叫做垃圾回收，负责回收的叫做垃圾回收器（GC）
+ 引起内存泄漏的常见情况:
    - 意外的全局变量:function foo (){ name = 'rose'},调用完了函数以后,变量仍然存在,导致泄漏.
    - 被遗忘的定时器或者回调:
            var someResource = getData();
            setInterval(function() {
                var node = document.getElementById('Node');
                if(node) {
                    node.innerHTML = JSON.stringify(someResource));
                }
            }, 1000);
    这样的代码很常见, 如果id为Node的元素从DOM中移除, 该定时器仍会存在, 同时, 因为回调函数中包含对someResource的引用, 定时器外面的someResource也不会被释放.
    - 没有清理的DOM元素引用
            var elements = {
            button: document.getElementById('button'),
            image: document.getElementById('image'),
            text: document.getElementById('text')
            };
            
            function doStuff() {
            image.src = 'http://some.url/image';
            button.click();
            console.log(text.innerHTML);
            }
            
            function removeButton() {
            document.body.removeChild(document.getElementById('button'));
            
            // 虽然我们用removeChild移除了button, 但是还在elements对象里保存着#button的引用
            // 换言之, DOM元素还在内存里面.
            }
    - 闭包
            window.onload = function(){
                var ele = document.getElementById("id");
                ele.onclick = function(){ //执行这段代码的时候，将匿名函数对象赋值给ele的onclick
                    属性；然后匿名函数内部又引用了ele对象，存在循环引用，所以不能被回收。
                    alert(ele.id); 
                 }
            }
            解决方案:
            window.onload = function(){
                var ele = document.getElementById("id");
                var id = ele.id; //解除循环引用
                ele.onclick = function(){
                    alert(id); 
                }
                ele = null; // 将闭包引用的外部函数中活动对象清除
            }
##JSON
JSON,JavaScript Object Notation是一种轻量级的数据交换格式。它基于ECMAScript的一个子集。 
JSON采用完全独立于语言的文本格式,可以形成复杂的嵌套格式，解析非常方便.
##AJAX
Asynchronous JavaScript and XML

    AJAX核心是XMLHttpRequest对象(XHR).
    IE7-:ActiveX对象
    IE7+:XMLHttpRequest对象
    原生JS:
            1.var xhr = new XMLHttpRequest;
            2.xhr.open('get/post', 'url',ture/false); //请求行:请求类型,请求地址,是否异步发送请求,默认true
            3.xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            //请求头:get方式可省略,post方式必须写设置解码方式
            4.xhr.send(null/data);//请求主体:get方式为null,post方式写键值对类型的需提交的数据
            5.xhr.onreadystatechange=function(){
               if(xhr.readyState == 4){
                    if((xhr.status>=200 && xhr.status<300) || xhr.status ==304){
                    }
                }
            };//监听XMLHttpRequest的状态,readystate请求/响应过程的当前活动状态:3接受,已经接受到
            部分响应数据,4完成已经接收到全部响应数据,而且已经可以应用了,status响应的HTTP状态
            6.xhr.responseText作为响应主体被返回的文本,
               xhr.response.XML如果响应的内容类型是"text/xml"或"application/xml",这个属性中将保存
                包含着响应数据的XML DOM文档
            7.response后得到JSON字符,需要解析,用evil(),安全性不好,用ES5中JSON.parse()兼容性不好

    jQuery.ajax:
               $.ajax({
				type: 'get/post', //请求方式
				url: '02.php', //请求地址
                        async:'true/false'  //是否异步
				dataType: "xml": 返回 XML 文档，可用 jQuery 处理。
                          "html": 返回纯文本 HTML 信息；包含的script标签会在插入dom时执行。
                          "script": 返回纯文本 JavaScript 代码。不会自动缓存结果。除非设置了"cache"参
                            数。'''注意：'''在远程请求时(不在同一个域下)，所有POST请求都将转为GET请求。(因为将使用DOM的script标签来加载)
                          "json": 返回 JSON 数据 。
                          "jsonp": JSONP 格式。使用 JSONP 形式调用函数时，如 "myurl?callback=?" 
                            jQuery 将自动替换 ? 为正确的函数名，以执行回调函数。
                          "text": 返回纯文本字符串
				data: {},   //发送到服务器的数据。将自动转换为请求字符串格式
                        beforeSend(), //发送请求之前调用此函数
				success: function () {}, //请求成功时调用此函数
				error: function () {} //请求失败时调用此函数
                jsonpCallback:String  //jsonp请求指定一个回调函数名。这个值将用来取代jQuery自动生
                成的随机函数名。这主要用来让jQuery生成度独特的函数名，这样管理请求更容易，也能方便地提 供回调函数和错误处理。
                你也可以在想让浏览器缓存GET请求的时候，指定这个回调函数名。

			});
            
                
##同源与跨域/JSONP
    同源策略是浏览器的一种安全策略，所谓同源是指，域名，协议，端口完全相同
    跨域,所取不同源的服务器的数据
    JSONP原理：利用src有跨域性
     首先在客户端注册一个callback, 然后把callback的名字传给服务器。服务器先生成 json 数据。
    然后以 javascript 语法的方式，生成一个function , function 名字就是传递上来的参数 jsonp.
    最后将 json 数据直接以入参的方式，放置到 function 中，这样就生成了一段 js 语法的文档，返回给客户端。
    客户端浏览器，解析script标签，并执行返回的 javascript 文档，此时数据作为参数，传入到了客户端预先定义好的 callback 函数里.（动态执行回调函数）
    
    
    var count = 0;
    // url
    //标准的URL应该是类似这样的网址 http://www.xx.com/xxx?a=1&b=2&callback=JSONP_CALLBACK&c=4
    // ，callback
    function jsonpGet(url,callback) {
    // 首先：每有一次新的请求，都创建唯一一个函数名
    var fnName = '__jsonp__' + count++;
    //全局函数,在数据返回调用的时候
    window[fnName] = function(data){
    callback(data);
    document.body.removeChild(scriptELem); // 收尾工作,清除script标签
    };
    // 创建一个script标签，把script的src设置成url，把script放到body上
    var scriptELem = document.createElement('script');
    var newUrl = url.replace('JSONP_CALLBACK',fnName);
    scriptELem.src = newUrl;
    document.body.appendChild(scriptELem);
     }
     //JSONP_CALLBACK只是一个形式,后面都被替换了,这样不用调用时手写不重名回调函数名
    jsonpGet('url?callback=JSONP_CALLBACK',function(data){
    console.log(data);
    })

##Comet/Web Sockets
    comet:能够让信息近乎实时的被推送到页面上,非常适合处理实时更新的数据
    comet方式:1.长轮询 : 浏览器定时向服务器发送请求,看有没有更新的数据
              方式2:HTTP流 : 浏览器向服务器发送一个请求,而服务器保持连接打开,然后周期性的向浏览器发送数据.在PHP版中: 
               <?php>
                    $i = 0;
                    while(true){echo "Number is $i"; flush(); sleep(10); $i++;}
              接受时,需要比较之前数据进行更新,然后在接受responseText,即
              xhr.onreadystatechange =function(){
                var result;
                if(xhr.readyState ==3){
                    //只取得最新数据并调整计数器
                    result = xhr.response.substring(received);
                    received += resulet.length;
                    
                    //调用progress回调函数
                    progress(result);}else if (xhr.readyState ==4){
                        finished(xhr.responseText);  }}}
          
      Web Sockets:ws://,加密的wss://使用了自定义协议,JS中创建Web Sockets之后,会有一个HTTP请
     求发送到浏览器以发起连接,取得服务器响应后,建立的连接会使用HTTP升级为Web Sockets协议
     只有支持Web Sockets协议的服务器才能正常工作,非常适合移动应用
       var socket = new WebSocket("ws://www.example.com/server.php");
        WebSocket.OPENING(0);  //正在建立连接;
        WebSocket.OPEN(1);  //已经建立连接;
        WebSocket.CLOSEING(2);  //正在关闭连接;  
        WebSocket.CLOSE(3);  //已经关闭连接,可以任何适合适合调用socket.close();关闭连接
     同源策略对Web Sockets不适用,Web Sockets只能通过连接发送纯文本数据,所以在发送数据之前,必须进行序列化,
         socket.send(JSON.sringify(message));
     接收数据:WebSocket对象就会触发message事件,返回的数据保存在event.data属性中
        socket.onmessage = function(event.data){
            var data = event.data;
            //处理数据
        }
                
##模板引擎
模板引擎的本质就是操作字符串,和DOM无关
前台使用模板引擎:模板字符串放在script标签中,通过DOM操作获取字符串
后台使用模板引擎:模板字符串放在文件中,读取整个文件,把文件放在html中
##HTTP协议状态码
    200(ok)
    302(“302″ : Found（临时移动）类似于301，但新的URL应该被视为临时性的替代，而不是永久性的)
    304(“304″ : Not Modified（未修改）自从上次请求后，请求的网页未被修改过。
                原来缓冲的文档还可以继续使用，不会返回网页内容。)
    403( “403″ : Forbidden（已禁止） 资源不可用。
                服务器理解客户的请求，但拒绝处理它。通常由于服务器上文件或目录的权限设置导致)
    404(“404″ : Not Found（未找到）无法找到指定位置的资源。)
    500(  “500″ : Internal Server Error（服务器内部错误）服务器遇到错误，无法完成请求。)

##实现继承的5种方式
+ 对象冒充
        function Parent(username){
            this.username = username;
            this.hello = function(){
            alert(this.username);
        }
        }
        function Child(username,password){
        //通过以下3行实现将Parent的属性和方法追加到Child中，从而实现继承
        //第一步：this.method是作为一个临时的属性，并且指向Parent所指向的对象，
        //第二步：执行this.method方法，即执行Parent所指向的对象函数
        //第三步：销毁this.method属性，即此时Child就已经拥有了Parent的所有属性和方法
        this.method = Parent;
        this.method(username);//最关键的一行
        delete this.method;
        
        this.password = password;
        this.world = function(){
        alert(this.password);
        }
        }
        var parent = new Parent("zhangsan");
        var child = new Child("lisi","123456");
        parent.hello();
        child.hello();
        child.world();
+ call()方法方式
        call方法是Function类中的方法
        call方法的第一个参数的值赋值给类(即方法)中出现的this
        call方法的第二个参数开始依次赋值给类(即方法)所接受的参数
        
        function test(str){
        alert(this.name + " " + str);
        }
        var object = new Object();
        object.name = "zhangsan";
        test.call(object,"langsin");//此时，第一个参数值object传递给了test类(即方法)中出现的this，而
        第二个参数"langsin"则赋值给了test类(即方法)的str
        
        function Parent(username){
        this.username = username;
        this.hello = function(){
        alert(this.username);
        }
        }
        function Child(username,password){
        Parent.call(this,username);
        
        this.password = password;
        this.world = function(){
        alert(this.password);
        }
        }
        var parent = new Parent("zhangsan");
        var child = new Child("lisi","123456");
        parent.hello();
        child.hello();
        child.world();
+ apply()方法方式
apply与call方式一样,就是参数不一样,
apply方法接受2个参数，
   A、第一个参数与call方法的第一个参数一样，即赋值给类(即方法)中出现的this
   B、第二个参数为数组类型，这个数组中的每个元素依次赋值给类(即方法)所接受的参数
+ 原型链方式
        function Person(){
        }
        Person.prototype.hello = "hello";
        Person.prototype.sayHello = function(){
        alert(this.hello);
        }
        
        function Child(){
        }
        Child.prototype = new Person();
        //这行的作用是：将Parent中将所有通过prototype追加的属性和方法都追加到Child，从而实现了继承
        Child.prototype.world = "world";
        Child.prototype.sayWorld = function(){
        alert(this.world);
        }
        
        var c = new Child();
        c.sayHello();
        c.sayWorld();
+ 混合式
        混合了call方式、原型链方式        
        function Parent(hello){
        this.hello = hello;
        }
        Parent.prototype.sayHello = function(){
        alert(this.hello);
        }
        
        function Child(hello,world){
        Parent.call(this,hello);//将父类的属性继承过来
        this.world = world;//新增一些属性
        }
        
        Child.prototype = new Parent();//将父类的方法继承过来
        
        Child.prototype.sayWorld = function(){//新增一些方法
        alert(this.world);
        }
        
        var c = new Child("zhangsan","lisi");
        c.sayHello();
        c.sayWorld();

##经典继承 -Object.create
    ES5提供的方法（IE9+ 开始支持）
    
    作用：实现继承，即：让一个对象（o2）继承自另外一个对象（o1）
    缺点：类型无关，即：创建的新对象是"没有"类型（类型是 object）
    var o1 = { 
        sayHi: function() {
            alert("hello，i am chuanchuan");
        }
    };
    
    var o2 = Object.create(o1);
    o2.sayHi();

    两种实现兼容的方式：
    // 1 给原生对象添加成员
    if(!Object.create) {
    Object.create = function() {
        // 构造函数
        function F() {}
        // 继承
        F.prototype = obj;
        return new F();
        };
    }
    
    // 2 统一使用新方法（推荐）
    var create = function( obj ) {
    if ( Object.create ) {
    return Object.create( obj );
    } else {
    
        function F() {}
        F.prototype = obj;
        return new F();
        }
    }

##原型链
    对象有原型对象，原型对象也是对象，所以，原型对象也有原型对象，这样一环扣一环，就形成了一条链式结构，叫做：原型链
    
    原型继承理解：
    任何对象都有一条原型链存在，所谓的继承就是通过任何手段，改变原型链的层次结构，
    那么，对象通过访问原型链中的属性或者方法，从而实现继承

    原型链结构的最上层是 Object.prototype，任何对象都直接或间接的继承自 Object.prototype,Object.prototype在往上原型链就是寻找到null
##覆盖原型对象
    原型对象被覆盖时,最好设置一个属性为constructor属性(构造函数的引用)指向构造函数,这样保持原型链完整
##属性、变量搜索原则
    在访问一个对象的属性的时候：
    1.首先在当前对象/作用域中找
    2.如果没有在其原型对象/上级作用域中找
    3.如果还没有继续根据原型链/作用域链往上找,直到null/报错
##面向对象的三大特性
    封装、继承、多态
##函数继承经典
    Function（当作是对象来看待） 是 Function（当作是构造函数来看待） 的实例，继承自Function.prototype，即：
    Function.__proto__ === Function.prototype
##递归函数
    1. 什么时候递归，即什么时候调用自己？
        将问题归结为已经解决过的问题（化归思想）
    2. 什么时候跳出递归？
        临界条件，即：结束递归的条件,return出结果
##词法作用域
    变量的作用范围, 在书写代码的时候就已经决定, 与运行时无关。
    即，它们在定义它们的作用域里运行，而不是在执行它们的作用域里运行。

    分割作用域的只有函数，也就是说只有函数 才会形成 作用域。
    当定义了一个函数，当前的作用域链就保存起来，并且成为函数的内部状态的一部分。
##创建函数三种方式,函数提升
    创建函数三种方式:1.函数声明 function foo(){}
                   2.字面量函数 var foo = function (){}
                   3.构造函数创建函数 var foo = new Function(){}
    函数提升:1.函数声明提升提升整个函数,不允许出现在其他语句中使用,不同浏览器解析过程不同,容易报错
            2.字面量与构造函数创建一个函数,提升的只是变量
    注意:在字面量函数创建时不需要写函数名,但要写了,函数名只能在函数本身内部使用
##闭包
    闭包是由 函数 以及 函数所处的环境 构成的综合体。
    或者
    闭包是引用了自由变量的函数。这个被引用的自由变量将和这个函数一同存在，
    即使已经离开了创造它的环境也不例外。
    在函数（outer）内部定义的函数（inner），执行的时候可以访问到上一级作用域中的变量。

    目标:想办法（在外部）访问到函数内部的数据
    作用:闭包对内部的变量起到了保护的作用，
         除了返回的函数之外，无法通过任何其他手段访问到函数内部的数据
    应用:实现数据缓存、模块化、设置私有变量
优点：
    当需要一个变量常驻内存时，闭包可以实现一个变量常驻内存 (如果多了就占用内存了)
    避免全局变量的污染
    私有化变量

缺点:
    因为闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存
    引起内存泄露
##沙箱模式
    用于为一些来源不可信、具备破坏力或无法判定程序意图的程序提供试验环境。然而，沙盒中的所有改动对操作系统不会造成任何损失。
    
    优势:将代码放到一个 立即执行的函数表达式(IIFE) 中，这样就能实现代码的隔离
    1 使用 立即执行的函数表达式 的好处就是：减少一个函数名称的污染，将全局变量污染降到最低
    2 代码在函数内部执行，形成了一个独立且外部无法访问的空间，这样就使得函数外部代码不会影响到函数内部的代码执行
    3 如果外部需要，则可以根据需求返回适当的数据。可以把window作为参数传入
##this
    函数调用模式中的 this 指的是 全局对象（window）
    方法调用模式中的 this 指的是 调用方法的对象
    构造器模式中的 this 指的是 新创建出来的对象
    在函数调用模式中 函数模式, 方法模式 与 构造器模式 this 都是固定的
    上下文（环境）
    特点：在上下文调用模式中, this 由上下文决定，上下文可以在调用时指定。
        有两种调用方法
        1> 函数名.apply( ... );
        2> 函数名.call( ... );
