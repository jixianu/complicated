
## 1 下载，安装，配置

下载链接在[Git的官网](https://git-scm.com/downloads/)上。

网络教程[http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/ "阮一峰git教程")

根据系统选择合适的安装包。

安装完毕后，我们要配置全局的用户名和邮箱。

为了标识自己的身份以便和其他人配合开发。我们需要先来配置一下自己的用户名和邮箱。

打开Git Bash工具，输入下面文本来配置自己的用户名和邮箱：

    $ git config --global user.name "Your Name"
    $ git config --global user.email "email@example.com"

## 2 基础使用

### 2.1 创建版本库

Git会帮我们管理版本库里面的代码，首先我们要来创建一个版本库。

在想要创建版本库的目录下执行`git init`命令。

### 2.2 向版本库中添加文件

在目录下创建一个readme.txt并输入`git add readme.txt`，通知git，准备监控readme.txt。（实际上是暂存了起来）

然后执行`git commit -m "备注信息在这里输入"`，保存文件当前版本。（备注里写的通常就是当前版本的描述了）

为什么Git添加文件需要add，commit一共两步呢？因为commit可以一次提交很多文件，所以你可以多次add不同的文件，比如：

    $ git add file1.txt
    $ git add file2.txt file3.txt
    $ git commit -m "add 3 files."

### 2.2 修改版本库中的文件

刚才我们已经保存了readme.txt的初始版本，现在我们对它做一些修改。

修改之后执行`git status`查看一下文件的状态。

这时，我们可以使用`git diff`来查看修改前后两个版本的区别。

然后，我们可以保存自己的修改，步骤和新增时一样。`git add readme.txt`和`git commit -m "第一次修改"`

### 2.3 回退到某个版本

用`git log`查看一下git总共保存了几个版本，确认自己想要回退到哪个版本。

使用`git log --pretty=oneline`可以看到单行版本

在git中HEAD代表当前版本，而HEAD^则代表上一版本。

输入`git reset --hard HEAD^`可以回到上一版本。

如果想要回到reset之前的版本怎么办？`git reflog`查看全部的版本号，然后使用`git reset --hard 31d71e8`就可以了，注意这里的31d71e8就是我们查到的版本号。

### 2.4 撤销某一次修改

`git checkout -- readme.txt`意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：

一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；

一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。

总之，就是让这个文件回到最近一次git commit或git add时的状态。

另外，`git reset HEAD file`可以把暂存区的修改撤销掉（unstage），重新放回工作区。

### 2.5 删除文件

先在文件系统中删除，然后再用用`git rm test.txt`在版本库里也删除。（仅限于当前的版本。）

## 3 远程仓库

### 3.1 使用github作为远程仓库的准备

我们使用github来作为远程仓库进行演示，实际工作中公司可能有自建的远程仓库，但是操作是类似的。

首先，因为通讯是基于ssh的，我们要先有一对rsa加密的公钥和私钥。

`$ ssh-keygen -t rsa -C "youremail@example.com"`

然后去github网站上做设置，需要把公钥文件`C:\Users\User\.ssh`目录下的`id_rsa.pub`的内容复制到github设置页面中。

### 3.2 在github上添加远程仓库

在github页面上做操作。创建一个新的仓库。

然后就可以将远程仓库和本地仓库进行关联：

    git remote add origin git@github.com:mystzain/s7_demo.git

添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的。

然后，我们就可以把本地库的所有内容推送到远程库上。

    git push -u origin master

这里的-u会把本地的master和远程的master分支关联起来

从现在起，只要本地作了提交，就可以通过命令`git push origin master`把本地master分支的最新修改推送至GitHub。

### 3.3 从github上克隆

`git clone git@github.com:mystzain/s7_demo.git`命令可以从远程克隆到本地。

### 3.4 分支创建与合并

`git branch dev`用于创建分支，`git checkout dev`切换到dev分支。然后还可以用`git branch`查看当前的分支状态。

可以用 `git checkout -b dev`快速创建一个分支并切换到这个分支下面。

在当前分支里之后，我们还可以切换到master（`git branch master`）后再用`git merge dev`来合并。（`git merge --no-ff -m "merge with no-ff" dev`可以留下commit信息）

合并之后就可以删除分支了：`git branch -d dev`

### 3.4 当分支发生冲突时？

如果我们写了一个分支的同时，master分支也发生了变化，就会有冲突产生。git会提醒我们发生了冲突，并要求我们手动解决后再保存。

`git log --graph --pretty=oneline --abbrev-commit`可以查看分支合并情况。

### 3.5 多人合作时怎么办？

如果其他人和你修改了同一个文件的代码，试图上传到服务器上，就会发生冲突，你可以先`git pull`下载，然后在本地合并解决冲突再推送。

从本地推送分支，使用`git push origin branch-name`，如果推送失败，先用git pull抓取远程的新提交；

在本地创建和远程分支对应的分支，使用`git checkout -b branch-name origin/branch-name`，本地和远程分支的名称最好一致；

建立本地分支和远程分支的关联，使用`git branch --set-upstream branch-name origin/branch-name`；