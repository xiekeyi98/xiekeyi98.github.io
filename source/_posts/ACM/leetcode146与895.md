---
title: leetcode146与895
mathjax: false
categories: ACM
tags:
  - leetcode
abbrlink: f19909a4
date: 2018-12-10 20:43:11
---

# Leetcode 146 LRU Cache

## 题目连接
[LRU Cache](https://leetcode.com/problems/lru-cache/)

## 题目大意
实现一个数据结构，以充当LRU缓存。  
两种操作:   
1. get(x): 查询key为x是否存在缓存中，如果存在，返回x所对应的value，否则返回-1.  
2. put(key,value): 删除原有的key-value对，插入新的key-value对。如果LRU容量满了，删除最远的被访问到的元素。  

<!--more-->
## 做法

一开始的想法是，通过对某个元素访问get过就加1，然后满了删除最小的，用set之类的维护。  
但是一方面这个不是LRU(如果访问1 1 1 1 1 2,来了个3,那么1就要被删，然而我删的是2)，另一方面，要求O(1)维护，这个怎么也是O(logn)了。  


之后很容易考虑到的想法就是一个数组，对于每个元素访问过放到队头，删除删掉队尾的元素。  
这样是正解，但是如何维护呢？  
一开始考虑用数组，这样每次维护显然最坏一次操作就是O(n)了(因为要整理数组)。  
使用链表的话，对于get函数，也要最坏O(n)。  
这时候发现很巧妙的一个地方就是，只要我们把链表的每个地址(迭代器)用hash记录下来不就好了，这样查找就是O(1)了，放到队首也是O(1)(链表交换O(1))。  
于是就有了正解。

## 代码
{% spoiler ACcode %}
{% codeblock lang:cpp %}
/**********************************************************
 * Author        : xie keyi
 * Email         : xiekeyi98@snnu.edu.cn
 * Last modified : 2018-12-04 00:25
 * Filename      : 146LRUCACHE.cpp
 * Description   : 
 * *******************************************************/
class LRUCache {
public:
    LRUCache(int capacity) {
        this->capacity = capacity;
        l.clear();
        mp.clear();
    }
    
    int get(int key) {
        auto it = mp.find( key );
        if( it == mp.end() )
            return -1;
        else
        {
		// 元素放到队首
            l.push_front( make_pair( it->second->first , it->second->second ) );
	    // 删除原来的元素
            l.erase(it->second);
	    // 记录新的位置
            mp[key] = l.begin();
            return (l.begin())->second;
            
        }
    }
    
    void put(int key, int value) {
        auto it = mp.find(key);
        if( it != mp.end() )
            l.erase(it->second); // 如果原来有，删除原来的元素
	    // 插入新元素
        l.push_front( make_pair( key , value ) );
        mp[key] =   l.begin(); ;
        
	// 大于容量了，删除队尾
        if( l.size() > capacity )
        {
            mp.erase( l.rbegin()->first );
            l.pop_back();
        }
    }
private:
    int capacity = -1;
    list< pair<int,int> > l; // key,value
    unordered_map< int , list< pair<int,int> >:: iterator > mp; // 记录list位置
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */

{% endcodeblock %}
{% endspoiler %}





# Leetcode 895 Maximum Frequency Stack 

## 题目连接
[Mximum Frequency Stack](https://leetcode.com/problems/maximum-frequency-stack/)

## 题目大意
实现一个数据结构，以实现“最频繁栈”。  
两个操作：
1. pop()，弹出栈中元素数目最多的，如果有多个，弹出最后一个入栈的。(保证不会对空栈执行pop操作)。
2. push(x)，进入一个x元素。



## 做法
最暴力的做法是，维护一个真的栈，顺便统计栈中每个元素的出现次数(`map<int,int>`)，每次遇到pop操作，边查找整个栈中出线最频繁且最靠近栈尾的元素，进行出栈并进行维护。  
这样的操作每次O(n)，显然不够优雅。  


进一步观察出栈信息，其实我们可以把元素“割裂”开来，如5个5，不要看成一体。而是看成在出现1次的数中5有一个，在出现2次的数中5有一个……以此类推……   
这样我们就可以维护n个栈，栈i表示出现i次的元素的情况。  
如数据1 2 1 2 ，就可以看成：  
1. 栈1中有元素1，表示出现1次的元素有1。  
2. 栈1中进入元素2，有1 2 ，表示出现1次的元素有1 2（这时如果出栈，先出2，刚好是满足要求的).  
3. 栈2中进入元素1，表示出现2次的元素有1。  
4. 栈2中进入元素2，表示出现2次的元素有1 2.(优先出标号大的栈中元素)  
这样即可达到要求了。（真是巧妙的很，我醉了）。  


## 代码

{% spoiler ACcode %}
{% codeblock lang:cpp %}
/**********************************************************
 * Author        : xie keyi
 * Email         : xiekeyi98@snnu.edu.cn
 * Last modified : 2018-12-10 21:00
 * Filename      : 895MaximumFrequencyStack.cpp
 * Description   : 
 * *******************************************************/

// 实现一个栈，弹出里面出现最频繁的数字
// 一样频繁按照栈的顺序出

class FreqStack {
public:
    FreqStack() {
        max_freq = -1 ;
    }
    
    void push(int x) {
        mp1[x]++; // 元素x的出现次数+1
	// 如果元素x的出现次数变成最大了
	// 修改max_freq(出现次数最多的栈编号)
        if( mp1[x] >= max_freq )
            max_freq = mp1[x];
	// 编号为mp1[x]的栈进入元素x
        mp2[mp1[x]].push(x);
        return ;
    }
    
    int pop() {
	    // 记录出现次数最多的栈编号里面的栈顶元素(返回值)
        auto res = mp2[max_freq].top();         
	mp2[max_freq].pop(); // 元素出栈
        mp1[res]--; // 元素出现次数减一
	// 如果最频繁的元素都出完了，最大编号-1
        if( mp2[max_freq].empty() )
            max_freq--;
        return res;     
    }
private:
    int max_freq ; // 出现次数最多的数字
    map<int,int> mp1 ; // mp1[x] 表示数字x出现的次数
    map<int , stack<int> > mp2; // mp2[x] 表示出现x次的数字出现的顺序(按照stack)
    
    
};

/**
 * Your FreqStack object will be instantiated and called as such:
 * FreqStack obj = new FreqStack();
 * obj.push(x);
 * int param_2 = obj.pop();
 */
{% endcodeblock %}
{% endspoiler %}



