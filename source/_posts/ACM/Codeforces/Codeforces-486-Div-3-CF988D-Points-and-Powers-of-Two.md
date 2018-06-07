---
title: 'Codeforces #486(Div.3) CF988D Points and Powers of Two'
mathjax: true
categories: ACM
tags:
  - codeforces
  - 思维
abbrlink: f4a229d0
date: 2018-06-06 18:00:51
---

题意: 给出n个数字，找出这n个数字的一个子集，使得子集中任意两两(包括自己和自己)相减的数字，都是2的非负次幂。

题目链接:http://codeforces.com/contest/988/problem/D

<!--more-->



### 错误想法


```
for( 遍历元素 a[i] = a[1] to a[n] )
	delta = 0 
	while( delta <= MAXN )
		if( 二分查找到( a[i] + delta ) )
			记录 a[i] + delta .
	dleta = ( delta == 0 ) ? 1 : delta * 2  
	维护最大值
```
时间复杂度: $O(n* logMAXN * logn )$

WA在6上，一开始以为是MAXN开的不够大（第一次开了2e5），结果改到2e9后，反而WA1了。后来发现，这个思路**根本不对**，因为无法保证，**任意两两相减的数字**，都是2的非负次幂。

### 正确做法

有一个结论:**这样的数组最多只会有3个**

简单证明：

- 对于只有一个数字$a$的情况，显然成立。$( a-a = 0 = 2^0 )$
- 对于只有两个数字$a，b$的情况，只会有： $( b - a = 2^x )$
- 对于只有三个数字$a,b,c,$的情况:
则有 $b - a = 2^x , c - b = 2^y$，因为题目要求任意两两相减都要是2的非负次幂。所以显然应该有$c - a = 2^z = 2^x + 2^y$ ，而只有$x = y$的时候，这个情况才成立
(考虑一下2的非负次幂的二进制表达，如果$x!=y$，那么二进制表达应该是有两位，就不能被表示成一个2的非负次幂的情况了，而是两个2的非负次幂相加)
所以三个数的情况，一定是$[a - x , a , a + x]$ 其中x是某个2的次幂。
- 那么对于四个数字$a,b,c,d$的情况，$d - c$是2的非负次幂，$c - a$也是2的非负次幂，那么$d-a$显然会是两个不同的二的次幂相加得到(假如对于这种情况，是两个相同的二的次幂，那么同样的情况，换几个选择，肯定又会是不同的二的次幂相加的情况。所以不能成立)。
- 对于数字大于4的情况，因为他包含了是任意两两相减都要满足情况，肯定包含了$ n \lq 4$的情况，所以大于4都不行。

有了这个结论以后，我们只要稍微改动一下，当得到3个数字的结果就退出，对于1和2的情况，都分别处理一下即可。

{% spoiler ACcode %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
int n ;
int cnt_ans = 0 ;
vector<long long > a ;
vector<long long > ans ; 


int main()
{
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
	{
		int t ;
		cin >> t ;
		a.push_back(t);
	}

	sort( a.begin() , a.end()) ;

	long long delta = 1ll  ;

	for( int i = 0 ; i < n ; i++)
	{
		delta = 1ll ; 
		while( delta <= 2000000000ll)
		{
			int t = 1 ; 
			vector<long long > tt ; 
			tt.push_back(a[i]);
			if( binary_search( a.begin() , a.end(), a[i] + delta ) )
			{
					t++;
					tt.push_back( a[i] + delta ) ;
			}
			if( binary_search( a.begin() , a.end(), a[i] - delta ) ) 
			{
				t++;
				tt.push_back(a[i]-delta);
			}

			delta *= 2ll ;
			if( t > cnt_ans  )
			{
				cnt_ans = t ;
				ans = tt ;
			}
			if( cnt_ans == 3 )
			{
				cout << cnt_ans << endl ;
				for( auto i : ans )
					cout << i <<  ' ' ;
				cout << endl ;
				return 0 ;
			}
		}
	}

	cout << cnt_ans << endl ;
	for( auto i : ans )
		cout << i << ' ' ;
	cout << endl ;
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


