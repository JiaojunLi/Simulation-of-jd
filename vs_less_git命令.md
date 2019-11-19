# UI 框架

## less

- 基于node.js


- npm install -g less 		//安装less


- lessc 01.less > 02.css		//编译使用 成css


- 混入


```js
.myStyle() 			//类似于函数模块,可以传参

a{				//伪类 可以再属性里面用< &: >
  &:hover{
   color:@color;		
   }
  &:nth-of-type(1){
   }	
}
```

- background-size:image-size("img.jpg")	//返回图像尺寸可以直接使用


## vscode

- li{第$$个LI}*20

  

#  linux命令  / git命令

$ rm  文件名 删除文件

$ ls 展示所有文件

$ mkdir abc 创建abc文件夹

$ rm -rf abc 强制删除abc文件夹

$ :wq 保存并退出

$ npm run dist  (zepto就已经配置好了) 

$ cd kissme/	进入kissme文件夹

$ cd.. 返回上一级

$ git clone https://github.com/JiaojunLi/jd_project.git 拉GitHub的存储库位置到本地做项目

$ cat config 查看配置项

$ git status 查看当前文件状态  红色 没交过 绿色 暂存区 

$ clear 清屏

工作区 => 暂存区 => 仓库区

$ git add index.html => git commit -m"新增首页文件" => git push  -u origin master

$ git add . 提交所有文件  => git push  -u origin  默认主分支可以省略不写

********************************
### git ——分布式的版本控制工具

```
现代化的代码版本控制工具 git  svn

作用：对你的代码/项目的版本进行管理 （版本的更新 历史记录  回滚   删除的文件    多人协作  

gitlab  公司内部服务器上搭建的版本控制系统 （git）

github:全球级别的社交网站（git版本控制系统+程序猿交友平台 互相分享和学习对方代码）
号称 全球最大的基友平台

很多全世界范围优秀的框架和库 都在github有 官方存储的仓库
开源：github是一个网站 （git）
开源的生态系统：Android  

git svn 是两种不同的代码版本控制方式
git:分布式的版本控制系统
svn：集中式的版本控制系统
```

```
1 github 登陆你的账号  建立一个仓库
2 你本地项目文件夹
	git init  被git版本控制系统所管理起来 初始化
3 对本地的git管理的目录 进行config配置
	配置用户名和邮箱
	git config user.name  "git用户名"
	git config user.email "xxxx@gmail.com"
	
	git config --list  查看配置信息
	
	git status  查看当前的项目目录的git状态
	
4 git add 文件名  把工作区的指定文件 提交到暂存区
	git add . （.代表所有）把工作区的所有文件 提交到暂存区
	
5 git commit -m "add index files"
```

```
本地代码 往远程github平台
第一次提交的时候 （github仓库还没有任何代码的时候）
// 这个命令是让本地代码和远程仓库建立起来联系
git remote add origin git@github.com:ZaGCool/fe1316.git

//这个操作是每次往远程提交代码的命令
    推送   远程git  master 主分支
git push origin master
```



## GitHub远程仓库提示信息:

echo "# jd_project" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/JiaojunLi/jd_project.git
git push -u origin master

*********************************
##  git提交流程

1. git init   		    					  被git版本控制系统所管理起来 初始化
2. git status 		    				   查看当前文件状态  红色 没交过 绿色 暂存区 
3. git add .  		    				    提交所有文件
4. git commit -m "li modify"   提交更改信息
5. git push origin master    	提交到github

## 分支

1. git branch 		    				查看当前分支

2. git checkout -b 分支名   	 创建本地分支,并切换到指定分支

3. git checkout master / dev 	切换分支

   > 切换到主分支,或者是其他分支
   >
   > 其他用户第一次pull代码后,切换切换后才能使用git branch查看

4. git merge 分支	    			合并子分支到主分支

   > 需要在master分支下操作改命令

### git单人操作

- 2.1 创建空的git仓库: git init

  > 提示: git仓库和项目的根路径在一起,用来管理项目

- 2.2 配置git提交的用户名,邮箱

  例如: git config user.name 'zhangsan'

  &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; git config user.email '111@qq.com'

  > 如果没有配置,默认使用的: home/.gitconfig  根目录下的用户信息

- 2.3 查看文件状态: git status

  > 红色: 表示新建文件, 或者新修改了文件,目前位于工作区中
  >
  > 绿色: 表示文件在暂存区

- 2.4将工作区代码, 添加到暂存区(工作区-->暂存区)

- 例如: git add .  

  &nbsp; &nbsp; &nbsp; git add xxx.py

  > 点表示添加所有变动,  xxx.py表示指定文件

- 2.5将工作区代码,添加到仓库区(工作区—>仓库区)

- 例如: git commit -m '注释'

- 2.6将工作区,直接添加到仓库区(工作区-->暂存区—>仓库区)

- 例如: git commit -am '注释信息'

- 2.7查看版本历史

  例如: git log 查看版本的详细信息

   &nbsp; &nbsp; &nbsp;  git reflog  查看版本的大致信息

  > log查看详细信息, reflog查看简要信息

- 2.8回退版本

  例如: git reset --hard HEAD

  或者: git reset --hard 版本号

  > HEAD表示当前最新版本
  >
  > HEAD^表示当前最新版本的,  上一个版本
  >
  > HEAD^^表示当前最新版本的, 前两个版本, 依次类推
  >
  > HEAD~1 表示当前最新版本的,  上一个版本
  >
  > HEAD~2 表示当前最新版本的, 前两个版本, 依次类推

- 2.9撤销工作区,暂存区修改

  撤销工作区:  git checkout 文件名

  撤销暂存区: 

   &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; git checkout HEAD 文件名 (暂存区-工作区)

   &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; git checkout 文件名

  > 仓库区代码不能撤销

- 2.10 版本对比

  例如: git diff HEAD HEAD^ -- xxx.py

  > HEAD表示当前版本,   HEAD^表示上个版本, xxx.py对比的文件

- 2.11误删除文件,恢复

  格式1: rm 文件名

  恢复1: git checkout -- 文件名

  格式2: git rm 文件名

  恢复2: git reset --hard HEAD^

### git多人操作

- 3.1 clone项目到本地

  例如: git clone 项目地址

- 3.2 推送项目到远程仓库

  例如: git push

  > 第一次推送会提示输入账号, 密码

- 3.3 配置是否输入登陆密码信息

  > git config --global  credential.helper cache 十五分钟有效期
  >
  > git config  credential.helper 'cache --timeout==3600' 一个小时有效期
  >
  > git config --global credential.helper store 长期有效

- 3.4 拉取远程最新代码到本地

  例如: git pull

## 多人操作

1. git clone 项目地址	    		clone项目到本地
2. git push		    			        推送项目到远程仓库
3. 配置是否输入登陆密码信息
   1. git config --global  credential.helper cache 十五分钟有效期
   2.  git config  credential.helper 'cache --timeout==3600' 一个小时有效期
   3.  git config --global credential.helper store 长期有效
4. git pull 		                          拉取远程最新代码到本地

## 标签

1. git tag -a  标签名 -m '标签描述'  设置本地标签	
2. git push origin 标签名	    推送本地标签到远程
3. git tag -d 标签名		     删除本地标签
4. git push origin --delete tag 标签名  删除远程标签

## 多人协作解决冲突 

git fetch:  同步过来远端文件 
	然后可已查看 并且可以手动合并
	然后在进行提交 ,再push到远端=( git push origin master 同步到远程的仓库)
		git diff master origin/master  查看
		git merge origin/master   合并一下，之后再取舍，在进行一次提交

1. git fetch
2. git diff master origin/master
3. git merge origin/master

```csharp
[^_^]:
可能会:
Run
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

5.git config --global user.email "1143909603@qq/com" 
6.git config --global user.name "JiaojunLi"
	< 可能需要反复验证邮箱密码 用户名密码 >

```

4.git commit -m "li modify"
5.git remote add origin https://github.com/JiaojunLi/jd_project.git
6.git push origin master

郭哥的项目地址
git remote add origin https://github.com/ZaGCool/fe1302.git

我的项目
git remote add origin https://github.com/JiaojunLi/kiss_me_project.git

第一天下班提交分支 
第二天来先拉项目



```
多人协作解决冲突

在github上添加多人协作，Collaborators==》添加账号

当push的时候发现冲突  
一	git fetch:  同步过来远端文件 
	然后可已查看 并且可以手动合并
	然后在进行提交 ,再push到远端=( git push origin master 同步到远程的仓库)
		git diff master origin/master  查看
		git merge origin/master   合并一下，之后再取舍，在进行一次提交
git fetch
git diff master origin/master
git merge origin/master
改完之后在push
二	git pull origin master 拉取过来之后直接合并
   git merge origin/master
   
cd ~/.ssh
ls
或者
ll
//看是否存在 id_rsa 和 id_rsa.pub文件，如果存在，说明已经有SSH Key
```



#### 配置sshkey

```
ssh-keygen -t rsa -C "xxxxxx@gmail.com"
```

```
cat id_rsa.pub
//拷贝秘钥 ssh-rsa开头
```

```
新建一个SSH Key
取个名字，把之前拷贝的秘钥复制进去，添加就好啦。
验证： ssh -T git@github.com
```

```
之前已经是https的链接，现在想要用SSH提交怎么办？
直接修改项目目录下 .git文件夹下的config文件，将地址修改一下就好了
```



