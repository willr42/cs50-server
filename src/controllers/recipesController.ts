import { RequestHandler } from 'express';
import pool from '../db/database';
import timeStringToMinutes from '../util/timeStringToMinutes';

interface RecipeContents {
  name: string;
  source: string;
  time: string | number;
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
  const userId = req.session.userId;

  try {
    const client = await pool.connect();
    const values = [userId];
    const query = 'SELECT recipe_id, contents FROM recipes WHERE user_id = $1';

    const dbResponse = await client.query(query, values);

    client.release();
    return res.status(200).json(dbResponse.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const addRecipe: RequestHandler = async (req, res) => {
  if (!req.session) {
    return res.status(404).json({ error: 'No session found' });
  }

  const userId = req.session.userId;
  let newRecipe: RecipeContents = req.body;

  if (!userId || !newRecipe) {
    return res.status(500).json({ error: 'Something went wrong' });
  }

  // parse time string to num
  newRecipe.time = timeStringToMinutes(newRecipe.time);
  console.log(newRecipe);

  try {
    const client = await pool.connect();
    const values = [userId, newRecipe];
    const query = 'INSERT INTO recipes(user_id, contents) VALUES ($1, $2)';

    const dbResponse = await client.query(query, values);

    client.release();
    return res.status(201).json({ message: 'Recipe added' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export { getRecipes, addRecipe };
