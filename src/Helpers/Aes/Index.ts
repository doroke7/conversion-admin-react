import aesjs from 'aes-js';

import CONFIGS from '@/CONFIGS/';

class AesHelper {
  public static encode(sString: string): string {
    return sString;
  }

  public static decode(sString: string): string {
    return sString;
  }

  public static encrypt(sString: string, sKey: string, sIv: string): string {
    var key = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    // The initialization vector (must be 16 bytes)
    var iv = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

    var sByteString = aesjs.utils.utf8.toBytes(sString);

    var oAesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
    var sEncryptedByteString = oAesCbc.encrypt(sByteString);

    // To print or store the binary data, you may convert it to hex
    var sEncryptedHexString = aesjs.utils.hex.fromBytes(sEncryptedByteString);

    return sEncryptedHexString;
  }

  public static decrypt(sString: string, sKey: string, sIv: string): string {
    return sString;
  }
}
export default AesHelper;
