## step 1 : 首先查看系统对中文的支持

输入：

  locale -a | grep zh_CN
  
输出样例如下：

  zh_CN.gbk
  zh_CN.utf8
  
## step 2 : /etc/profile添加

  export LANG="zh_CN.UTF-8"

  export LC_ALL="zh_CN.UTF-8"
