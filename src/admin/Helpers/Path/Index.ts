class PathHelper {

  public static set(sPath) {
    let sKey = 'path';
    window.localStorage.setItem(sKey, sPath);
    return true;
  }

  public static get(): string | null {
    let sKey = 'path';

    let sPath = window.localStorage.getItem(sKey) ?? '';
    return sPath;
  }

  public static remove(): void {
    let sKey = 'path';

    window.localStorage.removeItem(sKey);
  }
}

export default PathHelper;
