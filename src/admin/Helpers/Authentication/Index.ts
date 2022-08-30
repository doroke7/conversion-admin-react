import jwtDecode from 'jwt-decode';

class AuthenticationHelper {
  /**
   * getUsrId
   */
  public static getUserId(): string | null {
    try {
      let sJwt = window.localStorage.getItem('jwt') ?? '';
      let oPayload: any = jwtDecode(sJwt);
      let sUserId = oPayload.uid;
      return sUserId;
    } catch (sException) {
      return null;
    }
  }

  public static getJwt(): string | null {
    let sJwt = window.localStorage.getItem('jwt') ?? '';
    return sJwt;
  }

  public static getExp(): number | null {
    try {
      let sJwt = window.localStorage.getItem('jwt') ?? '';
      let oPayload: any = jwtDecode(sJwt);
      let iExp = oPayload.exp;
      return iExp;
    } catch (sException) {
      return null;
    }
  }

  public static isExpired(): boolean {
    try {
      let sJwt = window.localStorage.getItem('jwt') ?? '';
      let oPayload: any = jwtDecode(sJwt);
      let iExp = oPayload.exp;
      let iTime = new Date().getTime() / 1000;
      if (iExp < iTime) {
        throw '';
      }
      return false;
    } catch (sException) {
      return true;
    }
  }

  public static removeJwt(): void {
    window.localStorage.removeItem('jwt');
  }

  public static removeLoginState(): void {
    window.localStorage.removeItem('loginState');
  }

  public static setJwt(sJwt: string): void {
    window.localStorage.setItem('jwt', sJwt);
  }

  public static getAccessToken() {
    let sAccessToken = '';

    try {
      let sLoginState = window.localStorage.getItem('loginState') || '';
      let oLoginState = JSON.parse(sLoginState);
      sAccessToken = oLoginState['accessToken'];
      return sAccessToken;
    } catch (sException) {
      return sAccessToken;
    }
  }
}

export default AuthenticationHelper;
