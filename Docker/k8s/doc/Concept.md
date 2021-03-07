# k8s概念知识汇总

The core of Kubernetes' **control plane** is the **API server**. The API server exposes an HTTP API that lets end users, different parts of your cluster, and external components communicate with one another.

The Kubernetes API lets you query and manipulate the state of API objects in Kubernetes (for example: Pods, Namespaces, ConfigMaps, and Events).

## OpenAPI specification

k8s的API基于[OpenAPI](https://www.openapis.org/)整理。

k8s使用[protobuf](https://github.com/kubernetes/community/blob/master/contributors/design-proposals/api-machinery/protobuf.md)提升各组件内部通信效率。

## Persistence

Kubernetes stores the serialized state of objects by writing them into [etcd](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/)

## API groups and versioning 

To make it easier to eliminate fields or restructure resource representations, Kubernetes supports multiple API versions, each at a different API path, such as **/api/v1** or **/apis/rbac.authorization.k8s.io/v1alpha1**.

**API groups** make it easier to extend the Kubernetes API. The API group is specified in a REST path and in the apiVersion field of a serialized object.

There are several API groups in Kubernetes:

- The core (also called legacy) group is found at REST path **/api/v1**. The core group is not specified as part of the **apiVersion** field, for example, **apiVersion: v1**.

- The named groups are at REST path **/apis/$GROUP_NAME/$VERSION** and use apiVersion: $GROUP_NAME/$VERSION (for example, apiVersion: batch/v1). You can find the full list of supported API groups in [Kubernetes API reference](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#-strong-api-groups-strong-)

