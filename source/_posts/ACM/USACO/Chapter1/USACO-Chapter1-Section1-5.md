---
title: USACO-Chapter1-Section1.5
mathjax: false
categories: ACM
description: USACO-Chapter1-Section1.5
tags:
  - USACO
abbrlink: 10c67777
date: 2017-11-08 17:21:14
---

### 1numtri

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:numtri
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1000 + 10 ;
// ′óé?íù??
int data[maxn][maxn] , dp[maxn][maxn];

int main()
{
	freopen("numtri.in","r",stdin);
	freopen("numtri.out","w",stdout);
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= i ; j++)
			cin >> data[i][j] ;

	dp[1][1] = data[1][1] ;

	for( int i = 2 ; i <= n ; i++)
		{
			for( int j = 1 ; j <= i ; j++)
				{
					dp[i][j] = max(dp[i-1][j-1] , dp[i-1][j] ) + data[i][j] ;  //注意边界问题
				}
		}

	int ans = 0 ;

	for( int i = 1 ; i <= n ; i++)
		ans = max( dp[n][i] , ans ) ;
	cout << ans << endl ;
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

### 2pprime

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:pprime
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;


bool isprime( int n )
{
	if( n == 0 || n == 1 )
		return false ; 
	if( n == 2 )
		return true ;
	int sqrt_n = sqrt(n) ; 
	for( int i = 2 ; i <= sqrt_n ; i++)
		if( n % i == 0 )
			return false ;
	return true ; 
}


int digit( int n )
{
	int d = 0 ;
	while( n != 0 )
		n/=10 , d++;
	return d ; 
}

void f( int a , int b , int n )
{
	if( n >= a && n <= b  && isprime( n ) )
		cout << n << endl ;
	return  ; 
}

void func( int a , int b , int dd1 , int dd2)
{
	int palindrom = 0; 
	for( int i = dd1 ; i <= dd2; i++)
	{
		if( i == 1 )
		{
			for( int d1 = 0 ; d1 <= 9 ; d1++)
			{
				palindrom = d1 ; 
				f(a,b,palindrom) ;
			}
		}
		else if ( i == 2 )
		{
			for( int d1 = 1 ; d1 <= 9 ; d1++)
			{
				palindrom = 1e1 * d1 + 1e0 * d1 ;
				f(a,b,palindrom);
			}
		}
		else if( i == 3 )
		{
			for( int d1 = 1 ; d1 <= 9 ; d1++)
			{
				for( int d2 = 0 ; d2 <= 9 ; d2++)
				{
					palindrom = 1e2 * d1 + 1e1 * d2 + d1 ;
					f(a,b,palindrom);
				}
			}
		}
		else if( i == 4 )
		{
			for( int d1 = 1 ;  d1 <= 9 ; d1++)
			{
				for( int d2 = 0 ; d2 <= 9 ; d2++)
				{
					palindrom = 1e3 * d1 + 1e2 * d2 + 1e1 * d2 + 1e0 * d1 ;
					f(a,b,palindrom) ;
				}
			}
		}
		else if( i == 5 )
		{
			for( int d1 = 1 ; d1 <= 9 ; d1++)
			{
				for( int d2 = 0 ; d2 <= 9 ; d2++ )
				{
					for( int d3 = 0 ; d3 <= 9 ; d3++)
					{
						palindrom = 1e4 * d1 + 1e3 * d2 + 1e2 * d3 + 1e1 * d2 + 1e0 * d1 ;
						f(a,b,palindrom) ;
					}
				}
			}
		}

		else if( i == 6 )
		{
			for( int d1 = 1 ; d1 <= 9 ; d1++)
			{
				for( int d2 = 0 ; d2 <= 9 ; d2++)
				{
					for( int d3 = 0 ; d3 <= 9 ; d3++)
					{
						palindrom = 1e5 * d1 + 1e4 * d2 + 1e3 * d3 + 1e2 * d3 + 1e1 * d2 + 1e0 * d1 ;
						f(a,b,palindrom);
					}
				}
			}
		}

		else if( i == 7 ) 
		{
			for( int d1 = 1 ; d1 <= 9 ; d1++)
			{
				for( int d2 = 0 ; d2 <= 9 ; d2++)
				{
					for( int d3 = 0 ; d3 <= 9 ; d3++)
					{
						for( int d4 = 0 ; d4 <= 9 ; d4++)
						{
							palindrom = 1e6 * d1 + 1e5 * d2 + 1e4 * d3 + 1e3 * d4 + 1e2 * d3 + 1e1 * d2
								+ 1e0 * d1 ;
							f(a,b,palindrom);
						}
					}
				}
			}
		}

		else if( i == 8 )
		{
			for( int d1 = 1 ; d1 <= 9 ; d1++)
				for( int d2 = 0 ; d2 <= 9 ; d2++)
					for( int d3 = 0 ; d3 <= 9 ; d3++)
						for( int d4 = 0 ; d4 <=9 ; d4++)
						{
							palindrom = 1e7 * d1 + 1e6 * d2 + 1e5 * d3 + 1e4 * d4 + 1e3 * d4 + 1e2 * d3 
								+ 1e1 * d2 + 1e0 * d1 ;
							f(a,b,palindrom);
						}
		}

		else if( i == 9 )
		{
			for( int d1 = 1 ; d1 <= 9 ; d1++)
				for( int d2 = 0 ; d2 <= 9 ; d2++)
					for( int d3 = 0 ; d3 <=9 ; d3++ )
						for( int d4 = 0 ; d4 <= 9 ; d4++)
							for( int d5 = 0 ; d5 <= 9 ; d5++)
							{
								palindrom = 1e8 * d1 + 1e7 * d2 + 1e6 * d3 + 1e5 * d4 + 1e4 * d5
									  + 1e3 * d4 + 1e2 * d3 + 1e1 * d2 + 1e0 * d1 ;
								f(a,b,palindrom);
							}
		}
	}
	return ; 
}


				




int main()
{
	freopen("pprime.in","r",stdin);
	freopen("pprime.out","w",stdout);
	int a  , b ;
	cin >> a >> b ;
	int d1 = digit(a) , d2 = digit(b) ;
	func( a , b , d1 , d2 ) ; 
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

### 3sprime


{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:sprime
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;

int ans = 0 ; 
bool isprime( int n )
{
	if( n == 0 || n == 1 )
		return false ;
	if( n == 2 )
		return true ;
	for( int i = 2 ; i <= sqrt(n) ; i++)
		if(  n % i == 0 )
			return false ;
	return true ;
}

void dfs( int n )
{
	if( n == 0 )
	{
		cout <<  ans << endl ;
	}

	for( int i = 1 ; i <= 9 ; i++)
	{
		int t = ans ; 
		ans = i + ans * 10 ;
		if( isprime ( ans ) ) 
			dfs( n - 1 ) ;
		ans = t ; 

	}
}


	

int main()
{
	freopen("sprime.in","r",stdin);
	freopen("sprime.out","w",stdout);
	
	int n ;
	cin >> n ;
	ans = 0 ;
	dfs(n) ;
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

