#gulp

##1 什么是gulp、为什么使用gulp

Gulp是一个**构建系统**，它能通过自动执行常见任务，比如编译预处理CSS，压缩JavaScript，来改进网站开发的过程。

将less文件编译到css文件，讲coffee script、Typescript编译到JavaScript，将ES6的代码编译到ES5的代码，将css和JavaScript压缩混淆合并等等……这些都是相当麻烦的事情。一个项目里可能大量地使用了各种新技术，那样整个项目的构建就变成了十分复杂的事情。为了解决这个问题，就产生了自动化构建工具。

gulp是当前比较流行的一种。

曾经流行过的类似框架有grunt，现在比较新的则是webpack。

##2 参考文档

官方网站：[http://gulpjs.com](http://gulpjs.com)

gulp插件地址：[http://gulpjs.com/plugins](http://gulpjs.com/plugins)

中文文档：[http://www.gulpjs.com.cn/](http://www.gulpjs.com.cn/)

中文教程1:[http://www.ydcss.com/archives/18](http://www.ydcss.com/archives/18)

中文教程2:[https://wizardforcel.gitbooks.io/gulp-doc/content/index.html](https://wizardforcel.gitbooks.io/gulp-doc/content/index.html)

##3 gulp的安装

1. 首先，需要nodejs环境。
2. 在命令行中执行`npm install gulp -g`全局安装gulp。
3. 在需要使用gulp的项目文件夹中用命令行执行`npm install gulp --save-dev`把gulp安装到本地的开发依赖目录下。因为gulp只是开发过程中需要用到的包，在真正上线的项目中不需要包含gulp。

##4 gulp的简单使用

gulp使用了**管道**的思想。

所谓的管道，指的就是把持续想象成一个一个的小管子，每个管子都能对流过自身的数据做一些处理，然后把这些处理过的数据交给下一根管子。

不同的管子拼接到一起，就可以达到“初始数据在经过一系列处理之后变成了最终想要的处理过的数据。”

###4.1 来看一个简单的例子。

1. 首先，在目录下打开命令行，执行：

	`npm install gulp -g`
	
	`npm install gulp --save-dev`
	
	`npm install –save-dev gulp-uglify`

2. 然后，创建js/app.js文件，输入一些简单的内容。

		function logHello(name) {
		    console.log('hello ' + name);
		}

3. 然后，创建一个名为`gulpfile.js`的文件，并输入以下内容：

		var gulp = require('gulp'),
		   uglify = require('gulp-uglify');
		
		gulp.task('default', function () {
		   gulp.src('js/app.js')
		      .pipe(uglify())
		      .pipe(gulp.dest('build'))
		});

4.在命令行执行gulp。	

* 然后会看到新增了一个`/build`目录和`/build/app.js`文件，内容如下：
		
		function logHello(l){console.log("hello "+l)}



###4.2 在这个例子中：

1. 安装gulp到全局，并在本地开发目录下安装gulp，并安装了一个gulp插件“gulp-uglify”。

	gulp插件可以简单理解为：**就是中间的那些用于对流过的数据进行处理的管子。**

1. 准备好即将被处理的源文件。
2. 创建gulpfile.js文件。gulpfile.js文件指导了gulp应该有怎样的行为。
	1. gulpfile.js的语法类似于node，所以要先引入gulp的模块。
	2. gulp.task用于创建一个gulp任务。gulp的行为是由一个到多个gulp任务组成的。
		1. gulp任务创建的方式是`gulp.task(taskName,callback)`.
			1. taskName是任务的名字，字符串。
			2. callback是任务执行时调用的回调函数。
		1. gulp如果没指定的话，会执行名为default的任务。
	2. `gulp.src`用于载入源文件。对于管道系统来说，src就是“水源”。这个函数返回来的对象就是管道对象，可以对他使用pipe函数，进行管道处理。
	3. uglify是我们`的gulp-uglif`y插件。`.pipe(uglify())`这行代码的意思是：在数据“流经”这一根管道时，使用uglify来对数据记性处理。
	4. `gulp.dest('build')`是“数据流向了哪里”，参数是“最后把文件放到哪个文件夹下”。

###4.3 globs语法

在src和dist里面，用于描述文件路径的字符串可以使用**路径模式匹配**：glob或者glob数组。以完成一次性匹配多个文件的功能。

示例如下：

* `js/app.js` 精确匹配文件
* `js/*.js` 仅匹配js目录下的所有后缀为.js的文件
* `js/**/*.js` 匹配js目录及其子目录下所有后缀为.js的文件
* `!js/app.js` 从匹配结果中排除js/app.js，这种方法在你想要匹配除了特殊文件之外的所有文件时非常管用
* `*.+(js|css)` 匹配根目录下所有后缀为.js或者.css的文件

配合使用的简单举例：

`gulp.src(['js/**/*.js', '!js/**/*.min.js'])`

匹配js文件夹及其子目录下的.js文件，但其中不包括.min.js文件。

	var gulp = require('gulp'),
	   uglify = require('gulp-uglify');
	
	gulp.task('default', function () {
	   gulp.src(['js/**/*.js','!js/**/*.min.js'])
	      .pipe(uglify())
	      .pipe(gulp.dest('build'))
	});

##5 Gulp API介绍

###5.1 gulp.task

#### 5.1.1 创建一个gulp任务。

`guilp.task(name[,deps],fn)`

其中：

* name：任务名
* deps：在该任务执行之前要执行的其他任务，可选
* fn：任务本体，回调函数

#### 5.1.2 顺序执行任务

普通的任务都已经试着写过了。现在来研究任务顺序执行的问题。

	var gulp = require('gulp'),
		uglify = require('gulp-uglify');
	
	gulp.task('default', ['before'], function () {
		gulp.src(['js/**/*.js', '!js/**/*.min.js'])
			.pipe(uglify())
			.pipe(gulp.dest('build'))
	});
	
	gulp.task('before',function () {
		console.log('before running');
	})

这样做的话，before就会优先于default来执行。

#### 5.1.3 顺序执行异步任务

有时会有这种需求：当一个异步的任务执行完毕之后，再去执行下一个任务。

解决方案有两种：

1. 使用gulp提供的回调函数

		gulp.task('timeout', function (cb) {
			console.log('timeout waiting 5s');
			setTimeout(function () {
				cb();
			}, 5000)
		})
2. 返回流对象

		gulp.task('before', function () {
			return gulp.src(['js/**/*.js', '!js/**/*.min.js'])
				.pipe(uglify())
		})

###5.2 gulp.src

用于从数据源创建一个gulp流。

####5.2.1 用法：

`gulp.src(globs[, options])`

其中`globs`就是我们的文件名或者文件匹配字符串。

options是选项对象，通常只需要注意一个选项：`options.base`

如下例：

	gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
	  .pipe(minify())
	  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'
	
	gulp.src('client/js/**/*.js', { base: 'client' })
	  .pipe(minify())
	  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'

###5.3 gulp.dest

用于把gulp流输出到制定的路径。

####5.3.1 用法：

`.pipe(gulp.dest(path)`

path就是指输出的路径

###5.4 gulp.watch

`gulp.watch`用于监控文件变化，当文件内容有变化时，就执行指定的任务。

####5.4.1 用法：

	gulp.task('watch', function () {
	   var watcher = gulp.watch('src/*.*', ['default']);
	});

第一个参数是路径，第二个参数是要执行的任务。

其中，watcher对象可以绑定一些事件，比如：

	gulp.task('watch', function () {
		var watcher = gulp.watch('js/*.*', ['default']);
		watcher.on('change',function (d) {
			console.log('change',d)
		})
	});

其他事件有：

* end 在watcher结束时触发（这意味着，在文件改变的时候，任务或者回调不会执行）
* error 在出现error时触发
* ready 在文件被找到并正被监听时触发
* nomatch 在glob没有匹配到任何文件时触发

watcher上还有一些可以调用的方法：

* watcher.end() 停止watcher（以便停止执行后面的任务或者回调函数）
* watcher.files() 返回watcher监听的文件列表
* watcher.add(glob) 将与指定glob相匹配的文件添加到watcher（也接受可选的回调当第二个参数）
* watcher.remove(filepath) 从watcher中移除个别文件

####5.4.2 细节

除了执行任务外，watch还可以在数据变更时执行回调函数。

##6 Gulp常用插件

[https://markgoodyear.com/2014/01/getting-started-with-gulp/]()

###6.1 del

用于删除文件或者文件夹

`npm install del --save-dev`

	var gulp = require('gulp'),
		uglify = require('gulp-uglify'),
		del = require('del');
	
	gulp.task('default', function () {
		del('build');
	});

###6.2 gulp-concat

用于把多个文件合并起来(js和css都可以)

`npm install gulp-concat --save-dev`

	gulp.task('default', function () {
		gulp.src('js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
	});

###6.3 gulp-rename

重命名文件

`npm install gulp-rename --save-dev`

	gulp.task('default', function () {
		gulp.src('js/**/*.js')
		.pipe(rename({
			prefix:'demo-',
			suffix:'-min'
		}))
		.pipe(gulp.dest('dist'))
	});
###6.4 gulp-uglify

压缩JavaScript文件

`npm install gulp-uglify --save-dev`

###6.5 gulp-cssnano

压缩css文件

`npm install gulp-cssnano --save-dev`

	gulp.task('default', function () {
		gulp.src('css/**/*.css')
		.pipe(cssnano())
		.pipe(gulp.dest('dist'))
	});

###6.6 gulp-minify-html

`npm install gulp-minify-html --save-dev`
	
	gulp.task('default', function () {
		gulp.src('page/**/*.html')
		.pipe(htmlMinify())
		.pipe(gulp.dest('dist'))
	});


## gulp 伪代码

样式文件：gulp-less
压缩样式文件：	gulp-cssnano

如果我写的less文件编辑并保存了，我希望gulp能够自动把less编译成CSS，把CSS压缩，压缩之后放到我们的专门的文件夹下面。

创建一个gulpfile.js
里面先引包： 
	1. less编译成CSS的“水处理器”
	2. CSS压缩的“水处理器”

创建两个任务
	1. 一个任务做监视：watch监听less文件
	2. 另一个任务做处理：
		1. 用水泵gulp.src把水从“水源”里抽出来：水源是less文件。
		2. 用 gulp-less 把作为“水源”的less文件加工成CSS文件。现在我们的“水”是CSS文件。
		3. 用gulp-cssnano把作为“水源”的未压缩过的css文件加工成压缩过的css文件。
		4. 用gulp.dest()把水引流到目的地。
