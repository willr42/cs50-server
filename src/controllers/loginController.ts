import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db/database';

type loginBody = {
  email: string | undefined;
  password: string | undefined;
};

type UserRecord = {
  username: string;
  password: string;
};

declare module 'express-session' {
  interface SessionData {
    loggedIn: boolean;
    username: string;
    userId: number;
  }
}

const login: RequestHandler = async (req, res) => {
  const { email, password }: loginBody = req.body;
  if (!email || !password) {
    // no username or password
    return res.status(400).json({ error: 'Username or password empty.' });
  }

  // get db client
  const client = await pool.connect();

  try {
    const values = [email];
    const query = 'SELECT email, password, user_id FROM users WHERE email = $1';

    const dbResponse = await client.query(query, values);

    let user_id;

    const matchingUser = dbResponse.rows.find((row) => {
      user_id = row.user_id;
      return row.email === email;
    });

    if (!matchingUser) {
      return res.status(401).json({ error: 'No user exists.' });
    }

    //check password
    const listedPass = matchingUser.password;
    const match = await bcrypt.compare(password, listedPass);

    if (match) {
      // initialise session
      req.session.loggedIn = true;
      req.session.username = email;
      req.session.userId = user_id;

      console.log(req.session);
      return res.status(200).json({ message: 'successfully logged in' });
    }
    client.release();
    return res.status(500).json({ message: 'something went wrong' });
  } catch (error) {
    console.log(error);
  }
};

export default login;
