const API: any = {
  HOST: process.env.API_HOST || 'api.fea.ycdis-test.xyz',
  PROTOCOL: process.env.API_PROTOCOL ?? 'http',
  SALT: process.env.API_SALT || 'PmWTE2!=xPC@6jwN'
};


export default API;
