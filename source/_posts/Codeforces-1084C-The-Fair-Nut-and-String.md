---
title: Codeforces 1084C - The Fair Nut and String
mathjax: false
categories: ACM
tags:
  - codeforces
abbrlink: 6b764ba
date: 2018-12-11 12:48:55
---

# Codeforces 1084C - The Fair Nut and String 

## 题目连接

[Codeforces 1084C - The Fair Nut and String](https://codeforces.com/contest/1084/problem/C)

## 题目大意

给出一个字符串，查找有多少个被b隔开的a的子串。如`a`、`aba`,`abba`,`abbbba`等都是合法的，但`aa`是非法的。  
但要注意的是`aba`,`abba`,`abbbbbba`等在统计的过程中只计算一个。
<!--more-->

## 做法


### 开始思路(错误)  

一开始读错题了，想着前缀和统计出来a的个数，对于遇到一串b，答案就加上:这串b前面的a个个数乘这串b后面的a的个数。
然后再加上所有a的个数(考虑单独的a)。  
这样的做法WA在了第十组测试用例上。  
考虑到我这种做法只能解决单独的a和`abba`等这种情况，难以解决如`ababa`这种情况，于是gg。

### AC思路
首先很显然，删除除了a和b以外的字符(对于一开始的错误做法，删不删没啥影响)。  
之后我们统计被b隔开的a的情况，存到一个数组中。 如`abbaaabaa`，存到数组中变成`[1,3,2]`的形式。  
这样我们就可以把`abbaaabaa`的情况简化成`ababa`的情况。
接下来我们考虑`ababa`的情况:

- 初始化`ans = 0 `
- 对于第一个`a`，答案是`1(自身)`, `ans = 1`
- 对于`b`跳过(下同)
- 考虑前两个`a`,答案是`1(自身) + 1(加上前面对应的1)`, `ans = 2 `;
- 对于前三个`a`，答案是`1(自身) + 2(加上前面对应的两个2`) , `ans = 3 `;
- 最终答案是3个，分别是`[1],[3],[5],[1,3],[1,3],[1,5]`。  
- 很显然的容易发现`ans = lastans + 1`  
  

但是考虑到，我们之前把很多a压缩成了1个(即把`abbaaabaa`变成了`ababa`)，在这里把b缩成一个是没有影响的。  
但是对于a却影响了答案，如何解决这个问题呢？  
观察到每个a其实都是找之前被b隔开的a,而两个b之间夹着的一串a之间是互相不影响的。  
那么我们其实只要乘上这个一串a的个数就好了。即对于`abbaaabaa`:

- 初始化`ans = 0 `
- 对于第一个`a`，答案是`1(自身)`, `ans = 1`
- 对于`b`跳过(下同)
- 考虑第二串`a`的第一个`a`,答案是`1(自身) + 1(加上第一串的一个a)`, `ans = 2 `;
- 考虑第二串`a`的第二个`a`,答案是`1(自身) + 1(加上第一串的一个a)`, `ans = 3 `;
- 考虑第二串`a`的第三个`a`,答案是`1(自身) + 1(加上第一串的一个a)`, `ans = 4 `;
- …………
- 即就是` 1(自身) + 1(之前对应的第一串的一个a) * 3(这一串a的个数) )`
- 很显然的容易发现`ans = ( lastans + 1 ) * 这一串a的个数`  
  

到这里，答案也就呼之欲出了(~~也可能是叽里呱啦一堆，语无伦次让人一头雾水2333~~)。  
具体看代码吧。  


### 官方题解思路
官方题解的思路是，对于每一串a看成一个集合，如`abaaabbaaaa`，就可以看做是有三个集合，三个集合的元素个数分别为`[1,3,4]`  
那么答案可以看做是从每一个集合中可以选取0到任意个。  
所以答案就是所有集合元素个数+1再相乘，即2*4*5个。  
考虑到会有一种是全零的情况(即一个都没有选)，所以他最终答案再减去1。  
这种思路可能更好理解一点？


## 代码

{% spoiler ACcode %}
{% codeblock lang:cpp %}

/**********************************************************
 * Author        : xie keyi
 * Email         : xiekeyi98@snnu.edu.cn
 * Last modified : 2018-12-11 13:18
 * Filename      : 1084c.cpp
 * Description   : 
 * *******************************************************/
#include<bits/stdc++.h>
using namespace std ;
using ll = long long ; 
const int MOD = 1000000000 + 7 ; 


int main()
{
	string s ; 
	cin >> s ;
	// 删取除了a和b以外的其他字符
	for( auto i = s.begin() ; i != s.end() ; )
	{
		if( *i > 'b' )
			s.erase(i);
		else
			i++;
	}
	int n = s.size();
	// 开头插入一个'b'，不影响答案，但方便了从1开始计数
	// 而且对于之后统计连续的a的个数也好进行统计
	s.insert(s.begin(),'b');
	vector<int> cnt;
	// cnt里面存的就是被b隔开的每一串a的个数
	for( int i = 1 ; i <= n ; i++)
	{
		if( s[i] == 'a' )
		{
			if( s[i-1] == 'b' )
				cnt.push_back(1);
			else
				(*(cnt.rbegin()))++;
		}
	}

	ll ans = 0;
	// 计算答案
	// ans = ( lastans + 1 )  * 这一串a的个数。
	// 因为cnt[i]里存的不同元素，一定是被b隔开的情况
	// 所以只要考虑cnt数组就可以了
	for( int i = 0 ; i < cnt.size() ; i++)
	{
		ans += ( ans + 1 ) * cnt[i] ;
		ans %= MOD ;
	}
	cout << ans << endl ; 
}
{% endcodeblock %}
{% endspoiler %}
