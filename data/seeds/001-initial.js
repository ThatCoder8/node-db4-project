exports.seed = async function(knex) {
  await knex('step_ingredients').truncate()
  await knex('ingredients').truncate()
  await knex('steps').truncate()
  await knex('recipes').truncate()
  
  await knex('recipes').insert([
    { recipe_id: 1, recipe_name: 'Spaghetti Bolognese' }
  ])
  
  await knex('steps').insert([
    { step_id: 11, recipe_id: 1, step_number: 1, step_instructions: 'Put a large saucepan on a medium heat' },
    { step_id: 12, recipe_id: 1, step_number: 2, step_instructions: 'Add 1 tbsp olive oil' }
  ])
  
  await knex('ingredients').insert([
    { ingredient_id: 27, ingredient_name: 'olive oil' }
  ])
  
  await knex('step_ingredients').insert([
    { step_id: 12, ingredient_id: 27, quantity: 0.014 }
  ])
}
