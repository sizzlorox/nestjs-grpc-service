#!make

SHELL := /bin/sh
GITROOT := $(shell git rev-parse --show-toplevel)

include $(GITROOT)/.env
export

infra/start:
	docker-compose --env-file=$(GITROOT)/.env -f $(GITROOT)/deployment/docker-compose.yml up -d

infra/stop:
	docker-compose -f $(GITROOT)/deployment/docker-compose.yml down

submodule/update:
	git submodule update --init --recursive

