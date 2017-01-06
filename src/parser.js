/**
 * Parser
 * Copyright (c) 2017 app2641
 */
loadParser = function () {
  var Parser = function () {
    this.app_id = '{YAHOO_APPLICATION_ID}';
    this.api_url = 'http://jlp.yahooapis.jp/MAService/V1/parse?appid='+this.app_id+'&results=ma';
  };

  Parser.prototype.parse = function (text, verbose) {
    var url = this.api_url + '&sentence=' + encodeURIComponent(text.replace(/\s/g, ''));
    var send_options = { method: 'get' };

    try {
      var res = UrlFetchApp.fetch(url, send_options);
      if (verbose == true) Logger.log(res);

      return XmlService.parse(res);
    } catch (e) {
      Logger.log(e);
    }
  };

  return Parser;
};
