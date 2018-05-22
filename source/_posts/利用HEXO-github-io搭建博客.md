---
title: 利用HEXO+github.io搭建博客
date: 2017-10-22 21:45:45
categories: 其他
tags: 
 - 博客
 - HEXO
 - github.io
---


发现很多人都自建博客，比较可控也比较干净清爽，于是准备自己也搭建一个博客。
一方面熟悉一下具体流程，一方面是因为自己有一个空闲的腾讯云服务器。
正好可以把它利用起来。
<!--more-->

**优点:**
* 可自己随意发表文章，没什么广告，清爽。
* 可自己折腾前端、研究建站。
* 很多东西存于本地，方便移植、备份、管理。
* 可以本地预览

**缺点:**
* 需要自己域名、服务器。比较花钱。( [github.io](https://pages.github.com/) ) 有免费空间。
* 搭建比较麻烦。*(本来我还想实习运维，结果自己照着框架、教程，还搭了一个周末)*

-----

事先了解了一下，常用的博客框架有[jekyll*(github官方推荐)*](http://jekyll.com.cn/)、[HEXO](https://hexo.io/)、[Wordpress](https://cn.wordpress.org/) 。


wordpress收费，比较贵。优点是很容易搭建、比较友好。
不过因为自己本来就是为了折腾和学习，感觉优点反而成了缺点。所以不考虑了。

  一开始比较想搭建jekyll，毕竟github官方推荐，和[github.io](https://pages.github.com/)配合最好。但是看HEXO扩展、支持又比较多。所以在这两个里面摇摆不定。

后来研究了一下发现jekyll是基于ruby的。

因为我认为我在Windows下写博客比较多，在Linux下主要只是写代码。 e
了解到ruby环境在Windows下比较难以搭建，比较麻烦。而HEXO是基于nodejs的，nodejs在Windows环境下比较友好。
考虑到这一点后，果断选择了HEXO。

-----


## 本机环境搭建

### 安装Git环境

随便在[git](https://git-scm.com/)官网下载安装就好了。

注意一下它可以自动这是Path ，并且可以将Windows的回车换行转换成Linux的风格换行，这两个地方选择一下，在Windows下会变得比较方面。

在cmd(powershell)中输入 `git --version` , 显示版本号后即安装成功。

### 安装Node.js环境

在[Node.js](https://nodejs.org/en/) 找到适合自己系统的环境安装，一路下一步即可。

在cmd(powershell)中输入`npm --version` ， 显示版本号后即安装成功。


### 安装HEXO

命令行下输入 `npm install hexo-cli -g` , `npm install hexo --save` .

npm是Node.js的包管理工具，可以理解为npm是用来安装Node.js程序的

hexo-cli是 hexo - Command Line Interface  ，Hexo的命令行模式。

`-g`是指 `-global`， 全局安装。
1. 表示将安装包放在 `/usr/local` 或 nodejs的安装目录。
2. 可以直接在命令行中使用。

`--save` 是指自动处理一下依赖关系，将依赖关系的版本号和模块添加到 package.json 里。

安装完成后，cmd(powersheel)中输入 `hexo --version` ， 显示版本号后即安装成功。


### 本地使用HEXO

新建一个自己博客的文件夹。

用命令行进入该文件夹，输入 `hexo init` ，初始化本文件夹为hexo目录。 然后输入 `npm install` ，用npm自动安装所需要的组件。


接下来输入 `hexo g` ，即可生成博客。
输入 `hexo s` ， 即可在 `http://localhost:4000/` 中预览自己的博客。


现在基本就可以使用HEXO了。

**HEXO常用命令**
- `hexo new "title"`  即可在`source/_post/` 文件夹里找到，在里面写文章即可。
- `hexo new page "newpage"` 会在`source/` 文件夹内创建一个新文件夹，对应一个新的页面（需要和`_config.yml`)相关联。
- `hexo g` 生成本地页面
- `hexo d` 将本地页面发布到网站上
- `hexo d -g` ， 等价于 `hexo g ; hexo d `
- `hexo s` 开启本地服务器 ，可在本地预览。

### HEXO的主题

可在github等很多地方找到。
使用方法各不相同，主要改好`_config.yml`和`/themes/对应主题/_config.yml` 即可

*少部分主题怎么调都调不对，可考虑是主题问题。一开始我使用[huno](https://github.com/letiantian/huno) 
，tags怎么调都有一些问题，后来换了主题后解决 *

这里推荐[NEXT](http://theme-next.iissnan.com/getting-started.html) 主题，
使用教程多，持续更新，使用方便。



### 配置git

设置git的user name和email，用于标识自己git的身份。
```
git config --global user.name "Yourname"
git config --global user.email "Youemail@xxx.com"
```
这样就把全局的名字设置好了。


### 生成密钥

运行 `ssh-keygen -t rsa -C "xxxxx@xxx.com"`
 
-t用于制定密钥类型为rsa，-C提供一个注释.

这样就生成了一对公钥和私钥。

LINUX默认放在`/home/.ssh`目录下
WINDOWS默认在`C:\Users\xxxx\.ssh` 下

将公钥`id_rsa.pub` 内的内容复制放到`仓库-setting-Deploy keys`下 或放到`个人设置-SSH and GPG keys`下即可
通过自己的私钥和公钥配对来证明自己本人。

### Github Pages

Github提供了 xxxx.github.io 这个域名供我们使用。

我们在github里新建一个仓库，取名为 xxxxx.github.io (必须取这个名字) 
然后github会自动帮我们配置好各种文件。

之后在HEXO安装包里找到`_config.xml` ， 写成如下这段（*如果前面有#号删掉即可，#号表示注释*）
```
deploy:
	type: git
	repo: https://github.com/xxxxx/xxxxxx.github.io.git
	branch: master
```

然后即可通过 `HEXO D` 将自己已经生成的数据发布到该域名了。

之后即可通过该域名访问你的博客了，也可自己购买域名后做`CNAME`解析。


### 备份问题
做好备份可以方便跨电脑写作或更换电脑等情况。

我是新建了一个仓库用来备份，只要
```
git init 
git add .
git commit
git push
```
这样就可以了。

有的人是新建分支来备份，我因为还不太熟练git所以没有采用。

另外有部分已经有git下来的文件夹(比如我的主题) 我还不知道怎么用git push 上去。

在此提供一个思路。


-----


## 将其部署在自己的云服务器上


这是我折腾最久的一点。。。

我的环境是Ubuntu 16.04 LTS 腾讯云。

需要安装git和nginx.
git是用来使自己的博客文件夹能推送发布到云服务器。
nginx是用来使自己的云服务器可以变成一个HTTP服务器，被广泛使用。

>Nginx (engine x) 是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP服务器。

### 安装git(ubuntu大多默认自带)

` apt-get install git `

### 安装nginx

`apt-get install nginx`

### 配置云服务器


在`/home/.ssh`文件夹下创建一个`authorized_keys`文件，将`id_rsa.pub`复制后粘贴到这个文件内，即可在自己电脑上SSH到这台服务器。

**建议创建一个专用的git用户来确保安全。**

不过我一开始创建用户后很多权限处理都不太对，后来用默认用户成功以后也就没有再创建用户了。

然后在本地创建一个目录作为git仓库

比如在`/home`下

`mkdir git`
创建一个git文件夹
` chown -R $USER:$USER /home/git` 
` chmod -R 755 /home/git`
使当前用户有权限在这个git文件夹下搞事。

`cd /home/git` 进入该文件夹后 `git init --bare hexo.git`

创建一个`hexo.git`文件夹作为git仓库。


在`/home/git/hexo.git/hook` 文件夹下有一个`post-update.sample`文件，重命名为`post-update`后，修改内容为

```
#!/bin/sh
cd /
cd /usr/share/nginx/html/
git clone /home/git/hexo.git
cp -rf hexo/* .
rm -rf hexo
```

表示每当该目录有更新，用bash命令，进入nginx默认目录，克隆该目录，将hexo的文件都复制下来，并删除hexo文件夹。

现在即可通过该云服务器IP访问自己博客了。



### 修改本机HEXO下的_config.yml

参照上文github.io的`deploy`写法即可。

也可以像我这样同时推送多个仓库(防止github无法正常访问，也为自己云服务器到期后切换到github提供方便）

一开始试了好多写法，发现都不太对。
最后查了下发现是
```
deploy:
  type: git
  repo:
    github: https://github.com/xxxxxx/xxxxx.github.io.git,master
    tencent: ubuntu@xxx.xxx.xxx.xxx.xxx:~/git/hexo.git,master
```

简单来说就是
```
repo:
	标签名: 地址 , 分支
```
#### 遇到的一些坑

1. `/usr/share/nginx/html/`是nginx默认做网页的目录，不过不同安装方式该目录似乎不同。因此需要在`/etc/nginx/`的`nginx.conf`或`/sites-enabled`文件夹内 ，将root 后面的目录改为 `/usr/share/nginx/html/`文件夹。(发现还有的改site-available)文件夹的。
2. 有的人修改的不是`post-update`文件，而是`/hook/`下新创建了一个`post-receive`文件进行了一些操作。
我没有试过，不知道是否可行
3. 有很多时候问题是权限不够，我被这个坑了很久。请把用到的相关目录都添加相应权限。*权限添加修改方法上文已给出*

-----

本文目的是为了给像我一样想自己搭建博客，又不知道怎么搭建，并且遇到很多坑不知道怎么解决的人一些帮助。

**本文致力于使大家看完后都可以搭建成功。**

因为本文开始动笔比学习搭建博客晚了一段时间，所以有些坑踩过后，不一定还记得是什么了，因此会有一些疏漏。
在阅读本文中有什么困难和不清晰，麻烦和我联系或评论。
以便我加以完善，方便更多人可以搭建出自己的博客。


