# day1

**Index**

- [day1](#day1)
  - [Quickstart](#quickstart)
    - [Running Front React app](#running-front-react-app)
  - [More](#more)
  - [Reference](#reference)

## Quickstart

```bash
# volume (only once)
docker volume create --name=db-data

# db + mig-db-schema + mig-db-dataset
docker-compose up -d
docker-compose ps
```

### Running Front React app

```
cd frontend-src
npm i
npm start
```

## More

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

## Reference

- <https://www.baeldung.com/spring-boot-react-crud>
