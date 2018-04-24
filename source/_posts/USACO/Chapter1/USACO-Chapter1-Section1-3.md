---
title: USACO-Chapter1-Section1.3
mathjax: false
date: 2017-11-08 17:13:02
categories: ACM
description: USACO-Chapter1-Section1.3
tags:
- USACO
---

### 1milk
{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:milk
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;

const int maxm = 5050 ; 

struct P
{
	int price ; 
	int amount ;
}a[maxm];

bool cmp( struct P a , struct P b )
{
	return ( a.price < b.price ) ;
}


int main()
{
	freopen("milk.in","r",stdin);
	freopen("milk.out","w",stdout);
	ios::sync_with_stdio(false);
	cin.tie(false) ; 
	int n ;
	int m ;
	cin >> n >> m ;
	for( int i = 1 ; i <= m ; i++)
		cin >> a[i].price >> a[i].amount ;
	sort(a+1,a+1+m,cmp);
	int ans = 0 ;
	int cnt = 1 ; 
	while( n != 0 )
	{
		if( a[cnt].amount <= n )
		{
			n -= a[cnt].amount;
			ans += a[cnt].amount * a[cnt].price;
			a[cnt].amount = 0 ;
		}
		else 
		{
			ans+= n * a[cnt].price ;
			a[cnt].amount -= n ;
			n = 0 ;
		}
		cnt++;
	}

	cout << ans << endl ;
	return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}

### 2barn1

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:barn1
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ; 
int a[210]; 
int maxr = 0 ; 
int minl = 999 ; 
void filling( int l , int r )
{
    for( int i = l ; i <= r ; i++ )
        a[i] = 3 ; 
}


int func()
{
    int l = 0 , r = 0 ;
    int cnt = 0 ;
    for( int i = minl ; i <= maxr ; i++)
    {
        if( a[i] != 0 )
            continue ;
        int temp = 1 ; 
        int j ; 
        for( j = i + 1 ; j <= maxr ; j++)
        {
            if( a[j]  == 0 )
                temp++;
            else
                break ; 
        }
        
        if( temp >=  ( r - l + 1 )  )
            l = i , r = j - 1  , cnt = temp ; ;
    }
    
    filling( l , r ) ;
    return cnt ; 
}


int main()
{

    freopen("barn1.in","r",stdin);
    freopen("barn1.out","w",stdout); 
    int m , s , c ;
    cin >> m >> s >> c ;
    memset( a , 0 , sizeof(a) )  ;
    int ans = 0 , mm = 1 ; 
    for( int i = 1 ; i <= c ; i++)
    {
        int t ;
        cin >> t ;
        a[t] = 1 ;
        maxr = max( t , maxr ) ; 
        minl = min( minl , t ) ; 
    }
    ans = maxr - minl + 1 ; 

    while( mm < m && mm < c )
    {
        ans = ans -  func() ;
        mm++;
    }

    cout << ans << endl ; 
    return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}

### 3crypt1

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:crypt1
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;
int a[100];
set<int> b ;

bool judge( int n )
{
	while( n != 0 )
	{
		if( !b.count( n % 10 ) )
			return false ;
		n /= 10 ;
	}

	return true ; 
}


int main()
{
	freopen("crypt1.in","r",stdin);
	freopen("crypt1.out","w",stdout);
	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
	{
		cin >> a[i];
		b.insert(a[i]) ;
	}

	int ans = 0 ;

	int q = 0 , w = 0 , e = 0 ; 
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			for( int k = 1 ; k <= n ; k++)
			{
				for( int l = 1 ; l <= n ; l++)
				{
					for( int m = 1 ; m <= n ; m++)
					{
						q = ( a[i] * 100 + a[j] * 10 + a[k] ) * a[m] ;
						w = ( a[i] * 100 + a[j] * 10 + a[k] ) *  a[l];
						e = ( a[i] * 100 + a[j] * 10 + a[k] ) * ( a[l] * 10 + a[m] ) ;
						if( w < 1000 && q < 1000 && e < 10000 && judge(q) && judge(w) && judge(e) )
						{
							ans++;
							//cout << q << ' ' << w << ' ' << e << endl ; 
						}

					}
				}
			}
		}
	}

	cout << ans << endl ;
	return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}

### 4combo
{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:combo
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;


int n ;
int john[4] , master[4];
int similar( int a , int b )
{

	if( a >= n - 1 && b <= n -1 )
		return min( abs( a - b ) , abs( a - n - b ) ) ;
	if( b >= n - 1 && a <= n - 1 )
		return min( abs( a - b ) , abs( b - n - a ) ) ;

	return abs( a - b ) ; 
}

//int s( int a[] , int b )
//{
//	int minn  = 99999999 ;
//	for( int i = 1 ; i <= 3 ; i++ )
//		minn = min( minn , similar( b , a[i] ) ) ;
//
//	return minn ;
//}

bool judge( int a , int b , int c )
{
	int cnt = 0 ;
	if( similar( john[1] , a ) <= 2 )
		cnt++;
	if( similar( john[2] , b ) <= 2 )
		cnt++;
	if( similar( john[3] , c ) <= 2 )
		cnt++;
	if( cnt == 3 )
		return true ;
	
	cnt = 0 ;
	if( similar( master[1] , a ) <= 2 )
		cnt++;
	if( similar( master[2] , b ) <= 2 )
		cnt++;
	if( similar( master[3] , c ) <= 2 )
		cnt++;
	if( cnt == 3 )
		return true ; 

	return false ; 
}

int main()
{
	freopen("combo.in","r",stdin);
	freopen("combo.out","w",stdout);
	cin >> n ;
	cin >> john[1] >> john[2] >> john[3] 
		>> master[1] >> master[2] >> master[3] ;
	int ans = 0 ; 
	for( int i = 1 ; i <= n ; i++ ) 
	{
		for( int j = 1 ; j <= n ; j++)
		{
			for( int k = 1 ; k <= n ; k++)
			{
				if( judge( i , j , k ) )
				{
					ans++ ;
				//	cout << i << ' ' <<  j << ' ' <<  k << endl ;
				}


			}
		}
	}

	cout << ans << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

### 5wormhole

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:wormhole
LANG:C++
 */

#include<bits/stdc++.h>
using namespace std ;
int n ;
int ans = 0 ;
int b[15] ;
struct node
{
	int x , y ;
}a[15];

bool cmp( struct node a , struct node b )
{
	if( a.y < b.y )
		return 1 ;
	else if( a.y == b.y)
		return a.x < b.x ;
	else
		return false ;
}



bool doit( int num , int x , int begin , int into )
{
	if( num != 1 && begin == x && into == 0 )
		return true ;
	else if( into == 0 ) 
	{
		if( a[x].y == a[x+1].y )
		{
			return doit( num+1,x+1,begin,1 );
		}
		else 
			return false ;
	}

	else 
	{
		return doit( num+1, b[x] , begin , 0 ) ;
	}
}


bool judge()
{
	for( int i = 1 ; i <= n ; i++)
		if( doit( 1 , i , i , 0 ) == 1 )
			return true ;
	return false ; 
}

void mpair( int x )
{
	if ( x == n + 1 )
	{
		if( judge() ==  1)
			ans++;
		return ; 
	}

	else if( b[x] == 0 )
	{
		for( int i = x + 1 ; i <= n ; i++)
		{
			if( b[i] == 0 )
			{
				b[x] = i ;
				b[i] = x ;
				mpair(x+1);
				b[x] = 0 ;
				b[i] = 0 ;
			}
		}
	}

	else
		mpair(x+1);
}

int main()
{
	freopen("wormhole.in","r",stdin);
	freopen("wormhole.out","w",stdout);
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
		cin >> a[i].x >> a[i].y ;
	sort(a+1,a+1+n,cmp) ;

	mpair(1);
	cout << ans << endl ;
	return 0  ; 
}
{% endcodeblock %} 
{% endspoiler %}

### 6skidegisn

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG: skidesign 
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1010 ;
int a[maxn];


int main()
{
	freopen("skidesign.in","r",stdin);
	freopen("skidesign.out","w",stdout);
	int  n ; 
	int ans = 0x7FFFFFFF; 

	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
		cin >> a[i] ; 
	sort( a+1 , a+1+n ) ;
	for( int i = a[1] ; i <= a[n] ; i++)
	{
		int temp = 0 ; 
		for( int j = 1 ; j <= n ; j++)
		{
			if( a[j] < i )
				temp+= static_cast<int> ( pow( abs( i - a[j] ) , 2 ) ) ;
			if( a[j] > i + 17 ) 
				temp += static_cast<int> ( pow( abs( i + 17 - a[j] ) , 2 ) ) ;
		}

		ans = min( ans , temp ) ;
	}
	cout << ans << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}


** 错误代码 **

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG: skidesign 
LANG:C++
*/


// ??óD????è? 2 1 100 ?a?ùμ?ê?è??êìa 
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1010 ;
int a[maxn];


int main()
{
	freopen("skidesign.in","r",stdin);
	freopen("skidesign.out","w",stdout);
	int  n ; 
	int ans = 0xFFFFFFF; 

	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
		cin >> a[i] ; 
	sort( a+1 , a+1+n ) ;
	for( int  i = 1 ; i <= n ; i++)
	{
		for( int j = n ; j >= i ; j-- )
		{
			if( a[j] - a[i] <= 17 )
			{
				int temp = 0 ;
				for( int k = 1 ; k < i ; k++)
					temp += static_cast<int> ( pow( abs( a[k] - a[i] ) , 2 ) ) ;
				for( int k = n ; k > j ; k-- )
					temp+= static_cast<int> ( pow( abs( a[k] - a[j] ) , 2 ) ) ;
				ans = min( temp , ans) ;
			}
		}
	}
	cout << ans << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}

