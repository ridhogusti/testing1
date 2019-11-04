const devConfig = {
  MONGO_URL:
    "mongodb+srv://ridhogusti:ridhogusti@cluster0-cpttz.mongodb.net/user?retryWrites=true&w=majority"
};

const testConfig = {
  MONGO_URL:
    "mongodb+srv://ridhogusti:ridhogusti@cluster0-cpttz.mongodb.net/user?retryWrites=true&w=majority"
};

const prodConfig = {
  MONGO_URL:
    "mongodb+srv://ridhogusti:ridhogusti@cluster0-cpttz.mongodb.net/user?retryWrites=true&w=majority"
};

const defaultConfig = {
  PORT: process.env.PORT || 3000
};

function envConfig(env) {
  switch (env) {
    case "development":
      return devConfig;
    case "test":
      return testConfig;
    default:
      return prodConfig;
  }
}

export default {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
