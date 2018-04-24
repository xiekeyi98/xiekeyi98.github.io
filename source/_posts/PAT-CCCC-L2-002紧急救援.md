---
title: PAT-CCCC-L2.002紧急救援
mathjax: false
date: 2018-03-11 19:46:37
categories: ACM
tags: 
- 图论
- dijkstra
- CCCC
- PAT
---


题目链接：https://www.patest.cn/contests/gplt/L2-001
<!--more-->

有点小瞧了这道题的难度。从L1一路高歌猛进过来，以为L2一开始不会太难，只是一个简单的最短路。

想了一会后发现，主要问题是：
1. 边权和最小的情况下（就是普通最短路），点权和最大。
2. 输出路径。（一个pre数组记录，栈输出或者递归输出，基本操作）。
3. 求所有最短路的个数。（之前没有接触过）。

-----

要点权和最大，就类似于多关键字排序一样，再加一层松弛判断就可以。
求最短路个数，就是如果松弛了`i`，`pathnum[i] = 1 ` ， 如果是在距离一样的情况下松弛了，那么就`pathnum[i] += pathnum[node]`（node是链接过来的点）即可。

这道题卡了我很久的两个地方：
1. 点权和最大的判断自己写蠢了好几次。明明模仿边权和判断的问题就可以了，然而还是蠢了不少。
2. 这道题一开始我以为有重边。处理很久不清楚在邻接矩阵的情况下怎么处理，一开始考虑要不要用邻接链表的时候，找了个别人A的测了下，发现它也没处理重边，于是重边问题没有解决。


遗留问题：
1. ** 如何在邻接矩阵的情况下处理重边?**
2. ** 为什么很多人的迪杰斯特拉，都要源点先在循环外松弛一圈，我尝试了一下，放在循环内松弛也是可以的。所以这个有什么问题吗？**

{% spoiler code %}
{% codeblock lang:cpp %}
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 550 ;
const int inf = 0x3f3f3f3f ;
int graph[maxn][maxn];
int dis[maxn];
int pathnum[maxn] ;
int sum[maxn];
int num[maxn];
bool vis[maxn];
int pre[maxn];

int main()
{
  for( int i = 0 ; i < maxn ; i++)
    for(int j = 0 ; j < maxn ; j++)
      graph[i][j] = inf; 
  fill( dis , dis + maxn , inf ) ; 
  memset(pathnum,0,sizeof(pathnum));
  memset(sum,0,sizeof(sum));
  memset(num,0,sizeof(num));
  memset(vis,false,sizeof(vis));
  memset(pre,0,sizeof(pre));
  int N , M , S , D;
  cin >> N >> M >> S >> D ;

  pre[S] = S ; 
  for( int i = 0 ; i < N ; i++)
  {
    cin >> num[i];
    sum[i] = num[i];
  }
  for( int i = 0 ; i < M ; i++)
  {
    int u , v , diss ;
    cin >> u >> v >> diss;
    graph[u][v] = min( graph[u][v] , diss ) , graph[v][u] = min( graph[v][u] , diss ) ;
  }
  graph[S][S] = 0 ; 
  dis[S] = 0 ;
  pathnum[S] = 1 ; 

  for( int i = 0 ; i < N ; i++)
  {
    int node = -1 , minn = inf , summ = 0 ;
    for( int j = 0 ; j < N ; j++)
    {
      if( !vis[j] && minn > dis[j] )
        node = j , minn = dis[j] , summ = num[j] ; 
      else if( ! vis[j] && minn == dis[j] )
        if( summ < num[j] ) 
          node = j , minn = dis[j] , summ = num[j] ; 
    }

    vis[node] = true ;

    for( int  j = 0 ; j < N ; j++)
    {
      if( !vis[j] && graph[node][j] + minn < dis[j] )
      {
        pathnum[j] = pathnum[node];
        dis[j] = graph[node][j] + minn ;
        sum[j] = sum[node] + num[j] ; 
        pre[j] = node ; 
      }

      else if ( !vis[j] && graph[node][j] + minn == dis[j] )
      {
        pathnum[j] += pathnum[node];
        if( sum[j] < sum[node] + num[j])
        {
          dis[j] = graph[node][j] + minn ;
          sum[j] = sum[node] + num[j] ; 
          pre[j] = node ; 
        }
      }
    }
  }

  int node = D ; 
  stack<int> path ; 
  while( pre[node] != node )
  {
    path.push(node);
    node = pre[node];
  }
  path.push(S);

  cout << pathnum[D] << ' ' << sum[D] << endl ;

  bool flag = false ; 
  while( !path.empty() )
  {
    if( !flag )
    {
      cout << path.top() ;
      flag = true ; 
    }
    else
    {
      cout << ' ' << path.top() ;
    }

    path.pop();
  }

  cout << endl ;
}
{% endcodeblock %}
{% endspoiler %} 


错了这么多次终于A了，真的是爽到。
![](/images/L2.002.png)
