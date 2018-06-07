---
title: USACO-Chapter1-Section1.4
mathjax: false
categories: ACM
description: USACO-Chapter1-Section1.4
tags:
  - USACO
abbrlink: 67c147e1
date: 2017-11-08 17:18:29
---

### 1ariprog

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:ariprog
LANG:C++
 */
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 250 * 250 * 2 ; 
bool a[maxn + 10 ] ; 
void init( int m )
{
	memset( a , false , sizeof(a) ) ;
	for( int i = 0 ; i <= m ; i++)
		for( int j = i ; j <= m ; j++)
			a[ i*i + j*j ] = true ;
	return ; 
}
struct node
{
	int a , b ;	
	node( int _a , int _b) : a(_a) , b(_b) {}  
};
vector<node> ans ; 

bool cmp( struct node a , struct node b )
{
	if( a.b < b.b )
		return true ;
	else if( a.b == b.b )
		return a.a < b.a ;
	else
		return false ;
}

int main()
{
	freopen("ariprog.in","r",stdin);
	freopen("ariprog.out","w",stdout);
	int n , m;
	cin >> n >> m ; 
	init(m) ;
	int d = 1 ;
	int maxx = m*m + m*m ; 
	bool flag = false ;
	while( ( n - 1 ) * d <= maxx) 
	{
		for( int i = 0 ; i <= maxx - ( n - 1 ) * d ; i++)
		{
			bool f = true ; 
			for( int j = i ; j <= i + ( n - 1 ) * d ; j +=d )
			{
				if( a[j] == false )
				{
					f = false ;
					break ;
				}
			}
			if( f ) 
			{
				ans.push_back( node(i,d) ) ;
				flag = true ;
			}
		}

		d++ ;
	}

	sort( ans.begin() , ans.end() , cmp ) ; 
	if( flag )  
		for( vector<node> :: iterator iter = ans.begin() ; iter != ans.end() ; iter++)
			cout << iter->a << ' ' << iter->b << endl ;

	else
		cout << "NONE" << endl ;

	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

### 2milk3
{% spoiler code %}
{% codeblock lang:cpp %} 

/*
ID:xiekeyi1
PROG:milk3
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn =25;
bool vis[maxn][maxn];
bool note[maxn];

int aa[4];
void dfs( int a , int b , int c )
{
	if( vis[a][b] )
		return ;
	vis[a][b] = true ;
	if( a == 0 )
		note[c] = true ;

	int temp[4];
	temp[1] = a , temp[2] = b , temp[3]  = c ;

	for( int i = 1 ; i <= 3 ; i++)
	{
		for( int j = 1 ; j <= 3 ; j++)
		{
			if( i != j )
			{
				if( temp[i] != 0 && temp[j] < aa[j] )
				{
					if( temp[i] <= aa[j] - temp[j] )
					{
						int t1 = temp[i] , t2 = temp[j] ;
						temp[j] += temp[i] ;
						temp[i] = 0 ;
						dfs( temp[1] ,temp[2] , temp[3]);
						temp[i] = t1 , temp[j] = t2 ; 
					}

					if( temp[i] > aa[j] - temp[j] )
					{
						int t1= temp[i] , t2 = temp[j] ;
						temp[i] -= aa[j] - temp[j] ;
						temp[j] = aa[j] ;
						dfs( temp[1] , temp[2] , temp[3]);
						temp[i] = t1 , temp[j] = t2 ;
					}
				}
			}
		}
	}

}

int main()
{
	freopen("milk3.in","r",stdin);
	freopen("milk3.out","w",stdout);
	cin >> aa[1] >> aa[2] >> aa[3] ; 
	dfs( 0,0,aa[3]) ;
	for( int i = 0 ; i <= aa[3] - 1 ; i++)
	{
		if( note[i] )
			cout << i << ' ' ;
	}

	cout <<  aa[3]  << endl ;
	return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}
