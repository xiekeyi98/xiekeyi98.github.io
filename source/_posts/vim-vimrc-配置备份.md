---
title: vim(.vimrc)配置备份
mathjax: false
categories: 其他
tags:
  - vim
abbrlink: 6f81dae4
date: 2018-08-09 17:42:11
---



自己的vim配置备份(有注释)
<!--more-->



# Windows -- Gvim

使用bundle管理。需先安装bundle

{% spoiler GVIM %}
{% codeblock lang:vimscript %}
set nocompatible "取消和vi的兼容，避免以前的bug和功能
autocmd GUIEnter * simalt ~x "GVIM函数，启动GUI后自动全屏
set guifont=Fixedsys:h16:cGB2312:qDRAFT "设置字号
set vb t_vb= "去掉编辑的响声
au GuiEnter * set t_vb= "关闭闪屏
set fileencodings=ucs-bom,utf-8,chinese,cp936 "设置文件编码格式
"为了兼容VI，所以backspace有好几种模式
" indent: 表示可以删除自动缩进的部分.
" eol: 表示在行尾可以合并两行
" start:表示可以删除之前的输入
" -------- GVIM ------ 
set backspace=indent,eol,start "GVIM设置，否则退格键有问题。
syntax on "开启代码高亮
set nu "设置行号
set showcmd "右下角显示输入命令
set ruler "显示当前行
set autoindent "自动缩进
set cindent "C风格缩进
set noeb "禁止响铃
colorscheme desert "颜色方案


"GCC编译函数
" %表示当前文件名 %:p表示当前文件完整路径
" %:p:r表示当前文件名完整路径并去除后缀名
func! CompileGcc()
    exec "w"
    let compilecmd="!gcc "
    let compileflag="-g -Wall  -o %:p:r "
    if search("mpi\.h") != 0
        let compilecmd = "!mpicc "
    endif
    if search("glut\.h") != 0
        let compileflag .= " -lglut -lGLU -lGL "
    endif
    if search("cv\.h") != 0
        let compileflag .= " -lcv -lhighgui -lcvaux "
    endif
    if search("omp\.h") != 0
        let compileflag .= " -fopenmp "
    endif
    if search("math\.h") != 0
        let compileflag .= " -lm "
    endif
    exec compilecmd." %:p ".compileflag
endfunc

"G++编译函数
func! CompileGpp()
    exec "w"
    let compilecmd="!g++ "
    let compileflag="-g -Wall -std=gnu++11  -o %:p:r "
    if search("mpi\.h") != 0
        let compilecmd = "!mpic++ "
    endif
    if search("glut\.h") != 0
        let compileflag .= " -lglut -lGLU -lGL "
    endif
    if search("cv\.h") != 0
        let compileflag .= " -lcv -lhighgui -lcvaux "
    endif
    if search("omp\.h") != 0
        let compileflag .= " -fopenmp "
    endif
    if search("math\.h") != 0
        let compileflag .= " -lm "
    endif
    exec compilecmd." %:p ".compileflag
endfunc


func! RunPython()
        exec "!python %:p"
endfunc
func! CompileJava()
    exec "!javac %:p"
endfunc


func! CompileCode()
        exec "w"
        if &filetype == "cpp"
                exec "call CompileGpp()"
        elseif &filetype == "c"
                exec "call CompileGcc()"
        elseif &filetype == "python"
                exec "call RunPython()"
        elseif &filetype == "java"
                exec "call CompileJava()"
        endif
endfunc

func! RunResult()
        exec "w"
        if search("mpi\.h") != 0
            exec "!mpirun -np 4 ./%<"
        elseif &filetype == "cpp"
            exec "!%:p:r"
        elseif &filetype == "c"
            exec "!%:p:r"
        elseif &filetype == "python"
            exec "call RunPython"
        elseif &filetype == "java"
            exec "!java %:p:r"
        endif
endfunc

map <F5> :call CompileCode()<CR>
imap <F5> <ESC>:call CompileCode()<CR>
vmap <F5> <ESC>:call CompileCode()<CR>

map <F6> :call RunResult()<CR>


"将键盘上的F8功能键映射为添加作者信息的快捷键
map <F8> ms:call AddAuthor()<cr>'s
function AddAuthor()
        let n=1
        while n < 5
                let line = getline(n)
                if line =~'^\s*\*\s*\S*Last\s*modified\s*:\s*\S*.*$'
                        call UpdateTitle()
                        return
                endif
                let n = n + 1
        endwhile
        call AddTitle()
endfunction
 
function UpdateTitle()
        normal m'
        execute '/* Last modified\s*:/s@:.*$@\=strftime(": %Y-%m-%d %H:%M")@'
        normal "
        normal mk
        execute '/* Filename\s*:/s@:.*$@\=": ".expand("%:t")@'
        execute "noh"
        normal 'k
        echohl WarningMsg | echo "Successful in updating the copy right." | echohl None
endfunction
 
function AddTitle()
        call append(0,"/**********************************************************")
        call append(1," * Author        : xie keyi")
        call append(2," * Email         : xiekeyi98@snnu.edu.cn")
        call append(3," * Last modified : ".strftime("%Y-%m-%d %H:%M"))
        call append(4," * Filename      : ".expand("%:t"))
        call append(5," * Description   : ")
        call append(6," * *******************************************************/")
        echohl WarningMsg | echo "Successful in adding the copyright." | echohl None
endfunction


" ----------插件设置---------

set nocompatible              " 去除VI一致性,必须要添加
filetype off                  " 必须要添加

" 设置包括vundle和初始化相关的runtime path
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin('D:/软件/Vim/vimfiles/bundle/') "插件安装位置，LINUX下可为空。
" 另一种选择, 指定一个vundle安装插件的路径
"call vundle#begin('~/some/path/here')
" 让vundle管理插件版本,必须
Plugin 'VundleVim/Vundle.vim'

" 以下范例用来支持不同格式的插件安装.
" 请将安装插件的命令放在vundle#begin和vundle#end之间.
" Github上的插件
" 格式为 Plugin '用户名/插件仓库名'
" 来自 http://vim-scripts.org/vim/scripts.html 的插件
" Plugin '插件名称' 实际上是 Plugin 'vim-scripts/插件仓库名' 只是此处的用户名可以省略

Plugin 'octol/vim-cpp-enhanced-highlight' "C++额外代码高亮
Plugin 'wakatime/vim-wakatime' "工作时间显示插件
Plugin 'vim-airline/vim-airline' "状态栏

Plugin 'godlygeek/tabular' "vim-markdown需要
Plugin 'plasticboy/vim-markdown' "markdown 高亮匹配等
Plugin 'iamcco/markdown-preview.vim' " markdown预览
Plugin 'flazz/vim-colorschemes' "VIM配色合集




" 由Git支持但不再github上的插件仓库 Plugin 'git clone 后面的地址'

" 本地的Git仓库(例如自己的插件) Plugin 'file:///+本地插件仓库绝对路径'

" 插件在仓库的子目录中.
" 正确指定路径用以设置runtimepath. 以下范例插件在sparkup/vim目录下

" 安装L9，如果已经安装过这个插件，可利用以下格式避免命名冲突

" 你的所有插件需要在下面这行之前
call vundle#end()            " 必须

filetype plugin indent on    " 必须 加载vim自带和插件相应的语法和文件类型相关脚本
" 忽视插件改变缩进,可以使用以下替代:
"filetype plugin on
"
" 常用的命令
" :PluginList       - 列出所有已配置的插件
" :PluginInstall     - 安装插件,追加 `!` 用以更新或使用 :PluginUpdate
" :PluginSearch foo - 搜索 foo ; 追加 `!` 清除本地缓存
" :PluginClean      - 清除未使用插件,需要确认; 追加 `!` 自动批准移除未使用插件
"
" 查阅 :h vundle 获取更多细节和wiki以及FAQ
" 将你自己对非插件片段放在这行之后

let g:vim_markdown_folding_disabled = 1 "vim-markdown禁止折叠
let c_no_curly_error=1 "修复highlight代码bug
{% endcodeblock %}
{% endspoiler %}


# Linux -- Vim 8.0



注:LINUX下使用的是PLUG，需先安装PLUG。
配置文件在vimrc，插件相关配置在vimrc.bundle内。

{% spoiler vimrc %}
{% codeblock lang:vimscript %}

"set nocompatible "取消和vi的兼容，避免以前的bug和功能
"autocmd GUIEnter * simalt ~x "GVIM函数，启动GUI后自动全屏
"set guifont=Fixedsys:h16:cGB2312:qDRAFT "设置字号
"set backspace=indent,eol,start "GVIM设置，否则退格键有问题。
" -------- GVIM ------ 
"为了兼容VI，所以backspace有好几种模式
" indent: 表示可以删除自动缩进的部分.
" eol: 表示在行尾可以合并两行
" start:表示可以删除之前的输入
syntax on "开启代码高亮
set nu "设置行号
set showcmd "右下角显示输入命令
set ruler "显示当前行
set autoindent "自动缩进
set cindent "C风格缩进
set noeb "禁止响铃
colorscheme desert "颜色方案


"GCC编译函数
" %表示当前文件名 %:p表示当前文件完整路径
" %:p:r表示当前文件名完整路径并去除后缀名
" %< 表示当前文件名
func! CompileGcc()
    exec "w"
    let compilecmd="!gcc "
    let compileflag="-g -Wall  -o %:r"
    if search("mpi\.h") != 0
        let compilecmd = "!mpicc "
    endif
    if search("glut\.h") != 0
        let compileflag .= " -lglut -lGLU -lGL "
    endif
    if search("cv\.h") != 0
        let compileflag .= " -lcv -lhighgui -lcvaux "
    endif
    if search("omp\.h") != 0
        let compileflag .= " -fopenmp "
    endif
    if search("math\.h") != 0
        let compileflag .= " -lm "
    endif
    exec compilecmd." % ".compileflag
endfunc

"G++编译函数
func! CompileGpp()
    exec "w"
    let compilecmd="!g++ "
    let compileflag="-g -Wall -std=gnu++11  -o %:r "
    if search("mpi\.h") != 0
        let compilecmd = "!mpic++ "
    endif
    if search("glut\.h") != 0
        let compileflag .= " -lglut -lGLU -lGL "
    endif
    if search("cv\.h") != 0
        let compileflag .= " -lcv -lhighgui -lcvaux "
    endif
    if search("omp\.h") != 0
        let compileflag .= " -fopenmp "
    endif
    if search("math\.h") != 0
        let compileflag .= " -lm "
    endif
    exec compilecmd. " % ".compileflag
endfunc


func! RunPython()
        exec "!python %"
endfunc
func! CompileJava()
    exec "!javac %"
endfunc


func! CompileCode()
        exec "w"
        if &filetype == "cpp"
                exec "call CompileGpp()"
        elseif &filetype == "c"
                exec "call CompileGcc()"
        elseif &filetype == "python"
                exec "call RunPython()"
        elseif &filetype == "java"
                exec "call CompileJava()"
        endif
endfunc

func! RunResult()
        exec "w"
        if search("mpi\.h") != 0
            exec "!mpirun -np 4 ./%<"
        elseif &filetype == "cpp"
            exec "! ./%:r"
        elseif &filetype == "c"
            exec "! ./%:r"
        elseif &filetype == "python"
            exec "call RunPython"
        elseif &filetype == "java"
            exec "!java %:r"
        endif
endfunc

func! DEBUG()
	exec "!gdb %:r"
endfunc

map <F5> :call CompileCode()<CR>
imap <F5> <ESC>:call CompileCode()<CR>
vmap <F5> <ESC>:call CompileCode()<CR>

map <F6> :call RunResult()<CR>
map <F7> :call DEBUG()<CR>


"将键盘上的F8功能键映射为添加作者信息的快捷键
map <F8> ms:call AddAuthor()<cr>'s
function AddAuthor()
        let n=1
        while n < 5
                let line = getline(n)
                if line =~'^\s*\*\s*\S*Last\s*modified\s*:\s*\S*.*$'
                        call UpdateTitle()
                        return
                endif
                let n = n + 1
        endwhile
        call AddTitle()
endfunction
 
function UpdateTitle()
        normal m'
        execute '/* Last modified\s*:/s@:.*$@\=strftime(": %Y-%m-%d %H:%M")@'
        normal "
        normal mk
        execute '/* Filename\s*:/s@:.*$@\=": ".expand("%:t")@'
        execute "noh"
        normal 'k
        echohl WarningMsg | echo "Successful in updating the copy right." | echohl None
endfunction
 
function AddTitle()
        call append(0,"/**********************************************************")
        call append(1," * Author        : xie keyi")
        call append(2," * Email         : xiekeyi98@snnu.edu.cn")
        call append(3," * Last modified : ".strftime("%Y-%m-%d %H:%M"))
        call append(4," * Filename      : ".expand("%:t"))
        call append(5," * Description   : ")
        call append(6," * *******************************************************/")
        echohl WarningMsg | echo "Successful in adding the copyright." | echohl None
endfunction



"将插件文件分开，如果存在可读的.vimrc.bundles文件，把这个文件(插件文件)加载到下面
if filereadable(expand("~/.vimrc.bundles"))
  source ~/.vimrc.bundles
endif


{% endcodeblock %}
{% endspoiler %}


{% spoiler vimrc.bundle %}
{% codeblock lang:vimscript %}
set nocompatible              " 去除VI一致性,必须要添加
filetype off                  " 必须要添加

" 设置包括vundle和初始化相关的runtime path
call plug#begin() "插件安装位置，默认是./.vim，括号内可传入字符串表示位置
" 另一种选择, 指定一个vundle安装插件的路径
"call vundle#begin('~/some/path/here')
" 让vundle管理插件版本,必须

" 以下范例用来支持不同格式的插件安装.
" 请将安装插件的命令放在vundle#begin和vundle#end之间.
" Github上的插件
" 格式为 Plugin '用户名/插件仓库名'
Plug 'octol/vim-cpp-enhanced-highlight' "一个C++额外代码高亮插件
" 来自 http://vim-scripts.org/vim/scripts.html 的插件
" Plugin '插件名称' 实际上是 Plugin 'vim-scripts/插件仓库名' 只是此处的用户名可以省略

Plug 'wakatime/vim-wakatime' "记录工作时间插件 
Plug 'vim-airline/vim-airline' "状态栏插件
Plug 'vim-airline/vim-airline-themes' "状态栏皮肤
Plug 'flazz/vim-colorschemes' " 配色合集

Plug 'luochen1990/rainbow' " 彩虹括号
" 由Git支持但不再github上的插件仓库 Plugin 'git clone 后面的地址'

" 本地的Git仓库(例如自己的插件) Plugin 'file:///+本地插件仓库绝对路径'

" 插件在仓库的子目录中.
" 正确指定路径用以设置runtimepath. 以下范例插件在sparkup/vim目录下

" 安装L9，如果已经安装过这个插件，可利用以下格式避免命名冲突

" 你的所有插件需要在下面这行之前
call plug#end()            " 必须
" 忽视插件改变缩进,可以使用以下替代:
"filetype plugin on
filetype plugin indent on    " 必须 加载vim自带和插件相应的语法和文件类型相关脚本
"
" 常用的命令
" :PluginList       - 列出所有已配置的插件
" :PluginInstall     - 安装插件,追加 `!` 用以更新或使用 :PluginUpdate
" :PluginSearch foo - 搜索 foo ; 追加 `!` 清除本地缓存
" :PluginClean      - 清除未使用插件,需要确认; 追加 `!` 自动批准移除未使用插件
"
" 查阅 :h vundle 获取更多细节和wiki以及FAQ
" 将你自己对非插件片段放在这行之后
"
let c_no_curly_error=1 "修复代码高亮的某个bug
let g:airline#extensions#ale#enabled = 1 "使用airline(状态栏)插件扩展ale(静态查错)

"使ale只在保存的时候才会检查错误
let g:ale_lint_on_text_changed = 'never'
let g:ale_lint_on_enter = 0

" 开关彩虹括号
let g:rainbow_active = 1 "0 if you want to enable it later via :RainbowToggle

{% endcodeblock %}
{% endspoiler %}
