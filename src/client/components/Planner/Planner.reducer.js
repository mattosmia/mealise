export default function recipesReducer(state, action) {
  switch (action.type) {
    case 'GET_MEAL_RECIPE_LIST':
      return ({
        ...state,
        mealList: action.payload.mealList,
        recipeList: action.payload.recipeList,
      })

    default:
      return state
  }
}