---
title: USACO-Chapter1-Section1.2
mathjax: false
date: 2017-11-08 17:06:37
categories: ACM
description: USACO-Chapter1-Section1.2
tags:
- USACO
---


### 1milk2

```c++
/*
ID:xiekeyi1
PROG:milk2
LANG:C++
 */
#include<bits/stdc++.h>
using namespace std ; 
const int MAXN = 5010;
struct point  
{
	int begin , end ;
} a[MAXN] ;


bool cmp( struct point a , struct point b )
{
	if( a.begin < b.begin)
		return true ;
	else if( a.begin == b.begin && a.end < b.end )
		return true ;
	else
		return false ; 
}
int main()
{
	freopen("milk2.in","r",stdin);
	freopen("milk2.out","w",stdout);

	int n ;
	cin >> n ;
	for( int i = 1 ; i <= n ; i++)
		cin >> a[i].begin >> a[i].end ;
	sort(a+1,a+1+n,cmp) ; 
	int ans1= 0 , ans2 = 0 ;
	int tem_begin = a[1].begin , tem_end= a[1].end;
	ans1 = max( tem_end - tem_begin , ans1 );  
	for( int i = 2 ; i <=n ; i++)
	{
		if( a[i].begin <= tem_end)
		{
			tem_end = max( tem_end , a[i].end)  ;
		}
		else 
		{
			ans1 = max(ans1 , tem_end - tem_begin ) ;
			ans2 =max( ans2 , a[i].begin - tem_end) ;

			tem_begin = a[i].begin;
			tem_end = a[i].end ;
		}
	}

	cout << ans1 << ' ' << ans2 << endl ;
	return 0 ; 
}
```
### 2transform

```c++
/*
ID:xiekeyi1
PROG:transform
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;
//#define DEBUG 
const int maxn = 15 ;
char a[maxn][maxn] , b[maxn][maxn] ,  c[maxn][maxn];
//template<typename T>
//void swap( T &a , T &b )
//{
//	T c ;
//	c = a ;
//	a = b ;
//	b = a  ; 
//	return ; 
//}

bool judge( char a[maxn][maxn] , char b[maxn][maxn] , int &n )
{
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= n ; j++)
			if( a[i][j] != b[i][j] )
				return false ;
	return true ;
}


int rolate( int &n )
{
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			c[j][n-i+1] = a[i][j] ;
		}
	}
	if( judge( c , b , n ) ) 
		return 1 ;

	for( int i = 1  ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			c[n-i+1][n-j+1] = a[i][j] ;
		}
	}
	if( judge ( c , b , n ) ) 
		return 2; 

	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
		{
			c[n-j+1][i] = a[i][j] ;
		}
	}

	if( judge ( c , b , n ) )
		return 3 ; 
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= n ; j++)
			c[i][j] = a[i][j] ;
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n / 2 ; j++)
		{
			swap( c[i][j] , c[i][n-j+1]) ;
		}
	}
	if( judge( c , b , n ) ) 
		return 4 ;

	//	for( int i = 1 ; i  <= n ; i++)
	//		for( int j = 1 ;  j <=n ; j++)
	//			c[i][j] = a[i][j] ;
#ifdef DEBUG
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
			cout << c[i][j];
		cout << endl ;
	}
	cout << endl << endl ; 
#endif 
	char d[maxn][maxn];
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= n ; j++)
			d[j][n-i+1] = c[i][j] ;
#ifdef DEBUG
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
			cout << d[i][j] ;
		cout << endl ;
	}
	cout << endl << endl ;
#endif 
	if( judge( d , b , n ) )  
		return 5 ;
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= n ; j++)
			d[n-i+1][n-j+1] = c[i][j] ;
#ifdef DEBUG
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
			cout << d[i][j] ;
		cout << endl ;
	}
	cout << endl << endl ;
#endif
	if( judge( d , b , n ) ) 
		return 5 ;
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <= n ; j++)
			d[n-j+1][i] = a[i][j] ;
#ifdef DEBUG
	for( int i = 1 ; i <= n ; i++)
	{
		for( int j = 1 ; j <= n ; j++)
			cout << d[i][j] ;
		cout << endl ;
	}
	cout << endl << endl ;
#endif
	if( judge( d , b , n ) ) 
		return 5 ; 

	if( judge( a , b , n ) ) 
		return 6 ;

	return 7 ; 

}



int main()
{
	freopen("transform.in","r",stdin);
	freopen("transform.out","w",stdout) ; 
	int n ;
	cin >> n ;
	char ch ;
	for( int i = 1 ; i <= n ; i++)
		for( int j = 1 ; j <=n ; j++)
		{
			cin >> ch ;
			a[i][j] = ch ;
		}

	for( int i = 1 ; i <= n ; i++ )
		for( int j = 1 ; j <= n ; j++)
		{
			cin >> ch ;
			b[i][j] = ch ; 
		}

	cout << rolate(n) << endl ;
	return 0 ; 
}
```

### 3namenum
```c++
/*
ID:xiekeyi
PROG:namenum
LANG:C++
 */
#include<bits/stdc++.h>
#include<iostream>
using namespace std ;

int f( char ch )
{
	if( ch < 'Q' ) 
		return ( ch - 'A'  + 1 + 2 ) / 3 + 1 ;
	else
		return ( ch - 'A' + 1 + 1 ) / 3 + 1 ;

}

long long func( string &s) 
{
	long long ans = 0 ;
	for( int i = 0 ; i < s.size() ; i++)
		ans = ans*10 + f(s[i]) ;
	return ans ;
}

int main()
{
	ifstream fin ; 
	freopen("namenum.out","w",stdout); 
	fin.open("namenum.in",fstream::in);
	long long n ;
	fin >> n ;
	string s ;
	fin.close() ; 
	fin.open("dict.txt",fstream::in);
	bool flag = false ; 
	while( fin >> s )
		if( func(s) == n )
		{
			cout << s << endl ;
			flag = true ; 
		}
	if( !flag )
		cout << "NONE" << endl ; 
	fin.close() ; 
	return 0 ; 
}
```

### 4palsquare

```c++
/*
ID:xiekeyi1
PROG:palsquare
LANG:C++
 */
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 1000;
int a[maxn] , b[maxn] ;



void translate( int n ,  int B , int flag , int &d )
{
	int digit = 0 ;
	while( n != 0 )
	{
		if( flag == 1 )
			a[digit++] = n % B ;
		else 
			b[digit++] = n % B ; 
		n /= B ;
	}
	d = digit ; 
	return ; 

}

bool judge( int b[] , int d )
{
	for( int i = 0 ; i <= d / 2 ; i++)
		if( b[i] != b[d-i-1] )
			return false ;
	return true ;
}


ostream& p( int b[] ,  int d ) 
{
	for( int i = d - 1 ; i >= 0 ; i--)
	{
		if( b[i] < 10 )
			cout << b[i] ;
		else 
			cout << static_cast<char> (  b[i] - 10 + 'A' ) ;
	}
	return cout ; 
}

int main()
{
	freopen("palsquare.in","r",stdin);
	freopen("palsquare.out","w",stdout);
	int B ;
	cin >> B ;
	for( int i = 1 ; i <= 300 ; i++)
	{
		int d1 = 0 , d2 = 0 ;
		int t = i * i ; 
		translate( t , B , 2 , d2 ) ;
		if( judge( b , d2 ) )
		{
			translate( i , B , 1 , d1 ) ; 
			p(a,d1) << ' ' ; 
			p(b,d2) << endl ; 

		}
	}

	return 0 ; 
}
```

### 5dualpal

```c++
/*
ID:xiekeyi1
PROG:dualpal
LANG:C++
 */
#include<bits/stdc++.h>
using namespace std ;
const int maxn = 100 ;
int a[maxn] ;


void f( int a[] , int n ,  int b , int &d )
{
	int digit = 0 ;
	while( n != 0 )
	{
		a[digit++] = n % b ;
		n /= b ;
	}
	d = digit ;
	return ; 
}

bool  judge( int a[] , int d )
{
	for( int i = 0 ; i <= d/2 ; i++)
		if( a[i] != a[ d-i-1] )
			return false ;
	return true ;
}
int main()
{

	freopen("dualpal.in","r",stdin);
	freopen("dualpal.out","w",stdout);
	int n , s ;
	cin >> n >> s ;
	int i = 0 ;
	int temp = s+1 ;
	for( i = 0 ; i < n ;  ) 
	{
		int flag = 0 ; 
		for( int j = 2 ; j <= 10 ; j++)
		{
			int d = 0 ;
			f(a,temp,j,d);
			if( judge( a , d ) ) 
				flag++;
			if( flag >= 2 )
			{
				cout << temp << endl ;
				i++;
				break ; 
			}
		}
		temp++;
	}
	return 0 ; 
}
```


