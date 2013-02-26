#!/usr/bin/env node

var program = require('commander'),
  path = require('path'),
  request = require('request'),
  async = require('async');

function exit(msg) {
  console.error(msg);
  process.exit();
}

process.on('uncaughtException', exit);

program
  .version('0.0.1')
  .usage('<file> <baseUrl> [interval]')
  .parse(process.argv);

var dataFile = program.args[0];
var baseUrl = program.args[1];
var interval = program.args[2];

if (!dataFile) {
  exit('input data file is required');
}
if (!baseUrl) {
  exit('base url is required');
}
if(baseUrl.slice(-1) != '/') {
  baseUrl += '/';
}

if (!interval) {
  interval = 10 * 1000
  console.log('No was interval specified. Defaulting to %s ms.', interval);
}

var file = path.resolve(process.cwd(), dataFile);
console.log('Loading data from file %s', file);
var data = require(file);

var tasks = data.map(function(activity){
  return function(done){
    var endpoint = activity.actor.id;
    var url = baseUrl+endpoint;
    console.log('[%s] posting activity:', new Date());
    console.log(activity.verb);
    request({
      method: 'POST',
      url: url,
      json: activity
    }, function(err, res, body){
      if(err) return done(err);
      if(res.statusCode != 200) return done(body);
      setTimeout(done, interval);
    });
  }
});

async.series(tasks, function(err){
  if(err) return exit(err);
  console.log('Activity posts completed');
  process.exit();
});

