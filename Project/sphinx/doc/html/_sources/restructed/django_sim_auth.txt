.. _django_sim_auth:

=======================================
认证
=======================================

    django_sim根据使用功能的不同可以搭建两种认证，资源推送认证和资源访问认证::

        资源推送认证：sender和receiver之间搭建oauth code认证，认证后，sender自动推送资源到receiver

        资源访问认证：sender或receiver可以搭建oauth client认证，client可以使用认证信息访问
        django_sim的API, 获取资源信息



资源推送认证搭建
=======================================

    django_sim receiver向django_sim sender注册后，需要自助完成sender到receiver的oauth认证，
    然后sender才会自动同步资源到recevier. 具体步骤如下：


django_sim sender搭建
---------------------------------------

  启动django_sim background task监听资源推送请求::

        python3 manage.py process_tasks
    
  定时发送资源推送请求到background task

    定时运行 ``python3 manage.py push_sim`` ,  发送资源推送请求到django_sim background task, 自动推送资源到被认证的django_sim receiver::

        在crontab里面配置每分钟触发一次推送请求:

            * * * * *   python3 manage.py push_sim


django_sim receiver搭建
---------------------------------------

  超级用户django_sim登录

    访问 ``http://{receiver_hostname}/admin/`` , 通过 ``django_sim`` 账户登录

  搭建oauth code认证app

    访问 ``http://{receiver_hostname}/o/apllications/`` , 选择 ``New Application``
    添加认证app, 按如下参数添加app::

        Client Type : confidential

        Authorization Grant Type : authorization-code

        Redirect Urls : http://{sender_hostname}/django_sim/auth/exchange?
        sim_site=http://{receiver_hostname}

    添加完成后，可获取认证信息 ``client_id`` 和 ``client_secrets``

  提交认证信息给django_sim sender注册

    将认证app的 ``client_id`` 和 ``client_secrets`` ，以及recevier的sim_site::
    
        格式：http://{reicever_hostname}/)

    提交给sender注册，sender将注册一条认证记录到SimAuth


  激活sender进行自助同步

    在sender成功注册后，访问:: 

        http://{sender_hostname}/django_sim/auth/init?sim_site=http://{receiver_hostname}

    进行手动认证，激活sender访问receiver的access_token，激活成功后，页面返回 ``oauthed`` ，sender将能自动增量同步资源到receiver

.. _django_sim_auth_resource_access:

资源访问认证搭建
=======================================

超级用户django_sim登录
---------------------------------------

    访问 ``http://{hostname}/admin/`` , 通过 ``django_sim`` 账户登录

搭建oauth client认证app
---------------------------------------

    访问 ``http://{hostname}/o/apllications/`` , 选择 ``New Application``
    添加认证app, 按如下参数添加app::

        Client Type : confidential

        Authorization Grant Type : client-credentials

    添加完成后，将生成认证信息 ``client_id`` 和 ``client_secrets``


client获取access_token
---------------------------------------

    client通过Basic认证获取访问django_sim api的access_token::

        获取access_token url:
            
            http://{hostname}/django_sim/api/token

        获取access_token 认证header:

            "Basic %s" % base64(client_id:client_secrets)


    成功后返回::

        {"access_token":"xxxxxx", "expires" : "2018-07-11 17:32:00"}


client通过access_token访问django_sim api
-----------------------------------------

    client通过Bearer认证访问django_sim api::

        访问用户信息url:

            http://{hostname}/django_sim/users/{username}/

        获取用户信息认证头:

            "Bearer Access-Token"

