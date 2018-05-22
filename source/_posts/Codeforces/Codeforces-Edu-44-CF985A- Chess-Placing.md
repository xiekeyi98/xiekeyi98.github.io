---
title: Codeforces Edu.44 CF985A Chess Placing
mathjax: true
date: 2018-05-22 16:04:24
categories: ACM
tags:
- codeforces
- 水题
---


题目链接：http://codeforces.com/contest/985/problem/A

题目大意：给出一个$[1,n]$的范围，给出$n/2$个数，每次可以对任意一个数进行加一减一操作(数字之间不能穿过)。要求把所有数都变成奇数或偶数且各不相同。
<!--more-->


## 错误做法

一开始他说数字之间不能穿过，我以为和蚂蚁([POJ1852](http://poj.org/problem?id=1852))很像，就是不用考虑数字之间穿过的情况。

于是直接模拟了一下，对于某个数标记一下是否这个位置被占用。然后先模拟把所有偶数变成奇数，再反过来模拟，取最小值。模拟思路就是对于第i个数，去寻找第一个满足条件的 a[i] + j 或 a[i] - j ,然后把数字填上去。

一开始我还考虑了，会不会出现我先考虑左边后考虑右边，如果左边满足条件就填进去，而不去考虑右边的话，情况不会最优？
后来觉得排序可破。于是大胆写了，过了Pretest。

结果就被人hack了。

hack的数据是:
```
10
5 6 7 8 9 
```
这组数据会出现,7可能放到了10的位置，9又要往左走放到左边的位置这样的情况(9放到10才是最优的)。

想了想觉得或许加一些特判，或者从左往右再从右往左搞一搞可破。但是觉得这么写下去，越写越不像是个正解的样子。

遂作罢。

{% spoiler ErrorCode %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 110; 
int a[maxn];
int n ;
int solve( int c[] , int flag )
{
	int a[maxn] ;
	for( int i = 1 ; i <= n/2 ; i++)
		a[i] = c[i];
	bool chess[maxn];
	memset( chess, false , sizeof(chess) ) ;
	for( int i = 1 ; i <= n/2 ; i++)
		chess[a[i]] = true ;
	int ans = 0 ; 
	if( flag == 1 )
	{
		for(int i = 1 ; i <= n/2 ; i++)
		{
			if( a[i] % 2 == 0 )
			{
				for( int j = 1 ; j + a[i] <= n || a[i] - j >= 1 ; j++)
				{
					if( ( (a[i] - j) % 2 == 1 || (a[i] + j) % 2 == 1 ) && 
							( !chess[ a[i] - j ] || !chess[ a[i] + j ] )  )
					{
						if( a[i]-j >= 1 && (a[i] - j) % 2 == 1 && !chess[ a[i] - j ] )
						{
							chess[a[i]] = false , chess[a[i]-j] = true,ans += j ;
							break;
						}
						else if( a[i]+j <= n && (a[i] + j) % 2 == 1 && !chess[a[i]+j] )
						{
							chess[a[i]] = false , chess[a[i]+j] = true,ans += j ;
							break;
						}
					}
				}
			}
		}
	}
	else if( flag == 2 )
	{
		for(int i = 1 ; i <= n/2 ; i++)
		{
			if( a[i] % 2 == 1 )
			{
				for( int j = 1 ; j + a[i] <= n || a[i] - j >= 1 ; j++)
				{
					if( ( (a[i] - j) % 2 == 0 || (a[i] + j) % 2 == 0 ) && 
							( !chess[ a[i] - j ] || !chess[ a[i] + j ] )  )
					{
						if( a[i] - j >= 1 &&  (a[i] - j) % 2 == 0 && !chess[ a[i] - j ] )
						{
							chess[a[i]] = false , chess[a[i]-j] = true,ans += j ;
							break;
						}
						else if( a[i] + j <= n && (a[i] + j) % 2 == 0 && !chess[a[i]+j] )
						{
							chess[a[i]] = false , chess[a[i]+j] = true,ans += j ;
							break;
						}
					}
				}
			}
		}
	}
	return ans ;
}




int main()
{
	cin >> n ;
	for( int i = 1 ; i <= n/2 ; i++)
		cin >> a[i];
	sort( a + 1 , a + 1 + n/2 ) ;
	int ans = min( solve( a , 1 ) , solve(a , 2 ) );
	cout << ans << endl ;
	return 0 ; 
}
{% endcodeblock %}
{% endspoiler %}



## 正确做法

这道题其实被我想复杂了。考虑到n个位置，一共只给了n/2个数，那么也就是说，每个偶数位或者奇数位肯定是可以被放满的，不会出现要做选择，有些放满有些没有的情况。

所以我们只需要对于第i个数字，考虑他和第i个偶数(奇数)位之间的关系，然后加起来取最小值就可以了。

{% spoiler ACcode %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 110 ;
int a[maxn];


int main()
{
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n / 2; i++)
		cin >> a[i] ;
	sort( a + 1 , a + 1 + n / 2  ) ;

	int ans = 0x3f3f3f3f  ;
	int t = 0 ;
	int p = 1 ; 
	for( int i = 1 ; i <= n ; i += 2 )
	{
		t+= abs( a[p++] - i );
	}

	ans = min( t , ans ) ; 
	p = 1 ; 
	t = 0 ;
	for( int i = 2 ; i <= n ; i += 2 )
	{
		t+= abs( a[p++] - i );
	}
	ans = min( t , ans ) ; 
	cout << ans << endl ;
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


感觉自己真是越来越菜了，哎qwq.

