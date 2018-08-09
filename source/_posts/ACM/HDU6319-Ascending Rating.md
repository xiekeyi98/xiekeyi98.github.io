---
title: HDU6319-Ascending Rating
mathjax: false
categories: ACM
tags:
  - 队列
abbrlink: c7f5271b
date: 2018-08-03 20:36:11
---

题意：对于一个数列(7e7)，求出所有长度为m的区间中，区间最大值和i的异或和以及区间内递增序列(最大值变换次数)的值的异或和。
<!--more-->


## 做法


### 单调队列处理区间最大值

单调队列。对于各种区间内的最大值，可以很容易的使用单调队列得到,或者说，这是利用单调队列实现一种滑动窗口的思想。**(一直感觉单调队列就像是一种尺取(双指针扫描)的感觉)**  
比较简单，看一眼基本就会操作了。等于时时刻刻维持着这个队列内存放的数字都是单调递减的样子。

{% codeblock lang:cpp %}
//取得对于所有n个数字，区间范围为m的，所有区间的最大值
void getmax( int n , int m )
{
	//q一开始写的是deque。
	q.clear();
	for( int i = 1 ; i <= n ; i++)
	{
		// 如果当前进来的数字比队尾存在的数字大，
		// 那么就把队尾元素弹出，循环操作，直到不满足条件。
		while( !q.empty() && a[q.back()] <= a[i] ) 
			q.pop_back();
		// 插入当前元素
		q.push_back(i);
		// 队列中没有m个数字的时候，继续执行，保证得到的是
		// 包含完整的一个区间的情况
		if( i < m )
			continue ; 
		// 如果当前的队首过期，即就是窗口滑动出去，队首已经不在当前区间了，pop
		while( q.front() < i - m + 1 )
			q.pop_front();
		// 队首即为当前区间的最大值
		maxnum.push_back(a[q.front()]);
	}
}
{% endcodeblock %}


### 单调队列处理区间内递增序列


这个感觉还是挺花的操作的。  
但是其实思想还是用到了我之前说的：单调队列是维护了一个内部单调递减的队列。所以我们发现，我们只要倒着跑，就可以实现单调队列内当前存在的元素个数，就是我们的单调递增序列长度。

{% codeblock lang:cpp %}
void getcount( int n , int m )
{
	q.clear();
	for( int i = n ; i >= 1 ; i--)
	{
		while( !q.empty() && a[q.back()] <= a[i] )
			q.pop_back();
		q.push_back(i);
		if( i > n - m + 1 )
			continue ;
		while( q.front() > i + m - 1 )
			q.pop_front();
		maxcount.push_back( q.size() ) ;

	}
}
{% endcodeblock %}

基本思想和刚才很像，只是反着(从n到1跑了一次)。但是我在这里卡了很久，不太明白为什么要倒着跑？不倒着跑行不行？   
当我用铅笔在纸上来来回回之后，发现确实是酱紫才行呢。

首先我们来看倒着跑：倒着跑的正确性是显然的。我们之前正着来的时候，就会发现队首一直是最大值。我们也只用到了这个性质。但是我们再进一步观察队列内的元素，会发现队列内的元素其实就是从当前的队首开始到下一个比队首大的值之前的最长单调递减序列~~(话有点绕)~~。因此，我们倒着跑，就恰好保证了是从最大值开始的反向最长递减序列，也就是我们最长的递增序列到最大值，也就是答案所要求的。

其次，我们再考虑为什么要倒着跑？那是因为我们观察发现，优先队列只能处理队首是一个最值、队列内的元素个数就是从这个最值到下一个最值之间的最长单调序列。  
所以，如果我们假设队首存的是最小值，那么只能得到该最小值开始的最长递增序列。反之只能得到从最大值开始的最长递减序列。  
因此不行。

**所以我们要注意这种反着跑的方法和思路**


注:部分地方存在「极小值」和「最小值」，「极大值」和「最大值」混用的情况。


据说这道题卡常挺严重的，看到很多题解都用`scanf``printf`和手写队列，不用STL等方法卡常。  
我一开始也以为自己被卡常了，所以一开始的`deque`改成了`queue`，为了不改那么多，于是写了个`class`来保证接口(o(╯□╰)o)  
最后发现竟然只是mod次数太多了！我不应该在生成数列的时候，每一项都mod，改了就A了。队友写的`cin``cout`等，也能A。

完整AC代码：
{% spoiler ACcode %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
using ll = long long ;
const int maxn = 70000000 + 100 ;
ll a[maxn];
vector<ll> maxnum;
vector<ll> maxcount;
class que
{
	public:
		int aa[maxn];
		int tail = 0 , head = 0 ; 
		bool empty() { return tail <=  head ; };
		void pop_back(){ --tail; };
		int back(){ return aa[tail - 1 ] ; } ;
		int front(){ return aa[head]; };
		void push_back(int i ){ aa[tail++] = i ;};
		void pop_front(){ ++head; };
		void clear(){ tail = 0 , head = 0 ;} ;
		int size(){ return tail - head ; };

}q;
void getmax( int n , int m )
{
	q.clear();
	for( int i = 1 ; i <= n ; i++)
	{
		while( !q.empty() && a[q.back()] <= a[i] ) 
			q.pop_back();
		q.push_back(i);
		if( i < m )
			continue ; 
		while( q.front() < i - m + 1 )
			q.pop_front();
		maxnum.push_back(a[q.front()]);
	}
}

void getcount( int n , int m )
{
	q.clear();
	for( int i = n ; i >= 1 ; i--)
	{
		while( !q.empty() && a[q.back()] <= a[i] )
			q.pop_back();
		q.push_back(i);
		if( i > n - m + 1 )
			continue ;
		while( q.front() > i + m - 1 )
			q.pop_front();
		maxcount.push_back( q.size() ) ;

	}
}


int main()
{
//	ios::sync_with_stdio(false);
//	cin.tie(0);
	int t ;
	scanf("%d",&t);
	//cin >> t ;
	while(t--)
	{
		maxnum.clear();
		maxcount.clear();
		ll n,m,k,p,q,r,MOD;
		scanf("%lld%lld%lld%lld%lld%lld%lld",&n,&m,&k,&p,&q,&r,&MOD);
		//cin >> n >> m >> k >> p >> q >> r >> MOD;
		for( int i = 1 ; i <= k ; i++)
			scanf("%lld",&a[i]);
			//cin >> a[i];
		for( int i = k + 1 ; i <= n ; i++)
			a[i] = (p* a[i-1]+q*i+r) % MOD; 
		getmax(n,m);
		getcount(n,m);
		reverse(maxcount.begin() , maxcount.end() ) ;
		long long ansa = 0 , ansb = 0 ; 
		for( int i = 0 ; i  < n - m + 1 ; i++)
		{
			ansa +=  maxnum[i] ^(i+1);
			ansb +=  maxcount[i] ^ ( i+1) ;
		}
		printf("%lld %lld\n" , ansa , ansb ) ;
		//cout << ansa << ' ' << ansb << endl ; 
	}
	return 0 ;
}

{% endcodeblock %}
{% endspoiler %}


## 参考资料
- [HDU 6319 Ascending Rating（单调队列）](https://blog.csdn.net/qq_36258516/article/details/81290393)
