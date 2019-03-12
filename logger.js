var fs = require('fs');
var path = require('path');
var bunyan = require('bunyan');


var log_stream = process.stdout,
    log_level = 'trace',
    env = process.env.NODE_ENV || 'development';

switch (env){
    case "production":
    case "staging":
        log_level = "info";
        break;
    case "test":
        log_stream = fs.createWriteStream( path.resolve( __dirname, './logs.out' ), { flags: 'a' });
        break;
    case "development":
        break;
    default:
}

const streams = [
  {
    stream: log_stream,
    level: log_level
  }
];

const log = bunyan.createLogger({
  name: "test-api",
  streams: streams,
  serializers: {
    req: function(req) {
      return {
        method: req.method,
        url: req.url
      };
    },
    res: function(res) {
      return {
        method: res.method,
        url: res.url,
        statusCode: res.statusCode
      };
    },
    err: bunyan.stdSerializers.err
  }
});

module.exports = function(name) {
  return log.child({ component: name });
};
