const router = require('express').Router()
const Recipes = require('../data/recipes-model')

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipes.getRecipeById(req.params.id)
    if (!recipe) {
      res.status(404).json({ message: 'Recipe not found' })
    } else {
      res.json(recipe)
    }
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving recipe', error: err.message })
  }
})

module.exports = router
