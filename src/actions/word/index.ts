import { AxiosHelper, AuthenticationHelper } from '@/Helpers/';

let cShow: any = (aWords: any) => {
  return {
    type: 'SHOW_WORD',
    payload: aWords,
  };
};

let oWord: any = {
  show: (aWords: any, oOptions: any) => {
    return async (cDispatch: any) => {
      let sType = oOptions.type;
      let oResponse = await AxiosHelper.get({
        path: '/' + sType + '/resource/word/show',
        params: {},
      });
      if (-1 === oResponse.result) {
        throw new Error('IT_FAILS_TO_SHOW_WORD');
      }

      let aWords = oResponse.data.words;
      cDispatch(cShow(aWords));
    };
  },


};

export default oWord;
