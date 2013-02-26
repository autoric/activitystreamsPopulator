Usage

```
$ git clone https://github.com/autoric/activitystreamsPopulator.git && cd activitystreamsPopulator
$ npm install -g .
$ populate <dataFile> <baseUrl> [interval]
```

 - *dataFile* valid json file containing an array of activity stream events. 
 - *baseUrl* url to post streams to
 - *interval* post interval in ms, defaults to 10,000 (10 s).

ex: 
```
$ populate ./data.json http://localhost:8080/rest/activitystreams/
```
