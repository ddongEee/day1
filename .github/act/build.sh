#!/bin/bash
export ACTIONS_RUNNER_DIND_IMG_VERS="${ACTIONS_RUNNER_DIND_IMG_VERS:-v2.294.0-ubuntu-20.04}"
export LOCAL_ACT_IMAGE_NAME="${LOCAL_ACT_IMAGE_NAME:-act-dind}"

get_host() {
  local domain=$1
  echo "${domain}:$(host ${domain} | grep has | head -n 1 | awk -F' has address ' '{print $2}')"
}

echo "----[BUILD]----"
docker build --no-cache \
  --add-host $(get_host "deb.nodesource.com") \
  --add-host $(get_host "security.ubuntu.com") \
  --add-host $(get_host "archive.ubuntu.com") \
  --add-host $(get_host "ppa.launchpad.net") \
  --add-host $(get_host "github.com") \
  --add-host $(get_host "objects.githubusercontent.com") \
  --add-host $(get_host "awscli.amazonaws.com") \
  --add-host $(get_host "apt.corretto.aws") \
  -f Dockerfile.act.build \
  --build-arg REGISTRY_URL="ghcr.io/actions-runner-controller" \
  --build-arg ACTIONS_RUNNER_DIND_IMG_NAME="actions-runner-controller/actions-runner-dind" \
  --build-arg ACTIONS_RUNNER_DIND_IMG_VERS=${ACTIONS_RUNNER_DIND_IMG_VERS} \
  --build-arg NODE_VERS="16" \
  --build-arg COMPOSE_VERS="v2.9.0"\
  -t "${LOCAL_ACT_IMAGE_NAME}:${ACTIONS_RUNNER_DIND_IMG_VERS}" .
echo ""

echo "----[RESULT]----"
docker image ls ${LOCAL_ACT_IMAGE_NAME}
echo ""

if [ ${CLEAN_DANGLING_IMAGES} ]; then
  docker images -f "dangling=true" -q 2&> /dev/null
  [ $? ] && \
    echo "---[CLEAN-UP]---" && \
    docker rmi $(docker images -f "dangling=true" -q) && \
    echo "" && \
    exit 0

  echo "(dangling images no exist"
  echo ""
fi
