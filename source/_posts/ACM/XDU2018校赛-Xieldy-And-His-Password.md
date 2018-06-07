---
title: XDU2018校赛-Xieldy And His Password
mathjax: true
categories: ACM
tags:
  - DP
abbrlink: f2b85b98
date: 2018-04-25 17:16:41
---


简单DP.
题意：一个长度小于$1e6$的01字符串，求所有子串有能在十进制下被三整除的的方案数。（允许有前导零，不同子段视为不同）
题目链接：[Xieldy And His Password](https://www.nowcoder.com/acm/contest/107/E)

<!--more-->


比赛的时候，感觉是$dp$，曾列过一个方程。当时现场赛上的思路是，考虑设$dp[i][0/1]$表示对于当前以$s[i]$为结尾的字符串是否能被$3$整除。然后又以为被$3$整除的数可能会有一些性质（如我知道十进制下能被三整除的数充要条件是各个位数之和能被三整除）。推了一下性质，发现情况很多，而且就算推出来了以后，会发现对于长度为$1$到$i$之间的串不好处理。


赛后和同学交流，告诉我是模$3$意义下的$dp$，当时听到这个名词还觉得挺难的。回来看了题解，发现其实是很简单的一个东西→_→。

我们设`dp[i][j] ( 0 <= j <= 2 ) `表示以`s[i]`为结尾的，所有被$3$除余$j$的方案数。
那么，分情况讨论：
1. 对于`s[i] == 0 `的情况，可以看做是长度为$i-1$的串乘$2$得到：
	- `dp[i][0] = dp[i-1][0] + 1 ` ( 考虑单独一个0的情况 , $3k * 2 ≡ 0 ( mod 3 ) $ )
	- `dp[i][1] = dp[i-1][2] ` ( $ ( 3k + 2 ) * 2 ≡ 1 ( mod 3 ) $ ) 
	- `dp[i][2] = dp[i-1][1]` ( $ ( 3k + 1 ) * 2 ≡ 2 ( mod 3 ) $ ) 
2. 对于`s[i] == 1 `的情况，可以看做是长度为$i-1$的串乘$2$再加$1$得到:
	- `dp[i][0] = dp[i-1][1] ` ( $ ( 3k + 1 ) * 2 + 1 ≡ 0 ( mod 3 ) $ ) 
	- `dp[i][1] = dp[i-1][0] + 1 `( 考虑单独一个1的情况， $ 3k * 2 + 1 ≡ 1 ( mod 3 ) $ )
	- `dp[i][2] = dp[i-1][1]` ( $ ( 3k + 2 ) * 2 + 1 ≡ 0 ( mod 3 ) $ ) 
那么，很容易的写出$dp$方程。
最终会答案为$\sum_{1}^{n}dp[i][0]$

代码如下:
{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;

typedef long long ll  ;
const int maxn = 1e6 + 10 ;
ll dp[maxn][3];

string s ;
int main()
{
	while(cin >> s )
	{
		memset( dp , 0 , sizeof(dp) ) ;

		//	if( s[0] == '0' )
		//	{
		//		dp[0][0] = 1 ;
		//	}
		//	if( s[0] == '1' )
		//	{
		//		dp[0][1] = 0 ;
		//	}

		s.insert( s.begin() , '#' );
		for( int i = 1 ; i < s.size() ; i++)
		{
			if( s[i] == '0' )
			{
				dp[i][0] = dp[i-1][0] + 1 ;
				dp[i][1] = dp[i-1][2] ;
				dp[i][2] = dp[i-1][1] ;
			}

			else if( s[i] == '1' )
			{
				dp[i][0] = dp[i-1][1] ;
				dp[i][1] = dp[i-1][0] + 1 ;
				dp[i][2] = dp[i-1][2] ;
			}
		}

		ll ans = 0 ;

		for( int i = 1 ; i < s.size() ; i++)
		{
			ans += dp[i][0];
		}
		cout << ans << endl ;
	}
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

遇到的问题：
- 注意开$long long $ 。一开始以为不会有那么多的情况，后来想了下，如果全是$0$的时候，答案最大，是$\sum_{i=1}^{1e6}i$


