const oWord = (aWords: any = [], oAction: any) => {
  let _aWords = oAction.payload;
  let __aWords: any = aWords;
  debugger;
  switch (oAction.type) {
    case 'SHOW_WORD':
      __aWords = [...aWords, ..._aWords];
      return __aWords;
    default:
      return __aWords;
  }
};

export default oWord;