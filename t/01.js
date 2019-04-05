'use strict'
const test = require('tape')
const toranoana = require('../index')
const fs = require('fs')
const path = require('path')
const iconv = require('iconv-lite')
const missi = require('mississippi')

test('const client = new Toranoana', t => {
  const name = 'www.toranoana.jp'
  const searchHome = 'https://ec.toranoana.jp/tora_r/ec/app/catalog/list/'
  const c = toranoana()
  t.is(c.name, name, `c.name eq "${name}"`)
  t.is(c.failAfter, 7, 'c.failAfter === 7')
  t.is(c.searchHome, searchHome, `c.searchHome eq "${searchHome}"`)
  t.end()
})

test('const qstr = client.createQuery(paarms)', t => {
  const c = toranoana()
  const params = {
    category: 'mak',
    value: '床子屋'
  }

  t.test('const queryObj = client.transformQuery(params)', tt => {
    const o = c.transformQuery(params)
    const expected =  {
      detailSearch: true,
      searchDisplay: 0,
      searchUsedItemFlg: 1,
      searchBackorderFlg: 0,
      searchCategoryCode: '04',
      searchChildrenCategoryCode: 'cot',
      searchMaker: '床子屋'
    }
    t.deepEqual(o, expected, JSON.stringify(expected))
    tt.end()
  })

  t.test('const queryStr = client.createQuery(params)', tt => {
    const qs = c.createQuery(params)
    const encoded = encodeURIComponent(params.value)
    const expected = new RegExp(`searchMaker=${encoded}`)
    tt.ok(expected.test(qs), qs)
    tt.end()
  })

  t.end()
})

test('const stream = client.scraper()', t => {
  const c = toranoana()
  const html = path.join(__dirname, './03.html')
  const scraper = c.scraper()
  const buf = []
  const expected_0 = {
    urlOfTitle: 'https://ec.toranoana.jp/tora_r/ec/item/040030478820/',
    srcOfThumbnail: 'https://ecdnimg.toranoana.jp/ec/img/04/0030/47/88/040030478820-1p_thumb.jpg',
    title: '夏期補習総集編1～6+',
    circle: 'ゆきよし真水 , ひとのふんどし , オリジナル , 在庫：×',
    urlOfCircle: null
  }
  const expected_17 = {
    urlOfTitle: 'https://ec.toranoana.jp/tora_r/ec/item/040030260490/',
    srcOfThumbnail: 'https://ecdnimg.toranoana.jp/ec/img/04/0030/26/04/040030260490-1p_thumb.jpg',
    title: '夏期補習湯けむり手ぬぐい',
    circle: 'ゆきよし真水 , ひとのふんどし , オリジナル , 木村理沙 , 在庫：×',
    urlOfCircle: null
  }

  missi.pipe(
    fs.createReadStream(html),
    scraper,
    missi.through.obj((hash, _, done) => {
      buf.push(hash)
      done()
    }),
    err => {
      t.error(err)
      t.ok(1, 'scraper emit "end"')
      t.is(buf.length, 18)
      t.deepEqual(buf[0], expected_0)
      t.deepEqual(buf[17], expected_17)
      t.end()
    }
  )
})
