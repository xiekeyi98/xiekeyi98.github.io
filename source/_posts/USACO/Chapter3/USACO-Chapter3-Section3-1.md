---
title: USACO-Chapter3-Section3-1
mathjax: false
date: 2018-05-21 20:29:00
categories: ACM
tags:
- USACO
---

不知道是自己变强了还是题目没有那么繁琐了，感觉这一节比前面的反而简单。
<!--more-->

### 1Agrinet

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:agrinet
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 110 ;
int graph[maxn][maxn];
int father[maxn];
struct node
{
	int u , v , value ;
	node( int uu , int vv , int va ) { u = uu , v = vv , value = va; } ; 
};

vector< node > a ; 

int find( int x )
{
	if( x == father[x] )
		return x ;
	else
		return x = find(father[x]) ;
}

void uni( int x , int y )
{
	int xx = find(x) ;
	int yy = find(y) ;
	if( xx != yy )
	{
		father[xx] = yy ;
	}
	return ;
}

int main()
{

	freopen("agrinet.in","r",stdin);
	freopen("agrinet.out","w",stdout);
	for( int i = 0 ; i < maxn ; i++)
		father[i] = i ; 
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= n ; j++)
			cin >> graph[i][j] ; 
	for( int i = 1 ; i <= n ; i++)
		for( int j = i + 1 ; j <= n ; j++)
			a.push_back( node( i , j , graph[i][j] ) ) ;

	sort( a.begin() , a.end() , [](node a , node b ){ return a.value < b.value ; } ) ;
	int ans = 0; 
	for( auto iter = a.begin() ; iter != a.end() ; ++iter)
	{
		if( find( iter->u ) != find( iter->v ) ) 
		{
			uni( iter->u  , iter->v ) ;
			ans += iter->value ;
		}
	}
	cout << ans << endl ;
	return 0 ;
}
{% endcodeblock %} 
{% endspoiler %}


### 2inflate

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:inflate
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 10010 ;
int dp[maxn];
struct node
{
	int value ;
	int time ;
}a[maxn];

int main()
{
	freopen("inflate.in","r",stdin);
	freopen("inflate.out","w",stdout); 
	int n , m ; 
	cin >> n >> m ;
	for( int i = 1 ; i <= m ; i++)
		cin >> a[i].value >> a[i].time ;

	for( int i = 1 ; i <= m ; i++)
	{
		for( int j = a[i].time ; j <= n ; j++)
		{
			dp[j] = max( dp[j] , dp[j-a[i].time] + a[i].value ) ;
		}
	}

	cout << dp[n] << endl ;
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

### 3humble

丑数进阶版，之前uva做过，用优先队列就搞定了。
这个貌似只能dp，趁机学了下。

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:humble
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 110;
int s[maxn];
int indexs[maxn];
long long humble_number[100000 + 10];

int main()
{
	freopen("humble.in","r",stdin);
	freopen("humble.out","w",stdout);
	int n,m;
	cin >> n >> m ;
	for( int i = 1 ; i <= n ; i++)
	{
		cin >> s[i];
	}
	for( int i = 1 ; i <= n ; i++)
		indexs[i] = 1 ;
	int cnt = 1 ;
	humble_number[1] = 1 ;
	while( cnt <= m + 2 )
	{
		long long t = 0x7fffffffff;
		for( int i = 1 ; i<= n ; i++)
		{
			t = min( t , humble_number[ indexs[i] ] * s[i] ) ;
		}
		for( int i = 1 ; i <= n ; i++)
		{
			if( t == humble_number[ indexs[i] ] * s[i] )
			{
				indexs[i]++;
			}
		}
		humble_number[++cnt] = t  ; 
	}
	cout << humble_number[m+1] << endl ; 
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}

### 4contact

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:contact
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std;
const int maxn = 100100; 
map<string,int> mp ;
string s ; 
struct node
{
	string s ;
	int num ;
}ans[maxn];

bool operator< (const string &a , const string &b )
{
	if( a.size() < b.size() )
		return true ;
	else if( a.size() == b.size() )
		return ( strcmp( a.c_str() , b.c_str()) < 0 ? true : false ) ;
	return false ; 
}
bool cmp( const node &a , const node &b )
{
	if( a.num > b.num )
		return true ;
	else if( a.num == b.num )
	{
		return a.s < b.s ; 
	}

	else
		return false ;
}

int main()
{
	freopen("contact.in","r" , stdin);
	freopen("contact.out","w" , stdout);
	int a ,b , n ;
	cin >> a >> b >> n ;
	string t ; 
	while( getline( cin , t) ) 
		s += t ;

	for( int i = a ; i <= b ; i++)
	{
		for( int j = 0 ; j + i <= s. size() ; j++)
		{
			mp[s.substr(j,i)] += 1 ;
		}
	}
	int p = 1 ;
	for( auto i = mp.begin() ; i != mp.end() ; ++i)
	{
		ans[p].s = i->first , ans[p].num = i -> second ;
		p++;
	}
	p--;

	sort( ans + 1 , ans + 1 + p , cmp ) ;

	int cntt = 0 ;
	bool flag = false ;
	for( int i = 1 ; i <= p ; i++)
	{
		if( cntt == n )
			break ; 
		cout << ans[i].num << endl ; 
		cntt++;
		int cnt = 0 ;
		flag = false ; 
		for( int j = i ; j <= p ; j++)
		{
			if( ans[j].num == ans[i].num )
			{
				if( cnt == 0 )
				{
					cout << ans[j].s ;
					cnt++;
				}
				else 
				{
					cout << ' ' << ans[j].s ;
					cnt++;
				}
				if( cnt % 6 == 0 )
				{
					cnt = 0 ;
					cout << endl ; 
				}
			}
			else 
			{
				i = j - 1  ;
				if( cnt % 6 != 0 )
					cout << endl ; 
				flag = true  ;
				break ;
			}
		}
	}
	if( !flag )
		cout << endl ; 

	return 0 ;
}
{% endcodeblock %} 
{% endspoiler %}

### 5stamps

一开始想着用set，然后枚举set里的元素加上coin，最后遍历set求连续的数最大值就可以了。
结果MLE一发TLE一发。
然后想了想改了dp。

顺便发现，map和数组访问差距还是有点大的。一开始我以为多一个log，顶多是常数差距，问题不大。结果没想到:**map 1.7s TLE,数组0.05s AC**

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:stamps
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;
int coin[55];
int dp[2000010];
int main()
{
	freopen("stamps.in","r",stdin);
	freopen("stamps.out","w",stdout);
	int k , n ;
	cin >> k >> n ;

	int maxn = 0 ;
	for( int i = 1 ; i <= n ; i++)
	{
		cin >> coin[i] ;
		maxn = max( coin[i] , maxn  ) ; 
		dp[ coin[i] ] = 1 ;
	}
	maxn = maxn * k + 100;

	for( int i = 1 ; i <= maxn; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			if( i - coin[j] > 0 && dp[ i - coin[j] ] != 0 && dp[i-coin[j]] + 1 <= k )
			{
				if( dp[i] == 0 )
					dp[i] = dp[ i - coin[j]] + 1 ;
				else
					dp[i] = min( dp[i] , dp[i-coin[j]] + 1 ) ;
			}
		}
	}

	int ans = 0 ; 
	for( int i = 1 ; i <= maxn; i++)
	{
		if( dp[i] != 0 )
		{
			for( int j = i + 1 ; j <= maxn; j++ )
			{
				if( dp[j] != 0 && dp[j-1] !=  0  )
					continue ;
				else 
				{
					ans = max( ans , j - i );
					i = j - 1 ; 
					break ;
				}
			}
		}
	}

	cout << ans << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}
