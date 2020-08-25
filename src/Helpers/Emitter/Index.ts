import { EventEmitter } from 'events';

class EmitterHelper {
  public constructor() {}

  public static eventEmitter: any = new EventEmitter();

  public static on(sName: string, oListener: any) {
    EmitterHelper.eventEmitter.on(sName, oListener);
  }

  public static removeEventListener(sName: string, oListener: any) {
    EmitterHelper.eventEmitter.removeListener(sName, oListener);
  }

  public static emit(sName: string, oPayload: any, oError = false) {
    EmitterHelper.eventEmitter.emit(sName, oPayload, oError);
  }
}

export default EmitterHelper;
