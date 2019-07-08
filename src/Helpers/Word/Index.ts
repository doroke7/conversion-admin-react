class WordHelper {
  public static filter(oMessage: any, aWords: any[] | any) {
    if (!oMessage.text || !aWords) {
      return oMessage;
    }
    aWords.forEach((oWord: any) => {
      if (-1 === oMessage.text.indexOf(oWord.from)) {
        return;
      }
      if ('replace' === oWord.type) {
        oMessage.text = oMessage.text.replace(oWord.from, oWord.to);
        return;
      }

      if ('empty' === oWord.type) {
        oMessage.text = oMessage.text.replace(oWord.from, '');
        return;
      }

      if ('block' === oWord.type) {
        oMessage = null;
        return;
      }

      if ('ignore' === oWord.type) {
        return;
      }
    });
    return oMessage;
  }
}

export default WordHelper;
