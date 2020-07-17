export default function recipeIngredientsReducer(state, action) {
  switch (action.type) {
    case 'GET_RECIPE_INGREDIENT_LIST':
      return ({
        ...state,
        ...action.payload
      })

    case 'EDIT_RECIPE_INGREDIENT':
    break;

    case 'DELETE_RECIPE_INGREDIENT':
    break;

    case 'ADD_RECIPE_INGREDIENT':
    break;

    default:
      return state
  }
}