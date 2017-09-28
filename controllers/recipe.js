import express from 'express';

const router = express.Router();

global.recipes = [
  {
    id: 1,
    name: 'Okro soup',
    description: 'This is how to make okro soup',
    ingredient: 'Okro and water',
    image: 'someimage',
    upvote: 23,
    downvote: 3
  },
  {
    id: 2,
    name: 'Afang soup',
    description: 'This is how to make afang soup',
    ingredient: 'afang and water',
    image: 'afangimage',
    upvote: 9,
    downvote: 3
  },
  {
    id: 3,
    name: 'Pepper soup',
    description: 'This is how to make pepper soup',
    ingredient: 'pepper, seasoning and water',
    image: 'pepper_img',
    upvote: 19,
    downvote: 0
  }
];

global.reviews = [{ id: 1, recipeId: 3, review: 'A very tasty meal it is' }];

router.get('/', (req, res) => {
  return res.json({
    recipes: global.recipes,
    error: false
  });
});

router.post('/', (req, res) => {
  if (!req.body.name) {
    return res.json({
      message: 'Recipe parameter(s) missing',
      error: true
    });
  }
  global.recipes.push(req.body);
  return res.json({
    message: 'Recipe successfully created',
    status: 200,
    error: false
  });
});

router.post('/:recipeId/reviews', (req, res) => {
  if (!req.body.review) {
    return res.json({
      message: 'Review parameter(s) missing',
      error: true
    });
  }
  global.reviews.push(req.body);
  return res.json({
    message: 'Review successfully created',
    status: 200,
    error: false
  });
});

router.put('/:recipeId', (req, res) => {
  for (let i = 0; i < global.recipes.length; i += 1) {
    if (global.recipes[i].id === parseInt(req.params.recipeId, 10)) {
      global.recipes[i].name = req.body.name;
      global.recipes[i].description = req.body.description;
      global.recipes[i].ingredient = req.body.ingredient;
      global.recipes[i].image = req.body.image;
      return res.json({
        message: 'Recipe successfully updated',
        error: false
      });
    }
  }
  return res.status(404).json({
    message: 'No recipe found',
    error: true
  });
});

router.delete('/:recipeId', (req, res) => {
  for (let i = 0; i < global.recipes.length; i += 1) {
    if (global.recipes[i].id === parseInt(req.params.recipeId, 10)) {
      global.recipes.splice(i, 1);
      return res.json({
        message: 'Recipe Deletion succesful',
        error: false
      });
    }
  }
  return res.status(404).json({
    message: 'No recipe found',
    error: true
  });
});

router.get('/:recipeId', (req, res) => {
  for (let i = 0; i < global.recipes.length; i += 1) {
    if (global.recipes[i].id === parseInt(req.params.recipeId, 10)) {
      return res.json({
        recipe: global.recipes[i],
        message: 'Recipe found',
        error: false
      });
    }
  }
  return res.status(404).json({
    message: 'No recipe found',
    error: true
  });
});

export default router;
