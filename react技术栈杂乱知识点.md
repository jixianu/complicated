###知识点
- 反向数据流：底层的组件通过某种方式更新了上层的组件的state，这样就叫做反向的数据流。
    ![反向数据流](http://i.imgur.com/j2Ovm0p.jpg)
        var FilterableProductTable = React.createClass({
          handleSearch : function(search) {
              //searchText为输入框的值，在此函数内可以改变state
              this.setState(search)
              //之后的逻辑省略
          }
          render : function () {
              return (
                <div className="wrapper">
                  <SearchBar onSearch={this.handleSearch} />
                  <ProductTable productList={this.data} />
                </div>
              );
          }
        });
        var SearchBar = React.createClass({
          handleEnter : function(e) {
            //...省略前面的判断逻辑
            /*获取到输入框和checkbox的值之后，利用props传递到父组件，
              在这里实现了反向的数据流
            */
            this.props.onSearch({searchText : searchText,isChecked : false})
          },
          handleChange : function(e) {
          },
          render : function() {
            return (
              <form>
                <input type="text" onKeyPress={this.handleEnter} /><br/>
                <input type="checkbox" onChange={this.handleChange} />
                <label>only show in stock</label>
              </form>
            );
          }
        });
- 
props：是父组件向子组件传递数据的方式
state：是存在React组件的内部，是一个状态机，根据状态改变更新view层

- ES6中的字符串$(this.id)来拼接变量

- ES6中的循环，在循环中给每一个唯一的key值属性便于储存，提高DIFF算法的效率
 
- react的ES6写法，不用写getInitialState方法，可以直接在组件的constructor中定义this.state的值，来做到初始化数据

- 
super：访问父对象上的函数
super（[arguments]） ：访问父对象上的构造函数
super.fucObjectOnParent([arguments]) ：访问父对象上的方法

- JSX中组件的标签不需要内容时，可以用单标签，类型用className<Item className='' />

- 
在ES6中，class声明的类，自定义方法不会绑定在构造函数的实例中，所以需要手动绑定，例如：
        export default class App extends React.Component {
          constructor(props) {
            super(props);
        
            this.state = {
              items: []
            };
            
            this.selectItem = this.selectItem.bind(this);
            ...
          }

- ES6中的箭头函数默认返回值
        () => (
            <h2>这是App</h2>
        );

- 无状态函数式组件：没有内部state，不需要组件生命周期函数，只根据输入生成组件，没有其他的作用，没有数据渲染，没有事件
    直接导出一个函数，只有一个参数props，就是传入的属性，例如：
        // 声明处
        function ListItem({ item，onClick }) {
          // 返回JSX结构
          return (
            <a href="javascript:;" className="" onClick = {onClick}>
              <span className="">
                { item.context }
              </span>
            </a>
          );
        }

        // 调用处，onSelect是父组件List的父组件需要传入的回调函数
        <ListItem item={item} onClick={() => onSelect(item.id)}   />

- 生命周期，一般使用componentDidMount与componentWillUnmount
componentDidMount：组件初始化完成的时候：绑定事件监听，ajax事件
componentWillUnmount：组件卸载的时候：清除绑定事件监听；

![](http://i.imgur.com/FaT1URw.png)

- this.setState({item},()=>{})：设置数据中的item：item，后为一个callback回调函数，即设置更新数据后的一个事件执行

- 验证：在react中引入PropTypes属性验证，然后添加给组件，验证组件属性，例如：
        // 加载依赖
        import React, { PropTypes } from 'react';
        // 属性验证
        const propTypes = {
            // 验证JS类型，或必填
            object : PropTypes.object.isRequired,
            function : PropTypes.func.isRequired,
            string : ProTypes.string,
            array : PropTypes.array,
            boole : PropTypes.bool,
            number : PropTypes.number,
            // 验证reactElement类型
            element : PropTypes.element,
            // 验证别的组件的实例
            message : PropTypes.instanceOf(Message),
            // 验证规定为一组值其中的一个
            enum : PropTypes.oneOf(['News',111,{}]),
            // 验证规定的一组类型
            union : PropTypes.oneOfType([{
                ProTypes.string,PropTypes.array,PropTypes.instanceOf(Message)
            }]),
        }
        // 添加验证
        ListItem.propTypes = propTypes;
        // 导出组件
        export default ListItem;

- node的uuid模块
    需要安装uuid的库，然后引入
    import uuid from 'uuid';
    // 生成随机唯一的id值
    item.id = uuid.v4();

- 
React默认会进行HTML的转义，避免XSS攻击
XSS攻击：跨站脚本攻击(Cross Site Scripting)，为不和层叠样式表
如果考虑不转译的，
        ReactDOM.render(
            <div dangerouslySetInnerHTML={{__html: "<strong>content</strong>"}}></div>,
            document.body
        );
如果是markdown的形式转换成HTML,利用marked包实现，
        // 引入依赖
        import marked from 'marked';
        // 将content转译
        const markDownContent = content ;
        // 渲染
        ReactDOM.render(
            <div dangerouslySetInnerHTML={{__html: markDownContent }}></div>,
            document.body
        );

- ES6从模块中，取方法，使用ES6的解构
import { Dispatcher } from 'flux'; // 需要在{}前后空格，要不解析会报错
- node有个模块叫rimraf
    npm install rimraf node_modules 可以删除node包，手动删除过慢

- react中注释
        {/*这里是注释*/}
        {/*这里是会报错无法识别JSX语法
        */}
- 约定大约配置
this.state赋值而不是用this.setState会破坏单向数据流，不推荐

- 默认属性
        static defaultProps = {} 需要引入babel-stage-0~3
        static propsTypes={} 默认校验属性
- 在父组件getChildContext方法传递参数，子组件用this.context.color获取


    var A = React.createClass({
        // 不通过验证，是不会传递的
        childContextTypes: {
             name: React.PropTypes.string.isRequired
             fruit: React.PropTypes.string.isRequired
        },
        getChildContext: function() {
             return {
                 name: "Jonas",
                 fruit: "Banana"
             };
        },
        render: function() {
             return <B />;
        }
    });
    var B = React.createClass({
        contextTypes: {
            fruit: React.PropTypes.string.isRequired
        },
        render: function() {
            return <div>My favorite fruit is: {this.context.fruit}</div>;
        }
    });
    
    React.render(<A />, document.body);

- react锚点
    window.location.hash.substr(1) 获取锚点
- 使用route文件中建立app.js入口return <Router>文件，在rudex中用<App />有利于服务器渲染
- redirect 重定向路由，绝对路由、相对路由两个钩子，会被执行
- 缓存使用indexDB存数据，存个过期时间
- Link标签会被渲染成a标签，里面不要包裹东西

