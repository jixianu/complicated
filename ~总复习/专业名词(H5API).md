#前段名词
-
##HTML5新增API
+ 检测网络状态
    + 通过window.navigator.onLine可以返回当前的网络状态，返回一个布尔值
    + online,offline网络监听事件,用户网络连接时被调用,事件给window绑定
+ 全屏事件、伪类
    + Node.requestFullScreen()/Node.cancelFullScreen()  开关全屏事件
    + webkit内核浏览器：webkitRequestFullScreen、webkitCancelFullScreen，如chrome浏览器
    + Gecko内核浏览器：mozRequestFullScreen、mozCancelFullScreen，如火狐浏览器
    + document.fullScreen检测当前是否处于全屏
        + document.webkitIsFullScreen,检测当前是否处于全屏,如chrome浏览器
        + document.mozFullScreen,检测当前是否处于全屏,如火狐浏览器
+ 文件读取 
    + <input type="file" class="file">  //可以上传文件
    + <input>上传文件后得到的是一个FileList对象（伪数组形式）。
    + var reader = new FileReader; //可以实例化一个对象
    + reader.readAsDataURL(fileName);//读取文件
    + reader.onload//通过事件监听进度,reader.result//文件读取结果
+ 拖拽
    + 通过给元素添加draggable="true",设置元素是否可以被拖拽,图片、链接默认开启
    + 事件监听
        + ondrag 应用于拖拽元素,整个过程都会调用
        + ondragstart 应用于拖拽元素,开始时调用
        + ondragleave 应用于拖拽元素，当鼠标离开拖拽元素时调用
        + ondragend	应用于拖拽元素，当拖拽结束时调用
        + ondragenter	应用于目标元素，当拖拽元素进入时调用
        + ondragover	应用于目标元素，当停留在目标元素上时调用
        + ondrop		应用于目标元素，当在目标元素上松开鼠标时调用
        + ondragleave	应用于目标元素，当鼠标离开目标元素时调用
+ 获取地理信息
通过IP地址、三维坐标、GPS、Wi-Fi、手机信息等多种方式获取地址信息,
如下图对不同获取方式的优缺点进行了比较，浏览器会自动以最优方式去获取用户地理信息。
HTML5 Geolocation 规范提供了一套保护用户隐私的机制。必须先得到用户明确许可，才能获取用户的位置信息。
    + 获取当前地理信息
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options)
    + position.coords.latitude纬度
    + position.coords.longitude经度
    + position.coords.accuracy精度
    + position.coords.altitude海拔高度
    + options 对象可以调整位置信息数据的收集方式
        + enableHighAccuracy 高精度模式
        + timeout 超时设置(ms)
        + maximumAge 表示浏览器重新获取位置信息的时间间隔(ms)
    + 可以通过第三方API来实现地理定位信息
+ 历史管理
    + pushState(data, title, url) 追加一条历史记录
	 - data用于存储自定义数据，通常设为null
	 - title网页标题，基本上没有被支持，一般设为空
	 - url 以当前域为基础增加一条历史记录，不可跨域设置 
    + replaceState(data, title, url),替换当前url,不会增加/减少历史记录
    + onpopstate事件,当前进或者后退时触发,通过事件对象ev.state可以读取到储存的数据
+ web储存
    + document.cookie来进行存储的，但是由于其存储大小只有4k左右
    + sesstionStorage约5M,localStorage约20M
    + 只能存储字符串,通过JSON.stringify()编码后储存
    + window.sesstionStorage,生命周期是当前浏览器窗口决定的,同一窗口可以共享数据
    + window.localStrorage,永久生效,除非手动删除,可以多窗口共享
    + 方法:
        + setItem(key,value) 设置存储内容
        + getItem(key) 读取存储内容
        + removeItem(key) 删除键值为key的内容
        + clear() 清空所有存储内容
        + key(n) 以索引值来获取存储内容
+ 应用缓存
+ 多媒体
+ [canvas](./Cavnas基础API.html)
    






















  