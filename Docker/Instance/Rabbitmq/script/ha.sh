#!/bin/bash

echo "start rabbitmq ha......."

docker exec rabbit rabbitmqctl delete_user guest
docker exec rabbit rabbitmqctl add_vhost /

# Admin user
docker exec rabbit rabbitmqctl add_user admin password
docker exec rabbit rabbitmqctl set_user_tags admin administrator

# Application user
docker exec rabbit rabbitmqctl add_user guest password
docker exec rabbit rabbitmqctl set_permissions -p / guest "" "" ".*"


docker exec rabbit rabbitmqctl stop_app
docker exec rabbit rabbitmqctl join_cluster rabbit@FQDN
docker exec rabbit rabbitmqctl start_app

docker exec rabbit rabbitmqctl set_policy ha "." '{"ha-mode":"all"}'

echo "end rabbitmq ha......."
