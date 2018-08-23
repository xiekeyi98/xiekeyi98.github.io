---
title: USACO-Chapter3-Section3.2
mathjax: false
categories: ACM
tags:
  - USACO
abbrlink: 611da825
date: 2018-08-14 12:44:38
---

USACO-Chatper3-Section3.2 
<!--more-->


## 1.fact4
{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:fact4
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;

int main()
{
	freopen("fact4.in","r",stdin);
	freopen("fact4.out","w",stdout);

	int n ;
	cin >> n ;

	long long ans = 1ll ;
	for( int i = 1 ; i <= n ; i++)
	{
		ans *= i ;
		while( ans % 10ll== 0 )
			ans /=10ll;
		ans = ans % 10000;
	}

	while( ans % 10ll== 0 )
		ans /=10ll;
	cout << ans % 10 << endl ;
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


## 2.kimbits

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:kimbits
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
long long dp[50][50];
int main()
{ 
	freopen("kimbits.in","r",stdin);
	freopen("kimbits.out","w",stdout);
	for( int i = 0 ; i <= 32 ; i++)
		dp[0][i] = 1 ; 
	for( int i = 1 ; i <= 32 ; i++)
	{
		dp[i][0] = dp[i-1][0];
		for( int j = 1 ; j <= 32; j++)
		{
			dp[i][j] = dp[i-1][j] + dp[i-1][j-1] ;
		}
	}
	long long n , m , l;
	cin >> n >> m >> l ;
	string s ;
	for( int i = n ; i >= 1 ; i--)
	{
		if( dp[i-1][m] >= l )
			s.push_back('0');
		else
		{
			s.push_back('1');
			l-=dp[i-1][m];
			m--;
		}
	}
	cout << s << endl ;

}
{% endcodeblock %}
{% endspoiler %}

## 3.spin
{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:spin
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;

int speed[10];
int a[10][400];

int timing = -1  ;

bool judge()
{
	int jj[400];

	memset( jj , 0 , sizeof(jj) ) ;

	for( int i = 1 ; i <= 5 ; i++)
	{
		for( int j = 0 ; j < 360 ; j++)
		{
			if( a[i][j] )
				jj[ ( j + speed[i] * timing ) % 360 ]++;
		}
	}

	for( int i = 0 ; i < 360 ; i++)
	{
		if( jj[i] == 5 )
			return true ;
	}

	return false ;
}

int main()
{
	freopen("spin.in","r" ,stdin);
	freopen("spin.out","w",stdout);
	for( int i = 1 ; i <= 5 ; i++)
	{
		int t ;
		cin >> speed[i] >> t ;
		for( int j = 1 ; j <= t ; j++)
		{
			int x , e ;
			cin >> x >> e ;
			for( int k = x ; k <= x + e ; k++)
				a[i][k % 360 ] = 1 ;
		}
	}

	while( ++timing <= 1200)
	{
		if( judge() )
		{
			cout << timing << endl ;
			return 0 ; 
		}
		else if( timing >= 1000 )
		{
			cout << "none" << endl ;
			return 0 ;
		}
	}

	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


## 4.ratios

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:ratios
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;

const int inf = 0x7fffffff;
int a[10][10];

int gcd( int x , int y ) 
{
	if( y == 0 )
		return x ;
	else return gcd( y , x % y) ;
}
int main()
{
	bool succ = false ;
	freopen("ratios.in","r",stdin);
	freopen("ratios.out","w",stdout);
	for( int i = 1 ; i <= 4 ; i++)
		cin >> a[i][1] >> a[i][2] >> a[i][3] ;

	int x , y , z ;
	int ans_total = inf , ans1 = inf , ans2 = inf , ans3 = inf , ans4 = inf ; 
	for( int i = 0 ; i <= 100 ; i++)
	{
		for( int j = 0 ; j <= 100 ; j++)
		{
			for( int k = 0 ; k <= 100 ; k++)
			{
				x = a[2][1] * i + a[3][1] * j + a[4][1] * k;
				y = a[2][2] * i + a[3][2] * j + a[4][2] * k  ;
				z = a[2][3] * i + a[3][3] * j + a[4][3] * k ;

				int temp_total = i+j+k ;
				int t = -1;
				if( x != 0 && a[1][1] != 0 )
					t = x / a[1][1] ;
				else if( y != 0 && a[1][2] != 0 )
					t = y / a[1][2];
				else if( z != 0 && a[1][3] != 0 )
					t = z / a[1][3] ; 
				if( a[1][1] * t == x && a[1][2] * t == y && a[1][3] * t == z && temp_total <= ans_total ) 
				{
					ans1 = i , ans2 = j , ans3 = k , ans4 = t ;
					ans_total = temp_total;
					succ = true ; 

				}
			}
		}
	}

	if( succ )
		cout << ans1 << ' ' << ans2 << ' ' << ans3 << ' ' << ans4 << endl ;
	else
		cout << "NONE" << endl ; 
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


## 5.msquare
{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:msquare
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 10;
int target[maxn];
int src[maxn] = { -1,1,2,3,4,8,7,6,5};

struct node
{
	int num = 0 ;
	string s   ;
	int a[maxn];
	node( int sr[maxn] )
	{ 
		for( int i = 1 ; i <= 8 ; i++ ) 
			a[i] = sr[i] ;
	};
};

void transA( int a[maxn] )
{
	for( int i = 1 ; i <= 4 ; i++)
		swap( a[i+4] , a[i] ) ;
}

void transB(int a[maxn])
{
	for( int i = 4 ; i >= 2 ; i-- )
	{
		swap( a[i],a[i-1]);
		swap( a[i+4] , a[i+3]);
	}
}

void transC( int a[maxn] )
{
	swap(a[2],a[3]);
	swap(a[2],a[6]);
	swap( a[6] , a[7]);
}


int fac(int n )
{
	if( n == 0 )
		return 1 ;
	else 
		return fac(n-1)*n;
}

int cantor(int a[maxn] )
{
	int ans = 0 ; 
	for( int i = 1 ; i <= 8 ; i++)
	{
		int tmp = 0 ;
		for( int j = i + 1 ; j <= 8 ; j++)
			if( a[j] < a[i] )
				tmp++;
		ans += tmp * fac(8-i);
		//ans += ( a[i] - 1 ) * fac(8-i);
	}
	return ans ; 
}

bool found( int a[maxn] ,int b[maxn] )
{
	for( int i = 1 ; i <= 8 ; i++)
		if( a[i] != b[i] )
			return false ;
	return true ;
}

void BFS()
{
	set<int> st;
	queue<node> q;
	q.push(node(src));
	st.insert( cantor( src ) ) ;
	while( !q.empty() )
	{
		node t = q.front();
		q.pop();

		if( found( t.a , target ) )
		{
			cout << t.num << endl ;
			cout << t.s << endl ;
			return ;
		}

		node t1 = t ;
		t1.s.push_back('A');
		t1.num++;
		transA(t1.a);
		if( st.count( cantor( t1.a ) ) == 0 )
		{
			q.push(t1);
			st.insert( cantor(t1.a) ) ;
		}

		t1 = t ;
		t1.s.push_back('B');
		t1.num++;
		transB( t1.a );
		if( st.count( cantor( t1.a ) ) == 0 )
		{
			q.push(t1);
			st.insert( cantor(t1.a) ) ;
		}

		t1 = t ;
		t1.s.push_back('C');
		t1.num++;
		transC( t1.a);
		if( st.count( cantor( t1.a ) ) == 0 )
		{
			q.push(t1);
			st.insert( cantor(t1.a) ) ;
		}
	}

}



int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	freopen("msquare.in","r",stdin);
	freopen("msquare.out","w",stdout);
	for( int i = 1 ; i <= 4 ; i++)
		cin >> target[i];
	for( int i = 8 ; i >= 5 ; i-- )
		cin >> target[i];
	BFS();
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

## 6.butter

{% spoiler ACcode %}
{% codeblock lang:cpp %}

/*
ID:xiekeyi1
PROG:butter
LANG:C++11
*/
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1100;
int dist[maxn];
struct node
{
	int from;
	int to ;
	int value ;
	node( int f, int t , int v ) { from = f , to = t, value = v ; } ;
	bool operator < ( const node &b ) const 
	{
		return this->value > b.value ;
	};

};
vector<node> graph[maxn] ; 
map<int,int> mp ;

int dij( int from , int to )
{
	int vis[maxn];
	memset( vis , false , sizeof(vis) ) ;
	memset( dist , 0x3f , sizeof(vis) );
	priority_queue< node > pq ; 
	dist[from] = 0 ;
	pq.push(node(from,from,0));
	while( !pq.empty() )
	{
		node h = pq.top();
		pq.pop();
		if( vis[h.from] ) continue ;
		vis[h.from] = true ;
		for( int i = 0 ; i < graph[h.from].size() ; i++)
		{
			int val = graph[h.from][i].value ;
			int to = graph[h.from][i].to;
			int nownode = h.from;
			if(   dist[to] > dist[nownode] + val )
			{
				dist[to] = dist[nownode] + val ;
				pq.push( node( to , to , dist[to] ) );
			}

		}
	}
	return dist[to] ;
}


int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	freopen("butter.in","r",stdin);
	freopen("butter.out","w",stdout);
	int n , p , c ;
	cin >> n >> p >> c ;
	// sq存每头牛在的牧场情况
	for( int i = 1 ; i <= n ; i++)
	{
		int t ;
		cin >> t ;
		mp[t]++;
	}

	for( int i = 1 ; i <= c ; i++)
	{
		int from , to , value ;
		cin >> from >> to >> value ;
		graph[from].push_back( node( from, to , value ) ) ;
		graph[to].push_back( node( to , from , value ) ) ;
	}

	int ans = 0x3f3f3f3f ;

	for( int i = 1 ; i <= p ; i++)
	{
		int t = 0 ; 
		dij(i,p);
		for( auto j = mp.begin() ; j != mp.end() ; ++j )
		{
			t += dist[j->first] * j->second ;
		}
		ans = min( t , ans ) ;
	}

	cout << ans << endl; 
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}

