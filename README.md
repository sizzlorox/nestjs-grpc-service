# NestJS Test GRPC Microservices

API Gateway will run on port 3000

Visit `http://localhost:3000/v1/hello` to test

What it does:
HTTP Request -> API Gateway (HTTP API & GRPC Client) -> GRPC RPC -> Hello Service (GRPC SERVER) -> GRPC RPC -> API Gateway (HTTP API & GRPC Client) -> Client (Browser)

Protobuf files are a git submodule in the protos directory.

## TODOS

1. Make postgres volume to have user permissions instead of root https://hub.docker.com/_/postgres
2. Fix Schema not being created upon creation of docker container
3. Handle errors thrown so gateway receives a readable message
