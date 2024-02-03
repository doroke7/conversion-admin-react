import axios from 'axios';
import CryptoJS from 'crypto-js';
import Exception from '@/admin/Exception/Index';
import Helpers from '@/admin/Helpers/Index';
import CONFIGS from '@/CONFIGS/INDEX';
import utilities from '@/admin/utilities/index';

const API = CONFIGS.API;

let sHost = API.HOST.replace(/\/$/, '');

sHost = /^http(s)?:\/\//.test(sHost) ? sHost : window.location.protocol + '//' + sHost;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

/**
 * AixosHelper
 * 利用 Axios 改写，
 * 能过批次处理 AJAX 的 类模组
 */
class AdminHelper {
  public static params(oParams: any, sKey: string, sIv: string): any {
    oParams = oParams || {};
    oParams.search = oParams.search || {};
    oParams.option = oParams.option || {};

    let sSearch = JSON.stringify(oParams.search);
    let sOption = JSON.stringify(oParams.option);

    oParams.search = Helpers.Aes.encrypt(sSearch, sKey, sIv);
    oParams.option = Helpers.Aes.encrypt(sOption, sKey, sIv);

    return oParams;
  }

  public static data(oData: any, sKey: string, sIv: string): any {
    oData = oData ?? {};
    oData.param = oData.param ?? {};

    let sParam = JSON.stringify(oData.param);
    oData.param = Helpers.Aes.encrypt(sParam, sKey, sIv);

    return oData;
  }

  public static options(oOptions: any, sKey: string, sIv: string): any {
    let sJwt = Helpers.Authentication.getJwt();
    let iTime = Math.floor(Date.now() / 1000);
    let oKeys = { key: sKey, iv: sIv };
    let sKeys = JSON.stringify(oKeys);
    sKeys = Helpers.Rsa.encode(sKeys);

    let oHeaders = oOptions?.['headers'] ?? {};
    oOptions = oOptions ?? {};
    oOptions['params'] = oOptions?.['params'] ?? {};
    oOptions['headers'] = {
      Authorization: sJwt,
      Version: CONFIGS.ADMIN.VERSION,
      Ver: CONFIGS.ADMIN.VER,
      Keys: sKeys, // TODO
      Time: iTime,
      ...oHeaders
    };

    return oOptions;
  }

  public static sign(oParams: any, oData: any = {}, oOptions: any = {}): any {
    let sJwt = oOptions?.['headers']?.['Authorization'] ?? '';
    let sVersion = oOptions?.['headers']?.['Version'] ?? '';
    let sVer = oOptions?.['headers']?.['Ver'] ?? '';
    let sKeys = oOptions?.['headers']?.['Keys'] ?? '';
    let sTime = oOptions?.['headers']?.['Time'] ?? '0';

    let sSearch = oParams.search;
    let sOption = oParams.option;
    let sParam = oData.param;
    let sSalt = CONFIGS.API.SALT;

    let sBeforeSignature1 = sVersion + '-' + sVer + '-' + sJwt + '-' + sKeys + '-' + sTime;
    let sBeforeSignature2 = sSearch + '-' + sOption;
    let sBeforeSignature3 = sParam;

    let sSignature1 = CryptoJS.MD5(sBeforeSignature1 + '|' + sSalt).toString();
    let sSignature2 = CryptoJS.MD5(sBeforeSignature1 + '|' + sBeforeSignature2 + '|' + sSalt).toString();
    let sSignature3 = CryptoJS.MD5(
      sBeforeSignature1 + '|' + sBeforeSignature2 + '|' + sBeforeSignature3 + '|' + sSalt
    ).toString();

    let sSignature = sSignature1 + sSignature2 + sSignature3;

    return sSignature;
  }

  public static response(oResponse: any): any {
    let oRaw = {};
    try {
      let sKeys = oResponse?.headers?.keys ?? '';
      sKeys = sKeys == '' ? sKeys : Helpers.Rsa.decode(sKeys);

      let oKeys = sKeys == '' ? {} : JSON.parse(sKeys);
      let sKey = oKeys?.key ?? '';
      let sIv = oKeys?.iv ?? '';

      let sResult = oResponse?.data?.result ?? '';

      if (sResult && sKey && sIv) {
        let sRaw = Helpers.Aes.decrypt(sResult, sKey, sIv);
        oRaw = JSON.parse(sRaw);
        oResponse.data.raw = oRaw;
      }
    } catch (oExcepiton) {
      let sMessage = '响应解密失败' + ': ' + oExcepiton.message ?? '';
      throw new Exception(sMessage, -2);
    }

    return oResponse;
  }

  public static async get(oRequest: any | any[], oConfigs: any = {}): Promise<any> {
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
          let sKey = utilities.randString(16);
          let sIv = utilities.randString(16);

          oParams = AdminHelper.params(oRequest.params, sKey, sIv);
          oData = AdminHelper.data(oRequest.data, sKey, sIv);
          oOptions = AdminHelper.options(oRequest.options, sKey, sIv);

          oOptions['params'] = oParams;
          oOptions['headers']['Signature'] = AdminHelper.sign(oParams, oData, oOptions);

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.get(_sUrl, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = AdminHelper.response(oAxiosResponse);
          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;

          let sKey = utilities.randString(16);
          let sIv = utilities.randString(16);

          oParams = AdminHelper.params(oRequest.params, sKey, sIv);
          oData = AdminHelper.data(oRequest.data, sKey, sIv);
          oOptions = AdminHelper.options(oRequest.options, sKey, sIv);

          oOptions['params'] = oParams;
          oOptions['headers']['Signature'] = AdminHelper.sign(oParams, oData, oOptions);

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.get(_sUrl, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = AdminHelper.response(oAxiosResponse);

          return oResponse;
        })
      );
      return aResponses;
    }

    let sUrl: string = (oRequest.url || sHost) + oRequest.path;
    let sKey = utilities.randString(16);
    let sIv = utilities.randString(16);

    oParams = AdminHelper.params(oRequest.params, sKey, sIv);
    oData = AdminHelper.data(oRequest.data, sKey, sIv);
    oOptions = AdminHelper.options(oRequest.options, sKey, sIv);
    oOptions['params'] = oParams;
    oOptions['headers']['Signature'] = AdminHelper.sign(oParams, oData, oOptions);

    let oAxiosResponse;
    try {
      oAxiosResponse = await axios.get(sUrl, oOptions);
    } catch (oExcepiton) {
      oAxiosResponse = oExcepiton.response;
    }
    let oResponse = AdminHelper.response(oAxiosResponse);
    return oResponse;
  }

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

          let sKey = utilities.randString(16);
          let sIv = utilities.randString(16);

          oParams = AdminHelper.params(oRequest.params, sKey, sIv);
          oData = AdminHelper.data(oRequest.data, sKey, sIv);
          oOptions = AdminHelper.options(oRequest.options, sKey, sIv);
          oOptions['params'] = oParams;
          oOptions['headers']['Signature'] = AdminHelper.sign(oParams, oData, oOptions);

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.post(_sUrl, oData, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = AdminHelper.response(oAxiosResponse);
          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;

          let sKey = utilities.randString(16);
          let sIv = utilities.randString(16);

          oParams = AdminHelper.params(oRequest.params, sKey, sIv);
          oData = AdminHelper.data(oRequest.data, sKey, sIv);
          oOptions = AdminHelper.options(oRequest.options, sKey, sIv);
          oOptions['params'] = oParams;
          oOptions['headers']['Signature'] = AdminHelper.sign(oParams, oData, oOptions);

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.post(_sUrl, oData, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = AdminHelper.response(oAxiosResponse);

          return oResponse;
        })
      );

      return aResponses;
    }

    let sUrl: string = (oRequest.url || sHost) + oRequest.path;
    let sKey = utilities.randString(16);
    let sIv = utilities.randString(16);

    oParams = AdminHelper.params(oRequest.params, sKey, sIv);
    oData = AdminHelper.data(oRequest.data, sKey, sIv);
    oOptions = AdminHelper.options(oRequest.options, sKey, sIv);
    oOptions['params'] = oParams;
    oOptions['headers']['Signature'] = AdminHelper.sign(oParams, oData, oOptions);

    let oAxiosResponse;
    try {
      oAxiosResponse = await axios.post(sUrl, oData, oOptions);
    } catch (oExcepiton) {
      oAxiosResponse = oExcepiton.response;
    }
    let oResponse = AdminHelper.response(oAxiosResponse);

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
export default AdminHelper;
