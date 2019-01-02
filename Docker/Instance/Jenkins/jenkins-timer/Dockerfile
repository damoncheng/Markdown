FROM jenkinsci/blueocean:latest

WORKDIR /jenkins

ADD . /jenkins

ENTRYPOINT ["/sbin/tini", "--", "/jenkins/jenkins.sh"]

