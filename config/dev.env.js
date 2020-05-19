'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,"") : ''
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HOST_ENV:`"${HOST_ENV}"`
})
