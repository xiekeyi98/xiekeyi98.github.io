---
title: Codeforces 442 Div.2 877B Nikita and String
date: 2017-11-07 16:45:08
categories: ACM
mathjax: true
tags:
- codeforces
- DP
- 枚举
---


题目链接： [Codeforces 442 Div.2 B](http://codeforces.com/contest/877/problem/B)

题意: 给出一个只由小写字母ab组成的串，删除任意字符后，将剩下的拼起来（不改变顺序） ，问剩下的串满足由:$s\_{1}$、$s\_{2}$、$s\_{3}$ 组成，其中$s\_{1}$为全部由小写字母a组成的或者是空串，$s\_{2}$为全部由小写字母b组成的或者是空串,
$s\_{3}$为全部由小写字母a组成的或者是空串。
求满足这样条件的串，最长的长度是多少？( |s| &lt;  5000  ) 


一开始比赛的时候，我考虑的是维护一个前缀和，把a看为正数，把b看为负数。
然后前缀和维护的话大概就是这么一个样子。
```c++
for( int j = i ; j < length + 1 ; j++)
		{
			if( s[i] == s[j] )
				cnt++;
			else
			{
				i = j - 1  ;
				if( s[i] == 'a' )
					a.push_back( cnt ) ;
				else if(s[i] == 'b' )
					a.push_back( -cnt ) ;
				cnt = 0 ;	
				break ;
			}
		}
	}
```

然后我想当然的认为，这道题就是求
`Max{ a[i] + a[j] + a[k] ) ( i < j <  ) } `

结果WA了整整一个比赛。

主要原因是没有考虑到，有可能拼起来更长的情况。
比如:
aaaabaaaaa

这样，可以把b删去后把a全部看成一起，这个做法没有考虑到这个情况。


**思维太僵化了，其实有很简单的做法。结果经常自己陷入一开始的思维定式跳不出来。** 

-----


###  做法1


因为数据量只由5000，所以其实可以直接$n^{2}$枚举分界点，然后前缀和之类的统计一下就可以了。

**这道题细节不算少，分界点如何枚举，如何处理空串这类，我处理了不短的时间。**


时间复杂度: $O(n^{2})$ （前缀和） 


###  做法2


我们可以用`dp[n][3]`这样的数组表示，其中`dp[0]`表示只由a构成的串，`dp[1]`表示由a、b构成的串，`dp[2]`表示由a、b、a构成的串。

那么，当我`s[i] == 'a' ` 时，
```c++
dp[i][0] = dp[i-1][0] + 1;
dp[i][1] = dp[i-1][1] ;
dp[i][2] = max( dp[i-1][1] + 1 , dp[i-1][2] + 1 ) ;
```

当 `s[i] == 'b' ` 时
```c++
dp[i][0] = dp[i-1][0] ;
dp[i][1] = max( dp[i-1][1] + 1 , dp[i-1][0] + 1 ) ;
dp[i][2] = dp[i-1][2] ;
```

转移应该是显而易见的。

对于只由a构成的串，每次都是遇到a的时候加一。
由ab构成的串，可以由 只由a的串转移而来，或者由ab串转移而来。
aba构成的串，可以由ab转移而来，也可以由aba转移而来。

时间复杂度: $O(n)$


### 做法3


我们可以把a看做是1，b看做是2，b后面的a看做是3.

那么题目就变成了求最长上升子序列（LIS）问题。

求LIS的做法有 $O(n^{2})$和$O(nlogn)$的做法。

这个写法本质上其实和做法2很像，因为只由3个数字的LIS，所以可以用做法2去实现。

因为这个方法细节较多，b前后的问题比较难处理，而且有了更容易理解的做法2.

因此没有写这个做法的代码。

-----



做法1代码：

```c++
// enumerate every interval .
#include<bits/stdc++.h>
using namespace std ;

const int maxn = 5050 ;

int a[maxn] , b[maxn];
char s[maxn];


int main()
{

	scanf("%s" , s + 1 ) ;

	int length = strlen(s+1)  ;
	for( int i = 1 ; i <= length ; i++)
	{
		if( s[i] == 'a' )
			a[i] = a[i-1] + 1 ;
		else
			a[i] = a[i-1];


		if( s[i] == 'b' )
			b[i] = b[i-1] + 1 ;
		else
			b[i] = b[i-1]  ;
	}

	int ans = 0 ; 
	for( int i = 0 ; i <= length + 1 ; i++)
	{
		for( int j = i ; j <=  length + 1 ; j++)
		{
			ans = max( ans , a[i] + b[j] - b[i] + ( ( j >= length + 1 ) ? 0 : ( a[length] - a[j] ) ) ) ;
		}
	}

	cout << ans << endl ;
	return 0;
}
```



做法2代码：
```c++
#include<bits/stdc++.h>
using namespace std ;

const int maxn = 5050 ; 

int dp[maxn][3];

int main()
{
	string s ;
	cin >> s ;

	for( int i = 0 ; i < s.size() ; i++)
	{
		if( s[i] == 'a' )
		{
			dp[i][0] = dp[i-1][0] + 1;
			dp[i][1] = dp[i-1][1] ;
			dp[i][2] = max( dp[i-1][1] + 1 , dp[i-1][2] + 1 ) ;
		}

		else if( s[i] == 'b' )
		{
			dp[i][0] = dp[i-1][0] ;
			dp[i][1] = max( dp[i-1][1] + 1 , dp[i-1][0] + 1 ) ;
			dp[i][2] = dp[i-1][2] ;
		}
	}

	cout << max( { dp[s.size()-1][0] , dp[s.size()-1][1] , dp[s.size()-1][2] } ) << endl ;
	return 0 ; 
}
```


