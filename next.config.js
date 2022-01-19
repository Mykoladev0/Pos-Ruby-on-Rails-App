require('dotenv').config();

module.exports = {
  publicRuntimeConfig: {
    environment: process.env.ENV_NAME,
    bigcommerce: {
      appClientId: process.env.BC_APP_CLIENT_ID,
      appSecret: process.env.BC_APP_SECRET,
      appCallbackUrl: process.env.BC_APP_CALLBACK_URL,
    },
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    // https://github.com/vercel/next.js/issues/7755#issuecomment-508633125
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    return config;
  },
};