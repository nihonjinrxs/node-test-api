#!/usr/bin/env node

// Require modules
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const favicon = require('serve-favicon');
const blocked = require('blocked-at');
const logger = require('./logger')('api-main');

blocked((time, stack) => {
  logger.warn(`Event loop blocked for ${time}ms. Stack trace at start included.`, stack)
})

const app = express()
const port = 8080

app.use(helmet())
app.use(favicon(path.join('.', 'favicon.ico')))

app.get('/', (req, res) => res.send("I'm alive"))
app.get('/beacon', (req, res) => res.send('OK'))
app.get('/ping', (req, res) => res.send('pong'))

app.listen(port, () => console.log(`Test API listening on port ${port}!`))
