const JWT: any = {
  AUTHENTICATOR: JSON.parse(process.env.JWT_AUTHENTICATOR.toLocaleLowerCase()) ?? true,
  TIME: process.env.JWT_TIME ?? 60 * 1000
};

export default JWT;
