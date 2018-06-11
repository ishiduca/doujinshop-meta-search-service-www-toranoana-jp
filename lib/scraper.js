'use strict'
var url = require('url')
var xtend = require('xtend')
var missi = require('mississippi')
var trumpet = require('trumpet')

var EC_TORANOANA_JP = 'https://ec.toranoana.jp'

module.exports = function scraper () {
  var selector = '#search-result-container .list__item .search-result-inside-container'
  var ws = trumpet()
  var rs = missi.through.obj()
  var c = 0
  var isEnded = false

  ws.selectAll(selector, function (node) {
    c += 1
    var tr = trumpet()
    var hash = {}
    var labels = []

    tr.once('end', () => {
      rs.write(xtend(hash, {
        circle: labels.join(', '),
        urlOfCircle: null
      }))

      if ((c -= 1) === 0 && isEnded) rs.end()
    })

    tr.select('.product_img a', function (link) {
      link.getAttribute('href', function (href) {
        hash = xtend(hash, {urlOfTitle: url.resolve(EC_TORANOANA_JP, href)})
        tr.select('.product_img a img', function (img) {
          img.getAttribute('src', function (src) {
            hash = xtend(hash, {srcOfThumbnail: src})
            img.getAttribute('alt', function (alt) {
              hash = xtend(hash, {title: alt})
              tr.selectAll('.product_desc p label', function (label) {
                missi.pipe(
                  label.createReadStream(),
                  missi.concat(function (d) {
                    labels.push(String(d))
                  }),
                  function (err) {
                    if (err) console.error(err)
                  }
                )
              })
            })
          })
        })
      })
    })

    node.createReadStream().pipe(tr)
  })

  ws.once('end', function () {
    if (c === 0) rs.end()
    else (isEnded = true)
  })

  return missi.duplex.obj(ws, rs)
}
