'use strict'
var test = require('tape')
var toranoana = require('../index')
var fs = require('fs')
var path = require('path')
var iconv = require('iconv-lite')
var missi = require('mississippi')

test('var client = new Toranoana', t => {
  var c = toranoana()
  t.is(c.name, 'www.toranoana.jp', 'c.name eq "www.toranoana.jp"')
  t.is(c.failAfter, 7, 'c.failAfter === 7')
  t.is(c.searchHome, 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi', 'c.searchHome eq "http://www.toranoana.jp/cgi-bin/R2/d_search.cgi"')
  t.end()
})

test('var qstr = client.createQuery(paarms)', t => {
  var c = toranoana()
  var params = {
    category: 'mak',
    value: '床子屋',
    ps: 3
  }

  t.test('var queryObj = client.transformQuery(params)', tt => {
    var o = c.transformQuery(params)
    t.deepEqual(o, {
      item_kind: '0401',
      bl_flg: 0,
      adl: 0,
      obj: 0,
      stk: 1,
      img: 1,
      ps: 3,
      mak: '床子屋'
    }, `{
      item_kind: '0401',
      bl_flg: 0,
      adl: 0,
      obj: 0,
      stk: 1,
      img: 1,
      ps: 3,
      mak: '床子屋'
    }`)
    tt.end()
  })

  var qs = c.createQuery(params)
  t.ok(/mak=%8F%B0%8E%71%89%AE/.test(qs), qs)
  t.end()
})

test('var stream = client.scraper()', t => {
  var c = toranoana()
  var b = []
  missi.pipe(
    fs.createReadStream(path.join(__dirname, 'arakure.html')),
    iconv.decodeStream(c.charset),
    c.scraper(),
    missi.through.obj((o, _, d) => {
      b.push(o)
      d()
    }),
    err => {
      t.notOk(err, 'no exits error')
      t.is(b.length, 10, 'b.length eq 10')
      t.deepEqual(b[0], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/55/38/040030553859.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%82%a0%82%e7%82%ad%82%ea%82%bd%8e%d2%82%bd%82%bf&img=1&stk=1&makAg=1&p1=23&p2=62&p3=5731303036323233',
        srcOfThumbnail: 'http://img.toranoana.jp/img18/04/0030/55/38/040030553859-1r.gif',
        title: '人妻とNTR町内旅行',
        circle: 'あらくれた者たち'
      })
      t.deepEqual(b[1], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/50/17/040030501768.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%83A%83%89%83N%83%8c&img=1&stk=1&makAg=1&p1=31&p2=16&p3=5730373031363331',
        srcOfThumbnail: 'http://img.toranoana.jp/img/04/0030/50/17/040030501768-1r.gif',
        title: 'せんぱい あのね、',
        circle: 'アラクレ'
      })
      t.deepEqual(b[2], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/47/62/040030476233.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%82%a0%82%e7%82%ad%82%ea%82%bd%8e%d2%82%bd%82%bf&img=1&stk=1&makAg=1&p1=23&p2=62&p3=5731303036323233',
        srcOfThumbnail: 'http://img.toranoana.jp/img18/04/0030/47/62/040030476233-1r.gif',
        title: '妻とチャラ男が消えたNTRベッドルーム',
        circle: 'あらくれた者たち'
      })
      t.deepEqual(b[3], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/47/70/040030477017.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%82%a0%82%e7%82%ad%82%ea%82%bd%8e%d2%82%bd%82%bf&img=1&stk=1&makAg=1&p1=23&p2=62&p3=5731303036323233',
        srcOfThumbnail: 'http://img.toranoana.jp/img18/04/0030/47/70/040030477017-1r.gif',
        title: '【とらのあな特典B3マイクロファイバータオル付き】妻とチャラ男が消えたNTRベッドルーム',
        circle: 'あらくれた者たち'
      })
      t.deepEqual(b[4], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/44/91/040030449176.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%82%a0%82%e7%82%ad%82%ea%82%bd%8e%d2%82%bd%82%bf&img=1&stk=1&makAg=1&p1=23&p2=62&p3=5731303036323233',
        srcOfThumbnail: 'http://img.toranoana.jp/img18/04/0030/44/91/040030449176-1r.gif',
        title: '人妻とNTR下見旅行',
        circle: 'あらくれた者たち'
      })
      t.deepEqual(b[5], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/43/65/040030436512.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%83A%83%89%83N%83%8c&img=1&stk=1&makAg=1&p1=31&p2=16&p3=5730373031363331',
        srcOfThumbnail: 'http://img.toranoana.jp/img18/04/0030/43/65/040030436512-1r.gif',
        title: 'THE MISAWA SHOW 裏',
        circle: 'アラクレ'
      })
      t.deepEqual(b[6], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/38/28/040030382867.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%83A%83%89%83N%83%8c&img=1&stk=1&makAg=1&p1=31&p2=16&p3=5730373031363331',
        srcOfThumbnail: 'http://img.toranoana.jp/img/04/0030/38/28/040030382867-1r.gif',
        title: 'THE MISAWA SHOW',
        circle: 'アラクレ'
      })
      t.deepEqual(b[7], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/30/17/040030301708.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%82%a0%82%e7%82%ad%82%ea&img=1&stk=1&makAg=1&p1=49&p2=82&p3=5730373238323439',
        srcOfThumbnail: 'http://img.toranoana.jp/img/04/0030/30/17/040030301708-1r.gif',
        title: '悪魔 DE TeaParty',
        circle: 'あらくれ'
      })
      t.deepEqual(b[8], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/14/18/040030141846.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%8dr%82%ad%82%ea%93%b9%8eY%8eq%96%ba&img=1&stk=1&makAg=1&p1=08&p2=56&p3=5730373035363038',
        srcOfThumbnail: 'http://img.toranoana.jp/img/04/0030/14/18/040030141846-1r.gif',
        title: 'MOG!!',
        circle: '荒くれ道産子娘'
      })
      t.deepEqual(b[9], {
        urlOfTitle: 'http://www.toranoana.jp/mailorder/article/04/0030/11/97/040030119792.html',
        urlOfCircle: 'http://www.toranoana.jp/cgi-bin/R2/d_search.cgi?bl_fg=0&item_kind=0401&mak=%82%a0%82%e7%82%ad%82%ea&img=1&stk=1&makAg=1&p1=49&p2=82&p3=5730373238323439',
        srcOfThumbnail: 'http://img.toranoana.jp/img/04/0030/11/97/040030119792-1r.gif',
        title: 'あにうえ、気持ち悪いデス。',
        circle: 'あらくれ'
      })
      t.end()
    }
  )
})
