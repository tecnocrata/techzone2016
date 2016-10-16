FROM node:6.6.0
MAINTAINER Enrique <enrique@ortuno.net>

ADD package.json /tmp/package.json
RUN cd /tmp && npm install && mkdir -p /usr/src/apx && cp -a /tmp/node_modules /usr/src/apx
COPY . usr/src/apx
#&& chmod +x /usr/src/apx/wait-for-it.sh
RUN chmod +x /usr/src/apx/wait-for-it.sh
WORKDIR usr/src/apx
 

EXPOSE 3000
CMD ["npm","start"]