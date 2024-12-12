import * as process from 'node:process';

import * as dotenv from 'dotenv';

import { Config } from './config.type';

dotenv.config();
export default (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3100,
    host: process.env.APP_HOST || 'localhost',
  },
});