# Bigquery-Example

## System Design 


![](/docs/images/design.png)

## API 
**Host: http://144.126.248.117** 

```bash
 [POST]  : /api/v1/event/save
 [GET]   : /api/v1/crm/user-stat/total-user
 [POST]  : /api/v1/crm/daily-stat/active-user
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
### API Guide 

#### /api/v1/event/save
<br/>
Event log send to pub/sub query.

| request                                                      | response                         |
| ------------------------------------------------------------ | -------------------------------- |
| - user_id: **String** , require: **true**,unique:**true**  <br/> - session_id: **String** , require: **true** <br/> - app_id: **String** , require: **true** <br/>  - type: **String** , require: **true** <br/>  - event_name: **String** , require: **true** <br/>  - event_time: **Number** , require: **true** <br/> - page: **String** , require: **true** <br/>   - country: **String** , require: **true** <br/>  - region: **String** , require: **true** <br/>  - city: **String** , require: **true** <br/> | message_id: **String**  |


#### /api/v1/crm/user-stat/total-user

<br/>
<br/>

To get total user. It will update every 10 minute. (Redis cache data update every 10 minuete!)

| request                                                      | response                         |
| ------------------------------------------------------------ | -------------------------------- |
| | total_user: **Number** |


#### /api/v1/crm/daily-stat/active-user

<br/>
<br/>

To get distinct user in specific day. 

| request                                                      | response                         |
| ------------------------------------------------------------ | -------------------------------- |
|- date: **Date** , require: **true**  <br/> | distinct_user: **Number** |



```shell
topic: codeway-topic
subscription: codeway-subscription
projects/supple-folder-297118/subscriptions/codeway-subscription
projects/supple-folder-297118/topics/codeway-topic
supple-folder-297118:codeway_bigquery.event
```
