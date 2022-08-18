import CryptoJS from 'crypto-js';

import CONFIGS from '@/CONFIGS/INDEX';

class AesHelper {
  public static encode(sString: string): string {
    let sKey = CONFIGS.AES.KEY;
    let sIv = CONFIGS.AES.IV;
    let sResult = AesHelper.encrypt(sString, sKey, sIv);
    return sResult;
  }

  public static decode(sString: string): string {
    let sKey = CONFIGS.AES.KEY;
    let sIv = CONFIGS.AES.IV;
    let sResult = AesHelper.decrypt(sString, sKey, sIv);
    return sResult;
  }

  public static encrypt(sString: string, sKey: string, sIv: string): string {
    let _sKey = CryptoJS.enc.Utf8.parse(sKey);
    let _sIv = CryptoJS.enc.Utf8.parse(sIv);

    let _sString = CryptoJS.enc.Utf8.parse(sString);
    let oOption = { iv: _sIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
    let oEncrypted = CryptoJS.AES.encrypt(_sString, _sKey, oOption);
    let sResult = oEncrypted.ciphertext.toString();

    return sResult;
  }

  public static decrypt(sString: string, sKey: string, sIv: string): string {
    let _sKey = CryptoJS.enc.Utf8.parse(sKey);
    let _sIv = CryptoJS.enc.Utf8.parse(sIv);

    let _sString = CryptoJS.enc.Hex.parse(sString);
    let __sString = CryptoJS.enc.Base64.stringify(_sString);
    let oOption = { iv: _sIv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };

    let oEncrypted = CryptoJS.AES.decrypt(__sString, _sKey, oOption);
    let sResult = oEncrypted.toString(CryptoJS.enc.Utf8);
    return sResult.toString();
  }
}
export default AesHelper;
