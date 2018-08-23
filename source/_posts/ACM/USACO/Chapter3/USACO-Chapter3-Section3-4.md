---
title: USACO-Chapter3-Section3.4
mathjax: false
categories: ACM
tags:
  - USACO
abbrlink: 887e0d10
date: 2018-08-22 17:58:21
---

计算几何
<!--more-->
## 1.heritage

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:heritage
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 200 ; 
struct node 
{
	char value = '\0';
	int leftchild = -1 ;
	int rightchild = -1 ;
}tree[200];
int head = 1 , p = 0 ;

void build( string s1 , string s2 )
{
	if( s1.size() == 0 || s2.size() == 0 )
		return ; 
	tree[++p].value = s2[0];
	int partion = -1;
	for( int i = 0 ; i < s1.size() ; i++)
	{
		if( s1[i] == s2[0] )
		{
			partion = i ;
			break ;
		}
	}

	int tp = p ;
	if( partion != 0 )
	{
		tree[tp].leftchild = p + 1 ;
		build( s1.substr( 0 , partion  ) , s2.substr( 1 , partion  )  );
	}
	if( partion + 1 !=  s1.size() || partion  + 1 != s2.size() )
	{
		tree[tp].rightchild = p + 1 ; 
		build( s1.substr( partion + 1 , 100  ) , s2.substr( partion + 1  , 100  )  );
	}
}

void print( int head )
{
	if( tree[head].value != '\0' )
	{
		print(tree[head].leftchild);
		print(tree[head].rightchild);
		cout << tree[head].value ;
	}
}

int main()
{
	freopen("heritage.in","r",stdin);
	freopen("heritage.out","w",stdout);
	string inorder , preorder ;
	cin >> inorder >> preorder ; // 中序遍历 前序遍历
	build( inorder , preorder );
	print(head);
	cout << endl ; 
	return 0 ; 
}

{% endcodeblock %}
{% endspoiler %}



## 2fence9

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:fence9
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
int gcd( int x , int y ) 
{
	if( y == 0 )
		return x ;
	else 
		return gcd( y  , x % y  ) ;
}

int main()
{
	freopen("fence9.in","r",stdin);
	freopen("fence9.out","w",stdout);
	int n , m , p ;
	cin >> n >> m >> p ;
	// (扩展)欧几里得定理
	int edge1 = gcd(n,m)  ;
	int edge2 = gcd(abs(p-n),m);
	int edge3 = gcd(p,0);
	int area = p * m / 2 ;
	// 匹克定理： 2S = 2a + b - 2 , a为多边形内部点数，b为边界上的点数，S为面积
	
	int ans = area - (edge1+edge2+edge3)/2 + 1   ;
	cout << ans << endl ; 
	return 0;
}

{% endcodeblock %}
{% endspoiler %}


## 3rockers

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:rockers
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 22;
int a[maxn];
int dp[maxn][maxn]; // dp[i][j]表示装在前i张碟片每张j分钟的总歌曲数目

/*
 * DP[i][j] = dp[i-1][j] , dp[i-1][j-a[i]]+1,dp[i-1][j-a[i]
 *
*/

int main()
{
	freopen("rockers.in","r",stdin);
	freopen("rockers.out","w",stdout);
	int n , t , m ;
	cin >> n >> t >> m ;
	for( int i = 1 ; i <= n ;i++)
		cin >> a[i] ;

	for( int i = 1 ; i <= n ; i++)
		for( int j = m ; j >= 1 ; j-- )
			for( int k = t ; k >=   a[i] ; k--)
			{
				dp[j][k] = max( { dp[j][k] , dp[j-1][t] + 1  ,
						dp[j][ k-a[i] ] + 1 } );
			}
	cout << dp[m][t] << endl ;
	return 0 ; 
}

{% endcodeblock %}
{% endspoiler %}

