const env = process.env.NODE_ENV;// 'dev' or 'test'
const prod = {
  app: {
    PORT: 3000
  },
  db: {
    url: 'mongodb://localhost:27017/sample'
  }
};

const dev = {
  app: {
    PORT: 3003
  },
  db: {
    url: 'mongodb://localhost:27017/sample'
  }
};

const config = {
  dev,
  prod
};

module.exports = config[env];