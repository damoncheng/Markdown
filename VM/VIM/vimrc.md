## normal settings ##
set encoding=utf-8
set termencoding=utf-8

source $VIMRUNTIME/delmenu.vim
source $VIMRUNTIME/menu.vim
language messages zh_CN.utf-8

set fileencoding=utf-8
set fileencodings=ucs-bom,utf-8,chinese,cp936

source $VIMRUNTIME/vimrc_example.vim
source $VIMRUNTIME/mswin.vim
behave mswin


## set tab to four spaces ##
set tabstop=4
set shiftwidth=4
set expandtab

## set F5 open NERDtree ##
nnoremap <silent> <F5> :NERDTree<CR>
