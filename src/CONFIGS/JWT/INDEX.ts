const JWT: any = {
  AUTHORIZATION: JSON.parse((process.env.JWT_AUTHORIZATION ?? 'true').toLowerCase()),
  TIME: process.env.JWT_TIME ?? 60 * 1000
};

export default JWT;
