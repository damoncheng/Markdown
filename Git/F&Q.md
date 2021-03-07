Q. 大文件错误和警告处理

A. git filter-branch -f --index-filter "git rm -rf --cached --ignore-unmatch FOLDERNAME" -- --all

    Note: FOLDERNAME换成问题路径名
    
Q. 整理本地commit信息,重新覆盖github远程分支commit

    git reset HEAD~1
    
    git add .
    git commit --author "damoncheng <cepicurean@gmail.com>" -a
    
    git push origin release-1.18 -f
