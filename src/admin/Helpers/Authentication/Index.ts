class AuthenticationHelper {
  public static authorization(): string | null {
    let sJwt = window.localStorage.getItem('jwt') ?? '';
    return sJwt;
  }

  public static removeJwt(): void {
    window.localStorage.removeItem('jwt');
  }

  public static set(sJwt: string): void {
    window.localStorage.setItem('jwt', sJwt);
  }

  public static setPath(sPath) {
    let sKey = 'path';
    window.localStorage.setItem(sKey, sPath);
    return true;
  }

  public static getPath(): string | null {
    let sKey = 'path';

    let sPath = window.localStorage.getItem(sKey) ?? '';
    return sPath;
  }

  public static removePath(): void {
    let sKey = 'path';

    window.localStorage.removeItem(sKey);
  }
}

export default AuthenticationHelper;
