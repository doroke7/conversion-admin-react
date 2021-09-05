import Helpers from '@/Helpers/';

import axios from 'axios';

import CONFIGS from '@/CONFIGS/';

const API = CONFIGS.API;

let sHost = API.HOST.replace(/\/$/, '');

sHost = /^http(s)?:\/\//.test(sHost) ? sHost : window.location.protocol + '//' + sHost;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

/**
 * AixosHelper
 * 利用 Axios 改写，
 * 能过批次处理 AJAX 的 类模组
 */
class AxiosHelper {
  /** 可以批次发送 AJAX 请求的 方法
   * @param {object | Array<object>} request The request of HTTP body
   * @param {boolean} concurrent 使用同步模式 (递归模式), 也就是一个 AJAX 等待回应后才发下一个请求
   */
  public static async get(oRequest: any | any[], bConcurrent: boolean = false): Promise<any> {
    let sJwt = Helpers.Authentication.getJwt();
    bConcurrent = !!bConcurrent;
    let oParams;
    let oOptions;
    if (oRequest instanceof Array) {
      let aRequests: any[] = oRequest;
      let aResponses: any[] = [];
      if (!bConcurrent) {
        let iIndex;
        let iLength = aRequests.length;
        for (iIndex = 0; iIndex < iLength; iLength++) {
          let oRequest = aRequests[iIndex];
          let _sUrl: string = oRequest.url || sHost + oRequest.path;
          oParams = oRequest.params;

          oOptions = {
            params: oParams,
            data: oParams,
            headers: {
              Authorization: sJwt || ''
            }
          };

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.get(_sUrl, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }
          let oResponse = oAxiosResponse.data;

          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = oRequest.url || sHost + oRequest.path;
          oParams = oRequest.params;

          oOptions = {
            params: oParams,
            data: oParams,
            headers: {
              Authorization: sJwt || ''
            }
          };

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.get(_sUrl, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }
          let oResponse = oAxiosResponse.data;

          return oResponse;
        })
      );

      return aResponses;
    }

    let sUrl: string = oRequest.url || sHost + oRequest.path;
    oParams = oRequest.params;
    oParams = oRequest.params;

    oOptions = {
      params: oParams,
      data: oParams,
      headers: {
        Authorization: sJwt || ''
      }
    };

    let oAxiosResponse;
    try {
      oAxiosResponse = await axios.get(sUrl, oOptions);
    } catch (oExcepiton) {
      oAxiosResponse = oExcepiton.response;
    }
    let oResponse = oAxiosResponse.data;

    return oResponse;
  }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} concurrent Use polling (recursive) to send the request
   */
  public static async post(oRequest: any | any[], oConfigs: any = {}): Promise<any> {
    let sJwt = Helpers.Authentication.getJwt();

    let bConcurrent = !Object.prototype.hasOwnProperty.call(oConfigs, 'concurrent') || oConfigs.concurrent;
    let bAes = !Object.prototype.hasOwnProperty.call(oConfigs, 'aes') || oConfigs.aes;
    let oParams;
    let oOptions;
    if (oRequest instanceof Array) {
      let aRequests: any[] = oRequest;
      let aResponses: any[] = [];
      if (!bConcurrent) {
        let iIndex;
        let iLength = aRequests.length;
        for (iIndex = 0; iIndex < iLength; iLength++) {
          let oRequest = aRequests[iIndex];
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;
          if (bAes && Object.prototype.hasOwnProperty.call(oRequest.params, 'param')) {
            let sParam = JSON.stringify(oRequest.params.param);
            let _sParam = Helpers.Aes.encode(sParam);
            oRequest.params.param = _sParam;
          }
          oRequest.params.time = Math.floor(Date.now() / 1000);
          oParams = oRequest.params || {};
          oOptions = oRequest.options || {};
          oOptions['headers'] = {
            Authorization: sJwt || '',
            Version: CONFIGS.APP.VERSION
          };
          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.post(_sUrl, oParams, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          if (bAes && Object.prototype.hasOwnProperty.call(oAxiosResponse.data, 'data')) {
            let sData = oAxiosResponse.data.data;
            let _sData = Helpers.Aes.decode(sData);
            let oData = JSON.parse(_sData);
            oAxiosResponse.data.data = oData;
          }
          let oResponse = oAxiosResponse.data;
          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;
          if (bAes && Object.prototype.hasOwnProperty.call(oRequest.params, 'param')) {
            let sParam = JSON.stringify(oRequest.params.param);
            let _sParam = Helpers.Aes.encode(sParam);
            oRequest.params.param = _sParam;
          }
          oRequest.params.time = Math.floor(Date.now() / 1000);
          let oParams = oRequest.params || {};
          oOptions = oRequest.options || {};
          oOptions['headers'] = {
            Authorization: sJwt || '',
            Version: CONFIGS.APP.VERSION
          };
          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.post(_sUrl, oParams, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          if (bAes && Object.prototype.hasOwnProperty.call(oAxiosResponse.data, 'data')) {
            let sData = oAxiosResponse.data.data;
            let _sData = Helpers.Aes.decode(sData);
            let oData = JSON.parse(_sData);
            oAxiosResponse.data.data = oData;
          }

          let oResponse = oAxiosResponse.data;
          return oResponse;
        })
      );

      return aResponses;
    }

    let sUrl: string = (oRequest.url || sHost) + oRequest.path;
    oParams = oRequest.params || {};
    oOptions = oRequest.options || {};

    if (bAes && Object.prototype.hasOwnProperty.call(oParams, 'param')) {
      let sParam = JSON.stringify(oParams.param);
      let _sParam = Helpers.Aes.encode(sParam);
      oParams.param = _sParam;
    }
    oParams.time = Math.floor(Date.now() / 1000);

    oOptions['headers'] = {
      Authorization: sJwt || '',
      Version: CONFIGS.APP.VERSION
    };
    let oAxiosResponse;
    try {
      oAxiosResponse = await axios.post(sUrl, oParams, oOptions);
    } catch (oExcepiton) {
      oAxiosResponse = oExcepiton.response;
    }
    let oResponse;
    if (oAxiosResponse && oAxiosResponse.data) {
      if (bAes && Object.prototype.hasOwnProperty.call(oAxiosResponse.data, 'data')) {
        let sData = oAxiosResponse.data.data;
        let _sData = Helpers.Aes.decode(sData);
        let oData = JSON.parse(_sData);
        oAxiosResponse.data.data = oData;
      }

      oResponse = oAxiosResponse.data;
    }
    return oResponse;
  }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} bConcurrent Use polling (recursive) to send the request
   */
  public static async put(url: string, params: object | object[], bConcurrent: boolean = false): Promise<any> {}

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public static async delete(url: string, params: object | object[], bConcurrent: boolean = false): Promise<any> {}
}
export default AxiosHelper;
