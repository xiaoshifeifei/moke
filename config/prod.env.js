'use strict'
const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
const HOST_ENV = argv[2] ? argv[2].replace(/[^a-z]+/ig,"") : ''
module.exports = {
  NODE_ENV: '"production"',
  HOST_ENV:`"${HOST_ENV}"`
}
