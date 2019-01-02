## 大文件错误和警告处理 ##

git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch FOLDERNAME" -- --all

Note: FOLDERNAME换成问题路径名