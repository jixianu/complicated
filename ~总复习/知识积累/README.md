# 知识积累
-
##图片小与1M的情况下可以使用base64码来代替，可以节省请求
[案列demo](./img-base64/img-base64.html)

##文字渲染优化
- 灰阶渲染是一种通过控制字体轮廓上像素点的亮度达到字体原始形状的方法。
- 亚像素渲染利用了LCD屏（液晶屏）中每个像素是由R、G、B三个亚像素的颜色和亮度混合而成一个完整像素的颜色这一原理，将字体轮廓上的像素点由三个亚像素体现以达到原始形状的方法。
- 区别
    亚像素渲染与灰阶渲染相比，分辨率在垂直方向放大了三倍，因此渲染效果更好，但是所耗内存也更多。因此在手机屏上，为了减少CPU开销，并未采用该字体渲染方法，而是采用的grayscale渲染。
在windows下是GDI(Graphics Device Interface)和DirectWrite，OS X下是Quartz。

在文字渲染的时候会出现锯齿状，使用css3属性font-smoothing字体平滑，
-webkit-font-smoothing:antialiased;
-moz-osx-font-smoothing:grayscale;

##CSS3中实现PS图片滤镜效果的属性
[http://www.zhangxinxu.com/wordpress/tag/mix-blend-mode/](http://www.zhangxinxu.com/wordpress/tag/mix-blend-mode/ "CSS3混合模式mix-blend-mode/background-blend-mode简介")
天弘基金中tab栏中的图片效果：两张图片重叠，底层图片更清晰使用的属性：
mix-blend-mode：multiply

##react循环添加css厂商前缀的时候，如：
    (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
        styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
      }.bind(this));
因为要使用驼峰命名才能生效。

##在react中每次渲染需要对比差异后才进行渲染，数组渲染的话最好使用一个key属性，赋值{index}，如：
    imgFigures.push(<ImgFigure key={index}  data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]}
    inverse={this.inverse(index)} center={this.center(index)}/>);
这样就可以缓存每次key的值，减少内存消耗

##CSS3翻转后，图片与文字，会成镜像，解决办法，在z轴上正移动1px;

##使用百度搜索某个字段
  window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(name));