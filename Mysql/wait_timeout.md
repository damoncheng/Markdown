## wait_timeout总结

    总结：

    1.控制连接最大空闲时长的是wait_timeout参数。



    2.对于交互式连接，类似于mysql客户端连接，wait_timeout的值继承自服务器端全局变量interactive_timeout。  

     对于非交互式连接，类似于jdbc连接，wait_timeout的值继承自服务器端全局变量wait_timeout（未演示）。



    3.判断一个连接的空闲时间，可通过show processlist输出中Sleep状态的时间

    如：会话19为本地show processlist的id号，id18为另外一个空闲会话,可以看出这个会话已经空闲了61s

    mysql>show processlist;

    +----+------+-----------+------+---------+------+----------+------------------+

    | Id | User | Host      | db   | Command | Time | State    | Info             |

    +----+------+-----------+------+---------+------+----------+------------------+

    | 18 | root | localhost | NULL | Sleep   |   61 |          | NULL             |

    | 19 | root | localhost | NULL | Query   |    0 | starting | show processlist |

    +----+------+-----------+------+---------+------+----------+------------------+



    4.根据生产库经验，把这个两个参数的设置相同，都为5分钟：

    interactive_timeout = 300

    wait_timeout = 300
