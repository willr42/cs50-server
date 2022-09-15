import { RequestHandler } from 'express';
import pool from '../db/database';

interface RecipeContents {
  name: string;
  source: string;
  time: number;
  serves: string;
  ingredients: Array<string>;
  method: Array<string>;
}

const getRecipes: RequestHandler = async (req, res) => {
  // is there a session?
  if (!req.session) {
    return res.status(404).json({ error: 'No session found' });
  }

  // Retrieve recipes from DB
  const user_id = req.session.userId;
  const client = await pool.connect();

  try {
    const values = [user_id];
    const query = 'SELECT recipe_id, contents FROM recipes WHERE user_id = $1';

    const dbResponse = await client.query(query, values);

    return res.status(200).json(dbResponse.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export { getRecipes };
