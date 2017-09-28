import express from 'express';
import recipeCtrl from './recipe';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to More Recipes'
  });
});

router.use('/recipes', recipeCtrl);


export default router;
