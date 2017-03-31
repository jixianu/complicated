# 前段专业名词 #
-
##ES5
### 开启严格模式:"use strict" 
        1 使用 不用var声明的变量
        2 delete 变量
        3 在语句块中使用函数声明
        4 eval ()语句受到限制,并且不再支持with
        5 当构建一个新的对象的时候,new必须写,以保证 this正确的工作
        6 不支持八进制
    
    -  getter和setter 语法糖
        get 属性名() {}
        set 属性名(v) {}
        可以实现只读功能

        // 使用getter 和 setter
        function Person(name) {
            return {
                get name() {
                    return name;
                },
                set name(v) {
                    name = v;
                }
            };
        }
        
        var p = new Person("jim");
        console.log(p.name);
        p.name = "tom";
        console.log(p.name);

### 数组的方法
      forEach： 让数组的每一项都执行一次给定的函数。
                arr.forEach(function(curValue, index) {});
      map：返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
           var returnNewArr = arr.map(function(curValue, index) {
                               return curValue * 2;
                            });
       filter函数：数组的过滤函数，对数组里的每一个元素都执行回掉函数，只留下回掉函数返回的项，生成一个新数组
                var data = [
                             {name: '张三', phone: '18612345678', state: '邀请中'},
                             {name: '李四', phone: '18612345679', state: '邀请中'},
                             {name: '王五', phone: '18612345670', state: '邀请中'}
                            ];
                var newArr = data.filter(function(user){
                return user.name=='张三';
                });
                console.log(newArr);

### Object.create
    var o2 =Object.create(o1);
    作用：实现继承，即：让一个对象（o2）继承自另外一个对象（o1）
    
### JSON对象 IE8+
      JSON对象中有两个方法:
        stringify():把JavaScript对象序列化为JSON字符串,第一个参数为JavaScript对象,第二个参数为一个函数/数组,过滤器(replacer),第三个参数是一个选项,表示是否在JSON字符串中保留缩进
        parse():把JSON字符串序列化为原声JavaScript值,第一个参数为SON字符串,第二个参数还原函数(reviver)
        
    -Object.defineProperty(obj,prop,descriptor)
    -document.getElementsByClassName
    -document.querySelector
    -window.getComputedStyle
##ES6
   
### 字符串的方法,判断一个字符串是否包含在另一个字符串中
   
    includes()：返回布尔值，表示是否找到了参数字符串。
    startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。
    endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。
    第一个参数:搜索的字符串,第二个参数:搜索的位置

    var str = "Hello world!";
    
    str.startsWith("world", 6) // true
    str.endsWith("Hello", 5) // true
    str.includes("Hello", 6) // false
    上面代码表示，使用第二个参数n时，endsWith 的行为与其他两个方法有所不同。
    它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。

### repeat()原字符串重复拼接,但不改变原字符串,需要新变量接收
    var str = 'hello';
    var newStr = str.repeat(3);
    console.log(newStr);  //hellohellohello 
### 模板表达式
    在反引号包裹的字符串中,使用$(NAME)语法来表示模板字符:
    var name = "Your name is $(first)$(last)";
    var url = "http://localhost:3000/api?messages/$(id)";

### 多行字符串
    可以利用反引号`连接多行字符串,如:
    var fourPoem = `You have the right to be you.You can only be you when you do your best`
    let multiLine = `
    This is
    a string
    with multiple
    lines`;

### String.raw()
使用String.raw 作为模板字符串的前缀，则模板字符串可以是原始(raw)的。反斜线也不再是特殊字符，\n 也不会被解释成换行符：
      let raw = String.raw`Not a newline: \n`;
      document.write(raw === 'Not a newline: \\n'); // true
### 拆包表达式
    var data = $('body').data() //假设data中有mouse和house的值
    house = data.house;
    mouse = data.mouse;
    ES6中替换为-->var {house,mouse} = $('body').data();

    var jsonMiddleware =  require('body-parser').json;
    ES6中替换为-->var {jsonMiddleware} = require('body-parser');

    var body = req.body //body中有用户名和密码
    username = body.username;
    password = body.password;
    ES6中替换为--> var {username,password} = req.body;

    ES6中数组:var [col1,col2] = $('.column'),[line1,line2,line3,line4] = file.split('n');


### ES6中改进的对象表达式
    //原函数
    var serviceBase = {port:3000,url:'azat.co'},
            getAccounts = function(){return [1,2,3]}

    var accountServicelES5 = {
        port:serviceBase.port,
        url:serviceBase.url,
        getAccounts:getAccounts,
        toString:function(){
            return JSON.stringify(this.valueOf())
        },
        getUrl:function(){
            return 'http://'+this.url+':'+this.port
        },
        valueOf_1_2_3:getAccounts()
    }

    //ES6改进的对象表达式
    var serviceBase = {port:3000,url:'azat.co'},
        getAccounts = function(){return [1,2,3]}
    var accountService= {
        //可以使用__proto__
        __proto__:serviceBase,
        getAccounts,    //ES6改进的对象表达式
        toString(){     //ES6改进的对象表达式
            //super方法
            return JSON.stringify((super.valueOf()))
        },
        getUrl(){       //ES6改进的对象表达式
        return 'http://'+this.url+':'+this.port},
        //动态索引
        ['valueOf_'+getAccounts().join('_')]:getAccounts()
    };



### promise
    
### 块级作用域的let和const
    let是一个更新的var,可以让你把变量作用域限制在当前块里.我们用{}来定义块,但是在ES5中这些花括号起不到任何作用
    const与let一样具有块级作用域,不能变量提升,必须先声明后再使用,不可重复声明,不可重复赋值

    //ES5中{}不起任何作用
    function getAmount(vip){
        var amount = 0;
        if(vip){
            var amount =1
        }
        {var amount=100{var amount=1000}}
        return amount; 
    }
    console.log(getAmount(true)); //1000
    //ES6中let与{}可以限制变量作用域
    function getAmount(vip){
        let amount = 0;
        if(vip){
            let amount =1
        }
        {let amount=100{let amount=1000}}
        return amount; 
    }
    console.log(getAmount(true)); //0 如果if后没有{}结果1

    //ES5中的for循环可以用let来解决调用问题
    var a = [1,2,3,4,5,6];
    for (let i = 0; i < a.length; i++) {     
        a[i]=function(){
            document.write(i); 
        } 
      };
      a[4]()   //打印的是对应的0~5 如果是var,调用时均则打印6个6

    //ES6中const为常量,仅仅产生是一个不可变的变量,并且它的作用域与let一样只有块级
    function getAmount(vip){
        const amount = 0;
        if(vip){
            const amount =1
        }
        {const amount=100{const amount=1000}}
        return amount; 
    }
    console.log(getAmount(true)); //0 因为是常量而且是块级作用域,这些定义都是有效的


### ES6中的类:
    ES6的类会用prototype来实现而不是function.
    //现在有一个baseModel类,其中我们可以定义构造函数和getName()方法
    class baseModel{
        constructor(options={},data=[]){// class constructor
            this.name = 'Base'
            this.url = 'http://azat.co/api'
            this.data = data
            this.options = options
        }
        getName(){
            console.log(`Class name:$(this.name)`)
        }
    }
    //使用NAME extends PARENT_NAME语法,AccountModel从baseModel继承而来
    class AccountModel extends baseModel {
        constructor(option,data){
            //调用父类构造函数时,只需带上参数轻松的调用super()方法
            super({private:true},['321123','546654']) //call the parent method with super
            this.name = 'Account Model'
            this.url += '/accounts'
        }
        get accoutsData(){//返回计算后的数据
            //..make XHR
            return this.data
        }
    }

    let accounts = new AccountModel(5)
    accounts.getName()
    console.log('Data is %s',accounts.accoutsData)
    //Class name:Account Model
    //Data is 321123,546654


### ES6中的模块化
    ES5中你会用script标签和IIFE(立即执行函数),或者是其他的像AMD之类的库,
    但是ES6中你可以用export来暴露你的类.
    //在ES5中的module.js
    module.exports = {
        port:3000,
        getAccounts:function(){
            ...
        }
    }
    //在main.js中,用require('模块')来导入:
    var service = require('module.js')
    console.log(service.port) //3000

    //在ES6中,我们用export和import.module.js文件中
    import {port,getAccounts} from 'module'
    console.log(port) //3000
    //或者直接在main.js中引入所有的变量
    import * as service from 'module'
    console.log(service.port) //3000

### Number的新方法:
Number.isFinite()用来检查一个数值是否非无穷（infinity）

    Number.isFinite(15); // true
    Number.isFinite(0.8); // true
    Number.isFinite(NaN); // false
    Number.isFinite(Infinity); // false
    Number.isFinite(-Infinity); // false
    Number.isFinite("foo"); // false
    Number.isFinite("15"); // false
    Number.isFinite(true); // false
Number.isNaN()用来检查一个值是否为NaN

    Number.isNaN(NaN); // true
    Number.isNaN(15); // false
    Number.isNaN("15"); // false
    Number.isNaN(true); // false

Number.isInteger()用来判断一个值是否为整数

    Number.isInteger(25) // true
    Number.isInteger(25.0) // true
    Number.isInteger(25.1) // false
    Number.isInteger("15") // false
    Number.isInteger(true) // false
### Math对象
Math对象新增的方法，都是静态方法，只能在Math对象上调用。

Math.trunc()：去除一个数的小数部分，返回整数部分。

    Math.trunc(4.1) // 4
    Math.trunc(-4.1) // -4
注意：对于空值和无法截取整数的值，返回NaN。

Math.sign()：判断一个数到底是正数、负数、还是零。
返回五种值：参数为正数，返回+1；参数为负数，返回-1；参数为0，返回0；参数为-0，返回-0;其他值，返回NaN。

    Math.sign(-5) // -1
    Math.sign(5) // +1
    Math.sign(0) // +0
    Math.sign(-0) // -0
    Math.sign('hubwiz'); // NaN

Math.cbrt：计算一个数的立方根。

    Math.cbrt(-1); // -1
    Math.cbrt(0);  // 0
    Math.cbrt(2);  // 1.2599210498948732

Math.fround：返回一个数的单精度浮点数形式。

    Math.fround(0);     // 0
    Math.fround(1.337); // 1.3370000123977661
    Math.fround(NaN);   // NaN

Math.hypot：返回所有参数的平方和的平方根。

    Math.hypot(3, 4);        // 5
    Math.hypot(3, 4, 5);     // 7.0710678118654755
    Math.hypot();            // 0
    Math.hypot(NaN);         // NaN
    Math.hypot(3, 4, 'foo'); // NaN
    Math.hypot(3, 4, '5');   // 7.0710678118654755
    Math.hypot(-3);          // 3

如果参数不是数值，Math.hypot方法会将其转为数值。只要有一个参数无法转为数值，就会返回NaN。

Math.expm1(x)：返回ex - 1。

    Math.expm1(-1); // -0.6321205588285577
    Math.expm1(0);  // 0
    Math.expm1(1);  // 1.718281828459045

Math.log1p(x)：返回1 + x的自然对数。如果x小于-1，返回NaN。

    Math.log1p(1);  // 0.6931471805599453
    Math.log1p(0);  // 0
    Math.log1p(-1); // -Infinity
    Math.log1p(-2); // NaN

Math.log10(x)：返回以10为底的x的对数。如果x小于0，则返回NaN。

    Math.log10(2);      // 0.3010299956639812
    Math.log10(1);      // 0
    Math.log10(0);      // -Infinity
    Math.log10(-2);     // NaN
    Math.log10(100000); // 5

Math.log2(x)：返回以2为底的x的对数。如果x小于0，则返回NaN。

    Math.log2(3);    // 1.584962500721156
    Math.log2(2);    // 1
    Math.log2(1);    // 0
    Math.log2(0);    // -Infinity
    Math.log2(-2);   // NaN
    Math.log2(1024); // 10

三角函数方法

    Math.sinh(x) 返回x的双曲正弦（hyperbolic sine）
    Math.cosh(x) 返回x的双曲余弦（hyperbolic cosine）
    Math.tanh(x) 返回x的双曲正切（hyperbolic tangent）
    Math.asinh(x) 返回x的反双曲正弦（inverse hyperbolic sine）
    Math.acosh(x) 返回x的反双曲余弦（inverse hyperbolic cosine）
    Math.atanh(x) 返回x的反双曲正切（inverse hyperbolic tangent）
### Array
- Array.from方法用于将两类对象转为真正的数组：
类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。

    let list = document.querySelectorAll('ul.fancy li');
     
    Array.from(list).forEach(function (li) {
      document.write(li);
    });
任何有length属性的对象，都可以通过Array.from方法转为数组。
Array.from()还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理。

    let array = [0,1,2,3,4];
    let arrNew = Array.from(array, x => x * x);
    console.log(arrNew);
    // 等同于
    let arrNew = Array.from(array).map(x => x * x);

- Array.of方法用于将一组值，转换为数组。

      Array.of(3, 11, 8) // [3,11,8]
      Array.of(3) // [3]

- 数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

    let array = [1, 4, -5, 10].find((n) => n < 0);
    document.write("array:", array);

上面代码找出数组中第一个小于0的成员。

    let array = [1, 5, 10, 15].find(function(value, index, arr) {
      return value > 9;
    }) 
    document.write(array);  // 10

上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

- 数组实例的findIndex方法，用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

    let index = [1, 5, 10, 15].findIndex(function(value, index, arr) {
      return value > 9;
    }) 
    document.write(index);  // 2

这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。

另外，这两个方法都可以发现NaN，弥补了数组的IndexOf方法的不足。

    [NaN].indexOf(NaN)
    // -1
     
    [NaN].findIndex(y => Object.is(NaN, y))
    // 0

上面代码中，indexOf方法无法识别数组的NaN成员，但是findIndex方法可以借助Object.is方法做到。

fill()使用给定值，填充一个数组。

    let arr = ['a', 'b', 'c'].fill(7)
    document.write(arr);  // [7, 7, 7]
     
    let newArr = new Array(3).fill(7)
    document.write(newArr);  // [7, 7, 7]

上面代码表明，fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

- 数组实例的fill()还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

    let newArr = ['a', 'b', 'c'].fill(7, 1, 2)
    document.write(newArr);   // ['a', 7, 'c']

- ES6提供三个新的方法：

    entries()
    keys()
    values()

用于遍历数组。它们都返回一个遍历器，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

    for (let index of ['a', 'b'].keys()) {
      document.write(index);
    }
    // 0
    // 1
     
    for (let elem of ['a', 'b'].values()) {
      document.write(elem);
    }
    // 'a'
    // 'b'
     
    for (let [index, elem] of ['a', 'b'].entries()) {
      document.write(index, elem);
    }
    // 0 "a"
    // 1 "b"

###Object对象
- 属性的简洁表示法,ES6允许直接写入变量和函数，作为对象的属性和方法

      var Person = {
            name: '张三',
            birth:'1990-01-01',
            // 等同于hello: function ()...
            hello() { document.write('我的名字是', this.name); }
          };
        Person.hello();

这种写法用于函数的返回值，将会非常方便。

    function getPoint() {
      var x = 1;
      var y = 10;
      return {x, y};
    }
    getPoint()   // {x:1, y:10}

- 属性表达式
ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。
        
        let propKey = 'foo';
       
        let obj = {  
            [propKey]: true,['a'+'bc']: 123
        };

表达式还可以用于定义方法名。

    let obj = {
      ['h'+'ello']() {
        return 'hi';
      }
    };
     
    document.write(obj.hello()); // hi
- Object.is()用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致，不同之处只有两个：一是+0不等于-0，二是NaN等于自身。

        +0 === -0 //true
        NaN === NaN // false
         
        Object.is(+0, -0) // false
        Object.is(NaN, NaN) // true

- Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）。
它至少需要两个对象作为参数，第一个参数是目标对象，后面的参数都是源对象。只要有一个参数不是对象，就会抛出TypeError错误。

注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。

    var target = { a: 1, b: 1 };
     
    var source1 = { b: 2, c: 2 };
    var source2 = { c: 3 };
     
    Object.assign(target, source1, source2);
    target // {a:1, b:2, c:3}

- proto属性

proto属性，用来读取或设置当前对象的prototype对象。该属性一度被正式写入ES6草案，但后来又被移除。目前，所有浏览器（包括IE11）都部署了这个属性。

    // es6的写法
     
    var obj = {
      __proto__: someOtherObj,
      method: function() { ... }
    }
     
    // es5的写法
     
    var obj = Object.create(someOtherObj);
    obj.method = function() { ... }

- Symbol数据类型
ES6引入了一种新的原始数据类型Symbol，表示独一无二的ID。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。
        let s = Symbol();
         
        typeof s
        // "symbol

注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象,Symbol类型的值不能与其他类型的值进行运算，会报错。
- Proxy内置代理 

###fucntion函数

- 默认参数:可以在函数签名中直接设置默认值
        //运用ES6的默认参数
        function sayHello2(name='hubwiz'){
            document.write(`Hello ${name}`);
        }
        sayHello();  //输出：Hello hubwiz
        sayHello('汇智网');  //输出：Hello 汇智网
        sayHello2();  //输出：Hello hubwiz
        sayHello2('汇智网');  //输出：Hello 汇智网
- rest参数（形式为“...变量名”）可以称为不定参数，用于获取函数的多余参数，这样就不需要使用arguments对象了。
rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
    function add(...values) {
       let sum = 0;    
       for (var val of values) {
          sum += val;
       }     
       return sum;
    }     
    add(1, 2, 3) // 6
不定参数的格式是三个句点后跟代表所有不定参数的变量名。比如以上示例中，...values 代表了所有传入add函数的参数。

- 扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。该运算符主要用于函数调用。
它允许传递数组或者类数组直接做为函数的参数而不用通过apply。

        var people=['张三','李四','王五'];     
        //sayHello函数本来接收三个单独的参数people1，people2和people3
        function sayHello(people1,people2,people3){
            document.write(`Hello ${people1},${people2},${people3}`);
        }     
        //但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
        sayHello(...people);   //输出：Hello 张三,李四,王五     
        //而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
        sayHello.apply(null,people);   //输出：Hello 张三,李四,王五 

- 箭头函数
    箭头函数可以让我们不再用that=this或self=this或_this=this或者.bind(this)这样的代码
    //ES5 
        var _this =  this;
        $('.btn').click(function(event){
            _this = sendData()
        })
    //ES6无需_this
        $('.btn').click((event)=>{
            this = sendData()
        })
    
    //ES5
        var logUpperCase =function(){
            var _this = this;
            this.string = this.string.toUpperCase()
            return function(){
                return console.log(_this.string)
            }
        }
        logUpperCase.call({ string:'es6 rocks'})()
        //ES6中无需_this
        var logUpperCase =function(){
            this.string = this.string.toUpperCase()
                return ()=>console.log(this.string)
        }
      logUpperCase.call({ string:'es6 rocks'})()
        
    注意:在ES6中可以合理的吧箭头函数和旧式function函数混用.当箭头函数所在语句只有一行时,它就会变成一个表达式,它会直接放回这个语句的值.但是如果你有多行语句,你举要明确的使用return

    //ES5中利用message数组创建一个数组的代码:
      vas ids = ['56789srv','78990uru']
      var messages = ids.map(function(value){
            return 'ID is' + value //显示返回
        })
    //ES6中,单个参数可以不加()
      var messages = ids.map(value => `ID is $(value)`) //隐式返回
    //ES6中,多个参数需加()
      var messages = ids.map((value,index,list) => `ID of ${index} element is ${value}`) //隐式返回

- 函数绑定运算符是并排的两个双引号（::）
双引号左边是一个对象，右边是一个函数。该运算符会自动将左边的对象，作为上下文环境（即this对象），绑定到右边的函数上面。

        let log = ::console.log;
        // 等同于
        var log = console.log.bind(console);
         
        foo::bar;
        // 等同于
        bar.call(foo);
         
        foo::bar(...arguments);
        i// 等同于
        bar.apply(foo, arguments);
- 尾调用优化，即只保留内层函数的调用帧，这样可以节省内存。


### Set函数



##Babel


    