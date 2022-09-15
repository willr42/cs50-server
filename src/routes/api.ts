import express from 'express';
import { getRecipes, addRecipe } from '../controllers/recipesController';
const router = express.Router();

router.get('/recipes', getRecipes);
router.post('/recipes', addRecipe);

export default router;
