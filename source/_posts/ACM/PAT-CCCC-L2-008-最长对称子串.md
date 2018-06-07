---
title: PAT-CCCC-L2-008-最长对称子串
mathjax: false
categories: ACM
tags:
  - CCCC
  - PAT
  - Manacher
  - 字符串
abbrlink: fb32b34c
date: 2018-03-26 19:50:41
---


最长回文子串问题
题目链接：https://www.patest.cn/contests/gplt/L2-008
<!--more-->


## 枚举子串

**超时一个点**
复杂度`O(n^3)`
{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
string s ;
bool issymm( int l , int r )
{
	for( int i = l ; i <= r ; i++)
	{
		if( s[i] != s[r-i+l] )
			return false ;
	}
	return true ;
}


int main()
{
	getline(cin,s);
	int ans = 0 ; 
	for( int i = 0 ; i < s.size() ; i++)
	{
		for( int j = 0 ; j < s.size() ; j++)
		{
			if( issymm( i , j ) )
			{
				ans = max( ans , j - i + 1 ) ;
			}
		}
	}

	cout << ans << endl ;
}
{% endcodeblock %}
{% endspoiler %}


## 枚举中轴

这个方法就是枚举轴，然后从轴向两边扩展。
复杂度`O(n^2)`
需要注意的是，轴有两种情况:
1. 以中间一个数字为轴
2. 以中间两个数字为轴
{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
string s ;


int solve( string &s )
{
	int ans = 0 ; 
	for( int i = 0 ; i < s.size() ; i++)
	{
		int temp = 1 ; 
		for( int j = 1 ; j < s.size() ; j++) // 以中间一个数字为轴的情况
		{
			if( i - j < 0 || i + j >= s.size() || s[i-j] != s[i+j] )
				break;
			temp += 2;
		}
		ans = max( temp , ans ) ;

		temp = 0 ; 
		for( int j = 1 ; j < s.size() ; j++)  // 以中间两个数字为轴的情况
		{
			// 注意这里i-j+1的情况，这是因为需要两个数字之间比较，不相等为0，这里WA了一次。
			if( i - j + 1 < 0 || i + j >= s.size() || s[i-j+1] != s[i+j] )
				break ;
			temp+=2;
		}

		ans = max( ans , temp ) ; 
	}
	return ans ;
}

int main()
{
	getline(cin,s);
	int ans = 0 ; 

	ans = solve( s ) ; 
	cout << ans << endl ;
}
{% endcodeblock %}
{% endspoiler %}


## Manacher

复杂度:`O(n)`
这个算法看了两天才看明白。
具体这个算法可以看我的下一篇博客：
{% post_link Manacher-最大回文串匹配线性算法 %}

{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 3000;
char Ma[maxn] ;
int Mp[maxn];
int Mx = 0 , Id = 0 ; 

int main()
{
	string s ; 
	getline( cin ,s ) ;
	Ma[0] = '#' ; 
	for( int i = 1  , cnt = 0 ; cnt < s.size() ; i++)
	{
		if( i % 2 == 1 )
		{
			Ma[i] = '#';
		}
		else
		{
			Ma[i] = s[cnt++];
		}
	}

	int size = strlen(Ma);
	Ma[size++] = '#' ;
	int ans = 0 ; 
	for( int i = 0 ; i < size ; i++)
	{
		if( Mx > i )
		{
			Mp[i] = min( Mp[ 2 * Id - i ] , Mx - i ) ;
		}
		else
			Mp[i] = 1 ;
		while( Ma[i + Mp[i] ] == Ma[i - Mp[i]] )
			Mp[i]++;
		if( i + Mp[i] > Mx )
		{
			Mx = i + Mp[i] ;
			Id = i ;
		}
		ans = max( ans , Mp[i] ) ;
	}

	cout << ans - 1  << endl ; 

	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

