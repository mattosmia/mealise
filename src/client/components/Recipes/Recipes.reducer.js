export default function recipesReducer(state, action) {
  switch (action.type) {
    case 'GET_RECIPE_LIST':
      return ({
        ...state,
        ingredientList: [
          ...state.ingredientList,
          ...action.payload.ingredientList
        ],
        recipeList: [
          ...state.recipeList,
          ...action.payload.recipeList
        ]
      })

    case 'EDIT_RECIPE':
      const idx = state.recipeList.findIndex(r => r._id === action.payload._id)
      state.recipeList[idx] = {
        ...state.recipeList[idx],
        ...action.payload
      }
      return state

    case 'DELETE_RECIPE':
      return ({
        ...state,
        recipeList: state.recipeList.filter(r => r._id !== action.payload._id)
      })

    case 'ADD_RECIPE':
      return ({
        ...state,
        ingredientList: [
          ...state.ingredientList
        ],
        recipeList: [
          ...state.recipeList,
          action.payload
        ]
      })

    default:
      return state
  }
}