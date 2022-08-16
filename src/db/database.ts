import pg from 'pg';
import stringToInt from '../util/stringToInt';
import dotenv from 'dotenv';

// configure dotenv
dotenv.config({ path: '/home/will/development/cs50-server/build/.env' });

// cast port to number type

const databaseEnv = {
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGHOST: process.env.PGHOST,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: stringToInt(process.env.PGPORT),
  DATABASE_URL: `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`,
};

const config: pg.PoolConfig = {
  user: databaseEnv.PGUSER,
  password: databaseEnv.PGPASSWORD,
  host: databaseEnv.PGHOST,
  database: databaseEnv.PGDATABASE,
  port: databaseEnv.PGPORT,
  connectionString: databaseEnv.DATABASE_URL,
};

const pool = new pg.Pool(config);

export default pool;
