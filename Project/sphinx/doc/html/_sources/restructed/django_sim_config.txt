===================================
配置
===================================

django_sim在 ``settings.py`` 基础配置
======================================================

    在django工程 ``settings.py`` 里面进行如下配置

    必要配置::

        #django_sim application定义
        INSTALLED_APPS = [

            django.contrib.admin,
            django.contrib.auth,
            django.contrib.contenttypes,
            django.contrib.sessions,
            django.contrib.messages,
            django.contrib.staticfiles,

            'oauth2_provider',
            'rest_framework',
            'background_task',
            'django_sim',

            ...
        
        ]

        #django_sim替换django认证User
        AUTH_USER_MODEL=`django_sim.User`


        #使用django自身认证backend，认证django admin登录页面
        AUTHENTICATION_BACKENDS = [
            ...
            'django.contrib.auth.backends.ModelBackend',
        ]

    可选配置::

        SIM_PUSH_BULK_SIZE = 1024

            django_sim sender每次推送BULK大小，默认BULK大小1024条资源

        SIM_SAVE_PUSH_BULK_DAYS = 1

            django_sim receiver保存推送BULK记录天数，默认1天

        SIM_PUSH_DELAY_SECONDS = 5

            django_sim sender收到推送请求后，延迟推送秒数，默认5秒

        SIM_PUSH_RETRY_TIMES = 1

            django_sim sender推送失败后，重试次数，默认1次

        SIM_REFRESH_ACCESS_TOKEN_TIME = 1 * 60 * 60

            django_sim sender在receiver access token过期前多少时间自动刷新access token，默认1个小时

        SIM_REFRESH_API_TOKEN_TIME = 10 * 60

            client在api token过期前多少时间调用api token接口时刷新api token，默认10分钟

        SIM_SAVE_BACKGROUND_TIME = 7

            django_sim sender保存推送记录天数，默认7天

        SIM_INIT_SEQ_CLEAR_DATA = False

            django_sim receiver在接受全量推送第一次BULK推送时，是否清空django_sim相关所有数据，
            默认False

        SIM_PUSH_IGNORE_IS_VALID = False

            django_sim receiver在接受sender推送的删除记录(is_valid=False)时，是否忽略该标志位,
            默认设置为False，表示不忽略，表示receiver接受is_valid=False的记录时, 本地将删除该
            记录。当receiver也充当sender角色延续传递资源的时候，应该将其设置为True，reciever将
            保存is_valid=False的记录。



使用django_sim的tof认证
======================================================

    在django工程 ``setting.py`` 里面补充配置::

        AUTHENTICATION_BACKENDS = {
            'django_sim.authentication.backend.TofTicketBackend',
            'django.contrib.auth.backends.ModelBackend',
            ...
        } 

        REST_FRAMEWORK = {
        
            'DEFAULT_PERMISSION_CLASSES' : (
                'rest_framework.permissions.IsAuthenticated',
            ),

            'DEFAULT_AUTHENTICATION_CLASSES' : (
                'django_sim.authentication.backend.SIMAuthentication',
            )
            ...
        }

        LOGIN_URL = "http://xxxxxx/modules/passport/signin.ashx?title=%s&url=%s" 
            % ("title", "http://{hostname}/django_sim/sim_login/")
        LOGOUT_URL = "http://xxxxxx/modules/passport/signout.ashx?title=%s&url=%s"
            %s ("title", "http://{hostname}/django_sim/sim_login/")
        

创建django_sim超级管理员用户
======================================================

    django_sim第四章 :ref:`django_sim_auth` ，最好通过创建超级管理员用户 ``django_sim``
    来进行管理, django_sim不会对该用户名的User资源进行管理，这样可以避免
    用户删除造成配置被连带删除的风险，所以在做其他功能配置前，先创建超级管理员
    ``django_sim`` ::

        python3 createsuperuser django_sim

    按提示配置 ``django_sim`` 超级管理员。 然后访问django admin页面::

        http://{hostname}/admin/

    通过超级管理员账户 ``django_sim`` 进行登录。


