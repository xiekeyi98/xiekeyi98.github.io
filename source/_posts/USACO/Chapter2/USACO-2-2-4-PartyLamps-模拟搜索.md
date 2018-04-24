---
title: USACO-2.2.4-PartyLamps-模拟搜索
mathjax: true 
date: 2017-11-19 13:24:49
categories: ACM
tags:
- 模拟
- 搜索
- USACO
---

模拟、DFS搜索、小结论。

感觉这一章不少题，考察的是时间复杂度的计算。
<!--more-->


题意：

给定一个N，表示N盏灯( $10 \leq N \leq 100$ ) 。
给定操作数C( $ 0 \leq C \leq 10000 $ )。
四种操作：
1. 按钮1：当按下此按钮，将改变所有的灯：本来亮着的灯就熄灭，本来是关着的灯被点亮。
2. 按钮2：当按下此按钮，将改变所有奇数号的灯。
3. 按钮3：当按下此按钮，将改变所有偶数号的灯。
4. 按钮4：当按下此按钮，将改变所有序号是$ 3\*K+1 (K \geq 0) $的灯。例如：1,4,7...
一开始所有的灯都是亮着的。
给定最后灯亮暗的结果* (有部分灯未给)*，求所有灯最后的可能情况。(按字典序输出，被这个WA了一下)

-----
做法：

一开始想到朴素做法，就是枚举每一次操作，枚举C次。那么时间复杂度是($O(4^c)$) , 显然不合要求。

考虑到，对于每一种操作，不按和两次是一样的，按一次和按三次是一样的。
因此，我们只需要枚举对应每个操作，是按了还是没按就可以了。时间复杂度是($O(2^4)$)，考虑到还要检测和模拟，时间复杂度应该在($O(2^4 * n )$ )这个水平。这样也就过了。
本来想自己写个实现`set<string>`功能的，用来处理去重，不过了解了一下，似乎要用到字符串hash。暂时还没学过，遂作罢。

代码：

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:lamps
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

const int maxn = 110 ; 
int n ;
int c ;
vector<int> bright , dark ; 
int lamp[maxn]; 
int button[5];
set<string> sq ; 
vector<string> ans ; 
bool flag = false ; 

// 01翻转操作
inline void overturn( int &n )
{
	if( n == 1 )
		n = 0 ;
	else 
		n = 1 ; 
	return ;
}

void dfs( int m )
{
	// 开关每一位都确定后，模拟并检测。
	if( m == 5 )
	{
		int a[n+5];
		fill( a , a + n + 1 , 1 ) ; 
		{
		// 检测对于当前的按键，是否满足c的限制.(因为作用域问题，拿大括号括起来了) 
			int t = 0  ;
			for( int i = 1 ; i <= 4 ; i++)
				if( button[i] == 1 )
					t++;
		 
			if( t > c || ( t % 2 != c % 2 )  )
				return ;
		}
		
		// 模拟部分
		if( button[1] == 1 )
			for( int i = 1 ; i <= n ; i++)
				overturn(a[i]);
		if( button[2] == 1 )
			for( int i = 1 ; i <= n ; i+=2)
				overturn(a[i]);
		if( button[3] == 1 )
			for( int i = 2 ; i <= n ; i+=2)
				overturn(a[i]);
		if( button[4] == 1 )
			for( int i = 1  ; i <= n ; i+=3)
				overturn(a[i]);

		// 检测模拟后结果是否满足条件
		for( int i = 1 ; i <= n ; i++)
			if( lamp[i] != -1 && a[i] != lamp[i] )
				return ;
		
		// 记录答案
		string t ;
		for( int i = 1 ; i <= n ; i++)
			t += a[i] + '0' ;
		if( sq.count(t) <= 0 )
			ans.push_back(t) , flag = true ;
		sq.insert(t);
		return ; 
	}

	// 模拟每一个开关状态
	button[m] = 1 ;
	dfs( m + 1 ) ; 
	button[m] = 0 ;
	dfs( m + 1 ) ;
	return ;
}


int main()
{
	freopen("lamps.in" , "r" , stdin) ;
	freopen("lamps.out", "w" , stdout) ;
	memset( lamp , -1  , sizeof(lamp) ) ; 
	cin >> n ;
	cin >> c;
	int t ;
	while( ( cin >> t ) && t != -1 )
		bright.push_back(t);
	while( ( cin >> t ) && t != - 1 )
		dark.push_back(t);

	for( int i = 0 ; i < bright.size() ; i++)
		lamp[bright[i]] = 1 ;
	for( int i = 0 ; i < dark.size() ; i++)
		lamp[dark[i]] = 0 ;

	dfs(1);
	if(!flag)
		cout << "IMPOSSIBLE" << endl ;
	else 
	{
		sort( ans.begin() , ans.end() );
		for( vector<string>  :: iterator iter = ans.begin() ; iter != ans.end() ; ++iter)  
			cout << *iter << endl ; 
	}

	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

------

对于这道题，看dalao说第一次做，做到这个程度就可以了。这也是nocow的官方思路。不过对于这道题，深究下去还有一些优化。
如: 对于超过6盏灯的，其实只需要看前六个就可以了。因为1和7对应、2和8对应...... *(如果自身六个都不能互相对应，肯定是`IMPOSSIBLE`)*


在[luogu](www.luogu.org)的[P1468题解](https://www.luogu.org/wiki/show?name=%E9%A2%98%E8%A7%A3+P1468)看到了*闪耀星空*写的一个比较深入的想法。对自己有所启发，因此转了贴在下面。

>深究：
>这道题如果深究的话会变得非常简单， 但是提前声明，如果对这道题兴趣不大，或者是初学者，建议跳过， 刚才的分析已经足以过这道题。 我们现在记不按按钮，以及按下1，2，3，4按钮分别O，①，②，③，④， 那么，按下3，4，可以记为③④，以此类推， 我们发现一个问题，那就是①，②，③之间微妙的关系， ①②=③，而②③=①，①③=②（可以自己试试），于是我们知道，①②③也相当与不按，即相差3的倍数也可互相转换；
>所以，所谓前四个的16种按法其实只有8种， 分别为：O,①，②，③，④，①④，②④，③④；
>然后讨论c， 由于当c>4时，均可化为当c<=4的情况， 所以我们先讨论当c<=4的情况，
>当c=0时，只有一种O；
>当c=1时，四种：①，②，③，④；
>当c=2时，除了④均可（可以自己想想）；
>当c=3时，由于3-1=2，所以c=1的情况都满足，而在c=2中，把所有有前三类的展开，如①④变为②③④， 可知满足c=2的同时满足c=3，所以c=3其实是c=2和c=1的并集，即所有按法均可。
>当c=4时，由于4-1=3（①②③相当于不按），且4-2=2，由上，c=4也是所有按法均可。
>当c>4时，我先有一个引理：对于任意的正整数n>1，均可写成n=2*p+3*q(p,q为非负整数）的形式， 证明如下：若n为偶数，必然成立，若n为奇数，必然大于2，则n-3必为非负偶数，得证。 由这个引理我们可以知道，任意c>4均可写成，c=2*p+3*q+3(p,q为非负整数）的形式，而可知， 对于两个相同的按键，以及情况①②③（按键三次），均相当于不按，所以任意c>4均可化归为c=3的情况， 即当c>4时，所有按法均可。
>综上所述，
>当c=0时，只有一种O；
>当c=1时，四种：①，②，③，④；
>当c=2时，除了④均可；
>当c>2时，所有按法均可。
>好了，这样一来就非常简单了， 只有四种情况，8种按法。

