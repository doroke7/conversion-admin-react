const JWT: any = {
  AUTHENTICATOR: process.env.AUTHENTICATOR ?? true,
  TIME: process.env.TIME ?? 60 * 1000
};

export default JWT;
