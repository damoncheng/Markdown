#!/bin/bash

curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.17.0/bin/darwin/amd64/kubectl

chmod +x ./kubectl

sudo mv ./kubectl /usr/local/bin/kubectl

kubectl version --client

