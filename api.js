#!/usr/bin/env node

// Require modules
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const favicon = require('serve-favicon');
const blocked = require('blocked-at');
const logger = require('./logger')('api-main');

blocked((time, stack) => {
  logger.warn({ "warning": `Event loop blocked for ${time}ms. Stack trace at start included.`, "stack": stack })
})

const app = express()
const port = 8080

app.use(helmet())
app.use(favicon(path.join('.', 'favicon.ico')))

app.get('/', (req, res) => {
  logger.info({
    "req":     req,
    "res":     res,
    "message": "ROOT endpoint called"
  })
  res.send("I'm alive")
})
app.get('/beacon', (req, res) => {
  logger.info({
    "req":     req,
    "res":     res, 
    "message": "BEACON endpoint called"
  })
  res.send('OK')
})
app.get('/ping', (req, res) => {
  logger.info({
    "req":     req,
    "res":     res,
    "message": "PING endpoint called"
  })
  res.send('pong')
})

app.listen(port, () => logger.info({
  "message": "Test API listening on port " + port + "!",
  "port":    port
}))

