---
title: USACO-Chapter2-Section2.2
mathjax: false
date: 2017-11-19 14:24:07
categories: ACM
tags:
- USACO
---

USACO-Chapter2-Section2.2

<!--more-->
### 2.2.1 Preface Numbering

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:preface
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;

string func( int n , int digit )
{
	if( digit == 1 )
	{
		if( n == 1 )
			return "I" ;
		else if( n == 2 )
			return "II"  ;
		else if ( n == 3 )
			return "III" ;
		else if( n == 4 )
			return "IV" ;
		else if( n == 5 )
			return "V" ;
		else if( n == 6 )
			return "VI" ;
		else if( n == 7 )
			return "VII" ;
		else if ( n == 8 )
			return "VIII" ;
		else if( n == 9 )
			return "IX" ;
	}

	else if( digit == 2 )
	{
		if ( n == 1 )
			return "X" ;
		else if( n == 2 )
			return "XX";
		else  if( n == 3 )
			return "XXX";
		else if ( n == 4 )
			return "XL";
		else if( n == 5 )
			return "L";
		else if( n == 6 )
			return "LX" ;
		else if( n == 7 )
			return "LXX" ;
		else if( n == 8 )
			return "LXXX" ;
		else if( n == 9 )
			return "XC";
	}

	else if( digit == 3 )
	{
		if( n == 1 )
			return "C" ;
		else if( n == 2 )
			return "CC";
		else if( n == 3 )
			return "CCC" ;
		else if ( n == 4 )
			return "CD";
		else if( n == 5 )
			return "D";
		else if( n == 6 )
			return "DC";
		else if( n == 7 )
			return "DCC";
		else if( n == 8 )
			return "DCCC";
		else if( n == 9 )
			return "CM";
	}
	else if( digit == 4 )
	{
		if( n == 1 )
			return "M";
		else if( n == 2 )
			return "MM";
		else if( n == 3 )
			return "MMM";
	}
	
	return "" ;
}

string r_s( int n )
{
	int d = 1 ;
	string ans ;
	while( n != 0 )
	{
		ans += func( n % 10 , d ) , n /= 10 , d++ ;
	}
	return ans ; 
}


int main()
{
	freopen("preface.in","r",stdin);
	freopen("preface.out","w",stdout);
	int n ;
	cin >> n ;
	string ans ;
	for( int i = 1 ;  i <= n ; i++)
	{
		ans += r_s( i ) ;
	}

	
	int cnt_i = 0 , cnt_v = 0 , cnt_x = 0 ,  cnt_l = 0 , cnt_c = 0 , cnt_d = 0 , cnt_m = 0 ;

	for( int i = 0 ; i < ans.size() ; i++)
	{
		if( ans[i] == 'I' )
			cnt_i++;
		if( ans[i] == 'V' )
			cnt_v++;
		if( ans[i] == 'X' )
			cnt_x++;
		if( ans[i] =='L' )
			cnt_l++;
		if( ans[i] == 'C' )
			cnt_c++;
		if( ans[i] == 'D' )
			cnt_d++;
		if( ans[i] == 'M' )
			cnt_m++;
	}

	if( cnt_i != 0 )
		cout << "I" << ' ' << cnt_i << endl ;
	if( cnt_v != 0 )
		cout << "V" << ' ' << cnt_v << endl ; 
	if( cnt_x != 0 )
		cout << "X" << ' ' << cnt_x << endl ;
	if( cnt_l != 0 )
		cout << "L" << ' ' << cnt_l << endl ;
	if( cnt_c != 0 )
		cout << "C" << ' ' << cnt_c << endl ;
	if( cnt_d != 0 )
		cout << "D" << ' ' << cnt_d << endl ;
	if( cnt_m != 0 )
		cout << "M" << ' ' << cnt_m << endl ;
	return 0 ;
}
{% endcodeblock %} 
{% endspoiler %}

### 2.2.2 subset

#### 暴力*(TLE)*

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:subset
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;

int all_sum = 0 ; 


int dfs( int n , int now_num , int now_sum)
{

	int ans = 0 ; 
	if( now_num < 1 )
		return 0 ;
	if( now_sum > (all_sum / 2) )
		return 0 ;

	if( now_sum == all_sum - now_sum )  
		return 1 ;

	ans += dfs( n , now_num - 1 , now_sum + now_num - 1  ) + dfs( n , now_num -1 , now_sum ) ;

	return ans ; 
}


int main()
{
	freopen("subset.in" , "r", stdin);
	freopen("subset.out","w",stdout);
	int n ;
	cin >> n ;

	for( int i = 1 ; i <= n ; i++)
		all_sum += i ;

	cout << dfs( n , n + 1  , 0 ) / 2 << endl ;
}


{% endcodeblock %} 
{% endspoiler %}

#### 01背包求方案数


{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:subset
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;

long long  solve( int n ) 
{
	int all_sum = 0 ;
	for( int i = 1 ; i <= n ; i++)
		all_sum += i ;
	if( all_sum % 2 )
		return 0;

	int capacity = all_sum / 2 ;

	int dp[n + 20 ][capacity + 50 ] ;

	long long  cnt[n + 20][capacity + 50 ] ;
	for( int i = 0 ; i <= n ; i++)
		for( int j = 0 ; j <= capacity ; j++)
			dp[i][j] = -1000 , cnt[i][j] = 0 ; ;

	dp[0][0] = 0 ; 
	cnt[0][0] = 1 ;
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 0 ; j <= capacity ; j++)
		{
			if( j >= i )
			{
				if( dp[i-1][j] > dp[i-1][ j - i ] + i )
				{
					dp[i][j] = dp[i-1][j];
					cnt[i][j] = cnt[i-1][j]  ;
				}
				
				else
				{
					dp[i][j] = dp[i-1][j-i] + i ;
					cnt[i][j] = cnt[i-1][j-i] + cnt[i-1][j] ; 
				}
			}

			else
				dp[i][j] = dp[i-1][j] , cnt[i][j] = cnt[i-1][j]   ;
		}
	}
	return cnt[n][capacity];
}



int main()
{
	freopen("subset.in","r",stdin);
	freopen("subset.out","w",stdout);
	int n ;
	cin >> n ;
	cout << solve(n) / 2  << endl ;
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

### 2.2.3 runround

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:runround
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;

typedef long long ll ; 

bool judge( ll n )
{
	int digit = 0 ;
	ll t = n ;
	while( t != 0 )
		t /= 10 , digit++;
	
	vector<ll> a ;

	int d[10] = {0} ; 
	for( int i = digit - 1 ; i >= 0 ; i-- )
	{
		int t =  static_cast<int> ( ( n /  pow( 10 , i )  ) )   % 10 ; 
		if(  d[t] != 0 || t == 0 )
			return false ;
		else
		{
			d[t]++;
			a.push_back( t ) ; 
		}
	}

	int tt =  0 ; 
	int b[15] = {0} ; 
	for( int i = 1 ; i <= digit ; i++)
	{
		tt = ( a[  ( tt - 1 < 0 ) ? ( a.size() - 1 ) : ( tt - 1 ) ] +  tt ) % digit ; 
		b[a[tt]]++;
	}

	for( int i = 0 ; i < a.size() ; i ++ )
	{
		if( b[ a[i] ] != 1 )
			return false ;
	}
	return true ;
}



//	int b[15] = {0} ;
//	int c[10] = {0} ; 
//	for( int i = 0 ; i < a.size() ; i++)
//	{
//		b[i] = ( a[ ( i - 1 < 0 ) ? (a.size() - 1 ) : ( i - 1 ) ] + i ) % digit ; 
//		if( b[i] == i )
//			return false ; 
//		else if( c[b[i]] == 0 )
//			c[b[i]]++;
//		else
//			return false ; 
//	}
//
//	return true ;
//}

int main()
{
	freopen("runround.in","r",stdin);
	freopen("runround.out","w",stdout);
	ll m ;
	cin >> m ;
	m++;
	while( true )
	{
		if( judge( m ) )
		{
			cout << m << endl ; 
			return 0 ;
		}
		else
			m++;
	}
	return 0; 
}

{% endcodeblock %} 
{% endspoiler %}

### 2.2.4 lamps

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
