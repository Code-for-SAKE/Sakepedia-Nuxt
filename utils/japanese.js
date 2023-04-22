//ひらがな、カタカナ変換
module.exports = {
  // カタカナがあればひらがなに変換
  kanaToHira(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function (match) {
      var chr = match.charCodeAt(0) - 0x60;
      return String.fromCharCode(chr);
    });
  },
  // ひらがながあればカタカナに変換
  hiraToKana(str) {
    return str.replace(/[\u3041-\u3096]/g, function (match) {
      var chr = match.charCodeAt(0) + 0x60;
      return String.fromCharCode(chr);
    });
  },
};
