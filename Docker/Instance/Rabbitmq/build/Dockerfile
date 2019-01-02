FROM rabbitmq:management

COPY enabled_plugins /etc/rabbitmq/enabled_plugins
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone
