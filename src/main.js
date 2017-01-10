/**
 * main.js
 * Copyright (c) 2017 app2641
 */
var initLibraries = function () {
  if (typeof Slack === 'undefined') Slack = loadSlackClient();
  if (typeof Parser === 'undefined') Parser = loadParser();
  if (typeof Reviewer === 'undefined') Reviewer = loadReviewer();
}

var init = function () {
  initLibraries();

  var slack = new Slack();
  var parser = new Parser();
  var reviewer = new Reviewer();

  return {
    slack: slack,
    parser: parser,
    reviewer: reviewer
  };
};

function doPost (e) {
  var app = init();
  var payload = app.slack.receiveMessage(e.parameters);
  if (payload.user == 'slackbot') return false;

  var xml = app.parser.parse(payload.message);
  var ret = app.reviewer.find(xml);

  if (ret) {
    var message = '一句できました。\n*' + ret + '*';
    app.slack.send(message);
  }
};

function doGet (e) {
  var app = init();
  var text = '北海道大学フォークソングのメンバーと交流を持ち、活発に音楽活動を展開し、「コンテスト荒らし」の異名をとった。';

  var xml = app.parser.parse(text);
  var ret = app.reviewer.find(xml);

  if (ret) {
    var message = '一句できました。\n*' + ret + '*';
    app.slack.send(message);
  }
};
