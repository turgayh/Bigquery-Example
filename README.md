# Bigquery-Example

## System Design 


![](/docs/images/design.png)

## API 
**Host: Adres** 

```bash
 [GET]   : /api/v1/user-stat/total-user
 [POST]  : /api/v1/event/save
 [POST]  : /api/v1/daily-stat/active-user
```

### Tech Stack

<br/>

#### Development
```bash
nodejs
docker
redis
jmeter
```

#### Deployment
```bash
DigitalOcean Redis
DigitalOcean NodeJS Cluster
DigitalOcean Redis Cluster
Google Cloud Bigquery
Google Cloud Pub/Sub
Google Cloud Dataflow
```

```shell
topic: codeway-topic
subscription: codeway-subscription
projects/supple-folder-297118/subscriptions/codeway-subscription
projects/supple-folder-297118/topics/codeway-topic
supple-folder-297118:codeway_bigquery.event
```
