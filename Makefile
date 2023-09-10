DOCKER_USERNAME="xyhhx"
IMAGE="noodleapp"
TAG="latest"
GIT_HASH ?= $(shell git log --format="%h" -n 1)

.PHONY: build push release

build:
	docker build -t "${DOCKER_USERNAME}/${IMAGE}:${GIT_HASH}" .

push:
	docker push "${DOCKER_USERNAME}/${IMAGE}:${GIT_HASH}"

release:
	docker pull "${DOCKER_USERNAME}/${IMAGE}:${GIT_HASH}"
	docker tag "${DOCKER_USERNAME}/${IMAGE}:${GIT_HASH}" "${DOCKER_USERNAME}/${IMAGE}:${TAG}"
	docker push "${DOCKER_USERNAME}/${IMAGE}:${TAG}"
