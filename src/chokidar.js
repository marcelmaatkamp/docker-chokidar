// convict
var convict = require('convict');
var config = convict({
  log: {
    level: { 
      doc: "Winston log levels",
      format: [
        "emerg", 
        "alert", 
        "crit", 
        "error", 
        "warning", 
        "notice", 
        "info", 
        "debug"],
      default: "info",
      env: "LOG_LEVEL",
      arg: "log_level"
    }
  }
});
config.validate({allowed: 'strict'});
module.exports = config;

// winston logging
var winston = require("winston")
const transports = {
  console: new winston.transports.Console({ level: config.get("log.level")}),
};
const log = winston.createLogger({
  level: config.get("log.level"),
  format: winston.format.json(),
  transports: [
    transports.console,
  ]
});

// chodikar
var chokidar = require('chokidar');
var watcher = chokidar.watch('file, dir, glob, or array', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('change', path => log(`File ${path} has been changed`))
  .on('unlink', path => log(`File ${path} has been removed`));

log.info("started..")