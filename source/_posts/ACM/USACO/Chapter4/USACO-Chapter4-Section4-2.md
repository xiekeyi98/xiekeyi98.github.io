---
title: USACO-Chapter4-Section4.2
mathjax: false
categories: ACM
tags:
  - USACO
abbrlink: 10ca572f
date: 2018-08-31 18:51:16
---

USACO第四章第二节——网络流
<!--more-->


## 1ditch

{% spoiler ACcode %}
{% codeblock lang:cpp %}

/*
ID:xiekeyi1
PROG:ditch
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 500;
struct node
{
	int to , capcity;
	node( int a , int b ){ to = a , capcity = b ; } ;
};

int st , ed ;
int n , m ;
vector<node> a[maxn];
int dep[maxn];

bool bfs()
{
	memset(dep,0,sizeof(dep));
	queue<int> q ;
	q.push(st);
	dep[st] = 1 ;
	bool succ =false ; 
	while( !q.empty() )
	{
		int t = q.front();
		if( t == ed )
			succ = true ;
		q.pop(); 
		for( int i = 0 ; i < a[t].size() ; i++)
		{
			if( dep[ a[t][i].to ] == 0 && a[t][i].capcity > 0 )
			{
				dep[a[t][i].to] = dep[t] + 1 ;
				q.push( a[t][i].to ) ;
			}
		}
	}

	return succ ; 
}


int dfs( int st , int flow )
{
	if( st == ed )
		return flow ;

	for( int i = 0 ; i < a[st].size() ; i++ )
	{
		if( dep[a[st][i].to] == dep[st] + 1 && a[st][i].capcity > 0  )
		{
			int di = dfs( a[st][i].to , min( flow , a[st][i].capcity ) );
			if( di > 0 )
			{
				a[st][i].capcity -= di;
				for( int j = 0 ; j < a[i].size() ; j++)
				{
					if( a[a[st][i].to][j].to == st )
					{
						a[a[st][i].to][j].capcity += di ;
						break ;
					}
				}
				//printf("ADD %d --> %d \n " , st , a[st][i].to );
				return di ;
			}
		}
	}
	return 0 ;
}

int dinic( )
{
	int ans = 0 ; 
	while( bfs() )
	{
		while( int d = dfs( st , 0x7fffffff ) ) 
			ans += d ;
	}
	return ans ;
}



int main()
{
	freopen("ditch.in","r",stdin);
	freopen("ditch.out","w",stdout);
	cin >> n >> m ;
	st = 1 ;
	ed = m ;

	for( int i = 1 ; i <= n ; i++)
	{
		int from , to , capcity ;
		cin >> from >> to >> capcity ;
		bool flag = false  ;
		for( int j = 0 ; j < a[from].size(); j++)
		{
			if( a[from][j].to == to )
			{
				flag =  true ;
				a[from][j].capcity += capcity;
				break ;
			}
		}
		if( !flag )
			a[from].push_back( node( to , capcity ) ) ;
		flag = false ; 
		for( int j = 0 ; j < a[to].size() ; j++)
		{
			if( a[to][j].to == from )
			{
				flag = true ;
				a[to][j].capcity += 0 ;
				break;
			}
		}
		if( !flag )
			a[to].push_back( node( from , 0 ) ) ;
	}

	cout << dinic() << endl ;
	return 0 ;

}

{% endcodeblock %}
{% endspoiler %}


## 2stall4

{% spoiler ACcode %}
{% codeblock lang:cpp %}

/*
ID:xiekeyi1
PROG:stall4
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 222;
bool graph[maxn][maxn];
bool used[maxn];
int stalls[maxn];
int n , m ;

int found( int st )
{
	for( int i = 1 ; i <= n ; i++)
	{
		if( graph[st][i] && !used[i] )
		{
			used[i] = true;
			if( stalls[i] == 0 || found( stalls[i] ) )
			{
				stalls[i] = st ; 
				return 1 ; 
			}
		}
	}
	return 0 ; 
}


int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	freopen("stall4.in","r",stdin);
	freopen("stall4.out","w",stdout);
	cin >> n >> m ;
	for( int i = 1 ; i <= n ; i++)
	{
		int num ;
		cin >> num ;
		for( int j = 1 ; j <= num ; j++)
		{
			int t ;
			cin >> t ;
			graph[i][t] = true ;
		}
	}
	int ans = 0 ;
	for( int i = 1 ; i <= n ; i++)
	{
		memset( used , 0 , sizeof( used ) ) ;
		ans += found( i ) ;
	}
	cout << ans << endl ; 
}

{% endcodeblock %}
{% endspoiler %}


## 3 job

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/*
ID:xiekeyi1
PROG:job
LANG:C++11
*/

#include<bits/stdc++.h>
using namespace std ;
struct node
{
	int v ;
	int t;
	node( int _v , int _t ) : v(_v) , t(_t) {};
	bool operator<( const node &v ) const 
	{
		return t < v.t ;
	};
	bool operator>( const node &v ) const
	{
		return t > v.t ;
	};

};

int main()
{
	ios::sync_with_stdio(false);
	cin.tie(0);
	freopen("job.in","r",stdin);
	freopen("job.out","w",stdout);
	int n , m1 , m2 ;
	cin >> n >> m1 >> m2 ;
	int ans1 = 0 , ans2 = 0 ; 
	int tt[1010]= {0};
	priority_queue< node, vector<node> , greater<node> > pq1;
	priority_queue< node, vector<node> , greater<node> > pq2;
	for( int i = 1 ; i <= m1 ; i++)
	{
		int v;
		cin >> v ;
		pq1.push(node(v,v));;
	}
	for( int i = 1 ; i <= n ; i++)
	{
		auto  t = pq1.top();
		pq1.pop();
		ans1 = max( ans1 , t.t ) ;
		tt[i] = ans1;
		t.t += t.v;
		pq1.push(t);
	}

	for( int i = 1 ; i <= m2 ; i++)
	{
		int v ;
		cin >> v ;
		pq2.push( node( v , v ));
	}

	for( int i = n ; i >= 1 ; i-- )
	{
		auto t = pq2.top();
		pq2.pop();
		ans2 = max( ans2 , t.t + tt[i] ) ;
		t.t += t.v ;
		pq2.push(t);
	}

	cout << ans1 << ' ' << ans2 << endl ;
	return 0 ; 
}
{% endcodeblock %}
{% endspoiler %}


