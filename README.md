## static docker v2 registry generator

## Requirements

Tested on CentOS 7 with following software:

* ansible=2.9.2
* [skopeo](https://github.com/containers/skopeo)=0.1.37
* nginx=1.16.1
* nginx-module-njs=1.16.1

## Configuration
1. Copy `nginx/script.njs` & `nginx/server.conf` into `/etc/nginx/`.
2. Load NJS module in `nginx.conf`: `load_module modules/ngx_http_js_module.so;`.
3. Include `server.conf` in `nginx.conf` file: `include server.conf;`.
4. Test nginx configuration `nginx -t` and reload `nginx -s reload`.

For SSL termination I have used CloudFlare.

## Generate artifacts with ansible playbook
To add a new container/tag or to update an existing container just edit the _inventory.yaml_ file.

```sh
# ansible-playbook -i inventory.yaml generate.yaml

PLAY [localhost] **********************************************************************

TASK [Check if tags is not float] *****************************************************
Sunday 02 February 2020  14:57:10 +0000 (0:00:00.034)       0:00:00.034 *******
ok: [localhost] => {
    "changed": false,
    "msg": "All assertions passed"
}

TASK [Create a directory for export] **************************************************
Sunday 02 February 2020  14:57:10 +0000 (0:00:00.062)       0:00:00.096 *******
changed: [localhost] => (item=/home/artifacts/docker_images/nginx)
changed: [localhost] => (item=/home/artifacts/docker_images/prom/prometheus)
changed: [localhost] => (item=/home/artifacts/docker_images/prom/node-exporter)
changed: [localhost] => (item=/home/artifacts/docker_images/prom/alertmanager)
changed: [localhost] => (item=/home/artifacts/docker_images/k8s_gcr_io/pause)
changed: [localhost] => (item=/home/artifacts/docker_images/coredns/coredns)
changed: [localhost] => (item=/home/artifacts/docker_images/quay_io/coreos/flannel)

TASK [Create directory for registry structure] ****************************************
Sunday 02 February 2020  14:57:12 +0000 (0:00:01.570)       0:00:01.666 *******
changed: [localhost] => (item=/home/artifacts/v2/blobs)
changed: [localhost] => (item=/home/artifacts/v2/manifests)
changed: [localhost] => (item=/home/artifacts/v2/tags)

TASK [Archive image of interest into local directory] *********************************
Sunday 02 February 2020  14:57:12 +0000 (0:00:00.559)       0:00:02.226 *******
changed: [localhost] => (item=nginx:1.16.1-alpine)
changed: [localhost] => (item=nginx:alpine)
changed: [localhost] => (item=prom/prometheus:v2.15.2)
changed: [localhost] => (item=prom/node-exporter:v0.18.1)
changed: [localhost] => (item=prom/alertmanager:v0.20.0)
changed: [localhost] => (item=k8s.gcr.io/pause:3.1)
changed: [localhost] => (item=k8s.gcr.io/pause:3.0)
changed: [localhost] => (item=coredns/coredns:1.6.6)
changed: [localhost] => (item=quay.io/coreos/flannel:v0.11.0)

TASK [Hardlink image blobs] ***********************************************************
Sunday 02 February 2020  14:57:36 +0000 (0:00:23.506)       0:00:25.733 *******
ok: [localhost] => (item=nginx:1.16.1-alpine)
ok: [localhost] => (item=nginx:alpine)
ok: [localhost] => (item=prom/prometheus:v2.15.2)
ok: [localhost] => (item=prom/node-exporter:v0.18.1)
ok: [localhost] => (item=prom/alertmanager:v0.20.0)
ok: [localhost] => (item=k8s.gcr.io/pause:3.1)
ok: [localhost] => (item=k8s.gcr.io/pause:3.0)
ok: [localhost] => (item=coredns/coredns:1.6.6)
ok: [localhost] => (item=quay.io/coreos/flannel:v0.11.0)

TASK [Get manifest digest] ************************************************************
Sunday 02 February 2020  14:57:38 +0000 (0:00:01.634)       0:00:27.367 *******
ok: [localhost] => (item=nginx:1.16.1-alpine)
ok: [localhost] => (item=nginx:alpine)
ok: [localhost] => (item=prom/prometheus:v2.15.2)
ok: [localhost] => (item=prom/node-exporter:v0.18.1)
ok: [localhost] => (item=prom/alertmanager:v0.20.0)
ok: [localhost] => (item=k8s.gcr.io/pause:3.1)
ok: [localhost] => (item=k8s.gcr.io/pause:3.0)
ok: [localhost] => (item=coredns/coredns:1.6.6)
ok: [localhost] => (item=quay.io/coreos/flannel:v0.11.0)

TASK [Generate docker images hash map] ************************************************
Sunday 02 February 2020  14:57:39 +0000 (0:00:01.668)       0:00:29.036 *******
ok: [localhost] => (item=nginx:1.16.1-alpine)
ok: [localhost] => (item=nginx:alpine)
ok: [localhost] => (item=prom/prometheus:v2.15.2)
ok: [localhost] => (item=prom/node-exporter:v0.18.1)
ok: [localhost] => (item=prom/alertmanager:v0.20.0)
ok: [localhost] => (item=k8s.gcr.io/pause:3.1)
ok: [localhost] => (item=k8s.gcr.io/pause:3.0)
ok: [localhost] => (item=coredns/coredns:1.6.6)
ok: [localhost] => (item=quay.io/coreos/flannel:v0.11.0)

TASK [Hardlink manifest files] ********************************************************
Sunday 02 February 2020  14:57:39 +0000 (0:00:00.232)       0:00:29.268 *******
changed: [localhost] => (item=nginx:1.16.1-alpine)
changed: [localhost] => (item=nginx:alpine)
changed: [localhost] => (item=prom/prometheus:v2.15.2)
changed: [localhost] => (item=prom/node-exporter:v0.18.1)
changed: [localhost] => (item=prom/alertmanager:v0.20.0)
changed: [localhost] => (item=k8s.gcr.io/pause:3.1)
changed: [localhost] => (item=k8s.gcr.io/pause:3.0)
changed: [localhost] => (item=coredns/coredns:1.6.6)
changed: [localhost] => (item=quay.io/coreos/flannel:v0.11.0)

TASK [Generate tags] ******************************************************************
Sunday 02 February 2020  14:57:41 +0000 (0:00:01.641)       0:00:30.910 *******
changed: [localhost] => (item=nginx)
changed: [localhost] => (item=prom/prometheus)
changed: [localhost] => (item=prom/node-exporter)
changed: [localhost] => (item=prom/alertmanager)
changed: [localhost] => (item=k8s.gcr.io/pause)
changed: [localhost] => (item=coredns/coredns)
changed: [localhost] => (item=quay.io/coreos/flannel)

TASK [Create db file] *****************************************************************
Sunday 02 February 2020  14:57:43 +0000 (0:00:02.410)       0:00:33.320 *******
changed: [localhost]

PLAY RECAP ****************************************************************************
localhost                  : ok=10   changed=6    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0

Sunday 02 February 2020  14:57:44 +0000 (0:00:00.318)       0:00:33.639 *******
===============================================================================
Archive image of interest into local directory -------------------------------- 23.51s
Generate tags ------------------------------------------------------------------ 2.41s
Get manifest digest ------------------------------------------------------------ 1.67s
Hardlink manifest files -------------------------------------------------------- 1.64s
Hardlink image blobs ----------------------------------------------------------- 1.63s
Create a directory for export -------------------------------------------------- 1.57s
Create directory for registry structure ---------------------------------------- 0.56s
Create db file ----------------------------------------------------------------- 0.32s
Generate docker images hash map ------------------------------------------------ 0.23s
Check if tags is not float ----------------------------------------------------- 0.06s
```

## Testing

Now we can pull image from our repo:
```sh
$ docker pull my.domain.net/k8s.gcr.io/pause:3.1
3.1: Pulling from k8s.gcr.io/pause
67ddbfb20a22: Pull complete
Digest: sha256:59eec8837a4d942cc19a52b8c09ea75121acc38114a2c68b98983ce9356b8610
Status: Downloaded newer image for my.domain.net/k8s.gcr.io/pause:3.1
my.domain.net/k8s.gcr.io/pause:3.1

$ docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
my.domain.net/k8s.gcr.io/pause   3.1                 da86e6ba6ca1        2 years ago         742kB
```

From Nginx side we can see next logs:
```
[02/Feb/2020:15:02:11 +0000] "GET /v2/ HTTP/1.1" 200 2 "-" "docker/19.03.5"
[02/Feb/2020:15:02:11 +0000] "GET /v2/k8s.gcr.io/pause/manifests/3.1 HTTP/1.1" 200 527 "-" "docker/19.03.5"
[02/Feb/2020:15:02:12 +0000] "GET /v2/k8s.gcr.io/pause/blobs/sha256:da86e6ba6ca197bf6bc5e9d900febd906b133eaa4750e6bed647b0fbe50ed43e HTTP/1.1" 200 1609 "-" "docker/19.03.5"
[02/Feb/2020:15:02:12 +0000] "GET /v2/k8s.gcr.io/pause/blobs/sha256:67ddbfb20a22d7c0ea0df568069e7ffc42378467402d04f28ecfa244e78c5eb8 HTTP/1.1" 200 313363 "-" "docker/19.03.5"
```

Let's try pull original image:
```sh
$ docker pull k8s.gcr.io/pause:3.1
3.1: Pulling from pause
Digest: sha256:f78411e19d84a252e53bff71a4407a5686c46983a2c2eeed83929b888179acea
Status: Downloaded newer image for k8s.gcr.io/pause:3.1
k8s.gcr.io/pause:3.1

$ docker images
REPOSITORY                      TAG                 IMAGE ID            CREATED             SIZE
k8s.gcr.io/pause                3.1                 da86e6ba6ca1        2 years ago         742kB
my.domain.net/k8s.gcr.io/pause   3.1                 da86e6ba6ca1        2 years ago         742kB
```
As you can see, it not pull any blobs, and `IMAGE ID` the same. Let's try to inspect repos with `skopeo` tool:

```sh
$ skopeo inspect docker://my.domain.net/k8s.gcr.io/pause:3.1
{
    "Name": "my.domain.net/k8s.gcr.io/pause",
    "Digest": "sha256:59eec8837a4d942cc19a52b8c09ea75121acc38114a2c68b98983ce9356b8610",
    "RepoTags": [
        "3.1",
        "3.0"
    ],
    "Created": "2017-12-20T21:30:49.042210931Z",
    "DockerVersion": "1.12.6",
    "Labels": {},
    "Architecture": "amd64",
    "Os": "linux",
    "Layers": [
        "sha256:67ddbfb20a22d7c0ea0df568069e7ffc42378467402d04f28ecfa244e78c5eb8"
    ]
}
$ skopeo inspect docker://k8s.gcr.io/pause:3.1
{
    "Name": "k8s.gcr.io/pause",
    "Digest": "sha256:f78411e19d84a252e53bff71a4407a5686c46983a2c2eeed83929b888179acea",
    "RepoTags": [
        "0.8.0",
        "1.0",
        "2.0",
        "3.0",
        "3.1",
        "go",
        "latest",
        "test",
        "test2"
    ],
    "Created": "2017-12-20T21:30:49.042210931Z",
    "DockerVersion": "1.12.6",
    "Labels": {},
    "Architecture": "amd64",
    "Os": "linux",
    "Layers": [
        "sha256:67ddbfb20a22d7c0ea0df568069e7ffc42378467402d04f28ecfa244e78c5eb8"
    ]
}
```
