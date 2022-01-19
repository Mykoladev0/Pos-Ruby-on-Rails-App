import dotenv from "dotenv";
import BigCommerce from "node-bigcommerce";

dotenv.config();
export default new BigCommerce({
  logLevel: "info",
  accessToken: null,
  storeHash: null,
  clientId: `${process.env.BC_APP_CLIENT_ID}`,
  secret: `${process.env.BC_APP_SECRET}`,
  callback: `${process.env.BC_APP_CALLBACK_URL}`,
  responseType: "json",
  apiVersion: "v3",
});
