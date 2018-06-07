---
title: 字符串哈希——解决KMP等问题
mathjax: true
categories: ACM
tags:
  - 字符串
  - hash
abbrlink: d9000e89
date: 2018-04-26 17:26:19
---

字符串哈希邪教(不保证正确性)，解决一些奇怪的字符串哈希问题
<!--more-->

## 字符串哈希

一开始以为这个是一个比较难的东西，最近学了下，发现是个挺傻屌的东西的。很好理解。

所谓$hash$，就是希望有这么一个函数`value hash( const string &s ) ` 对于给定的每一个字符串，都能返回给我一个值。我们利用这个值，可以把长度为$n$的串，本来需要$O(n)$的去比较一次，现在用这个值可以只进行一次比较得出结果。


其实我们可以把这个映射，看成是$BASE$进制下的一种操作。对于一个字符串长度为$n$的话，我们就要用$n$位$BASE$进制去表示这个值。这个很好表示：

$$ BASE^{n} * s[n] + BASE^{n-1} * s[n-1] + ... +  BASE^{1} * s[1] $$

**注意，字符串哈希尽可能避免其中有$0$的出现，如果将$a$映射为$0$，那么$ab$和$b$可能会出现一样的结果**

我们很难有那么多位去表示一个串，如果高精度的话，那么和直接去比较也没什么区别了。所以我们可以取模一个数，看成是$mod\ P$意义下的映射表示。

具体的$hash$函数:
```cpp
ull hashh( char s2[] , int n )
{
	ull ans = 0 ; 
	for( int i = 1 ; i <= n ; i++)
		ans = ans * BASE + s2[i] ;
	return ans ;
}
```
这样，我们就可以给出一个字符串进去，然后出来一个$hash$值了。

如果是需要涉及子串的问题，我们可以这样：
```cpp
void hashh( ull ans[] , char s1[] , int n )
{
	for( int i = 1 ; i <= n ; i++)
	{
		ans[i] = ans[i-1] * BASE + s1[i] ;
	}
}
```
维护一个像前缀和一样的东西就就可以了。
**这里是需要取余的，我这里没有，是利用了unsigned类型的数字，溢出会自动取余的性质和unsigned long long 刚好是一个素数的性质**
如果不用素数取余，错误概率将大大提高。为了减少冲突概率，还可以使用双取余等各种其他方法（详情见参考资料）。如果自己手写处理$hash$冲突，那么其实这种做法就没有什么优点了。

对于这个，子串如何去使用呢？
一开始我以为，我只需要简单的对于截取子串$l...r$的哈希值，使用~~ans[r] - ans[l]~~ 就可以了。结果实际使用中发现崩了。

想了想才明白，我们应该将他看成是$r$位和$l$位的$BASE$进制下的数，我现在想截取前$l$位（想一下，每一位对应于第几位)。
所以，我们需要进行一个简单的变形: $$ ans[r] - ans[l] * BASE^{r-l+1} $$ 

我当时这里卡了一下。可以类比于我有$12345$和$123$， 需要把$45$提出，是不是需要乘上一些进制，把$123$变成$12300$？
我一开始以为$hash$出来的值，最高位存的是$s[n]$，后来想了下构建过程，构建是从$1...n$，然后又不断的乘$BASE$，其实是把最低位给送到了$hash$出来的值的最高位。


遇到的问题：
- 如何证明$hash$冲突的概率是多大？

## 相关题目


### [HDU 1686](http://acm.hdu.edu.cn/showproblem.php?pid=1686)
题意：
给出串$T$和串$S$，询问串$T$在串$S$中出现了几次(允许有重叠部分，具体参考样例)

{% spoiler code %}
{% codeblock lang:cpp %}

#include<bits/stdc++.h>
using namespace std ;
typedef unsigned long long ull;
const int maxn = 1000000 + 10 ; 
const ull BASE = 1e9 + 7 ;
char s1[maxn] , s2[maxn];
ull hashs1[maxn];

void hashh( ull ans[] , char s1[] , int n )
{
	for( int i = 1 ; i <= n ; i++)
	{
		ans[i] = ans[i-1] * BASE + s1[i] ;
	}
}

ull hashh( char s2[] , int n )
{
	ull ans = 0 ; 
	for( int i = 1 ; i <= n ; i++)
		ans = ans * BASE + s2[i] ;
	return ans ;
}



int main()
{

	int t ;
	scanf("%d",&t);
	while(t--)
	{
		scanf("%s",s2+1);
		scanf("%s",s1+1);
		int s1_size = strlen(s1+1) , s2_size = strlen(s2+1) ;
		hashh( hashs1 , s1 , s1_size) ;
		ull hashs2 = hashh( s2 , s2_size ) ;

		ull coefficient = 1 ;
		for( int i = 1 ; i <= s2_size ; i++)
			coefficient *= BASE ;

		int ans = 0 ; 
		for( int i = 1 ; i + s2_size - 1 <= s1_size && i <= s1_size ; i++)
		{
			ull t1 = hashs1[i + s2_size - 1 ];
			ull t2 = hashs1[i-1];
			t2 *= coefficient;

			if( t1 - t2 == hashs2 )
				ans++;
		}
		printf("%d\n",ans);
	}
	return 0 ; 
}
{% endcodeblock %}
{% endspoiler %}


### [HDU 1711](http://acm.hdu.edu.cn/showproblem.php?pid=1711)

题意：给出数列$S$和数列$T$，求$T$在数列$S$中第一次出现的位置。

{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1000000 + 10 ;

typedef unsigned long long ull ; 
ull a[maxn] , b[maxn] ; 
ull hashs1[maxn] ;
const ull BASE = 1e9 + 7 ;

void hashh( ull ans[] , ull a[] , int n )
{
	for( int i = 1 ; i <= n ; i++)
	{
		ans[i] = ans[i-1] * BASE  + a[i];
	}
}

ull hashh( ull a[] , int n )
{
	ull ans = 0 ;
	for( int i = 1 ; i <= n ; i++)
	{
		ans = ans * BASE + a[i];
	}
	return ans ;
}


int main()
{
	int t ;
	scanf("%d",&t);
	while(t--)
	{
		memset( a , 0 , sizeof(a) ) ;
		memset( b , 0 , sizeof(b) ) ; 
		memset( hashs1 , 0 , sizeof( hashs1 ) ) ; 

		int n , m ; 
		scanf("%d%d",&n , &m );

		for( int i = 1 ; i <= n ; i++)
		{
			int t ;
			scanf("%d",&t);
			a[i] = t + maxn ;
		}

		for( int i = 1 ; i <= m ; i++)
		{
			int t ;
			scanf("%d",&t);
			b[i] = t + maxn ;
		}

		hashh( hashs1 , a , n ) ;

		ull s2 = hashh( b , m  ) ; 

		int ans = -1 ; 

		ull t = 1 ;
		for( int i = 1 ; i <= m ; i++)
			t *= BASE ; 
		for( int i = 1 ; i + m - 1  <= n &&  i <= n ; i++)
		{
			ull h1 = hashs1[ i + m - 1 ] ;
			ull h2 = hashs1[i-1];
			h2 *= t ;
			if(  h1 - h2 == s2 )
			{
				ans = i ;
				break ;
			}
		}

		printf("%d\n",ans);
	}
	return 0 ; 
}
{% endcodeblock %}
{% endspoiler %}

### [HDU 2097](http://acm.hdu.edu.cn/showproblem.php?pid=2097)

题意： 给出串$s$和串$t$，求串$t$在串$s$中出现了几次（无重叠）

{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
typedef unsigned long long ull ; 
const int maxn = 1010 ;
char s1[maxn],s2[maxn];
ull hashs1[maxn];
const int BASE = 1e9 + 7 ;
const ull mod = 19260817 ; 

void hashh( ull ans[] , char s[] ,  int n )
{
	for( int i = 1 ; i <= n ; i++)
		ans[i] = ( ans[i-1] * BASE + s[i] ) % mod ;
}

ull hashh( char s[] , int n )
{
	ull ans = 0 ; 
	for( int i = 1 ; i <= n ; i++)
		ans = ( ans * BASE + s[i] ) % mod ;
	return ans  % mod ; 
}

int main()
{
	while( scanf("%s" , s1 + 1 ) != EOF )
	{
		if( s1[1] == '#' )
			break ;
		scanf("%s" , s2 + 1 ) ;
		int s1_size = strlen(s1+1) , s2_size = strlen(s2+1) ;
		
		hashh( hashs1 , s1 , s1_size ) ;
		ull hashs2 = hashh( s2 , s2_size ) ;

		ull coeffcient = 1 ;

		for( int i = 1 ; i <= s2_size ; i++)
			coeffcient *= BASE ; 
		coeffcient %= mod ;
		int ans = 0 ; 

		for( int i = 1 ; i + s2_size - 1 <= s1_size && i  <= s1_size ; i++)
		{
			ull h1 = hashs1[ i + s2_size - 1 ] ;
			ull h2 = hashs1[ i - 1 ];
			h2 *= coeffcient ;
			h1 %= mod , h2 %= mod ;
			if( h1 - h2 == hashs2 )
			{
				ans++;
				i = i + s2_size - 1 ;
				continue ;
			}
		}

		printf("%d\n",ans);
	}
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

### [HDU 5510](http://acm.hdu.edu.cn/showproblem.php?pid=5510)

题意：找出一个串，这个串前面的至少$1$个串不是该串的子串，且该串给出的顺序最靠后，求该串是第几个给出的串？


这道题时间复杂度挺高的，我第一眼以为是$AC$自动机。但是加上剪枝的话，时间复杂度上界没变，下界小很多，想卡这种做法似乎很难(听说剪枝后暴力都可过)。
这是$ACM-ICPC 2015$沈阳的题，我在想现场赛遇到这种题，敢不敢写，该怎么写啊？

{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
typedef unsigned long long ull ;
const int maxn = 2020 ;
const ull BASE = 1e9 + 7 ;
char s[550][maxn];
bool vis[maxn];
ull hashall[550];
ull hashevery[550][maxn];
ull coe[550];
int len[550];
ull hashh( char s[] , int n )
{
	ull ans = 0 ; 
	for( int i = 1 ; i <= n ; i++)
		ans  = ans * BASE + s[i] ;
	return ans ;
}


int main()
{
	int t ;
	scanf("%d",&t);
	int KASE = 0 ;
	while( t-- )
	{
		memset(vis, false ,sizeof(vis));
		memset( len , 0 , sizeof(len) ) ; 
		int n ;
		scanf("%d",&n);
		for( int i = 1 ; i <= n ; i++)
			coe[i] = 1 ; 
		for( int i = 1 ; i <= n ; i++)
		{
			scanf("%s", &s[i][1] );
			len[i] = strlen( &s[i][1] ) ;
			for( int j = 1 ; j <= len[i] ; j++)
				coe[i] *= BASE ; 

		}
		for( int i = 1 ; i <= n ; i++)
			hashall[i] = hashh( s[i], len[i] )  ;

		for( int i = 1 ; i <= n ; i++)
		{
			for( int j = 1 ; j <= len[i] ; j++)
				hashevery[i][j]  = hashevery[i][j-1] * BASE + s[i][j] ;
		}

		int ans = -1 ;
		for( int i =  2 ; i  <= n ; i++)
		{
			for( int j = 1 ; j < i ; j++)
			{
				if( !vis[j] )
				{
					bool succ = false ; 
					for( int k = 1 ; k + len[j] - 1 <= len[i] ; k++)
					{
						ull h1 = hashevery[i][k+len[j]-1];
						ull h2 = hashevery[i][k-1];
						h2 *= coe[j] ;
						if( h1 - h2 == hashall[j] )
						{
							succ = true ; 
							vis[j] = true ;
							break ;
						}
					}

					if( !succ )
						ans = i ;
				}
			}
		}
		printf("Case #%d: %d\n", ++KASE, ans ) ; 

	}
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


## 参考资料
- **[字符串Hash总结](http://www.yhzq-blog.cc/%E5%AD%97%E7%AC%A6%E4%B8%B2hash%E6%80%BB%E7%BB%93/)**
- [cdoj1092-韩爷的梦 （字符串hash）【hash】](http://www.cnblogs.com/jiu0821/p/4554352.html)
- [OI 字符串 常用哈希方法](https://blog.csdn.net/u013632138/article/details/52760459)
