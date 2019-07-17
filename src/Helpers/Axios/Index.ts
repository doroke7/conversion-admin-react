import axios from "axios";

import {
  HTTP
} from "@/CONFIGS/";

let sHost = HTTP.HOST.replace(/\/$/, "");
sHost.replace(/^http(s)?:\/\//, "");
sHost = "http://" + sHost;

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";

// axios.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.headers.get["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.headers.delete["Content-Type"] = "application/x-www-form-urlencoded";

// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.put["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.delete["Access-Control-Allow-Origin"] = "*";

// axios.defaults.headers.post["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,PUT,DELETE,PATCH";
// axios.defaults.headers.put["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,PUT,DELETE,PATCH";
// axios.defaults.headers.get["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,PUT,DELETE,PATCH";
// axios.defaults.headers.delete["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,PUT,DELETE,PATCH";

// axios.defaults.headers.post["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
// axios.defaults.headers.put["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
// axios.defaults.headers.get["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
// axios.defaults.headers.delete["Access-Control-Allow-Headers"] = "Content-Type, Authorization";

// axios.defaults.headers.post["Access-Control-Allow-Credentials"] = "true";
// axios.defaults.headers.put["Access-Control-Allow-Credentials"] = "true";
// axios.defaults.headers.get["Access-Control-Allow-Credentials"] = "true";
// axios.defaults.headers.delete["Access-Control-Allow-Credentials"] = "true";

/**
 * AixosHelper
 * 利用 Axios 改写，
 * 能过批次处理 AJAX 的 类模组
 */
class AxiosHelper {
  /** 可以批次发送 AJAX 请求的 方法
   * @param {object | Array<object>} request The request of HTTP body
   * @param {boolean} isRecursive 使用同步模式 (递归模式), 也就是一个 AJAX 等待回应后才发下一个请求
   */
  public static async get(oRequest: any | any[], bRecursive: boolean = false): any {
    bRecursive = !!bRecursive;
    let oParams;
    if (oRequest instanceof Array) {
      let aRequests: any[] = oRequest;
      let aResponses: any[] = [];
      if (bRecursive) {
        let iIndex;
        let iLength = aRequests.length;
        for(iIndex = 0; iIndex < iLength; iLength++) {
          let oRequest = aRequests[iIndex];
          let _sUrl: string = oRequest.url || sHost + oRequest.path;
          oParams = oRequest.params;
          let oAxiosReponse = await axios.get(_sUrl, oParams);
          let oReponse = oAxiosReponse.data;
          aResponses.push(oReponse);
        }

        return aResponses;
      }

      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = oRequest.url || sHost + oRequest.path;
          let oParams = oRequest.params;
          let oAxiosReponse = await axios.get(_sUrl, oParams);
          let oReponse = oAxiosReponse.data;
          return oReponse;
        })
      );

      return aResponses;

    }

    let sUrl: string = oRequest.url || sHost + oRequest.path;
    oParams = oRequest.params;
    // params.headers = oHeaders;
    let oAxiosResponse = await axios.get(sUrl, oParams);
    let oResponse = oAxiosResponse.data;
    return oResponse;
  }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public static async post(oRequest: any | any[], bRecursive: boolean = false): any {
    bRecursive = !!bRecursive;
    let oParams;
    let oOptions;
    if (oRequest instanceof Array) {
      let aRequests: any[] = oRequest;
      let aResponses: any[] = [];
      if (bRecursive) {
        let iIndex;
        let iLength = aRequests.length;
        for(iIndex = 0; iIndex < iLength; iLength++) {
          let oRequest = aRequests[iIndex];
          let _sUrl: string = oRequest.url || sHost + oRequest.path;
          oParams = oRequest.params;
          oOptions = oRequest.options;

          let oAxiosReponse = await axios.post(_sUrl, oParams, oOptions);
          let oReponse = oAxiosReponse.data;
          aResponses.push(oReponse);
        }

        return aResponses;
      }
      
      aResponses = await Promise.all(
        aRequests.map(async (oRequest) => {
          let _sUrl: string = oRequest.url || sHost + oRequest.path;
          let oParams = oRequest.params;
          oOptions = oRequest.options;
          let oAxiosReponse = await axios.post(_sUrl, oParams, oOptions);
          let oReponse = oAxiosReponse.data;
          return oReponse;
        })
      );

      return aResponses;

    }

    let sUrl: string = oRequest.url || sHost + oRequest.path;
    oParams = oRequest.params;
    oOptions = oRequest.options;
    // params.headers = oHeaders;
    let oAxiosResponse = await axios.post(sUrl, oParams, oOptions);
    let oResponse = oAxiosResponse.data;
    return oResponse;
  }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public static put(url: string, params: object | object[], isPolling: boolean = false) {

  }

  /**
   * @param {string} url The URL of API laction
   * @param {object | Array<object>} params The params of HTTP body
   * @param {boolean} isPolling Use polling (recursive) to send the request
   */
  public static delete(url: string, params: object | object[], isPolling: boolean = false) {

  }
}
export default AxiosHelper;
