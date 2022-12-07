## Done
- prometheus & grafana
- spring actuator

---

### Local dev DB(postgresql) 환경 구축
#### why
- 서로다른 local pc 및 환경과 무관하게 동일한 test db 환경 필요
- 쉽고 빠른 test db 구축 provisioning 프로세스 필요 
#### how
- docker-compose + flyway 를 통한 빠른 test db 환경 셋팅
- dockerfile 과 docker-compose 를 통해 구성정보 구축
- flyway 를 통해 ddl,dml 관리 및 
#### what
- 3개의 docker container 생성
  - db : 실제 테스트 용도로 사용
  - mig-db-schema  : ddl 을 위한 spot container
  - mig-db-dataset : dml 을 위한 spot container