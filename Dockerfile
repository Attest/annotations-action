FROM node:lts-alpine
MAINTAINER Blake Newman "code@blakenewman.dev"

RUN mkdir -p /var/action/

WORKDIR /var/action

RUN yarn init -y 
RUN yarn add @actions/core@^1.2.2 @actions/github@^1.1.0 @octokit/core@^2.4.0 @octokit/rest@^16.43.1

COPY entrypoint.sh /var/action/
COPY dist/index.js /var/action/

ENTRYPOINT ["/var/action/entrypoint.sh"]