FROM debian:jessie

RUN echo "start docker rsynced........"

RUN apt-get update
RUN apt-get install -y rsync
RUN apt-get install -y inotify-tools
RUN apt-get clean

ADD rsync /etc/default/rsync
ADD rsyncd.conf /etc/rsyncd.conf
RUN chmod 600 /etc/rsyncd.conf
ADD rsyncd-server.secrets  /etc/rsyncd-server.secrets
RUN chmod 600 /etc/rsyncd-server.secrets
ADD rsyncd.secrets  /etc/rsyncd.secrets
RUN chmod 600 /etc/rsyncd.secrets

ENV TINI_VERSION v0.17.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /jenkins
ADD . /jenkins

ENV IP_LIST "-"
# Run your program under Tini
CMD ["./boot_cluster.sh"]
