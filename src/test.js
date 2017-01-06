/**
 * test.js
 * Copyright (c) 2017 app2641
 */
function test () {
  var text = '止まろうが止まるまいが変な人';

  var expect = false;
  this.assert(text, expect, true);
};

function parsableTest () {
  var text = 'それぐらいアナタのように出来るはず';
  var expect = 'それぐらい アナタのように 出来るはず';
  this.assert(text, expect);

  text = '北海道大学フォークソングのメンバーと交流を持ち、活発に音楽活動を展開し、「コンテスト荒らし」の異名をとった。';
  expect = 'メンバーと 交流を持ち、 活発に';
  this.assert(text, expect);
  
  text = 'この書生の掌の裏うちでしばらくはよい心持に坐っておったが、しばらくすると非常な速力で運転し始めた。';
  expect = '裏うちで しばらくはよい 心持';
  this.assert(text, expect);
};

function unparsableTest () {
  var text = '「本当は明日なんだけど」「お言葉ですが」「さっき言ったのに」「終わるの早いし」に見られる終助詞的な接続助詞の使用などが挙げられる。';
  var expect = false;
  this.assert(text, expect);
  
  text = 'LC_COLLATE=C は文字の照合順序の指定であり、"$@" は l に付随しているパラメータ列をそのまま ls に渡すことを意味する。'+
    'したがって、ls の通常のコマンドオプションや構文がそのまま使える。';
  this.assert(text, expect);
};

function getIkku (app, text, verbose) {
  var xml = app.parser.parse(text, verbose);
  return app.reviewer.find(xml);
};

function assert (text, expect, verbose) {
  var app = init();
  var actual = this.getIkku(app, text, verbose);

  if (actual == expect) {
    Logger.log('success! '+expect);
  } else {
    Logger.log('failure! expect:'+expect+', actual:'+actual);
  }
};
