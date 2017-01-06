/**
 * Slack
 * Copyright (c) 2017 app2641
 */
loadSlackClient = function () {
  var SlackClient = function () {
    this.hooks_url = '{YOMIBITO_SLACK_HOOKS_URL}';
  };

  SlackClient.prototype.post = function (message) {
    var send_options = {
      method: 'post',
      payload: {'payload': JSON.stringify({text: message})}
    };

    UrlFetchApp.fetch(this.hooks_url, send_options);
  };

  SlackClient.prototype.receiveMessage = function (message) {
    var username = String(message['user_name']);
    var body = String(message['text']);

    return { user: username, message: body };
  };

  SlackClient.prototype.send = function (message) {
    var send_options = {
      method: 'post',
      payload: {'payload': JSON.stringify({ text: message })}
    };

    if (this.hooks_url) {
      UrlFetchApp.fetch(this.hooks_url, send_options);
    }

    return message;
  };

  return SlackClient;
};
