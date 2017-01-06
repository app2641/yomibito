/**
 * Reviewer
 * Copyright (c) 2017 app2641
 */
loadReviewer = function () {
  var Reviewer = function () {
    this.rhythm = [5, 7, 5];
    this.denotation = ['、', '!', '！', '?', '？', '「', '」'];
  };

  Reviewer.prototype.init = function () {
    this.region = [0];
    this.ikku = [''];
  };

  Reviewer.prototype.find = function (xml) {
    try {
      this.ns = XmlService.getNamespace('urn:yahoo:jp:jlp');
      this.words = [null].concat(xml.getRootElement().getChild('ma_result', this.ns).getChild('word_list', this.ns).getChildren('word', this.ns));
      this.init();

      while (this.isParsable()) {
        for (var i in this.words) {
          var word = this.words[i];
          this.pos = word.getChildText('pos', this.ns);
          this.surface = word.getChildText('surface', this.ns);
          this.reading = word.getChildText('reading', this.ns);

          if (this.allowDenotation(this.surface)) {
            this.parseDenotation(this.surface);
            continue;
          }

          var ret = this.parse();
          if (ret === false) break;
        }
      }

      if (this.region.toString() === this.rhythm.toString()) {
        return this.ikku.join(' ');
      } else {
        return false;
      }

    } catch (e) {
      Logger.log(e);
      return false;
    }
  };

  Reviewer.prototype.isParsable = function () {
    if (this.region.toString() === this.rhythm.toString() || this.words.length == 0) {
      return false;
    } else {
      this.init();
      this.words.shift();
      return true;
    }
  };

  Reviewer.prototype.parse = function () {
    if (!this.reading.match(/^[ぁ-ゔァ-ヺー…]+$/)) {
      return false;
    }

    var reading_length = this.reading.replace(/[ぁぃぅぇぉゃゅょァィゥェォャュョ…]/g, '').length;

    if ((this.currentRegion() + reading_length) <= this.currentRhythm()) {
      if ((this.currentRegion() + reading_length) == this.currentRhythm() && this.surface.match(/^っ|ッ$/)) {
        return false;
      } else if (this.currentRegion() == 0 && this.region.length == 1 && this.pos == '助動詞') {
        return false;
      }

      this.region[this.region.length - 1] += reading_length;
      this.ikku[this.ikku.length - 1] += this.surface;
      return true;
    } else if (this.region.length < this.rhythm.length &&
                 reading_length <= this.currentRhythm() &&
                 !this.surface.match(/^っ|ッ$/) &&
                 this.pos != '助詞' &&
                 this.pos != '接尾辞' &&
                 this.pos != '助動詞') {
      this.region.push(reading_length);
      this.ikku.push(this.surface);
      return true;
    }

    return false;
  };

  Reviewer.prototype.parseDenotation = function (surface) {
    if (this.currentRegion() > 0) {
      this.ikku[this.ikku.length - 1] += surface;
    }
  };

  Reviewer.prototype.currentRegion = function () {
    return this.region[this.region.length - 1];
  };

  Reviewer.prototype.currentRhythm = function () {
    return this.rhythm[this.region.length - 1];
  };

  Reviewer.prototype.currentIkku = function () {
    return this.ikku[this.ikku.length - 1];
  };

  Reviewer.prototype.debug = function () {
    Logger.log(this.region);
    Logger.log(this.ikku);
  };

  Reviewer.prototype.allowDenotation = function (surface) {
    for (var i in this.denotation) {
      if (surface == this.denotation[i]) return true;
    }

    return false;
  };

  return Reviewer;
};
