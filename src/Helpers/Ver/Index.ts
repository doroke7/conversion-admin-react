import semver from 'semver';

class VerHelper {
  /**
   * getUsrId
   */
  public static get(): string {
    let sVerKey = 'Ver';
    /*
     * TITLE: 客户端当前版本号
     */
    let sVer = window.localStorage.getItem(sVerKey) ?? '';

    return sVer;
  }

  public static set(sVer: string): boolean {
    if (semver.valid(sVer)) {
      let sVerKey = 'Ver';
      window.localStorage.setItem(sVerKey, sVer);
    }

    return true;
  }

  public static valid(sVer1: string): any {
    let bResult = semver.valid(sVer1);
    return bResult;
  }

  public static compare(sVer1: string, sVer2: string): any {
    let iResult = 0;
    if (semver.eq(sVer1, sVer2)) {
      iResult = 0;
    }

    if (semver.lt(sVer1, sVer2)) {
      iResult = -1;
    }

    if (semver.gt(sVer1, sVer2)) {
      iResult = 1;
    }

    return iResult;
  }
}

export default VerHelper;
