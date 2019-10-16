"#------Basic config--------#                                                                                                            

" Indentation & Tabs

set autoindent

set smartindent

set tabstop=4

set shiftwidth=4

set expandtab

set smarttab

" Display & format

set number

set textwidth=80

set wrapmargin=2

set showmatch


highlight Normal  ctermfg=grey ctermbg=black


" Search

set hlsearch

set incsearch

set ignorecase

set smartcase

" Browse & Scroll

set scrolloff=5

set laststatus=2

" Spell

"set spell spelllang=en_us

" Miscellaneous

set nobackup

set noswapfile

set autochdir

set undofile

set visualbell

set errorbells


"粘贴复制的一些操作
vmap "+y "选中状态下 Ctrl+c 复制
nmap "+yy "选中状态下 Ctrl+c 复制
nmap "+p "正常模式下粘贴
nmap ggvG "正常模式下全选
vmap <C-x> dd<Esc> "正常模式下DEL


"Vundle
set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
Plugin 'Tagbar'
Plugin 'ctags.vim'
Plugin 'ctrlp.vim'
Plugin 'EasyGrep'
Plugin 'ack.vim'
Plugin 'ctrlsf.vim'
Plugin 'delimitMate.vim'
Plugin 'Shougo/neocomplete.vim'
Plugin 'dhruvasagar/vim-table-mode'
Plugin 'honza/vim-snippets'
Plugin 'Align'
Plugin 'YankRing.vim'
Plugin 'goyo.vim'
Plugin 'junegunn/limelight.vim'
Plugin 'vim-colors-pencil'
Plugin 'Conque-Shell'

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


" NERDTree
map <c-n> :NERDTreeToggle<CR>

nnoremap <silent> <F6> :TagbarToggle<CR>

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

map <F2> a<C-R>=strftime("%c")<CR><Esc>
