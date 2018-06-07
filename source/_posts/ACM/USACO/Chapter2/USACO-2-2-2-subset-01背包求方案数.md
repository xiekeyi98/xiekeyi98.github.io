---
title: USACO 2.2.2 subset 01背包求方案数
mathjax: true
categories: ACM
tags:
  - USACO
  - DP
  - 背包
abbrlink: 42aa9afc
date: 2017-11-10 14:49:49
---



题意: 给定一个N( N $\leq$ 39)，表示有 `1 - n` 个数。每个数只能选一次，要求你将这`N`个数分成和相等的两部分。问有多少种分法？

<!--more-->

做法：

1. 一开始第一反应是DFS。 对于每一个数字有选和不选两种方案。然后DFS下去就可以了。 后来发现N是39。一开始考虑是不是要折半搜索，或者花式剪枝。
一开始写了一个花式剪枝，剪枝策略是：
	1. 对于总和是奇数的直接返回0(不可能拆成和相等的两部分)。 
	2. 从大到小选取，当目前选取的和已经超过了总和的一半的时候，直接`return` 。 依然会T。于是就想折半搜索。想了一会没什么思绪。
2. 在想如何去把这个DFS写成记忆化搜索的过程中，突然发现这不就是个背包嘛。(果然有人曾说的，DP写不好的时候，先想搜索，然后从搜索想如何写成记忆化搜索，在这过程中想出DP的状态转移，是很不错的方法。)
本质上来讲，这道题就是`N`个物品$a\_{i}$ ， 每个物品的重量是i(即它本身)。问恰好能装满容积为$\frac{\sum\_{i=1}^n{a\_i}}{2}$ 的背包的** 方案数**吗？* (注意这里答案应该是最终答案除以2，因为有重复计算的关系)*


朴素的01背包很简单
定义`dp[i][j]`表示一共有`i`个物品，背包最大容量为`j`，所能装的物品的最大价值。
```c++
for( int i = 1 ; i <= N ; i++)
	for( int j = 1 ; j <= capacity ; j++)
	{
		if( j >= weight[i] ) 
			dp[i][j] = max( dp[i-1][j] , dp[i-1][j - weight[i]] + value[i] ) ;
		else
			dp[i][j] = dp[i-1][j] ;
	}
```

注意一下dp数组都初始化为0，以及很多教材中提到的都是第二个循环从 ` j == weight[i] ` 开始的。但是实际上之前的dp数组也要转移过来。

** 另可用滚动数组优化，空间复杂度减去一维**

如果是要求，**恰好**装满背包的话，那么我们应该注意除了`dp[0][0]`初始化为0，其他都应该初始化为$-inf$。
我们可以通过搜索去考虑。如果是搜索的话，除了`dp[0][0]`是`return 0 ` ，其他应该是没有装满都返回$-inf$。而在DP中，因为是要取`max`的，所以就初始化为`-inf`就可以了。

### 01背包求方案数

我主要是在这里卡了一段时间。
曾经在学习Dijkstra的过程中，遇到需要记录路径问题的时候。被人告知: ** dp的时候需要记录路径、决策之类的，直接再开一个和dp数组结构基本一样的数组去记录就可以了。** 
这个思想对我帮助很大。记录这些信息，本质上其实就是记录决策。决策的记录方式，映射下来，不就是和dp数组结构一样吗？
于是这道题我开了`cnt[n][capacity]` 这样一个数组去记录。(有的人选择在DP数组中再加一个维度去记录，本质上是一样的)

也就是定义`cnt[i][j]` 表示i个物品，(恰好)放在容量为j的背包中的方案数。

不过在实际写的过程中，发现还有一些小问题要处理。 就是在转移的过程中，这个cnt数组，如何转移？

我们观察到dp数组的转移主要是
```c++
if( dp[i-1][j] > dp[i-1][ j - weight[i] ] + value[i] )
	dp[i][j] = dp[i-1][j] ;
else
	dp[i][j] = dp[i-1][j - weight[i] ] + value[i] ;
```

cnt数组显然要在dp转移的过程中转移。

```c++
if( dp[i-1][j] > dp[i-1][ j - weight[i] ] + value[i] )
	dp[i][j] = dp[i-1][j] , cnt[i][j] = cnt[i-1][j] ;
else

	dp[i][j] = dp[i-1][j - weight[i] ] + value[i] , cnt[i][j] = cnt[i-1][j - weight[i]  ] + cnt[i-1][j];
```

转移过程大概如上。

对于`dp[i][j]`由`dp[i-1][j]` 转移而来的时候，显然`dp[i][j]`对应的方案数没有变化，可以直接继承`cnt[i-1][j]`过来。

对于`dp[i][j]`由`dp[i-1][j - weight[i] ] + value[i]` 转移时。
一开始我想的是等于`cnt[i-1][j-weight[i]] + 1` 后来发现计算出来的远远小于答案。
毕竟这是组合问题，直接加1的话，差的太远了。

然后网上查了一下，发现别人的转移如上所示。

一开始我以为是指`i`个物品放入容量为j的背包的方案数，可以 由`i-1`个物品放入j的背包里的方案数和`i-1`个物品放入`j-i`的方案数相加而来。然后怎么想都觉得怪怪的，如何按这个想法的话，不应该是由`i-1`个物品放入`i`的背包里的方案数和`j-i`的方案数相加而来才可以吗？ 于是私自改了一下这个地方。但是改了后也还是不能理解，因为这样如何避免重复计算呢？

因此卡了一段时间。

卡了一段时间后，想明白了，这不就是组合数递推的公式吗:

$$ C\_n^m = C\_{n-1}^m + C\_{n-1}^{m-1} $$ 

这个公式的理解是，对于`n`个物品取`m`个，可以由`n-1`个物品直接取`m`个得来(也就是新加的物品不取)，也可以由`n-1`个物品取m-1个物品，然后加上新增的这个物品得来。

那么，这个`cnt[i][j]`的转移方法，不就可以看做是由前`i-1`个物品直接取了`j`个容量的方案数得来加上由前`i-1`个物品中取`j - weight[i]`容量的物品再加上当前的这个重量为`weight[i]`的物品得来吗？


借此做完了这道题。

虽然理解了，但是目前在转移过程中，还是常常按自己的想法写成 `j - i` 和 `i` 。


因为卡了一段时间，所以写下来整理一下自己思路。

代码：

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:subset
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

long long  solve( int n ) 
{
	int all_sum = 0 ;
	for( int i = 1 ; i <= n ; i++)
		all_sum += i ;
	if( all_sum % 2 )
		return 0;

	int capacity = all_sum / 2 ;

	int dp[n + 20 ][capacity + 50 ] ;

	long long  cnt[n + 20][capacity + 50 ] ;
	for( int i = 0 ; i <= n ; i++)
		for( int j = 0 ; j <= capacity ; j++)
			dp[i][j] = -1000 , cnt[i][j] = 0 ; ;

	dp[0][0] = 0 ; 
	cnt[0][0] = 1 ;
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 0 ; j <= capacity ; j++)
		{
			if( j >= i )
			{
				if( dp[i-1][j] > dp[i-1][ j - i ] + i )
				{
					dp[i][j] = dp[i-1][j];
					cnt[i][j] = cnt[i-1][j]  ;
				}
				
				else
				{
					dp[i][j] = dp[i-1][j-i] + i ;
					cnt[i][j] = cnt[i-1][j-i] + cnt[i-1][j] ; 
				}
			}

			else
				dp[i][j] = dp[i-1][j] , cnt[i][j] = cnt[i-1][j]   ;
		}
	}
	return cnt[n][capacity];
}



int main()
{
	freopen("subset.in","r",stdin);
	freopen("subset.out","w",stdout);
	int n ;
	cin >> n ;
	cout << solve(n) / 2  << endl ;
	return 0 ;
}


{% endcodeblock %} 
{% endspoiler %}
