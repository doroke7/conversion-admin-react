class AuthenticationHelper {
  public static authorization(): string | null {
    let sJwt = window.localStorage.getItem('jwt') ?? '';
    return sJwt;
  }

  public static remove(): void {
    window.localStorage.removeItem('jwt');
  }

  public static set(sJwt: string): void {
    window.localStorage.setItem('jwt', sJwt);
  }

}

export default AuthenticationHelper;
