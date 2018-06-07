---
title: Codeforces 486 Div.3 CF988C Equal Sums
mathjax: true
categories: ACM
tags:
  - codeforces
  - STL
  - 思维
abbrlink: 5aa8be3b
date: 2018-06-06 17:05:38
---


题意: 给出k个数列，要求选出任意两个数列i和j，使得第i个数列减去第n个数的和，等于第j个数列减去第m个数的和。求i、j、nn、m。

题目链接:http://codeforces.com/contest/988/problem/C
<!--more-->


### 错误想法

统计所有数列的和(a[i].value表示第i个数列的和是多少)，枚举两个数列(i、j)，枚举第i个数列的每个数字n。那么我们就确定了四个所求数中的三个，对于第四个数m进行二分即可。
$$ a[i].value - n == a[j].value - m $$
```
for( 数列 i = 1 to k ) 
	for( 数列 j = 1 to i )
		for( 元素 n = 1 to a[i].size() )
			二分查找a[j]中是否存在m( m == a[j].value - a[i],value + n ) 
				找到了输出YES.
输出NO
```
算法复杂度: $O(k^3*logn)$

一开始考虑到这个肯定过不了，不过无意间看到保证所有数据元素加起来不超过$2e5$个，不知道怎么脑子抽了就写了。
但是实际上显然不能过的，只要每个数列一个数字，直接将近$4e10$，TLE是肯定的。
写了以后疯狂Wrong Answer.... TLE我也就接受了。应该是正常的，然而疯狂WA是怎么一回事。
查了两三天的错，主要的问题是:
- **二分没有排序！** (这问题,orz)
- 排序后，某下标错了……

{% spoiler WRONGANSWER %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 2e5 + 10 ; 
// 一种HACK手法，用于将CODEFROCES大数据不能看全的时候，远程输出一些数据。
//#define DEBUG
struct node
{
	vector< pair< long long , int > > e ;
	long long value = 0 ;
	int n = 0 ; 
	int pos = 0 ; 
}a[maxn];


int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	int k ;
	cin >> k;
#ifdef DEBUG
	int debug_1 , debug_2 ;
#endif 
	for( int i = 1 ; i <= k ; i++)
	{
		cin >> a[i].n;
		a[i].pos = i ; 
		for( int j = 1 ; j <= a[i].n ; j++)
		{
			long long  t ;
			cin >> t ;
			a[i].e.push_back(make_pair( t , j ));
			a[i].value += t ;
#ifdef DEBUG
			if( i == 99 && j == 418 )
				debug_1 = t ;
			if( i == 128 && j == 226 )
				debug_2 = t ; 
#endif
		}
	}

	sort( a + 1 , a + 1 + k , [](const node &a , const node &b ) { return a.value < b.value ; } ) ;
	
	// 二分需要排序！
	for( int i = 1 ; i <= k ; i++)
		sort( a[i].e.begin() , a[i].e.end() ) ;


	for( int i = 2 ; i <= k ; i++)
	{
		for( int j = 1 ; j < i ; j++)
		{
			for( int kk = 0 ; kk < a[i].e.size() ; kk++)
			{
				// 这个pair类型，这样查找不确定是否合适
				auto iter = lower_bound( a[j].e.begin() , a[j].e.end() ,
						make_pair(a[j].value - a[i].value + a[i].e[kk].first,1) ) ;

				if( iter == a[j].e.end() )
					continue;
				else if( a[i].value - a[i].e[kk].first == a[j].value - iter->first )
				{
					cout << "YES" << endl ;
					cout << a[i].pos << ' ' << a[i].e[kk].second << endl ;
					cout << a[j].pos << ' ' << iter->second  << endl ;
#ifdef DEBUG
					if( k == 400 )
					{
						cout << a[i].value << ' ' << a[j].value << endl ;
						cout << a[i].e[kk].first << ' ' << a[i].e[kk].second << endl;
						cout << iter->first <<  ' ' << iter->second << endl ; 
						cout << debug_1 << ' ' << debug_2 << endl ;
					}
#endif
					return 0 ;
				}
			}
		}
	}

	cout << "NO" << endl ;
	return 0 ;
}


{% endcodeblock %}
{% endspoiler %}



![和空气斗智斗勇](/images/CF988C.png)


感觉自己问题出在，想到了一个简单的不行的结论，就以为get到了这道题的trick，然后就非常兴奋的撞了上去越陷越深。



### 正确做法

```
map< 去掉一个数后的和 , 
     pair<第一次出现这个和的时候的数列，第一次出现这个和的时候的数列元素位置 > 
   >
```
只要遍历每一个数字，当这个数字在map中没有出现过的时候，放入这样一个map中，当这个数字在map中出现了的时候，输出map中记录的第一次出现的位置和当前位置即可。
时间复杂度:$O(k*logn)$

{% spoiler ACcode %}
{% codeblock lang:cpp %}

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 2e5 + 10 ; 
map< int , pair<int , int > > mp ;

struct node
{
	vector<int > e ;
	int value = 0  ;
	int n = 0 ; 
}a[maxn];


int main()
{
	int k;
	cin>> k ;
	for( int i = 1 ; i <= k ; i++)
	{
		cin >> a[i].n;
		for( int j = 1 ; j <= a[i].n ; j++)
		{
			int t;
			cin >> t ;
			a[i].e.push_back(t);
			a[i].value += t ;
			
		}
	}

	for( int i = 1 ; i <= k ; i++)
	{
		for( int j = 0 ; j < a[i].e.size() ; j++)
		{
			if( mp[ a[i].value - a[i].e[j] ].first == 0 )
			{
				mp[ a[i].value - a[i].e[j] ] = make_pair( i , j + 1 )  ;
			}
			else if( mp[ a[i].value - a[i].e[j] ].first != i ) 
			{
				cout << "YES" << endl ;
				cout << mp[a[i].value - a[i].e[j] ].first << ' ' 
					<< mp[a[i].value - a[i].e[j] ].second << endl ;
				cout << i << ' ' << j + 1 << endl ;
				return 0 ;
			}
		}
	}

	cout << "NO" << endl ;
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


### 总结

以后对于这种出现两次，要找一对的情况之类的，可以考虑先存一下第一次出现的时候的情况，然后第二次出现的时候直接输出。
