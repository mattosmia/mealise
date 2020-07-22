export default function recipesReducer(state, action) {
  switch (action.type) {
    case 'GET_MEAL_RECIPE_LIST':
      return ({
        ...state,
        mealList: action.payload.mealList,
        recipeList: action.payload.recipeList,
      })
    case 'GET_PLANNER_LIST':
      return ({
        ...state,
        plannerList: action.payload
      })
    case 'ADD_PLANNER':
      const newPlanner = {};
      action.payload.date = new Date(action.payload.date);
      const date = `${action.payload.date.getFullYear()}-${(action.payload.date.getMonth() + 1)}-${action.payload.date.getDate()}`;
      if (!state.plannerList[date]) state.plannerList[date] = {}
      if (!state.plannerList[date][action.payload.mealId]) state.plannerList[date][action.payload.mealId] = []
      state.plannerList[date][action.payload.mealId].push(action.payload.recipes[0]._id)
      return state

    default:
      return state
  }
}