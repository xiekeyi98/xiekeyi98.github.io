---
title: USACO Chapter1 Section1.1
mathjax: false
date: 2017-11-08 16:53:51
categories: ACM
description: USACO-Chapter1-Section1.1
tags:
- USACO
---



### 0test

```c++
{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:test
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;

int main()
{
	freopen("test.in","r",stdin);
	freopen("test.out","w",stdout) ;
	long long a , b ;
	cin >> a >> b ;
	cout << a + b << endl ;
	return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}
### 1ride

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:ride
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;

int main()
{
	freopen("ride.in","r",stdin);
	freopen("ride.out","w",stdout) ;
	string s1 , s2 ;
	cin >> s1 >> s2 ;
	int ans1 = 1 , ans2 = 1 ;
	for( int i = 0 ; i < s1.size() ; i++)
		ans1 *= (s1[i] - 'A' + 1 ) % 47 ;
	for( int i = 0 ; i < s2.size() ; i++)
		ans2 *= (s2[i] - 'A' + 1 ) % 47 ;
	ans1 %= 47 , ans2 %= 47 ;
	if( ans1 == ans2 )
		cout << "GO" << endl ;
	else
		cout << "STAY" << endl ;
	return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}

### 2gift

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:gift1
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ;

map<string,int> na;
struct 
{
	string name ;
	int account = 0 ;
	int begiven = 0 ; 
}a[1000];
int main()
{
	freopen("gift1.in","r",stdin);
	freopen("gift1.out","w",stdout);
	int n ;
	cin >> n;
	for( int i = 1 ; i <= n ; i++)
	{
		cin >> a[i].name ;
		na[ a[i].name] = i ;
	}
	string tempname ; 

	int tempmoney , ng ;
	while( cin >> tempname >> tempmoney >> ng )
	{
		int tem = 0 ; 
		a[ na[tempname] ].account -= tempmoney ; 
		if( ng != 0 )
		{
			tem = tempmoney / ng ; 
			a[ na[tempname] ].account = a[ na[tempname] ].account - ( a[ na[tempname] ].account + tem * ng ) ; 
		}

		for( int i = 1 ; i <= ng ; i++)
		{

			string t ;
			cin >> t ;
			a[ na[t] ] . begiven += tem ; 
		}
	}

	for( int i = 1 ; i <= n ; i++)
	{
		cout << a[i].name << ' ' << a[i].account + a[i].begiven << endl ; 
	}
	return 0 ;
}
{% endcodeblock %}
{% endspoiler %}


{% spoiler code %}
{% codeblock lang:cpp %} 
### 3friday

```c++
/*
ID:xiekeyi1
PROG:friday
LANG:C++
*/

#include<bits/stdc++.h>
using namespace std ;
int a[10] = {0} ;

bool isleapyear( int n )
{
	if( n % 4 == 0 && n % 100 != 0 )
		return true ;
	else if( n % 400 == 0 )
		return true ;
	else
		return false ;
}

int days_month( int y , int m )
{
	switch(m){
		case 1 :
		case 3 :
		case 5 :
		case 7 :
		case 8 :
		case 10:
		case 12:
			return 31 ;
		case 4 :
		case 6 :
		case 9 :
		case 11 :
			return 30 ;
		case 2:
			if(  isleapyear(y) )
				return 29 ;
			else 
				return 28 ;
		}
}

int days( int y , int m , int d )
{
	int ans = 0 ; 
	for( int i = 1900 ; i < y ; i++)
	{
		if( isleapyear( i )  )
			ans+=366;
		else 
			ans+=365;
	}

	for( int i = 1 ; i < m ; i++)
	{
		ans+=  days_month( y , i ) ;
	}

	ans += d ;

	return ans - 1  ; 
}

	
int main()
{
	freopen("friday.in" , "r" , stdin) ;
	freopen("friday.out" , "w" , stdout) ; 
	int n ; 
	cin >> n ;
	for( int i = 1900 ; i < ( n + 1900 )  ; i++)
	{
		for( int j = 1 ; j <= 12 ; j++)
			 a[ days(i,j,13) % 7 + 1 ]++ ;
	}

	cout << a[6] << ' ' << a[7] << ' ' << a[1] << ' ' << a[2] << ' ' << a[3] << ' ' << a[4] 
	     << ' ' << a[5] << endl ;
	return 0 ; 
}
{% endcodeblock %} 
{% endspoiler %}


### 4beads

{% spoiler code %}
{% codeblock lang:cpp %} 
/*
ID:xiekeyi1
PROG:beads
LANG:C++
*/
#include<bits/stdc++.h>
using namespace std ; 
int main()
{
	freopen("beads.in","r",stdin);
	freopen("beads.out","w",stdout);

	int n ;
	string s ;
	cin >> n >> s ;
	s+=s;
	int a = 0 , b = 0 , w = 0 , c = 0 , ans = 0 ;
	for( int i = 0 ; i < n*2 ; i++)
	{
		if( s[i]  == 'w' ) b++,w++;
		else if( s[i] == c ) b++,w=0;
		else
		{
			ans = max( a+b,ans) ; 

			a = b - w ; b = w + 1 ; w = 0 ; c = s[i] ;
		}

	}
	ans = max( a+b , ans ) ; 

	cout << min( ans , n ) << endl ;
	return 0 ; 
}

{% endcodeblock %} 
{% endspoiler %}
