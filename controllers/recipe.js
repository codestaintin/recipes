import express from 'express';
import faker from 'faker';

const router = express.Router();

global.recipes = [
  {
    id: 1,
    name: faker.name.findName(),
    description: faker.lorem.text(),
    ingredient: faker.lorem.sentence(),
    image: faker.image.food(),
    upvote: faker.random.number(),
    downvote: faker.random.number()
  }
];

global.reviews = [
  {
    id: 1,
    recipeId: 3,
    review: faker.lorem.sentence()
  }
];

router.get('/', (req, res) => {
  return res.json({
    recipes: global.recipes,
    error: false
  });
});

router.post('/', (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.ingredient || !req.body.image) {
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
  global.recipes.forEach((element) => {
    if (element.id === parseInt(req.params.recipeId, 10)) {
      element.name = req.body.name;
      element.description = req.body.description;
      element.ingredient = req.body.ingredient;
      element.image = req.body.image;
      element.upvote = req.body.upvote;
      element.downvote = req.body.downvote;
      return res.json({
        message: 'Recipe successfully updated',
        error: false
      });
    }
  });
  res.status(404).json({
    message: 'No recipe found',
    error: true
  });
});

router.delete('/:recipeId', (req, res) => {
  const newRecipes = global.recipes.filter((recipes) => {
    if (recipes.id !== parseInt(req.params.recipeId, 10)) {
      return recipes;
    }
  });
  console.log('Line87', global.recipes);
  const isFound = newRecipes.length !== global.recipes.length;
  global.recipes = isFound ? newRecipes : global.recipes;
  return res.status(isFound ? 200 : 404).json({
    message: isFound ? 'Recipe Deletion Succesful' : 'No recipe found',
    error: !isFound
  });
});

router.get('/:recipeId', (req, res) => {
  global.recipes.forEach((element) => {
    if (element.id === parseInt(req.params.recipeId, 10)) {
      return res.json({
        recipe: element,
        message: 'Recipe found',
        error: false
      });
    }
  });
  return res.status(404).json({
    message: 'No recipe found',
    error: true
  });
});

export default router;
