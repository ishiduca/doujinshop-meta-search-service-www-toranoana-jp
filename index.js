var xtend = require('xtend')
var inherits = require('inherits')
var Service = require('doujinshop-meta-search-service')

module.exports = Toranoana
inherits(Toranoana, Service)

// https://ec.toranoana.jp/tora_r/ec/app/catalog/list/?
// searchCategoryCode=04
// searchChildrenCategoryCode=cot
// searchCategoryIncludes=1
// searchChara=%E6%B8%8B%E8%B0%B7%E5%87%9B
// searchBackorderFlg=0
// searchUsedItemFlg=1
// searchDisplay=12
// detailSearch=true
function Toranoana () {
  if (!(this instanceof Toranoana)) return new Toranoana()
  Service.call(this, 'www.toranoana.jp', {
    searchHome: 'https://ec.toranoana.jp/tora_r/ec/app/catalog/list/'
  })
}

Toranoana.prototype.transformQuery = function (_p) {
  var c = {
    mak: 'searchMaker',
    act: 'searchActor',
    nam: 'searchCommodityName',
  // gnr: '',
    gnr: 'searchWord',
    mch: 'searchChara',
  // com: '',
    com: 'searchWord',
  // ser: '',
  // kyw: '',
    kyw: 'searchWord',
  }
  var p = xtend(_p)
  var q = {}; q[c[p.category]] = p.value

  delete p.category
  delete p.value

  return xtend({
    detailSearch: true,
    searchDisplay: 0,
    searchUsedItemFlg: 1,
    searchBackorderFlg: 0,
    searchCategoryCode: '04', // 大カテゴリ
    searchChildrenCategoryCode: 'cot' // 同人誌
  }, q, p)
}

Toranoana.prototype._request = function (qstr, requestOpt, onResponse) {
  var opt ={headers: {
    'User-Agent': 'hyperquest/2.13',
    cookie: 'adflg=0'
  }}
  return Service.prototype._request.apply(this, [qstr, xtend(opt, requestOpt), onResponse])
}

Toranoana.prototype.scraper = require('./lib/scraper')
