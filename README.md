# day1

**Index**

- [day1](#day1)
  - [Overview](#overview)
    - [Architecture](#architecture)
  - [Quickstart](#quickstart)
    - [Support systems](#support-systems)
    - [Running Front React app](#running-front-react-app)
  - [Reference](#reference)

## Overview

### Architecture

- [Overview](README.TECH.md#overview)

- [Independent Application **Functional Testing Stack**](README.TECH.md#independent-application-functional-testing-stack)

- [Independent Application **Development Stack**](README.TECH.md#independent-application-development-stack)

## Quickstart

```bash
# volume (only once)
docker volume create --name=db-data

# Prepare Database
docker-compose up -d db
docker-compose run mig-db-schema
docker-compose run mig-db-dataset
```

- check [`docker-compose.yml`](./docker-compose.yml)

```bash
# Build all
./gradlew clean build

# Start SpringBoot
./gradlew bootrun:day1 # :8081
./gradlew bootrun:day2 # :8082
```

- Local swagger url : <http://localhost:8081/swagger-ui/index.html>

- Recommended VM options

  ```bash
  -Xms4g
  -Xmx4g
  -XX:MetaspaceSize=768m
  -XX:MaxMetaspaceSize=2g
  -XX:MaxGCPauseMillis=200
  -XX:ParallelGCThreads=4
  -XX:ConcGCThreads=1
  -XX:NewRatio=3
  -Xss16m
  -XX:+AlwaysPreTouch
  -XX:+TieredCompilation
  -Djava.net.preferIPv4Stack=true
  -Djsse.enableSNIExtension=false
  ```

### Support systems

- local system moniroting:

  ```bash
  # Prepare Supports
  docker-compose up -d prometheus grafana
  ```

- [`build-src/system-behavior`](./build-src/system-behavior#readme): BDD-suite to test API scenario.

- [`build-src/system-stub`](./build-src/system-stub#readme): Stub-suite to server mocked API.

### Running Front React app

```bash
cd frontend-src
npm ci
npm start
```

## Reference

- <https://www.baeldung.com/spring-boot-react-crud>
