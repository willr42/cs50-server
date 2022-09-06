import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { validate } from 'email-validator';
import pool from '../db/database';

type registerBody = {
  email: string | undefined;
  fullName: string | undefined;
  password: string | undefined;
};

// Code inspired by Dave Gray

const addNewUser: RequestHandler = async (req, res) => {
  const { email, password, fullName }: registerBody = req.body;
  if (!email || !password || !fullName) {
    // no password
    return res.status(400).json({ error: 'Email, password or name empty.' });
  }

  const client = await pool.connect();

  // check for existing account
  try {
    const values = [email];
    const query = 'SELECT email FROM users WHERE email = $1';

    const dbResponse = await client.query(query, values);

    const duplicate = dbResponse.rows.find((row) => row.email === email);
    if (duplicate) {
      console.log(`Duplicate email found: ${email}`);
      return res.status(409).json({ error: 'User already exists.' });
    }
  } catch (error) {
    console.log(error);
  }

  // create new account
  try {
    // hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // email validation
    const validEmail = validate(email);

    // email invalid
    if (!validEmail) {
      client.release();
      return res.status(400).json({ error: 'Email invalid' });
    }

    // declare user
    const newUser = {
      email: email,
      fullName: fullName,
      password: hashedPass,
      createdAt: new Date(),
    };

    const values = [
      newUser.email,
      newUser.password,
      newUser.fullName,
      newUser.createdAt,
    ];
    const query =
      'INSERT INTO users(email, password, name, created_at) VALUES ($1, $2, $3, $4)';

    const dbResponse = await client.query(query, values);
    console.log(`New user ${email} created`);
    client.release();
    return res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log(error);
  }
};

export { addNewUser };
