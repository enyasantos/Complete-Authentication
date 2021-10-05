import * as dotenv from 'dotenv';
dotenv.config();

export default {
  PORT: process.env.PORT || '',
  URLAPI: process.env.URI_API || '',
  MONGOURL: process.env.URI_MONGO_ATLAS || '',
  KEYJWT: process.env.KEY_JWT || '',
  KEYEMAILVERIFY: process.env.KEY_EMAIL_VERIFY || '',
};