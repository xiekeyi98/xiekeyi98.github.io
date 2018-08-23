---
title: USACO-Chapter4-Section4.1
mathjax: false
categories: ACM
tags:
  - USACO
abbrlink: 89c30695
date: 2018-08-23 19:18:46
---

最优化问题
<!--more-->



## 1nuggets

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:nuggets
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 260;
bool dp[maxn*maxn];
int a[maxn];

int main()
{
	freopen("nuggets.in","r",stdin);
	freopen("nuggets.out","w",stdout);
	ios::sync_with_stdio(false);
	cin.tie(0);
	int n ;
	cin >> n ;
	for( register int i = 1 ; i <= n ; i++)
		cin >> a[i];
	memset(dp ,false,sizeof(dp));
	for( register int i = 1 ; i <= n ; i++)
		dp[a[i]] = true ; 
	for( register int i = 1 ; i <= n ; i++)
		for( int j = a[i] ; j <= maxn * maxn ; j++)
			if( dp[ j - a[i] ] == true )
				dp[j] = true ;
	int ans = 0 ; 
	for( register int i = maxn * maxn ; i >= 0 ; --i)
		if( !dp[i] )
		{
			ans = i;
			break;
		}
	if( ans > 256 * 256 )
		ans = 0 ; 
	cout << ans << endl ; 
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

## 2fence6


通过这道题大概学会了如何用floyd求最小环和**如何把边邻接矩阵转换建图**    
本质上就是把利用map把点编号，对于某端连接的点全部一样就可以看成是一个端点。不一样的就新建一个点。(有点像离散化、动态开点、内存池等那种做法)


{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:fence6
LANG:C++11
*/
#include <bits/stdc++.h>
using namespace std;
const int maxn = 110;
struct edge
{
	int ns;
	int a[9];
	edge(){ memset(a,0,sizeof(a)); ns=0;};
	bool operator =( const edge &b) const 
	{
		for( int i = 0 ; i < 9 ; i++)
			if( a[i] != b.a[i] )
				return false ;
		return true ;
	}
	bool operator <( const edge &b ) const 
	{
		for( int i = 0 ; i < 9 ; i++)
		{
			if( a[i] <  b.a[i] )
				return true ;
			else if( a[i] > b.a[i] )
				return false ; 
		}
		return false ;
	}
};
int graph[maxn][maxn];
map<edge,int> mp;
int cnt;
int main()
{
	freopen("fence6.in","r",stdin);
	freopen("fence6.out","w",stdout);
	int n ;
	cin >> n ;
	memset( graph , 0x1f , sizeof(graph) );
	for( int i = 1; i <= n ; i++)
	{
		edge f1 , f2;
		int s , ls , n1s , n2s ;
		cin >> s >> ls >> n1s >> n2s;
		f1.a[n1s]=s;
		f2.a[n2s]=s;
		for( int j = 0 ; j < n1s ; j++)
			cin >> f1.a[j];
		for( int j = 0 ; j < n2s ; j++)
			cin >> f2.a[j];
		sort( f1.a , f1.a + 9 ) ;
		sort( f2.a , f2.a + 9  );
		if( mp[f1] == 0 ) 
			mp[f1] = ++cnt;
		if( mp[f2] == 0 )
			mp[f2] = ++cnt;
		graph[mp[f1]][mp[f2]] = ls;
		graph[mp[f2]][mp[f1]] = ls;
	}

	int dist[maxn][maxn];
	memcpy(dist,graph,sizeof(dist));
	int ans = 0x7fffffff ;
	for( int k = 1 ; k <= cnt  ; k++)
	{
		for( int i = 1 ; i <= k; i++)
			for( int j = i + 1 ; j <= k; j++)
				ans=min(ans,dist[i][j]+graph[i][k]+graph[k][j] );
		for( int i = 1 ; i <= cnt ; i++)
			for( int j = 1   ; j <= cnt ; j++)
				dist[i][j] = min( dist[i][j] , dist[i][k] + dist[k][j] );
	}
	cout << ans << endl; 
	return 0;
}
{% endcodeblock %}
{% endspoiler %}
