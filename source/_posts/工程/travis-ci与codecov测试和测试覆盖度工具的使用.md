---
title: travis-ci与codecov测试和测试覆盖度工具的使用
mathjax: false
categories: 工程
tags:
  - 测试
  - 工程
abbrlink: 5e7bc721
date: 2018-06-07 22:41:37
---


travis-ci和codecov测试工具的使用。  
(未完待续，视后续使用情况补充更新)
<!--more-->

  今年参加了thoughtworks的线下结对编程体验活动。说来找了好多个网站都没有找到这个活动的详细信息，只有一些通知、公告和颁奖新闻。  
  终于在google找到了[thoughtworks结对编程体验](http://cutoutsy.github.io/2017/06/09/thoughtworks%E7%BB%93%E5%AF%B9%E7%BC%96%E7%A8%8B%E4%BD%93%E9%AA%8C/)的一篇文章，碰巧还是去年一等奖。参考了他的历程和项目代码后，发现他使用了maven做项目管理，使用travis-ci做单元测试。  
  说来也是在这个研究过程中才发现，原来`configure`和`makefile`是有很多自动生成工具的(qmake、autotools等)，我一直以为是要手写的。  
  发现这个travis-ci，就是我一直很好奇的部分项目的测试贴纸。加上自己需要，所以简单学习了一下。

### travis-ci
  [travis-ci](https://travis-ci.org/) 是一个支持多平台、集成、持续的测试工具，这类工具其实有很多，这个是市场份额占的最大的。  
  个人公开仓库免费(私人仓库等我不太了解)，貌似必须和github一起使用才可以。
  
  使用起来非常简单，只要注册账号，和github关联，然后在自己对应的项目中打开就可以。  
  打开以后，只要在自己的项目中添加`.travis.yml`文件，即可在每次push的时候，自动进行测试。  
  网上很多关于这个文件如何写的，都是php、js等语言，少量java、python，对于C++几乎没有。索性读了下文档，发现简单使用还是很简单的。

  **踩到的坑: 官方样例中只要写`language: C++`即可运行，但是实际上，那样默认的构建命令是` ./configure && make && make test` 这样的话，我还研究了半天如何写`configure`，但是实际上，只要人工修改构建命令即可**

  给一下我的简单范例:
```
sudo: true #是否使用sudo命令执行
language: C++
script:
  - make
```
  只要这么几句，就可以在每次运行的时候，执行测试了。不过这个测试只是执行了make，有进一步需求的话，可以在scrpit里，加入一个写好的bash，bash中运行自己的单元测试。  
  之后每次push的时候，就会在travis-ci的网站中的profile和github里的commit里看到测试结果。  
  如果需要贴纸的话，只要在profile里点击那个图标，即可得到markdown信息，加到readme里即可。
  ![travis-ci贴纸](/images/travis-ci贴纸.png)

### codecov
  [codecov](https://codecov.io/)这是一个用来表示测试覆盖的代码有百分之多少的工具。使用起来，一开始看到别的教程，以为只需要在travis-ci中添加几句就可以，实际使用起来发现挺麻烦的。
  
  **截止目前，我并没有成功使用这个工具。**
  
  使用这个工具，大概需要安装codecov环境，并且使用gcov生成覆盖率测试文件。
  
  因为使用样例给的是使用qmake，我自己一直手写makefile，所以暂时还没有成功使用。
  
具体请看参考资料。

### 参考资料

- [Travis CI Docs](https://docs.travis-ci.com/)
- [codecov documentation](https://docs.codecov.io/docs/supported-languages)
- [GCOV的使用-测试代码覆盖率](https://blog.csdn.net/heli007/article/details/8268614)
- [Travis CI 系列：自动化部署博客](https://segmentfault.com/a/1190000011218410)
- [持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)
- [Github装逼指南——Travis CI 和 Codecov](https://segmentfault.com/a/1190000004415437)
