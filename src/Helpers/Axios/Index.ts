import querystring from 'querystring';

import axios from 'axios';

import { API } from '@/CONFIGS/';

let sHost = API.HOST.replace(/\/$/, '');
sHost.replace(/^http(s)?:\/\//, '');
sHost = window.location.protocol + '//' + sHost;

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
          let oHeaders = oRequest.headers;

          oOptions = {
            params: oParams,
            data: oParams,
            headers: oHeaders
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
          let oHeaders = oRequest.headers;

          oOptions = {
            params: oParams,
            data: oParams,
            headers: oHeaders
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
    let oHeaders = oRequest.headers;

    oOptions = {
      params: oParams,
      data: oParams,
      headers: oHeaders
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
  public static async post(oRequest: any | any[], bConcurrent: boolean = false): Promise<any> {
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
          oOptions = oRequest.options;
          let oAxiosReponse;
          try {
            oAxiosReponse = await axios.post(_sUrl, oParams, oOptions);
          } catch (oExcepiton) {
            oAxiosReponse = oExcepiton.response;
          }
          let oResponse = oAxiosReponse.data;
          aResponses.push(oResponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = oRequest.url || sHost + oRequest.path;
          let oParams = oRequest.params;
          oOptions = oRequest.options;

          let oAxiosReponse;
          try {
            oAxiosReponse = await axios.post(_sUrl, oParams, oOptions);
          } catch (oExcepiton) {
            oAxiosReponse = oExcepiton.response;
          }
          let oResponse = oAxiosReponse.data;
          return oResponse;
        })
      );

      return aResponses;
    }

    let sUrl: string = oRequest.url || sHost + oRequest.path;
    oParams = oRequest.params;
    oOptions = oRequest.options;
    // params.headers = oHeaders;
    let oAxiosResponse;
    try {
      oAxiosResponse = await axios.post(sUrl, oParams, oOptions);
    } catch (oExcepiton) {
      oAxiosResponse = oExcepiton.response;
    }
    let oResponse;
    if (oAxiosResponse && oAxiosResponse.data) {
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
