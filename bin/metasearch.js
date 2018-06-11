#!/usr/bin/env node
'use strict'
var argv = require('minimist')(process.argv.slice(2), {
  default: {
    category: 'mak'
  },
  alias: {
    c: 'category',
    h: 'help'
  }
})

if (argv.help) {
  help()
  process.exit(0)
}

var missi = require('mississippi')
var toranoana = require('../index')
var req = toranoana().createStream()

missi.pipe(
  req,
  missi.through.obj(function (d, _, done) {
    done(null, JSON.stringify(d))
  }),
  process.stdout,
  err => err && console.error(err)
)

req.end({
  category: argv.category,
  value: argv._.filter(Boolean).join(' ')
})

function help () {
  console.log(`
usage: > metasearch --category=mak MTSP
  `)
}
