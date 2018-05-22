---
title: USACO-Chapter2-Section2.1
mathjax: false
date: 2017-11-08 17:24:13
categories: ACM
tags:
- USACO
---

USACO-Chapter2-Section2.1
<!--more-->

### 1castle

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:castle
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 55;

int graph[maxn][maxn][5];
int roomsize[maxn*maxn] ;
int vis[maxn][maxn];
int m , n , color , maxsize ; 
int dx[] = { 1 ,  0 , -1 , 0 } ;
int dy[] = { 0 , 1 , 0 , -1 };
int nowsize ; 
int ans_row , ans_col ; 
char dir ; 
void scan()
{
	cin >> m >> n ;
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= m ; j++)
		{
			int t ;
			cin >> t ;
			for( int  k = 3 ; k >= 0 ; k--)
				graph[i][j][k] = t % 2 , t = t >> 1 ;
		}
}

void floodfill( int x , int y )
{
	vis[x][y] = true ;
	roomsize[color]++;
	graph[x][y][4] = color ; 
	for( int i = 0 ; i < 4 ; i++)
	{
		int nx = x + dx[i] ;
		int ny = y + dy[i];
		if( nx < 1 || ny < 1 || nx > n || ny > m ) continue ;
		if( vis[nx][ny] || graph[x][y][i] ) continue ;
		floodfill(nx,ny);
	}
}

void merge( int x , int y )
{
	int sum = 0 ;
	if( x >= 2 && graph[x-1][y][4] != graph[x][y][4] )
	{
		sum = roomsize[ graph[x-1][y][4] ] + roomsize[ graph[x][y][4] ] ;
		if( sum > maxsize)
			maxsize=sum,ans_row=x,ans_col=y,dir='N' ; 
	}
	if( y < m && graph[x][y+1][4] != graph[x][y][4] )
	{
		sum = roomsize[ graph[x][y+1][4] ] + roomsize[ graph[x][y][4] ] ;
		if( sum > maxsize )
			maxsize = sum , ans_row = x , ans_col = y , dir = 'E' ;
	}
}

int main()
{
	freopen("castle.in","r",stdin);
	freopen("castle.out","w",stdout);
	scan();
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= m ; j++)
		{
			if( !vis[i][j] )
			{
				roomsize[ color ] = 0 ;
				floodfill( i , j );
				color++;
			}
		}
	for( int i = 0 ; i < color ; i++)
		nowsize = max( nowsize , roomsize[ i ] ) ; 
	for( int i = 1 ; i <= m ; i++)
		for( int j = n  ; j >= 1 ; j--)
			merge(j,i);

	cout << color << endl << nowsize << endl << maxsize << endl
	     << ans_row << ' ' << ans_col << ' ' << dir << endl ;
	return 0 ;
}

{% endcodeblock %} 
{% endspoiler %}


### 2frac1

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:frac1
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 170 ; 
struct node
{
	int fenzi , fenmu ;
	long double value ;
}x[maxn*maxn];

bool operator < ( struct node a , struct node b ) 
{
	return a.value < b.value ;
}

int gcd( int a , int b )
{
	if( b == 0 )
		return a ;
	if( a == 0 )
		return b ; 
	else
		return gcd( b , a % b ) ;
}

int main()
{
	freopen("frac1.in","r",stdin);
	freopen("frac1.out","w",stdout);
	int n ;
	cin >> n ;
	int cnt = 0 ; 
	for( int i = 0 ; i <= n ; i++)
		for( int j = 1 ; j <= n ; j++)
			if( gcd( i , j ) == 1 && ( (i+0.0) / j ) <= 1  )
				x[cnt].fenzi = i , x[cnt].fenmu = j , x[cnt].value = (x[cnt].fenzi + 0.0)  / x[cnt].fenmu , cnt++;

	sort(x,x+cnt);
	for( int i = 0 ; i < cnt ; i++)
		printf("%d/%d\n",x[i].fenzi,x[i].fenmu);
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

### 3sort3

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:sort3
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1010 ;
int a[maxn] , b[maxn];
int c[5][5] ;

int main()
{
	freopen("sort3.in","r",stdin);
	freopen("sort3.out","w",stdout);
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
	{
		cin >> a[i] ;
		b[i] = a[i] ;
	}

	sort( b+1 , b+1+n ) ;

	for( int i = 1 ; i <= n ; i++)
		if( a[i] != b[i] )
			c[ b[i] ][ a[i] ]++;

	int ans = 0 ; 
	for( int i = 1 ; i <= 3 ; i++)
	{
		for( int j = 1 ; j <= 3 ;j++)
		{
			if( c[i][j] && c[j][i] )
			{
				int t = min( c[i][j] , c[j][i] );
				c[i][j] -= t , c[j][i] -=t , ans+=t ;
			}
		}
	}

	ans+= c[1][2] * 2 ;
	ans+= c[1][3] * 2 ;
	cout << ans << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

### 4holstein

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:holstein
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 30 ; 
int v , vv[maxn] , g , gg[maxn][maxn];

void init()
{
	cin >> v ;
	for( int i = 1 ; i <= v ; i++)
		cin >> vv[i];
	cin >> g ;
	for( int i = 1 ; i <= g ; i++)
		for( int j = 1 ; j <= v ; j++)
			cin >> gg[i][j];
}

bool flag = false ;
int num[maxn];
int cnt = 0 ;
int k = 1 ; 
void work() 
{
	int a[30] = {0};
	for( int i = 1 ; i <= cnt  ; i++)
		for( int j = 1 ; j <=  v ; j++)
			a[j] += gg[ num[i] ][j] ; 
	for( int i = 1 ; i <= v ; i++)
		if( a[i] < vv[i] )
			return ;

	flag = true ; 
	cout << cnt ;
	for( int i = 1 ; i <= cnt ; i++)
		cout << ' ' << num[i] ;
	cout << endl ;
}

void dfs( int t )
{
	if( flag || t > g ) return ;
	if( cnt >= k )
	{
		work() ;
		return ;
	}

	cnt++;
	num[cnt] = t + 1 ;
	dfs( t + 1 ) ;
	cnt--;
	dfs( t + 1 ) ; 
	return ; 
}


int main()
{
	freopen("holstein.in","r",stdin);
	freopen("holstein.out","w",stdout);
	init() ;
	while( !flag )
	{
		dfs(0);
		k++;
	}
	return  0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

### 5hamming

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:hamming
LANG:C++
 */
#include<bits/stdc++.h>
using namespace std ;

bool judge( int b , int n , int d , int aj)
{
	bitset<8> judge( n ^ aj ) ;
	int t1 = 0 , t2 = 0 ;
	for( int i = 0  ; i < b ; i++)
		if( judge.test( i ) )
			t1++;
	if( t1 < d )
		return false ; 
	//	judge.flip();
	//	for( int i = 0 ; i < b ; i++)
	//		if( judge.test( i ) ) 
	//			t2++;
	//	if( t1 < d && t2 < d )
	//		return false ;
	return true ; 

	//	int t1 = judge.count();
	//	judge.flip();
	//	int t2 = judge.count();
	//	if( t1 !=  d && t2 != d )
	//		return false ;
	//	return true ; 
}


int main()
{
	freopen("hamming.in","r",stdin);
	freopen("hamming.out","w",stdout);
	int n , b , d ;
	cin >> n >> b >> d ;
	int cnt = 0 ;
	vector<int> a;
	a.push_back(0);
	int i = 0 ; 
	while( a.size() != n)
	{
		for( ; i <= 300; ) 
		{
			i++;
			//cout << "Debug: " << i << endl ; 
			bool flag = true ; 
			for( int j = 0 ; j < a.size() ; j++)
			{
				//bitset<8> judge( i ^ a[j] ) ; 
				if( !judge( b, i , d , a[j] ) ) 
				{
					flag = false ;
					break ;
				}
			}
			if( flag )
			{
				a.push_back(i) ;
				//cout << "Debug:" << i << endl ; 
				break ; 
			}

		}
	}
	int tcnt = 0 ;
	for( int i = 0 ; i < a.size() ; i++)
	{
		++tcnt;
		if( tcnt == 1 )
			cout << a[i] ;
		else if( tcnt != 10  )
			cout << ' ' << a[i] ;
		else if( tcnt == 10 )
		{
			tcnt = 0 ;
			cout <<  ' ' << a[i] << endl ;
		}
	}
	if( tcnt != 0  )
		cout << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}
