import JSEncrypt from 'jsencrypt';

import CONFIGS from '@/admin/CONFIGS/INDEX';

class RsaHelper {
  public static encode(sString: string): string {
    let sPublicKey = CONFIGS.RSA.ADMIN_REQUEST_PUBLIC_KEY;
    let sResult = RsaHelper.encrypt(sString, sPublicKey);
    return sResult;
  }

  public static decode(sString: string): string {
    let sPrivateKey = CONFIGS.RSA.ADMIN_RESPONSE_PRIVATE_KEY;
    let sResult = RsaHelper.decrypt(sString, sPrivateKey);
    return sResult;
  }

  public static encrypt(sString: string, sPublicKey: string): string {
    let oJSEncrypt = new JSEncrypt(); // 创建加密对象实例
    oJSEncrypt.setPublicKey(sPublicKey); //设置公钥
    let sResult = oJSEncrypt.encrypt(sString).toString(); // 对内容

    return sResult;
  }

  public static decrypt(sString: string, sPrivateKey: string): string {
    let oJSEncrypt = new JSEncrypt(); //创建解密对象实例
    oJSEncrypt.setPrivateKey(sPrivateKey); //设置秘钥
    var sResult = oJSEncrypt.decrypt(sString).toString(); //解密之前拿公钥加密的内容
    return sResult;
  }
}
export default RsaHelper;
