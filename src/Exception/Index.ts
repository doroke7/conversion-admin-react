class Exception {
  public code: number;
  public message: string;

  constructor(sMessage, iCode = 1) {
    this.message = sMessage;
    this.code = iCode;
  }
}

export default Exception;
