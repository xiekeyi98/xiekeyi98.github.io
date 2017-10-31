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
- `hexo d -g` ， 等价于 `hedo g ; hedo d `
- `hexo s` 开启本地服务器 ，可在本地预览。

### HEXO的主题

可在github等很多地方找到。
使用方法各不相同，主要改好`_config.yml`和`/themes/对应主题/_config.yml` 即可

*少部分主题怎么调都调不对，可考虑是主题问题。一开始我使用[huno](https://github.com/letiantian/huno) 
，tags怎么调都有一些问题，后来换了主题后解决 *

这里推荐[NEXT](http://theme-next.iissnan.com/getting-started.html) 主题，
使用教程多，持续更新，使用方便。


## 服务器端配置


### Github Pages

Github提供了 xxxx.github.io 这个域名供我们使用。

我们在github里新建一个仓库，取名为 xxxxx.github.io (必须取这个名字) 
然后github会自动帮我们配置好各种文件。

之后在HEXO安装包里找到`_config.xml` ， 将
```

deploy:
	type: git
	repo: https://github.com/xxxxx/xxxxxx.github.io.git
	branch: master

```

