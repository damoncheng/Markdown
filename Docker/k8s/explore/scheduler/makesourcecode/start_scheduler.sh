echo "$1"

$1/kube-scheduler \
    --authentication-kubeconfig=conf/scheduler.conf \
    --authorization-kubeconfig=conf/scheduler.conf \
    --kubeconfig=conf/scheduler.conf \
    --leader-elect-resource-name=kube-developer-scheduler \
    --scheduler-name=kube-developer-scheduler \
    --leader-elect=true \
    --v=2
