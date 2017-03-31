# Canvas

## 1现实中需要什么东西来画图？
1. 画纸
2. 画笔

##２ Photoshop里面绘图的步骤？
1. 创建画布
2. 选择绘制工具（我们要学的是绘制路径，所以选了钢笔）
3. 先绘制路径
4. 对路径进行填充或者描边，真正把这个图形画到我们的画布上

##　2路径绘图API（绘制任意多边形）

1. 把“钢笔”移动到画布的某个位置上
	1. ctx.moveTo(x,y)
2. 把“钢笔”连线到画布的某个位置上
	1. ctx.lineTo(x,y)
2. 描边路径的api
	1. ctx.stroke()
2. 填充路径的api
	1. ctx.fill()
2. 描边路径的样式
	1. ctx.strokeStyle = 'red' 描边的颜色
	2. ctx.lineWidth = 5 线宽
3. 填充的样式
	1. ctx.fillStyle = 'blue' 填充的颜色
4. 路径的闭合
	1. ctx.closePath 把起点和终点链接到一起
2. 另起一个新的路径
	1. ctx.beginPath


## 3Canvas的width和height属性与style的宽高属性的关系

参考img标签。

canvas的widht和height属性，它们设置的是“Canvas内部的画布的宽高”，而canvas的style的width和height设置的是“Canvas标签本身的大小”。

“canvas内部的画布”相对于img标签来说，就是“img标签内部的图片”
canvas的style和img的style就是一样的了。都是设置的标签本身的宽高，然后会有源图像被压缩或者拉伸的效果。

# 绘制特殊图形的canvasAPI。

1. 绘制矩形的API。（矩形：rectangle）

	ctx.rect(100,100,100,200); //在路径上画了一个矩形

	ctx.strokeRect(50,50,50,50);// 直接绘制到画布上了，没有画路径

	ctx.fillRect(50,50,50,50);// 直接绘制到画布上了，没有画路径

	ctx.clearRect(50,50,50,50); // 矩形擦除

2. 圆形绘制的API
	1. ctx.arc(x,y,r,0,2*Math.PI); // 绘制了一个圆形的路径
		1. x,y 圆心坐标，r半径，后面的写死

3. 圆弧的绘制
	1. 弧度：
		1. 圆周长公式： l = 2πr （π是Math.PI）


## 上午的总结：

上午学习的API：

1. 自由绘制多边形 moveTo、lineTo
2. 绘制矩形：rect、fillRect、strokeRect、clearRectangle
3. 绘制圆弧：arc
4. 设置绘制的样式：
	1. stroke：strokeStyle、lineWidth
	2. fill：fillStyle
3. 另起一个新的路径：beginPath
4. 闭合当前路径：closePath 


## canvas绘制文字

ctx.fillText('hello world', x, y); 绘制实心文字
ctx.strokeText('hello world', x, y);绘制空心文字

ctx.font = '40px 微软雅黑' 设置字体，这个和css的font设置是一致的，所以要用px。

ctx.textAlign ='right'; // 横向的对齐

ctx.textBaseline = 'bottom'; // 文本的基线对齐

## Cavnas绘制图像

**绘图之前，必须确定图片元素已经完成了加载**

ctx.drawImage(...)

有三种传参方式：

三参数：传入图像元素，选取一个点，把图形那个点上，宽高和图像原宽高一致
五参数：传入图像元素，选取一个矩形，把源图像缩放绘制到矩形中
就参数：传入图像元素，原图上选取一个小图，canvas上选取一个矩形，把小图缩放绘制到canvas上选定的矩形中。

### 序列帧动画：

原理：从原图上截取每一帧动作的小图，然后循环播放。

序列帧动画的对象封装：

1. 对象自身应有的属性：
	
	精灵的位置（x,y,w,h），绘图需要的图像和上下文（img,ctx），动画每一帧的分解小图（array），当前帧（currentIndex）
2. 对象应有的函数：
	1. draw函数：用于根据对象自身的数据，把小图画到canvas上
	2. update函数：定时更新对象自身的数据。（当前帧，x,y坐标等）
3. 使用：
	1. 在定时器里
		1. 清空屏幕
		2. 调用draw函数绘制
		3. 调用update函数更新


# 相关工具

md阅读：visual studio code 或者 markdownPad2