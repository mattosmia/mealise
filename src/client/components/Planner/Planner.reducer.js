export default function recipesReducer(state, action) {
  switch (action.type) {
    case 'GET_MEAL_LIST':
      return ({
        ...state,
        meals: action.payload
      })

    default:
      return state
  }
}