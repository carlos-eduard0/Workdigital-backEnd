require('dotenv/config');
const pg = require('pg');
pg.defaults.ssl = true;
let fs = require('fs');
module.exports = {
  development: {
    client: 'pg',
    connection: {
      username: 'carlos',
      password: 'gvo8md9l57ovjof0',
      host: 'workdigital-do-user-8024939-0.b.db.ondigitalocean.com',
      port: '25060',
      database: 'homolog',
      ssl: {
        ca: fs.readFileSync('ca-certificate.crt').toString(),
      }
    },
    pool: { min: 0, max: 7 },
    acquireConnectionTimeout: 10000,
    migrations: {
      directory: './src/database/migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      ssl: {
        ca: fs.readFileSync('ca-certificate.crt').toString(),
      }
    },
    pool: { min: 0, max: 7 },
    acquireConnectionTimeout: 10000,
    migrations: {
      directory: './src/database/migrations',
    },
  },
};