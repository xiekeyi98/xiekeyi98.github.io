---
title: Boost.test单元测试 第一次使用
mathjax: false
date: 2018-03-20 15:05:44
categories: 工程 
tags:
- 单元测试
- Boost
- 工程 
---


第一次学习单元测试
<!--more-->

之前在申请GSoC的Boost库相关项目，要求我实现一个线段树类。在实现后要求我去做单元测试。一开始是一直不愿意去做这个单元测试的，因为查了一下发现资料很少，时间很紧，感觉英文文档太长，使用起来感觉有点抵触，觉得会很困难。
最后硬着头皮上了。

单元测试其实比我想象的简单，就是把我一直都在使用的人肉测试自动化了而已。
** 单元测试是面向接口的，和面向对象的程序设计思想重合** 。

我使用的系统是`Ubuntu 16.04` ，首先安装 `sudo apt-get install libboost-dev` （如果找不到相关的可以使用` sudo apt-cache search boost` 来查找关于boost的全部信息。如果找不到的话，尝试`sudo apt-get update` 进行更新。
一开始我以为boost库会很大，实际下载下来也就几百MB，很少。

下载完成后，我照着[官方文档](http://www.boost.org/doc/libs/1_66_0/libs/test/doc/html/boost_test/practical_usage_recommendations/tutorials/bt_and_tdd.html)的tutorials做了一些简单的测试，发现使用起来很方便。


这个文档中的代码基本上上拿来就可以使用了，唯一需要注意的是要在最上面加上这一句宏`#define BOOST_TEST_DYN_LINK` ，这一句宏是为了开启动态链接的。** 这个宏必须必须放在最开头！** 我之前放在第二行，结果总是提示找不到`main`函数，最后鬼使神差的调整了一下位置解决了这个问题。
编译命令需要加上`-lboost_unit_test_framework` 进行链接。
编译后运行即可。

boost.test库里还有很多更强大的东西，但是因为这次我只需要做一些简单的测试，所以并没有进一步学习。希望以后有机会可以学到如何使用大文件大数据(像模拟一个本地OJ一样)。


{% spoiler code %} 
{% codeblock lang:cpp %}
代码如下：
```c++
#define BOOST_TEST_DYN_LINK
#define BOOST_TEST_MODULE TEST_SEGMENT_TREE 
#include <boost/test/unit_test.hpp>
#include "segment_tree.hpp"
#include<vector>
#include<iostream>
using namespace std ;
using namespace st ; // segment_tree ;
using namespace boost ;
// g++ -std=gnu++11 unit_test.cpp -lboost_unit_test_framework
BOOST_AUTO_TEST_CASE( MAX )
{
	vector<int> a;
	for( int i = 0 ; i < 10 ; i++)
	{
		a.push_back(i);
	}
	segment_tree< int , Max<int> > *st = new segment_tree< int , Max<int> > ; 
	st->build( a , 0 , 9 ) ;
	BOOST_CHECK_MESSAGE( st->query( 0,0 ) == 0 ,   
			"st.query(..) result: " << st->query(0,0) ); // check border zero 
	BOOST_CHECK_MESSAGE( st->query( 0,9 ) == 9 ,   
			"st.query(..) result: " << st->query(0,9) ); // check all segment ; 
	BOOST_CHECK_MESSAGE( st->query(1,5) == 5 ,   
			"st.query(..) result: " << st->query(1,5) ); // check a segment ; 
	st->modify1(1,5,100); // add [1,5] to 100 ; 
	BOOST_CHECK_MESSAGE( st->query(1,5) == 105 ,   
			"st.query(..) result: " << st->query(1,5) ); // check the modify correct; 
	BOOST_CHECK_MESSAGE( st->query(8,8) == 8,   
			"st.query(..) result: " << st->query(8,8) ); // check the not modify node ; 
	BOOST_CHECK_MESSAGE( st->query(6,9) == 9,   
			"st.query(..) result: " << st->query(6,9) ); // check the not modify segment ; 
	st->modify1(1,5,-100); // add [[1,5] to -100 ; 
	BOOST_CHECK_MESSAGE( st->query(0,9) == 9,   
			"st.query(..) result: " << st->query(0,9) ); //; check the modify ;  
	delete st;
}

BOOST_AUTO_TEST_CASE( MIN )
{
	vector<int> a;
	for( int i = 0 ; i < 10 ; i++)
	{
		a.push_back(i);
	}
	segment_tree< int , Min<int> > *st = new segment_tree< int , Min<int> > ; 
	st->build( a , 0 , 9 ) ;
	BOOST_CHECK_MESSAGE( st->query( 0,0 ) == 0 ,   
			"st.query(..) result: " << st->query(0,0) ); // check border zero 
	BOOST_CHECK_MESSAGE( st->query( 0,9 ) == 0 ,   
			"st.query(..) result: " << st->query(0,9) ); // check all segment ; 
	BOOST_CHECK_MESSAGE( st->query(1,5) == 1 ,   
			"st.query(..) result: " << st->query(1,5) ); // check a segment ; 
	st->modify1(1,5,100); // add [1,5] to 100 ; 
	BOOST_CHECK_MESSAGE( st->query(1,5) == 101,   
			"st.query(..) result: " << st->query(1,5) ); // check the modify correct; 
	BOOST_CHECK_MESSAGE( st->query(8,8) == 8,   
			"st.query(..) result: " << st->query(8,8) ); // check the not modify node ; 
	BOOST_CHECK_MESSAGE( st->query(6,9) == 6,   
			"st.query(..) result: " << st->query(6,9) ); // check the not modify segment ; 
	st->modify1(1,5,-200); // add [[1,5] to -100 ; 
	BOOST_CHECK_MESSAGE( st->query(0,9) == -99,   
			"st.query(..) result: " << st->query(0,9) ); //; check the modify ;  
	delete st;
}

BOOST_AUTO_TEST_CASE( PLUS )
{
	vector<int> a;
	for( int i = 0 ; i < 10 ; i++)
	{
		a.push_back(i);
	}
	segment_tree< int , Plus<int> > *st = new segment_tree< int , Plus<int> > ; 
	st->build( a , 0 , 9 ) ;
	BOOST_CHECK_MESSAGE( st->query( 0,0 ) == 0  ,   
			"st.query(..) result: " << st->query(0,0) ); // check border zero 
	BOOST_CHECK_MESSAGE( st->query( 0,9 ) == 45 ,   
			"st.query(..) result: " << st->query(0,9) ); // check all segment ; 
	BOOST_CHECK_MESSAGE( st->query(1,5) == 15 ,   
			"st.query(..) result: " << st->query(1,5) ); // check a segment ; 
	st->modify1(1,5,100); // add [1,5] to 100 ; 
	BOOST_CHECK_MESSAGE( st->query(1,5) == 515,   
			"st.query(..) result: " << st->query(1,5) ); // check the modify correct; 
	BOOST_CHECK_MESSAGE( st->query(8,8) == 8,   
			"st.query(..) result: " << st->query(8,8) ); // check the not modify node ; 
	BOOST_CHECK_MESSAGE( st->query(6,9) == 30 ,   
			"st.query(..) result: " << st->query(6,9) ); // check the not modify segment ; 
	st->modify1(1,5,-100); // add [[1,5] to -100 ; 
	BOOST_CHECK_MESSAGE( st->query(0,9) == 45,   
			"st.query(..) result: " << st->query(0,9) ); //; check the modify ;  
	delete st;
}
{% endcodeblock %}
{% endspoiler %}

运行结果：![](/images/boost_test.png)



