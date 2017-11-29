---
title: USACO-2.3.1-LongestPrefix-搜索DP
mathjax: false
date: 2017-11-21 20:31:41
categories: ACM
tags:
- ACM
- USACO
- 搜索
- DP
---


感觉自己最近对时间复杂度的计算越来越吃力了。尤其是记忆化搜索的时间复杂度。

<!--more-->

题意：
给出N个字符串，和一个字符串S。求能由这N个字符串随意组成(可重复使用)，组成的串和S的前缀最大匹配是多长？


做法：

开始想的就是DFS。对于S中的第i个位置来来说，枚举所有的N个字符串，那么如果可以匹配，dfs转移到 i + 所匹配的串长度即可。
不过不停的TLE( 1.7s )，一开始我以为是因为我用的`vector<string>`之类的STL的原因。于是改成C语言风格，依然不行。
于是想了一下，一开始以为是贪心的去选取最大的可匹配的，或者最长的之类的策略。可是这样的话，会过不了比如：N个字符串是`ab`、`aaaa` 和`aaa` 匹配字符串S `aaaab`的话，就不行。 类似的反例很多。

想了一下，发现可以改成记忆化。对于第i个位置来说，如果能达到，就加个标记。之后搜索到这个位置，就`return`即可。
这样就有效避免了，对于S很长重复很多，N个字符串有很多很短。然后第i个位置可以由前面的串好多种方法组合得到，导致反复计算。
因为，第i个串只要有一种能达到即可，一种方法还是多种，对之后的决策和选择都没有影响。这样保证了前面的串只要能达到都会只计算一种能达到的情况，并且不会重复计算。

代码:
```c++
/*
ID:xiekeyi1
PROG:prefix
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

//vector<string> a;
//string s ; 
char a[210][15]; //存放n个串
int num_string = 0 ;  // N个串的个数


int s_size = 0 ; // S的长度
char s[200100]; 
bool vis[200100];
int dfs( int n )
{
	// 标记
	if( vis[n] )
		return 0;
	else
		vis[n] = 1 ; 
	int ans = 0; 
	if( n >= s_size )
		return s_size;

	//枚举n个串
	for( int i = 0 ; i < num_string ; i++)
	{
		bool flag = true; 
		int tt = strlen(a[i]) ; 
		// 匹配，如果匹配失败则换下一个串.
		for( int j = 0  ;  j < tt ; j++ ) 
		{
			if( s[n + j ] != a[i][j] )
			{
				flag = false ;
				break ; 
			}
		}

		if( flag ) 
		{
			ans = max( ans , dfs( n + tt ) )  ;
		}
	}
	return ( ans != 0 ) ? ans : n  ; // 这里我处理其实不太好，DFS写的有点蠢了。
}






int main()
{
	freopen("prefix.in","r",stdin);
	freopen("prefix.out","w",stdout);
	char ch ; 
	while( scanf("%s" , a[ num_string++]) )  
		if( strcmp( a[num_string - 1 ] , "." ) == 0 )  
			break ;
	num_string--;
//	string t ;
//	while( cin >> t && t != "." )
//		a.push_back(t);
//	while( cin >> t )
//		s += t ; 
	while( ( ch = getchar() ) != EOF  )
	{
		if( ch == EOF )
			break ; 
		if( ch == ' ' || ch == '\n' )
			continue ;
		s[ s_size++ ] = ch ;
	}




	cout << dfs(0) << endl ;
}
```

由此也可以改成递推的方式。



```c++
/*
ID:xiekeyi1
PROG:prefix
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

string s ;
vector<string> a ;
bool vis[200100];
int main()
{
	string t ;
	while( cin >> t && t != "." )
		a.push_back(t);
	while( cin >> t )
		s += t ;

	int ans = 0 ; 
	for( int i = 0 ; i < s.size() ; i++)
	{
		if( vis[i] || i == 0 )
		{

			for( int j = 0 ; j < a.size() ; j++)
			{
				bool flag = true ; 
				for( int k  = 0 ; k < a[j].size() ; k++)
				{
					if( i + k  > s.size() )
					{ flag = false ; break ; }
					if( s[ i + k ] != a[j][k] )
					{ flag = false ; break ; }
				}

				if( flag )
				{
					vis[i + a[j].size() ] = true ;
					ans = max( ans , static_cast<int> ( i + a[j].size() )  ) ;
				}


			}
		}
	}

	cout << ans << endl ;
	return 0 ; 
}
```
我是从访问过的向没访问过的转移,似乎有人是从没访问过的去找访问过的转移。

