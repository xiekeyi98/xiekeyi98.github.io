---
title: USACO-Chapter2-Section2.3
mathjax: false
categories: ACM
tags:
  - USACO
abbrlink: 8c7dbeeb
date: 2017-12-05 20:24:56
---

快期末考试了，可能ECL FINAL结束后，会停止训练一个月左右去准备期末考试了。

这一章，刷的时间有点久啊。

<!--more-->

# 1Prefix 


{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:prefix
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

//vector<string> a;
//string s ; 
char a[210][15];
int num_string = 0 ; 


int s_size = 0 ; 
char s[200100];
bool vis[200100];
int dfs( int n )
{
	if( vis[n] )
		return 0;
	else
		vis[n] = 1 ; 
	int ans = 0; 
	if( n >= s_size )
		return s_size;

	for( int i = 0 ; i < num_string ; i++)
	{
		bool flag = true; 
		int tt = strlen(a[i]) ; 
		for( int j = 0  ;  j < tt ; j++ ) 
		{
			if( s[n + j ] != a[i][j] )
			{
				flag = false ;
				break ; 
			}
		}

		if( flag ) 
		{
			ans = max( ans , dfs( n + tt ) )  ;
		}
	}
	return ( ans != 0 ) ? ans : n  ;
}






int main()
{
	freopen("prefix.in","r",stdin);
	freopen("prefix.out","w",stdout);
	char ch ; 
	while( scanf("%s" , a[ num_string++]) )  
		if( strcmp( a[num_string - 1 ] , "." ) == 0 )  
			break ;
	num_string--;
//	string t ;
//	while( cin >> t && t != "." )
//		a.push_back(t);
//	while( cin >> t )
//		s += t ; 
	while( ( ch = getchar() ) != EOF  )
	{
		if( ch == EOF )
			break ; 
		if( ch == ' ' || ch == '\n' )
			continue ;
		s[ s_size++ ] = ch ;
	}




	cout << dfs(0) << endl ;
}

{% endcodeblock %} 
{% endspoiler %}

# 2nocows

## 爆搜(TLE)


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
 
	remain_points-- ; 
	if( now_floor >= floor || remain_points <= 0 )
	{
		if( remain_points == 0 && now_floor == floor )
			return  1  ; 
		else
			return  0   ;
	}

	int ans = 0 ; 
	for( int i = 0 ; i <= remain_points ; i++)
	{
		if( i > 0 && remain_points - i > 0 )
		{

			int t1  = 0 ; 
			int t2 = 0 ; 
			t1 += dfs( i , now_floor + 1 , floor ) ;

			for( int j = now_floor + 1  ; j <= floor - 1 ; j++)
			{
				t2 += dfs( remain_points - i , now_floor + 1 , j ) ;
			}
			ans += t1 * t2 ; 

			t1 = 0 ; 
			t2 = 0 ; 
			t2 += dfs( remain_points - i , now_floor + 1 , floor ) ;
			for( int j = now_floor + 1  ; j <= floor - 1 ; j++)
			{
				t1 += dfs( i , now_floor + 1 , j ) ;
			}
			ans += t1 * t2 ;
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

##  压状态爆搜(TLE)

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
			if( remain_points == 0 && now_floor == k )
				return  1  ; 
			else
				return  0  ;
		}
		else
		{
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
				ans += dfs( i , now_floor + 1 , true ) * dfs( remain_points - i , now_floor + 1 , true ) ; 
			}

			else 
			{
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

##  压状态记忆化搜索


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

## 四次方DP

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

	dp[1][1] = 1 ; 

	for( int now_floor = 1 ; now_floor <= k ; now_floor++)
	{
		for( int now_point = 1 ; now_point <= n ; now_point++ )
		{
			for( int enum_point = 1 ; enum_point <= now_point - 1  ; enum_point++)
			{
				int less_than_nowfloor = 0 ;

				for( int enum_floor = 1 ; enum_floor <= now_floor - 2 ; enum_floor++ )
					less_than_nowfloor += dp[ now_point - 1 - enum_point ][ enum_floor ] % modp  ;
				less_than_nowfloor %= modp ; 
				dp[now_point][now_floor] += dp[ enum_point ][ now_floor - 1 ] % modp * less_than_nowfloor % modp ;
				dp[now_point][now_floor] %= modp  ; 

				less_than_nowfloor = 0 ;

				for( int enum_floor = 1 ; enum_floor <= now_floor - 2 ; enum_floor++ )
					less_than_nowfloor += dp[enum_point][enum_floor] % modp  ; 
				less_than_nowfloor %= modp ; 
				dp[now_point][now_floor] +=
					less_than_nowfloor % modp * dp[ now_point - 1 - enum_point][now_floor-1] % modp ;
				dp[now_point][now_floor] %= modp ; 

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

## 三次方DP

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

	for( int now_floor = 1 ; now_floor <= k ; now_floor++)
	{
		for( int now_point = 1 ; now_point <= n ; now_point++ )
		{
			for( int enum_point = 1 ; enum_point <= now_point - 1  ; enum_point++)
			{
				dp[now_point][now_floor] +=
					dp[enum_point][now_floor-1] * sum[now_point - enum_point - 1 ][ now_floor-2];
				dp[now_point][now_floor] +=
					dp[now_point-enum_point-1][now_floor-1] * sum[enum_point][ now_floor-2];
				dp[now_point][now_floor] +=
					dp[now_point-enum_point-1][now_floor-1] * dp[enum_point][now_floor-1];
				dp[now_point][now_floor] %= modp ; 

			
			}
			for( int j = 1 ; j <= now_floor ; j++)
				sum[now_point][j] = ( sum[now_point][j-1] + dp[now_point][j] ) % modp ; 
		}
	}

	cout << dp[n][k] % modp << endl ;
}

{% endcodeblock %} 
{% endspoiler %}

# 3zerosum


{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG: zerosum 
LANG: C++11
 */

#include<bits/stdc++.h>
using namespace std ;
string s ; 
int n ;

vector<string> a ; 

void dfs( int pos , string sss )
{
	//if( sss == "1-2 3+4+5+6+7" )
	//	cout << sss << endl ; 

	if( pos >= n - 1  )
	{
		int ans = 0 ; 

		bool flag = true ; 
		for( int i = 0 ; i < sss.size() ; i++)
		{
			if( i == 0  && flag )
			{
				flag = false ; 
				int num = 0 ; 
				for( int j = i ; j < sss.size() ; j++)
				{
					if( sss[j] == '+' )
					{ i = j - 1 ; break ; }
					else if( sss[j] == '-' )
					{ i = j - 1 ; break ; }
					else if( sss[j] == ' ' )
						num *= 10 ;
					else
						num += sss[j] - '0' ; 
				}
				ans = num ; 
			}

			else if( sss[i] == '+' || sss[i] == '-' )  
			{
				char ch ; 
				if( sss[i] == '+' )
				{ ch = '+' ;}  
				if( sss[i] == '-' )
				{ ch = '-' ;}  

				int num = 0 ; 
				for( int j = i + 1 ; j < sss.size() ; j++)
				{
					if( sss[j] == '+' )
					{ i = j - 1 ; break ; }
					else if( sss[j] == '-' )
					{ i = j - 1 ; break ; }
					else if( sss[j] == ' ' )
						num *= 10 ;
					else
						num += sss[j] - '0' ; 
				}

				ans = ( ( ch == '+' ) ? ( ans + num ) : ( ans - num ) ) ;
			}


		}

		if( ans == 0 )
		{
			sss.push_back('\n' ) ; 
			a.push_back(sss);

		}
	}

	else
	{
		string t ;
		t =  sss; 
		t.insert( t.begin() + pos + 1 , ' ' );
		dfs( pos + 2 , t ) ;
		t = sss ;
		t.insert( t.begin() + pos + 1 , '+' ) ;
		dfs( pos + 2 , t ) ;
		t = sss;
		t.insert( t.begin() + pos + 1 , '-' );
		dfs( pos + 2 , t ) ; 
	}

	return ;
}


const bool cmp( const string &s1 , const string &s2 )
{
	for( int i = 0 ; i < s1.size() ; i++)
	{

		if( s1[i] == s2[i] )
			continue;
		else
		{
			if( s1[i] == ' ' )
				return true ;
			else if( s1[i] == '+' )
			{
				if( s2[i] == '-' || s2[i] == ' '  )
					return false ;
				else
					return true ;
			}
			else if( s1[i] == '-' ) 
			{
				if( s2[i] == '+' || s2[i] == ' ' )
					return false ;
				else 
					return true ;
			}
		}
	}

	return false  ; 
}




int main()
{

	freopen("zerosum.in","r",stdin);
	freopen("zerosum.out","w",stdout);
	cin >> n ;
	string ss ;
	for( int i = 1 ; i <= n ; i++)
		s += i + '0' ;
	n += n - 1 ;
	ss = s ;

	dfs( 0 , ss ) ;
	sort( a.begin() , a.end() , cmp  ) ;
	for( auto i : a ) 
		cout << i ;

	return 0 ;

}

{% endcodeblock %} 
{% endspoiler %}

# 4money

## 记忆化搜索

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekey1
PROG:money
LANG:C++
*/


#include<bits/stdc++.h>
using namespace std;

const int maxv = 30 , maxn = 10010 ; 

int v , n ;

int a[maxv] ;

long long dp[maxn][maxv];

long long dfs( int n , int i )
{
	if( dp[n][i] != - 1 )
		return dp[n][i] ; 
	if( n == 0 )
		return dp[n][i] = 1  ;
	if( i > v )
		return dp[n][i] = 0  ; 
	long long  ans = 0; 
	for( int j = 0 ; j * a[i] <= n ; j++)
	{
		ans += dfs( n - j * a[i] , i + 1 ) ;
	}

	return dp[n][i] = ans ; 
}


int main()
{
	freopen("money.in","r",stdin);
	freopen("money.out","w",stdout);
	memset( dp , -1 , sizeof( dp ) ) ; 
	cin >> v >> n ;
	for( int i = 1 ; i <= v ; i++)
		cin >> a[i] ; 
	cout << dfs( n , 1 ) << endl ;
}

{% endcodeblock %} 
{% endspoiler %}

## 多重背包

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekey1
PROG:money
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;

const int maxv = 30 , maxn = 10010 ; 
int v , n ;
int a[maxv] ;
long long dp[maxv][maxn];


int main()
{
	freopen("money.in","r",stdin);
	freopen("money.out","w",stdout); 
	cin >> v >> n ;
	for( int i = 1 ; i <= v ; i++)
		cin >> a[i] ;
	memset(dp,0,sizeof(dp));

	dp[0][0] = 1 ;

	for( int i = 1 ; i <= v ; i++)
	{
		for( int j = 0 ; j <= n ; j++)
		{
			for( int k = 0 ; k * a[i] <= j ; k++)
			{
				dp[i][j] += dp[i-1][j-k*a[i]] ;
			}
		}
	}

	cout << dp[v][n] << endl ;
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

## 完全背包

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekey1
PROG:money
LANG:C++
*/


#include<bits/stdc++.h>
using namespace std;
const int maxv = 30 , maxn = 10010 ;

int v , n ;

long long dp[maxv][maxn];

int a[maxv];

int main()
{
	freopen("money.in","r",stdin);
	freopen("money.out","w",stdout);
	cin >> v >> n ; 
	for( int i = 1 ; i <= v ; i++)
		cin >> a[i];

	memset( dp , 0 , sizeof(dp) ) ; 
	dp[0][0] = 1 ;


	for( int i = 1 ; i <= v ; i++)
	{
		for( int j = 0; j <= n ; j++)
		{
			if( j >= a[i] ) 
				dp[i][j] = dp[i-1][j] + dp[i][ j - a[i] ] ;
			else 
				dp[i][j] = dp[i-1][j] ;
		}
	}
	cout << dp[v][n] << endl ;
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

# 5Controlling Companies

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:concom
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;

const int maxn = 100 + 10 ;

int graph[maxn][maxn];


int max_num = 0 ; 
int own[maxn] ; 
bool vis[maxn]; 

void dfs( int n )
{
	for( int i = 1 ; i <= max_num ; i++)
	{
		own[i] += graph[n][i] ;
		if(  i != n &&  !vis[i] && own[i] >= 50 )
		{
			vis[i] = true ; 
			dfs( i );
		}
	}

	return ; 
}

int main()
{

	freopen("concom.in","r",stdin);
	freopen("concom.out","w",stdout);
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
	{
		int x , y ;
		cin >> x >> y ; 
		cin >> graph[x][y] ; 
		max_num =  max( { max_num , x , y }  ) ; 
	}


	string ans ; 
	for( int i = 1 ; i <= max_num ; i++)
	{
		memset(own,0,sizeof(own));
		memset(vis,0,sizeof(vis));
		dfs(i);
		for( int j = 1 ; j <= max_num ; j++)
		{
			if(  i != j &&  own[j] >= 50 ) 
			{
				cout << i << ' ' << j << endl  ; 
			}
		}
	}

	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}
