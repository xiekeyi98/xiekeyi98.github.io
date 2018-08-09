---
title: USACO-3.2.4-ratios
mathjax: false
categories: ACM
tags:
  - USACO
abbrlink: e2a2174b
date: 2018-07-17 21:15:29
---


题意：给出3个比例为x:y:z的原料，要求配出i:j:k的产品，问每个原料和产品最终所用之比是多少？
<!--more-->


## 枚举

直接枚举需要原料ijk就行了(因为题意中说了每个原料所用不超过100,所以100*100*100可以过)。

WA了好几次o(╥﹏╥)o

一开始WA是没注意到原料可能为0，有的没用。
第二次WA是我一开始“默认”给出的产品之比肯定是最简比，所以在枚举原料后，全部除以了最大公约数。结果发现数据中
有不是最简整数比的……
第三次是我开局就把产品化成了最简整数比，但是在产品有0的时候，又出现了奇奇怪怪的情况。
代码越改越不知道自己写的是个什么东西了……

最后看了下别人的做法，发现很巧妙的两行。(见代码注释)
{% spoiler code %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:ratios
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;

const int inf = 0x7fffffff;
int a[10][10];

int gcd( int x , int y ) 
{
	if( y == 0 )
		return x ;
	else return gcd( y , x % y) ;
}
int main()
{
	bool succ = false ;
	freopen("ratios.in","r",stdin);
	freopen("ratios.out","w",stdout);
	// a[1]表示三个产品，a[2..4]表示三个原料
	for( int i = 1 ; i <= 4 ; i++)
		cin >> a[i][1] >> a[i][2] >> a[i][3] ;

	int x , y , z ;
	int ans_total = inf , ans1 = inf , ans2 = inf , ans3 = inf , ans4 = inf ; 
	for( int i = 0 ; i <= 100 ; i++)
	{
		for( int j = 0 ; j <= 100 ; j++)
		{
			for( int k = 0 ; k <= 100 ; k++)
			{
				x = a[2][1] * i + a[3][1] * j + a[4][1] * k;
				y = a[2][2] * i + a[3][2] * j + a[4][2] * k  ;
				z = a[2][3] * i + a[3][3] * j + a[4][3] * k ;

				int temp_total = i+j+k ;
				int t = -1;
				// 这三个if很巧妙，避免了0的问题，也能很好的除出来t
				if( x != 0 && a[1][1] != 0 )
					t = x / a[1][1] ;
				else if( y != 0 && a[1][2] != 0 )
					t = y / a[1][2];
				else if( z != 0 && a[1][3] != 0 )
					t = z / a[1][3] ; 
				// if中用乘法判断，也是巧妙的避免了0的问题。
				if( a[1][1] * t == x && a[1][2] * t == y && a[1][3] * t == z && temp_total <= ans_total ) 
				{
					ans1 = i , ans2 = j , ans3 = k , ans4 = t ;
					ans_total = temp_total;
					succ = true ; 

				}
			}
		}
	}

	if( succ )
		cout << ans1 << ' ' << ans2 << ' ' << ans3 << ' ' << ans4 << endl ;
	else
		cout << "NONE" << endl ; 
	return 0 ;
}

{% endcodeblock %}
{% endspoiler %}


## 克拉姆法则/高斯消元

QAQ不会高斯消元。。克拉姆法则明天起来再看看好了……

