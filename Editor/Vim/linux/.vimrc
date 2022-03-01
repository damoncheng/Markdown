"Basic config
syn on "语法高亮 
set helplang=cn     "使用中文帮助文档
set backspace=2
set tabstop=4 "制表符的宽度
set softtabstop=4
set shiftwidth=4 "缩进的空格
set expandtab
set autoindent     "自动缩进
set number "设置行号
"set ignorecase "忽略大小写 （查找字符串时）
set nohlsearch "高亮显示 （查找字符串是，找到后高亮显示）
set mouse=a "使用鼠标
set ruler     "在右下角显示光标位置
set showcmd     "显示未敲完的命令
set cmdheight=1 "设定命令行的行数为 1
set laststatus=2 "显示状态栏 (默认值为 1, 无法显示状态栏)
set incsearch "在输入搜索的字符串同时就开始搜索已经输入的部分
set nowrap "一行就一行，别弄到第二行去
set sidescroll=10     "屏幕放不下时，按一次屏幕移动一个字符    
set whichwrap=b,s,<,>,[,]     "跨行移动
set fileformats=unix,dos
set cursorline "突出显示当前行
set showmatch "插入括号时，短暂地跳转到匹配的对应括号
set matchtime=2 "短暂跳转到匹配括号的时间
set smartindent "开启新行时使用智能自动缩进
set clipboard=unnamed
set tags=./tags,./TAGS,tags;~,TAGS;~
filetype plugin indent on "自动识别文件类型，用文件类型plugin脚本，使用缩进定义文件
filetype plugin on
""set autochdir


"粘贴复制的一些操作
vmap "+y "选中状态下 Ctrl+c 复制
nmap "+yy "选中状态下 Ctrl+c 复制
nmap "+p "正常模式下粘贴
nmap ggvG "正常模式下全选
vmap <C-x> dd<Esc> "正常模式下DEL

"nmap s :call SaveFile()  
"imap s :call SaveFile()
"vmap s :call SaveFile()
func! SaveFile() 
    exec "w
endfunction

if has("gui_macvim")
    let macvim_hig_shift_movement = 1
endif

"#------- start Vundle-------#                                                                                                         
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'The-NERD-tree'
Plugin 'nerdtree-ack'
Plugin 'mileszs/ack.vim'
Plugin 'Tagbar'
Plugin 'ctags.vim'
Plugin 'ctrlp.vim'
Plugin 'dyng/ctrlsf.vim'
"Plugin 'Valloric/YouCompleteMe'
Plugin 'SirVer/ultisnips'
Plugin 'dense-analysis/ale'
Plugin 'ojroques/vim-oscyank'

" go
Plugin 'fatih/vim-go'
Plugin 'nsf/gocode', {'rtp': 'vim/'}

" python
Plugin 'pylint.vim'
Plugin 'tell-k/vim-autopep8'


" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
" --Plugin 'tpope/vim-fugitive'--
" plugin from http://vim-scripts.org/vim/scripts.html
" Plugin 'L9'
" Git plugin not hosted on GitHub
" --Plugin 'git://git.wincent.com/command-t.git'--
" git repos on your local machine (i.e. when working on your own plugin)
" --Plugin 'file:///home/gmarik/path/to/plugin'--
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
" --Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}--
" Install L9 and avoid a Naming conflict if you've already installed a
" different version somewhere else.
" Plugin 'ascenator/L9', {'name': 'newL9'}

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
" #---------end Vundle-----------#


"NERDTree
map <c-n> :NERDTreeToggle<CR>

"tarbar
map <c-g> :TagbarToggle<CR>

"Ctrlp
let g:ctrlp_regexp = 1

"CtrlSF
nmap     <C-F>f <Plug>CtrlSFPrompt
vmap     <C-F>f <Plug>CtrlSFVwordPath
vmap     <C-F>F <Plug>CtrlSFVwordExec
nmap     <C-F>n <Plug>CtrlSFCwordPath
nmap     <C-F>p <Plug>CtrlSFPwordPath
nnoremap <C-F>o :CtrlSFOpen<CR>
nnoremap <C-F>t :CtrlSFToggle<CR>
inoremap <C-F>t <Esc>:CtrlSFToggle<CR>
let g:ctrlsf_regex_pattern = 1


"python
autocmd FileType python noremap <buffer> <F8> :call Autopep8()<CR>

"go
let g:tagbar_type_go = {
    \ 'ctagstype' : 'go',
    \ 'kinds'     : [
        \ 'p:package',
        \ 'i:imports:1',
        \ 'c:constants',
        \ 'v:variables',
        \ 't:types',
        \ 'n:interfaces',
        \ 'w:fields',
        \ 'e:embedded',
        \ 'm:methods',
        \ 'r:constructor',
        \ 'f:functions'
    \ ],
    \ 'sro' : '.',
    \ 'kind2scope' : {
        \ 't' : 'ctype',
        \ 'n' : 'ntype'
    \ },
    \ 'scope2kind' : {
        \ 'ctype' : 't',
        \ 'ntype' : 'n'
    \ },
    \ 'ctagsbin'  : '$HOME/go/bin/gotags',
    \ 'ctagsargs' : '-sort -silent'
\ }

map <leader>l :GoDef<CR>
"UltiSnips setting
let g:UltiSnipsExpandTrigger="<Tab>"
let g:UltiSnipsJumpForwardTrigger="<c-j>"
let g:UltiSnipsJumpBackwardTrigger="<c-k>"

"vim-oscyank
vnoremap <leader>c :OSCYank<CR>

"ale
"let g:ale_python_pylint_options = '--load-plugins pylint_django'
