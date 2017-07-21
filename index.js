var xtend = require('xtend')
var inherits = require('inherits')
var Service = require('doujinshop-meta-search-service')

module.exports = Toranoana
inherits(Toranoana, Service)

function Toranoana () {
  if (!(this instanceof Toranoana)) return new Toranoana()
  Service.call(this, 'www.toranoana.jp', {
    charset: 'CP932',
    searchHome: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi'
  })
}

Toranoana.prototype.transformQuery = function (_p) {
  var p = xtend(_p)
  var q = {}; q[p.category] = p.value

  delete p.category
  delete p.value

  return xtend({
    item_kind: '0401',
    bl_flg: 0,
    adl: 0,
    obj: 0,
    stk: 1,
    img: 1,
    ps: 1
  }, q, p)
}

Toranoana.prototype.scraper = require('./lib/scraper')
