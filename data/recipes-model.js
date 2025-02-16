const db = require('./db-config')

module.exports = {
  async getRecipeById(recipe_id) {
    const recipe = await db('recipes')
      .where('recipe_id', recipe_id)
      .first()

    if (!recipe) return null

    const steps = await db('steps as s')
      .leftJoin('step_ingredients as si', 's.step_id', 'si.step_id')
      .leftJoin('ingredients as i', 'si.ingredient_id', 'i.ingredient_id')
      .where('s.recipe_id', recipe_id)
      .select(
        's.step_id',
        's.step_number',
        's.step_instructions',
        'i.ingredient_id',
        'i.ingredient_name',
        'si.quantity'
      )
      .orderBy('s.step_number')

    const formattedSteps = steps.reduce((acc, curr) => {
      const existingStep = acc.find(s => s.step_id === curr.step_id)
      
      if (!existingStep) {
        acc.push({
          step_id: curr.step_id,
          step_number: curr.step_number,
          step_instructions: curr.step_instructions,
          ingredients: curr.ingredient_id ? [{
            ingredient_id: curr.ingredient_id,
            ingredient_name: curr.ingredient_name,
            quantity: curr.quantity
          }] : []
        })
      } else if (curr.ingredient_id) {
        existingStep.ingredients.push({
          ingredient_id: curr.ingredient_id,
          ingredient_name: curr.ingredient_name,
          quantity: curr.quantity
        })
      }
      
      return acc
    }, [])

    return {
      ...recipe,
      steps: formattedSteps
    }
  }
}
