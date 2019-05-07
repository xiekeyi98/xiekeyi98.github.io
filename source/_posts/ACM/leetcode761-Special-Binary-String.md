---
title: leetcode761 Special Binary String
mathjax: false
categories: ACM
tags:
  - leetcode
abbrlink: 958a9135
date: 2018-12-13 15:07:03
---


# leetcode761 Special Binary String

## 题目连接

https://leetcode.com/problems/special-binary-string/description/

## 题目大意

定义Special Binary String:

- 1和0的数量一定相等
- 所有以1开始的前缀一定是1的数量大于等于0的数量。  

现在给出一个Special Binary String,可以任意交换满足Special Binary String的子串，求满足条件的Special Binary String字典序最大的串。


<!--more-->

## 做法
题目很费解……看了好久才看懂……  
当时刚看到这道题的时候，有点一头雾水无从下手。想着这里要交换交换，还是要统计统计所有的前缀情况……？  


看了一下别人的题解，发现思路挺清晰的。把这个串的定义运用到了极致。  

对于每个Special Binary String，递归进去处理他们的子串。  
让每个Special Binary String子串，进行排序，按照字典序最大的方法去加和他们。  
那么原串Special Bianry String一定是字典序最大的。  
只要这样递归操作下去即可。  

这个方法一开始想了好久，觉得对于`100`、`110`，这种情况，好像处理有问题——回过头来看看这个题目的意思和定义，就秒懂了。。  


## 代码

{% spoiler ACcode %} 
{% codeblock lang:cpp %}

/**********************************************************
 * Author        : xie keyi
 * Email         : xiekeyi98@snnu.edu.cn
 * Last modified : 2018-12-13 15:04
 * Filename      : 761SpecialBinaryString.cpp
 * Description   : 
 * *******************************************************/

class Solution {
public:
    string makeLargestSpecial(string S) {
        auto &s = S;
        int flag = 0 ;
        vector<string> t; 
        string res;
        int pre = 0 ;
        for( int i = 0 ; i < s.size() ; i++)
        {
            flag += (s[i] == '1' ) ? 1 : -1;
	    // 当前串是个符合条件的串
	    // 递归下去
            if( flag == 0 )
            {
		// 符合条件的串开头和结尾一定是1和0
		// 里面的串也要进行整理和排序
                t.push_back( "1" + makeLargestSpecial( s.substr(pre + 1 , i - pre - 1)  ) + "0" );
                pre = i + 1;
            }
        }
	// 对所有符合条件的串，排序，进行交换和重组
	// 使字典序最大
        sort( t.begin() , t.end() , greater<string>() );
        for( auto i : t )
            res += i ;
        return res;
            
    }
};

{% endcodeblock %}
{% endspoiler %}
