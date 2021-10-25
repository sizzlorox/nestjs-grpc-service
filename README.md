# NestJS Test GRPC Microservices

API Gateway will run on port 3000

Visit `http://localhost:3000/v1/hello` to test

What it does:
HTTP Request -> API Gateway (HTTP API & GRPC Client) -> GRPC RPC -> Hello Service (GRPC SERVER) -> GRPC RPC -> API Gateway (HTTP API & GRPC Client) -> Client (Browser)

Protobuf files are a git submodule in the protos directory.
