import axios, { AxiosError } from 'axios';

import CONFIGS from '@/CONFIGS/INDEX';

const API = CONFIGS.API;

let sHost = API.PROTOCOL + '://' + API.HOST.replace(/\/$/, '');

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

/**
 * AixosHelper
 * 利用 Axios 改写，
 * 能过批次处理 AJAX 的 类模组
 */
class AxiosHelper {
  public static async get(oRequest: any | any[], oConfigs: any = {}): Promise<any> {
    let bConcurrent = !Object.prototype.hasOwnProperty.call(oConfigs, 'concurrent') || oConfigs.concurrent;
    let oParams;
    let oData;
    let oOptions;
    if (oRequest instanceof Array) {
      let aRequests: any[] = oRequest;
      let aResponses: any[] = [];
      if (!bConcurrent) {
        let iIndex = 0;
        let iLength = aRequests.length;
        for (iIndex = 0; iIndex < iLength; iLength++) {
          let oRequest = aRequests[iIndex];
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;

          oParams = oRequest.params;
          oData = oRequest.data;
          oOptions = oRequest.options;

          oOptions['params'] = oParams;

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.get(_sUrl, oOptions);
          } catch (oExcepiton) {

            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = oAxiosResponse;
          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;
          oParams = oRequest.params;
          oData = oRequest.data;
          oOptions = oRequest.options;

          oOptions['params'] = oParams;

          let oAxiosResponse = null;
          try {
            oAxiosResponse = await axios.get(_sUrl, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = oAxiosResponse;

          return oResponse;
        })
      );

      return aResponses;
    }
  }

  public static async post(oRequest: any | any[], oConfigs: any = {}): Promise<any> {
    let bConcurrent = !Object.prototype.hasOwnProperty.call(oConfigs, 'concurrent') || oConfigs.concurrent;
    let oParams = {};
    let oData = {};
    let oOptions = {};
    if (oRequest instanceof Array) {
      let aRequests: any[] = oRequest;
      let aResponses: any[] = [];
      if (!bConcurrent) {
        let iIndex = 0;
        let iLength = aRequests.length;
        for (iIndex = 0; iIndex < iLength; iLength++) {
          let oRequest = aRequests[iIndex];
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;

          oParams = oRequest.params;
          oData = oRequest.data;
          oOptions = oRequest.options;
          oOptions['params'] = oParams;

          let oAxiosResponse = null;
          try {
            oAxiosResponse = await axios.post(_sUrl, oData, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = oAxiosResponse;
          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = (oRequest.url || sHost) + oRequest.path;

          oParams = oRequest.params;
          oData = oRequest.data;
          oOptions = oRequest.options;
          oOptions['params'] = oParams;

          let oAxiosResponse;
          try {
            oAxiosResponse = await axios.post(_sUrl, oData, oOptions);
          } catch (oExcepiton) {
            oAxiosResponse = oExcepiton.response;
          }

          let oResponse = oAxiosResponse;

          return oResponse;
        })
      );

      return aResponses;
    }

    let sUrl: string = (oRequest.url || sHost) + oRequest.path;

    oParams = oRequest.params;
    oData = oRequest.data;
    oOptions = oRequest.options;
    oOptions['params'] = oParams;

    let oAxiosResponse;
    try {
      oAxiosResponse = await axios.post(sUrl, oData, oOptions);
    } catch (oExcepiton) {
      oAxiosResponse = oExcepiton.response;
    }
    let oResponse = oAxiosResponse;

    return oResponse;
  }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} bConcurrent Use polling (recursive) to send the request
   */
  public static async put(url: string, params: object | object[], bConcurrent: boolean = false): Promise<any> { }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public static async delete(url: string, params: object | object[], bConcurrent: boolean = false): Promise<any> { }
}
export default AxiosHelper;
