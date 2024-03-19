declare function require(moduleName: string): any;

export const AppConfig = {
  production: false,
  environment: 'LOCAL',
  BASE_URL: `http://192.168.31.194:8082/v1`,
  COUPON_API: `http://192.168.31.194:8082/v1`,
  ROLE_URL: 'http://localhost:4201',
  FRONT_END_URL: 'http://localhost:4200/',
  S3_BUCKET_URL: 'http://localhost:4200/',
  TALLY_API: "http://localhost:8083/v1",
  WebSocketApi: `ws://192.168.31.194:8082/`,
  logger: {
    level: 'TRACE',
  },
  callback:()=>{
   
  },
  appVersion: require('../../package.json').version,
};

