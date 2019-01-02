#--添加子模块--#

git submodule add https://github.com/chaconinc/DbConnector [目标目录]

#--查看子模块差异化--#

git diff --submodule

git diff --cached --submodule

#-- clone子模块的项目后，默认不加载子模块，需要init and update 或者 clone时候加上--recursive参数 --#

- method 1: 

git submodule init

git submodule update

- method 2:

git clone --recursive https://github.com/chaconinc/MainProject

#-- 拉取合并子模块 --#

- method 1:

进入子模块目录, git fetch , then git merge origin/master

- method 2:

在主项目下可直接执行 : git submodule update --remote

