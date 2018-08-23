---
title: USACO-Chapter3-Section3.3
mathjax: false
categories: ACM
tags:
  - USACO
abbrlink: 161a98b3
date: 2018-08-20 13:42:41
---

USACO-Chapter3-Section3.3
欧拉回路
<!--more-->

## 1.fence


{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:fence
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1100;
vector<int> a[maxn];
stack<int> s;

void Euler( int start)
{
	bool flag = false ;
	for( int i = 0 ; i < a[start].size() ; )
	{
	//	for( int j = 0 ; i < a[ a[start][i] ].size() ; j++)
	//	{
	//		if( a[ a[start][i] ][j] == start )
	//		{
	//			a[a[start][i]].erase( a[a[start][i]].begin() + j );
	//			break;
	//		}
	//	}
		a[ a[start][i] ].erase( find( a[a[start][i]].begin() , a[a[start][i]].end() , start ) ) ; 
		int to = a[start][i];
		a[start].erase( a[start].begin() + i ) ; flag = true ;
		Euler(to);
		if( !flag )
			i++;
	}
	s.push(start);
}


int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	freopen("fence.in","r",stdin);
	freopen("fence.out","w",stdout);
	int n;
	cin >> n ;
	int start = -1;
	int degree[maxn] ; 
	memset( degree , 0 , sizeof( degree ) ) ; 
	for( int i = 1 ; i <= n ; i++)
	{
		int x , y ;
		cin >> x >> y ;
		degree[y]++;
		degree[x]++;
		a[x].push_back(y);
		a[y].push_back(x);
	}

	for( int i = 1 ; i < maxn ; i++)
	{
		if( degree[i] % 2 == 1 )
		{
			start = i ;
			break ;
		}
	}
	if( start == -1 )
	{
		for( int i = 1 ; i < maxn ; i++)
		{
			if( a[i].size() > 0 )
			{
				start = i ;
				break ;
			}
		}
	}


	for( int i = 1 ; i < maxn; i++)
		sort( a[i].begin() , a[i].end() ) ;
	Euler(start);
	while( !s.empty() )
	{
		cout << s.top() << endl ;
		s.pop();
	}
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

## 2shopping

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:shopping
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;

const int maxn = 1010;
int main()
{
	freopen("shopping.in","r",stdin);
	freopen("shopping.out","w",stdout);
	int s ;//物品种类
	cin >> s ;
//	int n ; // 促销种类
//	cin >> n ;
	int reduced[maxn][maxn]; 
	int price[maxn];
	memset( reduced , 0 , sizeof( reduced ) ) ;
	memset( price , 0 , sizeof( price ) ) ;
	int idd[maxn] ;
	memset(idd , 0 , sizeof(idd) ) ;
	int cnt = 0 ;
	for( int i = 1 ; i <= s ; i++)
	{
		int t ;
		cin >> t ;
		for( int j = 1 ; j <= t ; j++)
		{
			int num , id;
			cin >> id >> num ; // num个编号id物品
			// 离散化
			if( idd[id] == 0 )
			{
				++cnt;
				idd[id] = cnt;
			}
			reduced[ i ][idd[id]] = num;// 记录对于第i个优惠政策来说，num物品的个数
		}
		int p ;
		cin >> p ;
		price[i] = p ; // 第i种优惠方案的价格
	}


	int yuanprice[maxn] ; // 每种物品原价
	memset(yuanprice , 0 , sizeof(yuanprice) ) ;

	int need[maxn]; // 每种物品需要的个数
	memset(need, 0 , sizeof(need) ) ;
	int b;
	cin >> b ;
	for( int i = 1 ; i <= b ; i++)
	{
		int x , y , z ;
		cin >> y  >> x >> z ;
		if( idd[y] == 0 )
		{
			++cnt;
			idd[y] = cnt ;
		}
		need[idd[y]] = x ;
		yuanprice[ idd[y] ] = z;
	}

	int dp[10][10][10][10][10]; // dp[i][j][k][l][m]表示买i个1物品j个2物品k个3物品4个l物品5个m物品的最小花费

	memset( dp , 0 , sizeof(dp ) );

	for( int i1 = 0 ; i1 <= need[1] ; i1++)
	{
		for( int i2 = 0 ; i2 <= need[2] ; i2++)
		{
			for( int i3 = 0 ; i3 <= need[3] ; i3++)
			{
				for( int i4 = 0 ; i4 <= need[4] ; i4++)
				{
					for( int i5 = 0 ; i5 <= need[5] ; i5++)
					{
						dp[i1][i2][i3][i4][i5] = yuanprice[1] * i1 + yuanprice[2] * i2
							+ yuanprice[3] * i3 + yuanprice[4] * i4 + yuanprice[5] * i5 ; 
						for( int j = 1 ; j <= s ; j++)
						{
							if( i1 - reduced[j][1] >= 0 && i2 -reduced[j][2] >= 0 &&
									i3 - reduced[j][3] >= 0 && i4 - reduced[j][4] >= 0 &&
									i5 - reduced[j][5] >= 0 )
							{
								dp[i1][i2][i3][i4][i5] =
									min( dp[i1][i2][i3][i4][i5] , 
											dp[ i1-reduced[j][1]][i2-reduced[j][2]][i3-reduced[j][3]][i4-reduced[j][4]][i5-reduced[j][5]] + price[j] );
							}
						}
					}
				}
			}
		}
	}

	cout << dp[need[1]][need[2]][need[3]][need[4]][need[5]] << endl ;
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

## 3.camelot

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:camelot
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;
const int dx[] = {0, 2 , 2 ,-2 , -2 , 1 , 1 , -1 , -1  };
const int dy[] = {0, 1 , -1 ,1 , -1 , 2 , -2 , 2 , -2 };
int row , col ; // 地图行列
struct point
{
	int x , y ;
}gw,qs[1000]; // 国王 骑士 坐标
int p = 0 ;


int dist[31][31][31][31]; // dist[i][j][k][l] 表示从i,j到kl所需最短距离(骑士走)

struct qnode
{
	int x , y , dist ;
	qnode( int _x , int _y , int _dist) { x = _x , y = _y , dist = _dist ; } ;
};

inline bool check( const int &x , const int &y )
{
	if( x > 0 && x <= row && y > 0 && y <= col )
		return true ;
	return false ;
}

void BFS(int x , int y )
{
	queue<qnode> q;
	q.push( qnode(x,y,0 ) ) ;
	bool vis[50][50];
	memset( vis , false , sizeof(vis) ) ;

	while( !q.empty() )
	{
		qnode t = q.front();
		q.pop();
		//assert( ! (dist[x][y][t.x][t.y] != 0x3f3f3f3f && t.dist < dist[x][y][t.x][t.y] ) );
		dist[x][y][t.x][t.y] = min( t.dist , dist[x][y][t.x][t.y] ) ;
		for( int i = 1 ; i <= 8 ; i++)
		{
			if( !vis[t.x+ dx[i] ][t.y+dy[i]] && check(t.x + dx[i] , t.y + dy[i] ) )
			{
				vis[t.x + dx[i]][t.y + dy[i]] = true ;
				q.push( qnode( t.x+dx[i] , t.y+dy[i] , t.dist + 1 ) ) ;
			}
		}
	}
}


int solve()
{
	// 枚举行列作为集合点
	int ans = 0x7fffffff ;
	for( int i = 1 ; i <= row ; i++)
	{
		for( int j = 1 ; j <= col ; j++)
		{
			int s1 = 0 ;
			bool flag = false ; 
			for( int k = 1 ; k <= p ; k++)
			{
				if( dist[qs[k].x][qs[k].y][i][j] > row * col  + 1000 )
				{
					flag= true ;break;
				}
				s1 += dist[ qs[k].x ][ qs[k].y ][i][j] ;
			}
			if( flag )
				continue;
			ans = min( ans , s1 + max( abs( gw.x- i ) , abs(gw.y - j ) ) ) ; 

			for( int k = 1 ; k <= p ; k++)
			{
				int s2 = 0x3f3f3f3f;
				for( int k1 = max( 1 , gw.x - 2 ) ; k1 <= min( row , gw.x +2)  ; k1++ )
				{
					for( int k2 = max( 1 , gw.y - 2  ) ; k2 <= min( col , gw.y + 2 ) ; k2++ )
					{
						if( dist[qs[k].x][qs[k].y][k1][k2] > row * col + 10000)
							continue;

						s2 = min( s2 , dist[qs[k].x][qs[k].y][k1][k2] + 
								max(abs(gw.x-k1) , abs(gw.y-k2) ) 
								+ dist[k1][k2][i][j] );
					}
				}

				ans = min( ans , s1 + s2 - dist[qs[k].x][qs[k].y][i][j] );
			}
		}
	}
	return ans ; 
}


int main()
{
	freopen("camelot.in","r",stdin);
	freopen("camelot.out","w",stdout);
	cin >> row >> col ;
	int trow ; char tcol;
	cin >> tcol >> trow ;
	gw.x = trow , gw.y = tcol - 'A' + 1 ;
	while( cin >> tcol >> trow )
	{
		qs[++p].x = trow , qs[p].y = tcol - 'A' + 1 ;
	}
	memset( dist , 0x3f , sizeof(dist ) ) ;
	for( int i= 1 ; i <= row ; i++)
		for( int j = 1 ; j <= col ; j++)
			BFS( i , j ) ; // 以(i,j)为起点bfs，陆续得到dist[x][y][i][j] 
	cout << solve() << endl ; 
}
{% endcodeblock %}
{% endspoiler %}

## 4.range

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:range
LANG:C++11
*/
#include<bits/stdc++.h>
//#define DEBUG
using namespace std ;
const int maxn = 255;
int graph[maxn][maxn];
int dp[maxn][maxn] ; // dp[i][j]表示以(i,j)为右下角的，最大正方形边长有多大
int ans[maxn*maxn]; // ans[i]表示边长为i的矩形有ans[i]个


int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	freopen( "range.in" , "r" , stdin);
	freopen( "range.out" , "w" , stdout);
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			char ch ;
			cin >> ch ;
			graph[i][j] = ch - '0';
		}
	}

	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			if( graph[i][j] == 1 )
			{
				dp[i][j] = min( {dp[i-1][j] , dp[i][j-1] , dp[i-1][j-1] }) + 1 ;
				ans[ dp[i][j] ]++;
			}
		}
	}

#ifdef DEBUG
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
			cout << graph[i][j] ;
		cout << endl ;
	}
	cout << "--------------------" << endl << endl ; 
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
			cout << dp[i][j] ;
		cout << endl ;
	}
#endif // DEBUG
	// 因为长度为3的正方形中漏算一个长度为2的正方形，同理……
	for( int i = n ; i >= 2 ; i-- )
		ans[i-1] += ans[i];

	for( int i = 2 ; i <= n ; i++)
	{
		if( ans[i] ) 
			cout << i << ' ' << ans[i] << endl ;
	}
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

## 5.game1

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:game1
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 220;
int a[maxn];
int dp[maxn][maxn]; // dp[i][j]表示先手拿从i到j可以获得的最大价值
int sum[maxn];

int main()
{
	freopen("game1.in","r",stdin);
	freopen("game1.out","w",stdout);
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
	{
		cin >> a[i];
		sum[i] = sum[i-1] + a[i];
	}
	for( int i = 1 ; i <= n ; i++)
		dp[i][i] = a[i];
	// dp[i][j] = max( ( sum[i..j] - dp[i][j-1] ) ,
	// 		  ( sum[i...j] - dp[i+1][j] ) 
	// 		 )
	
	// dp[i][j] 需要  dp[i+1][j] 和 dp[i][j-1]
	for( int i = n ; i >= 1 ; i-- )
	{
		for( int j =  i + 1; j <= n ; j++ )
		{
			dp[i][j] = max( ( sum[j-1] - sum[i-1] - dp[i][j-1] ) + a[j] , 
				      	( sum[j] - sum[i] - dp[i+1][j] + a[i] ) );
		}
	}

	cout << dp[1][n] <<  ' ' << sum[n] - dp[1][n] << endl ;
	return 0 ; 
}
{% endcodeblock %}
{% endspoiler %}

