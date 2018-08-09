---
title: USACO-3.2.3-Spinning Wheels
mathjax: true
categories: ACM
tags:
  - USACO
abbrlink: a0f3a879
date: 2018-07-17 19:56:41
---

模拟
题意：给出5个轮子，每个轮组有w个缺口($1 \leq w \leq 5$) 问多少分钟后会有一个缺口从头对到尾
<!--more-->


一开始题意理解错了，以为给出的缺口是角度x到角度y，后来才知道是角度x到角度x加上角度y。

这道题本身没什么复杂的。

只要注意取模360，然后check的时候统计某个点被统计的次数，如果是5，即是答案。

感觉这道题难点在于时间复杂度。就像自己经常在考场上，想到了正解，觉得太简单了应该想错了吧导致不敢写。

以后不管怎么说，但是要敢写试试。大不了T了嘛。

{% spoiler code %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:spin
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;

int speed[10];
int a[10][400];

int timing = -1  ;

bool judge()
{
	int jj[400];

	memset( jj , 0 , sizeof(jj) ) ;

	for( int i = 1 ; i <= 5 ; i++)
	{
		for( int j = 0 ; j < 360 ; j++)
		{
			//jj[i]表示对于当前秒，角度j被覆盖了jj[i]次
			if( a[i][j] )
				jj[ ( j + speed[i] * timing ) % 360 ]++;
		}
	}

	for( int i = 0 ; i < 360 ; i++)
	{
		if( jj[i] == 5 )
			return true ;
	}

	return false ;
}

int main()
{
	freopen("spin.in","r" ,stdin);
	freopen("spin.out","w",stdout);
	for( int i = 1 ; i <= 5 ; i++)
	{
		int t ;
		
		cin >> speed[i] >> t ;
		for( int j = 1 ; j <= t ; j++)
		{
			int x , e ;
			cin >> x >> e ;
			//a[i][j]表示第i个轮子的角度j有缺口。
			for( int k = x ; k <= x + e ; k++)
				a[i][k % 360 ] = 1 ;
		}
	}

	while( ++timing <= 1200)
	{
		if( judge() )
		{
			cout << timing << endl ;
			return 0 ; 
		}
		else if( timing >= 1000 )
		{
			cout << "none" << endl ;
			return 0 ;
		}
	}

	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

时间复杂度的计算:
首先因为速度是1以上，所以每隔360个时间单位，肯定会出现每个人都最少出现了一个周期。
对于check一次的情况，需要的最坏情况是5*5*5*5(5个轮子，每个轮子5个缺口）。
所以复杂度上很显然是足够的。
