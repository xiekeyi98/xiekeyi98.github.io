---
title: USACO-2.2.2-Nocows-DP
mathjax: true
date: 2017-11-30 18:31:31
categories: ACM
tags:
- USACO
- DP
---

给定$N$、$K$，求由$N$个节点、构造出的$K$层完全二叉树的方案数。
<!--more-->

# 题意:

>题目描述
>农民约翰准备购买一群新奶牛。 在这个新的奶牛群中, 每一个母亲奶牛都生两个小奶牛。这些奶牛间的关系可以用二叉树来表示。这些二叉树总共有$N$个节点($ 3 \leq N < 200 $)。这些二叉树有如下性质:
>每一个节点的度是$0$或$2$。度是这个节点的孩子的数目。
>树的高度等于$K$($1 < K < 100$)。高度是从根到最远的那个叶子所需要经过的结点数; 叶子是指没有孩子的节点。
>有多少不同的家谱结构? 如果一个家谱的树结构不同于另一个的, 那么这两个家谱就是不同的。输出可能的家谱数的个数除以$9901$的余数。
>
>输入格式：
>两个空格分开的整数, N和K。
>输出格式：
>一个整数，表示可能的家谱树的个数除以9901的余数。
>输入输出样例
>输入样例#1：
>5 3
>输出样例#1：
>2
>说明
>翻译来自NOCOW
>USACO 2.3

-----

# 做法：

## 暴搜(TLE)

对于已知$1到i$层二叉树的方案数，想要在此之上构建出第$i+1$层的方案数。我们的方法有：
1. 左子树是$i$层，右子树是$1到i-1$层。(在这种情况下，上面加一个根节点)
2. 左子树是$1到i-1$层，右子树是$i$层。(在这种情况下，上面加一个根节点)
3. 左右子树都是$i$层。(在这种情况下，上面加一个根节点)

按照这个方法，可以递归去生成这么一颗树。但是我们并不知道左右子树的节点个数，所以我们还要枚举节点个数。

因此，我们可以定义函数` dfs( remain_points , now_floor  , floor  ) ` 表示使用`remain_points`个节点，构建`floor`的方案数。按照上面的方法去生成即可。

代码：

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:nocows
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;
int n , k ; 
int dfs( int remain_points , int now_floor , int floor )
{
	remain_points-- ; // 减去当前的根节点。
	if( now_floor >= floor || remain_points <= 0 ) // 超过当前要求的层数或剩余节点小于0即退出。
	{
		if( remain_points == 0 && now_floor == floor ) // 当当前层数和剩余节点都满足时为合格方案数。
			return  1  ; 
		else
			return  0   ;
	}
	int ans = 0 ; 
	// 枚举，i表示对左子树分配的节点，对右子树分配 remian_points - i个节点。
	for( int i = 0 ; i <= remain_points ; i++) 
	{
		if( i > 0 && remain_points - i > 0 ) // 因为对度数有0或者2的要求，所以左右子树都要大于0.
		{

			// 第一种情况，左子树是i层，右子树是 1 到 i - 1 层。
			int t1  = 0 ; 
			int t2 = 0 ; 
			t1 += dfs( i , now_floor + 1 , floor ) ;
			for( int j = now_floor + 1  ; j <= floor - 1 ; j++)
			{
				t2 += dfs( remain_points - i , now_floor + 1 , j ) ;
			}
			ans += t1 * t2 ; 

			// 第二种情况， 左子树是1到i-1层，右子树是i层。
			t1 = 0 ; 
			t2 = 0 ; 
			t2 += dfs( remain_points - i , now_floor + 1 , floor ) ;
			for( int j = now_floor + 1  ; j <= floor - 1 ; j++)
			{
				t1 += dfs( i , now_floor + 1 , j ) ;
			}
			ans += t1 * t2 ;
			// 第三种情况，左右两个子树都是i层。
			ans += dfs( i , now_floor + 1 , floor ) * dfs( remain_points - i , now_floor + 1 , floor ) ; 
		}
	}
	return ans  ; 
}

int main()
{
	freopen("nocows.in","r",stdin);
	freopen("nocows.out","w",stdout);
	cin >> n >> k ;
	cout << dfs( n , 1 , k ) % 9901 << endl ;
}

{% endcodeblock %} 
{% endspoiler %}

这样的代码毫无疑问是会T的。时间复杂度$O( n * 2^k )$ 

然后我想用我无往不利的将`dfs`改成记忆化搜索，我想那样的话就肯定可以过。
结果用和`dfs`参数类似的数组`dp[maxn][maxk][maxk]`改记忆化搜索后，$MLE$了*(说来搞ACM，好久没遇到MLE了2333。感觉一直对空间限制都不是很严格。没想到USACO限制挺严格的。)*。


## 压状态爆搜(TLE)

因为我们`dp[maxn][maxk][maxk]`爆空间了。毫无疑问是我们的状态太多了。因此，我们不得不去压缩一下状态。
考虑到对于`floor`这个参数来说，其实完全没有必要记录$1到k$每一个的状态。对于我们来说，只关心是等于k还是小于k即可。
所以我们修改`dfs`为`dfs( remain_points , now_floor , flag ) `，用一个二维状态表示即可*(不过这个修改，我还改了挺长时间的。改起来挺麻烦的)*。

代码:

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:nocows
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

int n , k ;


int dfs( int remain_points , int now_floor , bool flag )
{
	remain_points-- ; 
	if( now_floor >= k || remain_points <= 0 )
	{
		if( flag ) 
		{
			// 如果是要到达k层，那么只有到k层才能返回1.
			if( remain_points == 0 && now_floor == k )
				return  1  ; 
			else
				return  0  ;
		}
		else
		{
			// 如果要求小于k层，则只有这种情况才能返回1. 
			if( remain_points == 0 && now_floor <  k  )
				return 1 ;
			else 
				return 0 ;
		}
	}

	int ans = 0 ; 
	for( int i = 0 ; i <= remain_points ; i++)
	{
		if( i > 0 && remain_points - i > 0 )
		{

			if( flag ) 
			{
				// 当flag是true时，对应上文的三种情况。
				//即就是，左边true右边false，右边true，左边false，两边true的情况。
				int t1  = 0 ; 
				int t2 = 0 ; 
				t1 += dfs( i , now_floor + 1 , true ) ;
				t2 += dfs( remain_points - i , now_floor + 1 , false ) ;
				ans += t1 * t2 ; 
				t1 = 0 ; 
				t2 = 0 ; 
				t2 += dfs( remain_points - i , now_floor + 1 , true ) ;
				t1 += dfs( i , now_floor + 1 , false ) ;
				ans += t1 * t2 ;
				ans += 
					dfs( i , now_floor + 1 , true ) *
					dfs( remain_points - i , now_floor + 1 , true ) ; 
			}

			else 
			{
				// 否则只有一种情况，就是两边都是false的情况。 
				ans += dfs( i , now_floor + 1 , false ) * dfs( remain_points - i , now_floor + 1 , false ) ; 
			}

		}
	}

	//printf(" dfs( %d , %d , %d ) : %d \n " , remain_points , now_floor , floor , ans ) ; 
	return  ans  ; 
}

int main()
{
	freopen("nocows.in","r",stdin);
	freopen("nocows.out","w",stdout);
	cin >> n >> k ;
	cout << dfs( n , 1 , true ) << endl ;
	return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}


这个代码的时间复杂度和上面的方法没有本质的区别。因此毫无疑问，依然是一个$TLE$的代码。

所以需要加上记忆化搜索。

## 压状态记忆化搜索(AC)

我们用`dp[maxn][maxk][flag]` 表示一个状态，加上记忆化搜索后。
代码如下：

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:nocows
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

int n , k ;


int dp[200][200][2];

int dfs( int remain_points , int now_floor , bool flag )
{
	if( dp[remain_points][now_floor][flag] != - 1)
		return dp[remain_points][now_floor][flag] ; 

	remain_points-- ; 
	if( now_floor >= k || remain_points <= 0 )
	{
		if( flag ) 
		{
			if( remain_points == 0 && now_floor == k )
				return dp[remain_points + 1 ][ now_floor][flag] = 1 ; 
			else
				return dp[remain_points + 1 ][now_floor][flag] = 0 ;
		}
		else
		{
			if( remain_points == 0 && now_floor <  k  )
				return dp[remain_points+1][now_floor][flag] = 1 ; 
			else 
				return dp[remain_points+1][now_floor][flag] = 0 ; 
		}
	}

	int ans = 0 ; 
	for( int i = 0 ; i <= remain_points ; i++)
	{
		if( i > 0 && remain_points - i > 0 )
		{

			if( flag ) 
			{

			int t1  = 0 ; 
			int t2 = 0 ; 
			t1 += dfs( i , now_floor + 1 , true ) ;
			t2 += dfs( remain_points - i , now_floor + 1 , false ) ;
			ans += ( t1 % 9901  * t2 % 9901 ) % 9901  ; 

			t1 = 0 ; 
			t2 = 0 ; 
			t2 += dfs( remain_points - i , now_floor + 1 , true ) ;
			t1 += dfs( i , now_floor + 1 , false ) ;
			ans += ( t1 %9901 * t2 % 9901  ) % 9901 ;
			ans += dfs( i , now_floor + 1 , true ) % 9901 * dfs( remain_points - i , now_floor + 1 , true ) %9901 ; 
			}

			else 
			{
				ans += dfs( i , now_floor + 1 , false ) % 9901  * dfs( remain_points - i , now_floor + 1 , false ) % 9901 ; 
			}

		}
	}

	//printf(" dfs( %d , %d , %d ) : %d \n " , remain_points , now_floor , floor , ans ) ; 
	return dp[remain_points+1][now_floor][flag] = ans % 9901 ; 
}

int main()
{
	freopen("nocows.in","r",stdin);
	freopen("nocows.out","w",stdout);
	memset( dp , -1 , sizeof(dp ) ) ;
	cin >> n >> k ;
	cout << dfs( n , 1 , true )  % 9901 << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

成功AC。


## 四次方DP(AC）


考虑改写成DP形式。
用`dp[i][j]`表示使用$i$个节点，恰好构成$j$层的方案数。
则dp的转移方程，和上文所说的三种情况一样。枚举两维，二维转移即可。

代码：

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:nocows
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 200 + 10 , maxk = 100 + 10 ;
const int modp = 9901 ;
int n , k ;
int dp[maxn][maxk]; // dp[i][j] means the number of schemes with points i in floor j ;

int main()
{
	freopen("nocows.in","r",stdin);
	freopen("nocows.out","w",stdout);
	cin >> n >> k ;

	dp[1][1] = 1 ;  // 边界情况，1个节点构成1层是一个方案，其他都是0.
	//枚举每一层。
	for( int now_floor = 1 ; now_floor <= k ; now_floor++)
	{
		//枚举对于第now_floor层来说，用1到n个节点构造的情况。
		for( int now_point = 1 ; now_point <= n ; now_point++ )
		{
			//枚举对于第now_floor层，用now_point节点构造。
			// 用enum_point去构造左子树，用 now_point - 1 - enum_point构造右子树。
			for( int enum_point = 1 ; enum_point <= now_point - 1  ; enum_point++)
			{
				int less_than_nowfloor = 0 ;
				// 统计左子树是i-1层，右子树从 1到i- 2层的情况(对应讨论1)
				for( int enum_floor = 1 ; enum_floor <= now_floor - 2 ; enum_floor++ )
					less_than_nowfloor += dp[ now_point - 1 - enum_point ][ enum_floor ] % modp  ;
				less_than_nowfloor %= modp ; 
				dp[now_point][now_floor] += dp[ enum_point ][ now_floor - 1 ] % modp * less_than_nowfloor % modp ;
				dp[now_point][now_floor] %= modp  ; 

				// 统计左子树是1到i - 2 层，右子树是i-1层的情况(对应讨论2)
				less_than_nowfloor = 0 ;

				for( int enum_floor = 1 ; enum_floor <= now_floor - 2 ; enum_floor++ )
					less_than_nowfloor += dp[enum_point][enum_floor] % modp  ; 
				less_than_nowfloor %= modp ; 
				dp[now_point][now_floor] +=
					less_than_nowfloor % modp * dp[ now_point - 1 - enum_point][now_floor-1] % modp ;
				dp[now_point][now_floor] %= modp ; 

				// 统计当两边都是i-1层的情况(对应讨论3)
				dp[now_point][now_floor] += 
					dp[ enum_point][now_floor-1]  % modp *  
					dp[ now_point  - 1 - enum_point][now_floor-1] % modp ; 
				dp[now_point][now_floor] %= modp  ;
			}
		}
	}


	cout << dp[n][k] % modp << endl ;
}

{% endcodeblock %} 
{% endspoiler %}

## 三次方DP(AC)


注意到四次方DP，每次都重复计算了$1到i-2$层的情况。因此我们考虑可以使用数组`sum[i][j]`表示使用$i$个节点，构成的少于$j$层的方案数。


代码：

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:nocows
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 200 + 10 , maxk = 100 + 10 ;
const int modp = 9901 ;
int n , k ;
int dp[maxn][maxk]; // dp[i][j] means the number of schemes with points i in floor j ;
int sum[maxn][maxk]; // sum[i][j] means the number of schemes with points i less   floor j ; 

int main()
{
	freopen("nocows.in","r",stdin);
	freopen("nocows.out","w",stdout);
	cin >> n >> k ;

	dp[1][1] = 1 ; 

	for( int i = 1 ; i <= k ; i++)
		sum[1][i] = 1 ; 

	//枚举每一层
	for( int now_floor = 1 ; now_floor <= k ; now_floor++)
	{
		// 枚举对于第now_floor层，使用1到n个节点去构造。
		for( int now_point = 1 ; now_point <= n ; now_point++ )
		{
			//枚举左子树节点个数。
			for( int enum_point = 1 ; enum_point <= now_point - 1  ; enum_point++)
			{
				// 对应讨论1
				dp[now_point][now_floor] +=
					dp[enum_point][now_floor-1] * sum[now_point - enum_point - 1 ][ now_floor-2];
				// 对应讨论2
				dp[now_point][now_floor] +=
					dp[now_point-enum_point-1][now_floor-1] * sum[enum_point][ now_floor-2];
				// 对应讨论3.
				dp[now_point][now_floor] +=
					dp[now_point-enum_point-1][now_floor-1] * dp[enum_point][now_floor-1];
				dp[now_point][now_floor] %= modp ; 
			}
			// 这个方法的核心。
			// 维护sum数组。
			for( int j = 1 ; j <= now_floor ; j++)
				sum[now_point][j] = ( sum[now_point][j-1] + dp[now_point][j] ) % modp ; 
		}
	}
	cout << dp[n][k] % modp << endl ;
}

{% endcodeblock %} 
{% endspoiler %}
这个`sum`数组用了前缀和的思想。一开始我把`sum`数组放到了第三层循环里面，变成了四次方的DP。结果答案是对的，但是$TLE$了。(上面那个四次方DP能过大概是因为枚举的状态少一些吧。每次不一定把循环跑满了。)

因为我们把dp方程写成加和的形式，会发现:

$$sum[i][nowfloor-2]=\\sum_{j=1}^{nowfloor-2}{sum[i][j]}$$

也就是说，每次更新了`dp[now_point][now_floor]`数组后，`sum`数组显然需要一同更新。
因为每次更新的时候`dp`的时候，`now_point`都是新出现的，所以这一维不需要去变化。而层数因为`sum[now_point][now_floor]`表示的是小于`now_floor`的情况，所以所有大于等于`now_floor`等都应该遍历去更新。这里可以利用构造前缀和的思想去操作。 *（关于转移而来的状态，由代码很容易看出都是已经被计算过的)*




## 三次方DP(AC)

看到有题解使用的方法是，用`dp[i][j]`表示用i个节点，构造出的小于等于`j`个节点的情况。然后最终答案是`dp[n][k] - dp[n-1][k]`。 这个方法也很巧妙。代码量极少。我认为这个方法是把我上一个方法的dp数组和sum数组结合起来而产生的dp方法。
因为复杂度和我的代码区别不是很大，加上别人的这个想法我目前理解的不是很透彻，也并非我自己独立思考得来，这道题我也想了五六天了。所以这个方法暂时没有去花时间思考和实现。有机会可能会补上。


## 一些优化

这道题还有一些优化部分。
如
- 注意到每层字数分配的节点肯定都是奇数个，所以可以以2递增。
- 对于每层子树，很容易计算出最大节点数。借此剪枝。
