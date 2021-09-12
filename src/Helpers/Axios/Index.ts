import axios from 'axios';
import CryptoJS from 'crypto-js';

import Helpers from '@/Helpers/';
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
  public static params(oParams: any, oConfigs: any = {}): any {
    oParams = oParams || {};

    let bAes = !Object.prototype.hasOwnProperty.call(oConfigs, 'aes') || oConfigs.aes;

    if (!Object.prototype.hasOwnProperty.call(oParams, 'query')) {
      oParams.query = {};
    }

    if (bAes) {
      let sQuery = JSON.stringify(oParams.query);
      let _sQuery = Helpers.Aes.encode(sQuery);
      oParams.query = _sQuery;
    }

    if (!Object.prototype.hasOwnProperty.call(oParams, 'time')) {
      oParams.time = Math.floor(Date.now() / 1000);
    }

    return oParams;
  }

  public static data(oData: any, oParams: any = {}, oConfigs: any = {}): any {
    oData = oData || {};

    let bAes = !Object.prototype.hasOwnProperty.call(oConfigs, 'aes') || oConfigs.aes;

    if (!Object.prototype.hasOwnProperty.call(oData, 'param')) {
      oData.param = {};
    }

    if (bAes) {
      let sParam = JSON.stringify(oData.param);
      let _sParam = Helpers.Aes.encode(sParam);
      oData.param = _sParam;
    }

    return oData;
  }

  public static sign(oParams: any, oData: any = {}): any {
    let sJwt = Helpers.Authentication.getJwt() || '';
    let sVersion = CONFIGS.APP.VERSION;
    let sQuery = oParams.query;
    let sTime = oParams.time.toString();
    let sParam = oData.param;
    let sSalt = CONFIGS.API.SALT;

    let sSignature1 = CryptoJS.MD5(sJwt + ';' + sVersion).toString();
    let sSignature2 = CryptoJS.MD5(sQuery + '&' + sTime).toString();
    let sSignature3 = CryptoJS.MD5(sParam).toString();
    let sSignature = CryptoJS.MD5(sSignature1 + sSignature2 + sSignature3 + sSalt).toString();

    return sSignature;
  }

  public static response(oResponse: any, oConfigs: any = {}): any {
    let bAes = !Object.prototype.hasOwnProperty.call(oConfigs, 'aes') || oConfigs.aes;

    if (bAes && Object.prototype.hasOwnProperty.call(oResponse, 'result')) {
      let sResult = oResponse.result;
      let sRaw = Helpers.Aes.decode(sResult);
      let oRaw = JSON.parse(sRaw);
      oResponse.raw = oRaw;
    }

    return oResponse;
  }

  public static options(oOptions: any, oConfigs: any = {}): any {
    let sJwt = Helpers.Authentication.getJwt();

    oOptions = oOptions || {};
    oOptions['params'] = oOptions['params'] || {};

    oOptions['headers'] = {
      Version: CONFIGS.APP.VERSION,
      Authorization: sJwt
    };

    return oOptions;
  }

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
    let bConcurrent = !Object.prototype.hasOwnProperty.call(oConfigs, 'concurrent') || oConfigs.concurrent;
    let oParams;
    let oData;
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

          oParams = AxiosHelper.params(oRequest.params, oConfigs);
          oData = AxiosHelper.data(oRequest.data, oConfigs);
          oOptions = AxiosHelper.options(oRequest.options, oConfigs);

          oOptions['params'] = oParams;
          oData['signature'] = AxiosHelper.sign(oParams, oData);

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.post(_sUrl, oData, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = AxiosHelper.response(oAxiosResponse.data, oConfigs);
          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;

          oParams = AxiosHelper.params(oRequest.params, oConfigs);
          oData = AxiosHelper.data(oRequest.data, oConfigs);
          oOptions = AxiosHelper.options(oRequest.options, oConfigs);

          oOptions['params'] = oParams;
          oData['signature'] = AxiosHelper.sign(oParams, oData);

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.post(_sUrl, oData, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = AxiosHelper.response(oAxiosResponse.data, oConfigs);

          return oResponse;
        })
      );

      return aResponses;
    }

    let sUrl: string = (oRequest.url || sHost) + oRequest.path;
    oParams = AxiosHelper.params(oRequest.params, oConfigs);
    oData = AxiosHelper.data(oRequest.data, oConfigs);
    oOptions = AxiosHelper.options(oRequest.options, oConfigs);

    oOptions['params'] = oParams;
    oData['signature'] = AxiosHelper.sign(oParams, oData);

    let oAxiosResponse;
    try {
      oAxiosResponse = await axios.post(sUrl, oData, oOptions);
    } catch (oExcepiton) {
      oAxiosResponse = oExcepiton.response;
    }
    let oResponse = AxiosHelper.response(oAxiosResponse.data, oConfigs);

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
