import CryptoJS from 'crypto-js';
import Exception from '@/admin/Exception/Index';

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

  public static decrypt(sString: string, sKey: string, sIv: string, oOptions: any = { 'format': 'hex', 'mode': 'cbc' }): string {
    let sResult = '';

    let sFormat = String(oOptions?.['format'] ?? 'hex');
    let sMode = String(oOptions?.['mode'] ?? 'cbc');

    sFormat = sFormat.toLowerCase();
    sMode = sMode.toLowerCase();


    try {

      let aKeyparts = CryptoJS.enc.Utf8.parse(sKey);
      let aIvparts = CryptoJS.enc.Utf8.parse(sIv);


      let aStringParts: any = [];
      aStringParts = sFormat == 'base64' ? CryptoJS.enc.Base64.parse(sString) : aStringParts;
      aStringParts = sFormat == 'hex' ? CryptoJS.enc.Hex.parse(sString) : aStringParts;

      let sBase64 = CryptoJS.enc.Base64.stringify(aStringParts);

      let iMode = CryptoJS.mode.CBC;
      iMode = sMode == 'cbc' ? CryptoJS.mode.CBC : iMode;
      iMode = sMode == 'ecb' ? CryptoJS.mode.ECB : iMode;

      let oOption = {
        mode: iMode,
        padding: CryptoJS.pad.Pkcs7
      } as any;

      if (sMode == 'cbc') {
        oOption = {
          ...oOption,
          iv: aIvparts
        };
      };

      let oEncrypted = CryptoJS.AES.decrypt(sBase64, aKeyparts, oOption);
      let mResult = oEncrypted.toString(CryptoJS.enc.Utf8);
      sResult = mResult.toString();

    } catch (oError: any) {

      throw new Exception('解密失败', -3);
    };


    return sResult;
  }
}
export default AesHelper;
