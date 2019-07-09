import jwtDecode from "jwt-decode";

class AuthenticationHelper {
  /**
   * getUsrId
   */
  public static getUserId(): string | null {
    try {
      let sJwt = window.localStorage.getItem("jwt") || "";
      let oPayload: any = jwtDecode(sJwt);
      let sUserId = oPayload.uid;
      return sUserId;
    } catch (sException) {
      return null;
    }
  }

  public static getUserUrl(): string | null {
    try {
      let sJwt = window.localStorage.getItem("jwt") || "";
      let oPayload: any = jwtDecode(sJwt);
      let sUrl = oPayload.url;
      return sUrl;
    } catch (sException) {
      return null;
    }
  }

  public static getUserRole(): string | null {
    try {
      let sJwt = window.localStorage.getItem("jwt") || "";
      let oPayload: any = jwtDecode(sJwt);
      let sRole = oPayload.role;
      return sRole;
    } catch (sException) {
      return null;
    }
  }

  public static getUserNickname(): string | null {
    try {
      let sJwt = window.localStorage.getItem("jwt") || "";
      let oPayload: any = jwtDecode(sJwt);
      let sNickname = oPayload.nickname;
      return sNickname;
    } catch (sException) {
      return null;
    }
  }

  public static getJwt(): string | null {
    let sJwt = window.localStorage.getItem("jwt");
    return sJwt;
  }

  public static getExp(): number | null {
    try {
      let sJwt = window.localStorage.getItem("jwt") || "";
      let oPayload: any = jwtDecode(sJwt);
      let iExp = oPayload.exp;
      return iExp;
    } catch (sException) {
      return null;
    }
  }

  public static getUserLevel(): number | null {
    try {
      let sJwt = window.localStorage.getItem("jwt") || "";
      let oPayload: any = jwtDecode(sJwt);
      let ilevel = oPayload.level;
      return ilevel;
    } catch (sException) {
      return null;
    }
  }

  public static isExpired(): boolean {
    try {
      let sJwt = window.localStorage.getItem("jwt") || "";
      let oPayload: any = jwtDecode(sJwt);
      let iExp = oPayload.exp;
      let iTime = new Date().getTime() / 1000;
      if (iExp < iTime) {
        throw "";
      }
      return false;
    } catch (sException) {
      return true;
    }
  }

  public static removeJwt(): void {
    window.localStorage.removeItem("jwt");
  }

  public static setJwt(sJwt: string): void {
    window.localStorage.setItem("jwt", sJwt);
  }

  public static getAccessToken() {
    let sAccessToken = "";

    try {
      let sLoginState = window.localStorage.getItem("loginState") || "";
      let oLoginState = JSON.parse(sLoginState);
      sAccessToken = oLoginState['accessToken'];
      return sAccessToken;
    } catch(sException) {
      return sAccessToken;
    }

  }
}

export default AuthenticationHelper;
