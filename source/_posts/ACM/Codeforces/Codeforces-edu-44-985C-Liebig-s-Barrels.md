---
title: Codeforces edu.44 985C Liebig's Barrels
mathjax: true
categories: ACM
tags:
  - codeforces
  - 贪心
abbrlink: f70cdf0b
date: 2018-05-23 00:12:35
---

题目链接: http://codeforces.com/contest/985/problem/C

题目大意：给出n,k,l。接下来给出n*k块木板。k块木板可以做成一个木桶，一共要做n个木桶。木桶体积为最短的木板长度。最大的木桶的体积和最小的木桶体积不能超过l。求所能做成的木桶最大的面积之和。不能做出n个木桶则输出0.

<!--more-->

## 场上想法
~~赛场上觉得，排序后看最小值+l所在的位置是否大于等于n，是则输出前n个之和，否则输出0即可。~~

结果发现这样太蠢了。因为这样显然不会是最大的。后来赛场上又在想，是否是前面的都是尽可能相邻k个一拼，最后相邻k个且满足减去l小于等于a[1]的，找这样的尽可能大的加起来就可以。  
**这也是错的！**


## 补题想法

感觉能摸到一点边了，但是还是想了好久才明白。

先排序，我们要分三种情况讨论(记数字a[1] + l范围内的最大值的位置为pos，pos可用upper_bound得到) :

- 如果pos $\le$n ，显然不满足条件。(无论怎么选，都会使a[1]+l的限制条件被破坏)   
- 如果pos $\geq$n , 并且pos - k $\geq$ n - 1 ，即就是选取了相邻的k个数(这是最好的局部策略，因为以这k个数中最小的数字为代价，把其他k-1个数字都控制住了)，且剩下的数字依然满足最坏条件(即剩下的数字每个都属于剩下不同的木桶)。  
- 如果pos $\geq$n，并且不满足$pos-k \geq n-1$，则剩下的每个数字都要组成不同的木桶。将他们加起来即可。  
这就是做法。  
今天对第三个条件想了很久，因为我一开始认为有可能出现:

|n=3|k=3|l=2|
|:-:|:-:|:-:|
|1|1|1|
|2|2|2|
|2|3|4|
| |pos↑| |

这种情况，我一开始以为会出现前面都匹配好了，剩下的pos指在这里导致会加上3而不是2(因为看同学代码有倒序查找，见参考资料)，后来发现这种情况不会发生，要不然就会全部都满足条件二。

这三种情况理解了，题目也就很好做了。

## AC代码

{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1e5 + 10 ;
int a[maxn];


int main()
{
	int n ,k , l ;
	cin >> n >> k >> l ;
	for( int i = 1; i <= n * k  ; i++)
		cin >> a[i];
	sort( a + 1 , a + 1 + n*k ) ;

	int pos = upper_bound( a + 1 , a + 1 + n * k , a[1] + l ) - a ;
	pos--;

	if( pos < n ) // 错写成小于等于，要注意这里。
	{
		cout << 0 << endl ;
		return 0;
	}

	long long ans = 0 ; 
	int p = 1  ;
	for( int i = 1 ; i <= n ; i++)
	{
		ans += a[p];
		p++;
		for( int j = 1 ; j <= k - 1 ; j++)
		{
			if( pos - p + 1 > n - i ) // 错写成小于等于，要注意这里是没选的情况
				p++;
			else
				break ;
		}
	}

	cout << ans << endl ;
	return 0 ; 
}
{% endcodeblock %}
{% endspoiler %}

## 参考资料
- [Educational Codeforces Round 44 Editorial By PikMike(官方题解)](http://codeforces.com/blog/entry/59623)  
- [codeforces 985C Liebig's Barrels —— 上紫](https://www.cnblogs.com/kickit/p/9070612.html)  
- [同学代码](http://codeforces.com/contest/985/submission/38521216)  
    

------

感觉自己贪心好弱，思维好僵硬啊qwq。

