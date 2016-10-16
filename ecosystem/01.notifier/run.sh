#!/bin/sh

image_name=tecnocrata/01-notifier
#. ./rabbitmq-webstomp.properties

#DEFAULT_USER=${1-${default_user}}
#DEFAULT_PASS=${2-${default_pass}}
#WEBSTOMP_PASS=${3-${webstomp_pass}}

#HOST_SSL=${4-${default_ssl_dir}}
#HOST_LOG=${5-${default_log_dir}}

#echo Using SLL config from ${HOST_SSL}
#echo Putting log output into ${HOST_LOG} 
#echo Using broker credentials $DEFAULT_USER:$DEFAULT_PASS
#echo Using webstomp pass $WEBSTOMP_PASS

#sed -e s/===DEFAULT_USER===/$DEFAULT_USER/g -e s/===DEFAULT_PASS===/$DEFAULT_PASS/g -e s/===WEBSTOMP_PASS===/$WEBSTOMP_PASS/g rabbitmq.config.template > rabbitmq.config

#docker pull ${image_name}

RUN_COMMAND="docker run -d -p 8081:8081 -e RABBITMQ_USER=abx-admin -e RABBITMQ_PASSWORD=abx01 ${image_name}"
#RUN_COMMAND="docker run -d --hostname abx-rabbit-host --name abx-rabbit -e RABBITMQ_ERLANG_COOKIE='abx-01' -e RABBITMQ_DEFAULT_USER=abx-admin -e RABBITMQ_DEFAULT_PASS=abx01 -p 15672:15672 -p 5672:5672 -p 15674:15674 activems/rabbitmq-webstomp:latest"

echo Running container as daemon: ${RUN_COMMAND}

${RUN_COMMAND}
