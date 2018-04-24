---
title: USACO-Chapter2-Section2.4
mathjax: true  
date: 2018-04-24 16:36:13
categories: ACM
tags:
- USACO
---

USACO-Chapter2-Section2.4 Shortest Path

<!--more-->

感觉虽然题目说是最短路，实际上很多不能算最短路吧。题目也不难，最难也就是裸的dijkstra。不过自己搜索从一开始的很丑陋很暴力的，越写越优雅了倒是真的。

### 2.4.1 ttwo

{% spoiler code %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:ttwo
LANG:C++11
 */

#include<bits/stdc++.h>
using namespace std ;
const int maxn =15 ;
char graph[maxn][maxn];
pair< pair< int , int > , int >  cow , farm;
int ans = 0 ; 
bool succ = true ; 
bool judge()
{
	if( cow.first == farm.first )
	{
		succ = true ;
		return false ;
	}

	else if( ans >= 10000 )
	{
		succ = false ;
		return false ;
	}


	return true ;
}

void rolate( pair< pair<int,int> , int > &a ) 
{
	a.second = ( a.second + 1 ) % 4 ;
	return ; 
}

void go_away( pair< pair< int , int > , int > &a )
{
	if( a.second == 0 )
	{
		if( graph[ a.first.first-1][a.first.second] != '*' && a.first.first-1 >= 1 )
			a.first.first -= 1 ; 
		else
			rolate(a);
	}

	else if( a.second == 1 )
	{
		if( graph[ a.first.first][a.first.second+1] != '*' 
				&& a.first.second+1 <= 10 )
			a.first.second+= 1 ; 
		else
			rolate(a);
	}
	else if( a.second == 2 )
	{
		if( graph[ a.first.first+1][a.first.second] != '*' 
				&& a.first.first + 1 <= 10 )
			a.first.first+= 1 ; 
		else
			rolate(a);
	}
	else if( a. second == 3 )
	{
		if( graph[ a.first.first][a.first.second-1] != '*' 
				&& a.first.second -1 >= 1 )
			a.first.second -= 1 ;
		else
			rolate(a);
	}

	return ;
}





void func() 
{
	go_away(cow);
	go_away(farm);
	ans++;
	return ; 
}


int main()
{
	freopen("ttwo.in","r",stdin);
	freopen("ttwo.out","w",stdout);
	for( int i = 1 ; i <= 10 ; i++)
		scanf("%s",graph[i]+1);
	for( int i = 1 ; i <= 10 ; i++)
	{
		for( int j = 1 ; j <= 10 ; j++)
		{
			if( graph[i][j] == 'F' )
				farm.first.first = i , farm.first.second = j , farm.second = 0 ;
			if( graph[i][j] == 'C' )
				cow.first.first = i , cow.first.second = j , cow.second = 0 ;
		}
	}

	while( judge() ) 
	{
		func();
	}

	if( succ )
		cout << ans << endl ;
	else
		cout << 0 << endl ;
	return 0 ; 

}

{% endcodeblock %}
{% endspoiler %} 


### 2.4.2 overfencing

{% spoiler code %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:maze1
LANG:C++11
 */ 
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 210 ; const int dx[] = { 0 , 1 , -1 , 0 };
const int dy[] = { 1 , 0 , 0 , -1 };

char graph[maxn][maxn];
int W , H ; 
int dis[maxn][maxn];
int dis2[maxn][maxn];

bool isAns( pair< int , int > pp )
{
	if( pp.first == 1 || pp.first == 2 * H + 1  ||  pp.second == 1 || pp.second == 2 * W + 1 ) 
	{
		if( graph[pp.first][pp.second] == ' ' )
			return true ;
	}
	return false ; 
}

bool isLegal( int x , int y )
{
	if( x >= 1 && x <= 2 * H + 1 && y >= 1 && y <= 2 * W + 1 )
	{
		if( graph[x][y] == ' '  && dis[x][y] == 0 )
			return true ;
	}
	return false ;
}


void BFS( int x , int y )
{
	queue< pair<int , int > > q ;

	q.push( make_pair( x , y ) ) ;

	while( !q.empty() )
	{
		pair<int , int > top ;
		top = q.front() ; q.pop() ; 
		//		if( isAns( top ) ) 
		//			return dis[top.first][top.second] + 1  ;
		for( int i = 0 ; i < 4 ; i++)
		{
			if( isLegal( top.first + dx[i] , top.second + dy[i] ) )
			{
				q.push( make_pair( top.first + dx[i] , top.second + dy[i] ) ) ;
				dis[top.first + dx[i] ][ top.second + dy[i] ] = dis[top.first][top.second] + 1 ;
			}
		}
	}; 
	return ; 
}






int main()
{
	freopen("maze1.in","r",stdin);
	freopen("maze1.out","w",stdout);
	scanf("%d%d",&W,&H);
/*	//getchar() ;getchar() ;
	fflush(stdin);
	for( int i = 1 ; i <= 2 * H + 1 ; i	++)
	{
		scanf("%[^\n]" , graph[i] + 1 ) ;
		fflush(stdin);
	}
*/
	string t ;
	for( int i = 1 ; i <= 2 * H + 1 ; i++)
	{
		do
			getline(cin,t);
		while( t.size() <= 0 ) ;
		for( int j = 0 ; j < 2 * W + 1 ; j++)
		{
			graph[i][j+1] = t[j] ;
		}
	}
	
	int startx = 0 , starty = 0 ; 
	for( int i = 1 ; i <= 2 * H + 1 ; i++)
	{
		for( int j = 1 ; j <= 2 * W + 1 ; j++)
		{
			if( isAns( make_pair( i , j ) ) )
			{
				startx = i , starty = j ;
				dis[startx][starty] = 1 ; 
				break ;
			}
		}

		if( startx != 0 && starty != 0 )
			break ;
	}


	int ans = 0; 
	for( int i = 1 ; i <= 2 * H + 1 ; i++)
	{
		for( int j = 1 ; j <= 2 * W + 1 ; j++)
		{
			BFS( startx , starty ) ;
		}
	}
	//	for( int i = 1 ; i <= 2 * H + 1 ; i++ )
	//	{
	//		for( int j = 1 ; j <= 2 * W + 1 ; j++)
	//		{
	//			ans = max( ans , dis[i][j] ) ;
	//		}
	//	}


	for( int i = 1 ; i <= 2 * H + 1 ; i++)
	{
		for( int j = 1 ; j <= 2 * W + 1 ; j++)
		{
			dis2[i][j] = dis[i][j] ;
		}
	}

	memset( dis, 0 , sizeof( dis) ) ; 
	int startx2 = 0 ,starty2 = 0 ; 
	for( int i = 1 ; i <= 2 * H + 1 ; i++)
	{
		for( int j = 1 ; j <= 2 * W + 1 ; j++)
		{
			if( ( i != startx || j != starty ) && isAns( make_pair( i , j ) ) )
			{
				startx2 = i , starty2 = j ;
				dis[startx2][starty2] = 1 ; 
				break ;
			}
		}

		if( startx2 != 0 && starty2 != 0 )
			break ;
	}
	for( int i = 1 ; i <= 2 * H + 1 ; i++)
	{
		for( int j = 1 ; j <= 2 * W + 1 ; j++)
		{
			BFS( startx2 , starty2 ) ;
		}
	}
/*	printf(" startx : %d , starty : %d , startx2 : %d , starty2 : %d \n " ,
			startx , starty , startx2 , starty2 ) ;
	printf(" graph[%d][%d] = %c \n " , startx , starty , graph[startx][starty] ) ;*/
	for( int i = 1 ; i <= 2 * H + 1 ; i++ )
	{
		for( int j = 1 ; j <= 2 * W + 1 ; j++)
		{
		//	printf(" dis[%d][%d] = %d , dis2[%d][%d] = %d , ans = %d \n" ,i,j, dis[i][j] ,i,j, dis2[i][j], ans);
			ans = max( ans , min( dis[i][j],dis2[i][j] ) ) ;
		}
	}

	printf("%d\n",ans/2);
	return 0 ;

}
{% endcodeblock %}
{% endspoiler %}

### 2.4.3 cowtour
{% spoiler code %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:cowtour
LANG:C++11
 */

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 150 ;
int graph[maxn][maxn];
double minpath[maxn][maxn];
double maxdis[maxn];
pair< int , int > coo[maxn] ;

double calcdis( pair<int , int > &a , pair< int , int > &b ) 
{
	return sqrt( ( a.first - b.first + 0.0  ) * ( a.first - b.first)  + 
			(a.second -  b.second ) * ( a.second - b.second) ) ;
}

int main()
{
	freopen("cowtour.in","r",stdin);
	freopen("cowtour.out","w",stdout);
	int n ;
	cin >> n ;

	for( int i = 1 ; i <= n ; i++)
	{
		int x , y ;
		cin >> x >> y ;
		coo[i] = make_pair( x , y ) ;
	}

	for( int i = 1 ; i <= n ; i++)
	{
		string s ;
		cin >> s ;
		for( int j = 1 ; j <= n ; j++)
		{
			graph[i][j] = s[j-1] - '0' ;
		}
	}
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			if( graph[i][j] == 1 )
			{
				minpath[i][j] = calcdis( coo[i] , coo[j] ) ;
			}
			else
			{
				minpath[i][j] = 1e10 ;
			}
		}
	}

	for( int k = 1 ; k <= n ; k++)
	{
		for( int i = 1 ; i <= n ; i++)
		{
			for( int j = 1 ; j <= n ; j++)
			{
				if( i != j ) 
					minpath[i][j] = min( minpath[i][j] , minpath[i][k] + minpath[k][j] );
			}
		}
	}


	for( int i = 1 ; i <= n ; i++ )
	{
		for( int j = 1 ; j <= n ; j++)
		{
			if( i != j && minpath[i][j] < 1e9 )
				maxdis[i] = max( maxdis[i] , minpath[i][j] ) ;
		}
	}

	double r1 = 0 , r2  = 1e10;

	for( int i = 1 ; i <= n ; i++)
	{
		r1 = max( r1 , maxdis[i] ); 
		for( int j = 1 ; j <= n ; j++)
		{
			if( i != j && minpath[i][j] > 1e8  ) 
				r2 = min( r2 , maxdis[i] + maxdis[j] + calcdis( coo[i] , coo[j] ) ) ;
		}
	}

	double ans ;
	if( r2 < 1e8 ) 
		ans = max( r1 , r2 ) ;
	else
	{
		ans = r1 ;
	}

	printf("%.6f\n",ans);
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

### 2.4.4 comehome 


这道题一开始我想的是反向BFS的，后来发现这个图，直接BFS不一定最先出来的是最短边，可能还是要遍历整张图。于是用了dijkstra。
dijkstra用裸的，什么优化都没有的就可以跑。一开始我还在觉得用字母好难处理，后来发现用字母太妙了。
一开始看到一万条边，把我吓得不行，后来想了想，用字母表示点，最多也就五十多个点，等于有很多重边和自环，easy~

dijkstra反向跑一下就行了，难点在hash一下字母和数字对应关系。
有的人是dijkstra松弛到大写字母最短边就return了，因为我不太会这种写法，所以我跑完了全部的dijkstra然后再去找。

{% spoiler code %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:comehome
LANG:C++11
*/

#include<bits/stdc++.h>
#include<unordered_map>
using namespace std ;
const int MAXN = 55 ;
int graph[MAXN][MAXN];
int n ;

inline int index( char ch )
{
	if( ch >= 'a' && ch <= 'z' )
	{
		return ch - 'a' ;
	}
	else if( ch >= 'A' && ch <= 'Z' )
	{
		return ch - 'A' + 26 ;
	}
}


void dijkstra( pair< char , int > &ans  )
{
	bool vis[MAXN];
	memset( vis , false ,sizeof( vis ) ) ;

	int dis[MAXN];
	for( int i = 0 ; i < MAXN ; i++)
		dis[i] = 0x3f3f3f3f ;
	dis[ index( 'Z' ) ] = 0 ; 

	for( int i = 0 ; i < MAXN  ; i++)
	{
		// find the nearest point .
		int node = -1 ,  len = 0x3f3f3f3f ; 

		for( int j = 0 ; j < MAXN ; j++)
		{
			if( !vis[j] && dis[j] < len )
				node = j , len = dis[j] ;
		}
		if( node != -1 )
		{

			vis[node] = true ; 

			for( int j = 0 ; j < MAXN ; j++)
			{
				if( !vis[j] && dis[node] + graph[node][j] < dis[j] ) 
					dis[j] = dis[node] + graph[node][j] ;
			}
		}
	}

	int t1 = 0 , t2 = 0x3f3f3f3f ; 
	for( int i = 26 ; i <= 50 ; i++)
	{
		if( dis[i] < t2 )
		{
			t2 =  dis[i] ;
			t1 = i ;
		}
	}

	ans = make_pair( t1 - 26  + 'A' , t2 ) ;
}

int main()
{
	freopen("comehome.in","r",stdin);
	freopen("comehome.out","w",stdout); 
	cin >> n ;
	for( int i  = 0 ; i < MAXN ; i++)
	{
		for( int j = 0 ; j < MAXN ; j++)
		{
			graph[i][j] = 0x3f3f3f3f ;
		}
	}


	for( int i = 1 ; i <= n ; i++)
	{
		string u , v ;
		int value ;
		cin >> u >> v >> value ;
		graph[ index( u[0] ) ][ index( v[0] ) ] = min( graph[ index( u[0] ) ][ index( v[0] ) ] , value ) ;
		graph[ index( v[0] ) ][ index( u[0] ) ] = min( graph[ index( v[0] ) ][ index( u[0] ) ] , value ) ;
	}
	pair< char , int > ans ;
	dijkstra( ans ) ;

	cout << ans.first << ' ' << ans.second << endl ;
	return 0 ;

}
{% endcodeblock %}
{% endspoiler %} 


### 2.4.5 fracdec

直接模拟就好了。遇到了的几个问题：
1. 一开始判断是否出现过这个情况，我没用`set< pair >`来处理，而是用了两个`set`，一个记录商，一个记录余数。结果会发现可能，商是出现过的，余数也是出现过的，然而这两个不是同时出现的，导致出现错误(样例就是这种情况)。
2. 对整除的$1.0$这种情况，容易变成$1.(0)$。可以通过判断余数是否是0来判断整除与否。

{% spoiler code %}
{% codeblock lang:cpp %}

/*
ID:xiekeyi1
PROG:fracdec
LANG:C++11
 */

#include<bits/stdc++.h>
using namespace std ;

set< pair< int , int > >  st ; 
map< pair< int , int > , int > mp ; 
int main()
{
	freopen("fracdec.in","r",stdin);
	freopen("fracdec.out","w",stdout);
	int n ,d ;
	cin >> n >> d ;

	string a; 

	a+= to_string( n / d ) ;

	int ans = n - n / d * d ; ans *= 10 ; 
	a += "." ; 
	int i = 0 ; 
	int pos = a.size()  ; 
	while( true )
	{
		if( st.count( make_pair( ans / d , ans - ans / d * d ) )) 
		{
			pos += mp[ make_pair( ans / d , ans - ans / d  * d ) ] ;
			break ;
		}
		int s = ans / d ;
		a += to_string( s) ;
		//shang.insert( s );
		// ans 是余数
		ans = ans - s * d  ; 
		//yushu.insert(ans);
		st.insert( make_pair( s , ans ) ) ;
		if( mp[ make_pair( s , ans ) ] == 0 )
			mp[ make_pair( s , ans ) ] =  i  ;
		ans *= 10 ;
		i++;
		// 判断整除
		if( ans == 0 )
			break ; 
	}

	if( ans != 0 )
	{
		a.insert( pos ,  "(" ) ;
		a += ")" ;
	}
	for( int i = 0 ; i < a.size() ; i++)
	{
		cout << a[i] ;
		if( ( i + 1 )  % 76 == 0 )
		{
			cout << endl ;
		}
	}
	if( a.size() % 76 != 0 )
	{
		cout << endl ;
	}


	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}
