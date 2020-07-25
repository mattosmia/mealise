export default function recipesReducer(state, action) {
  let date = '';
  switch (action.type) {
    case 'GET_MEAL_RECIPE_LIST':
      return ({
        ...state,
        mealList: action.payload.mealList,
        recipeList: action.payload.recipeList
      })

    case 'GET_PLANNER_LIST':
      return ({
        ...state,
        plannerList: action.payload
      })

    case 'ADD_PLANNER':
      action.payload.date = new Date(action.payload.date);
      date = `${action.payload.date.getFullYear()}-${(action.payload.date.getMonth() + 1)}-${action.payload.date.getDate()}`;
      if (!state.plannerList[date]) state.plannerList[date] = {}
      if (!state.plannerList[date][action.payload.mealId]) state.plannerList[date][action.payload.mealId] = []
      state.plannerList[date][action.payload.mealId].push(action.payload.recipeId)
      return state

    case 'DELETE_PLANNER':
      action.payload.date = new Date(action.payload.date);
      date = `${action.payload.date.getFullYear()}-${(action.payload.date.getMonth() + 1)}-${action.payload.date.getDate()}`;
      state.plannerList[date][action.payload.mealId] = state.plannerList[date][action.payload.mealId].filter(r => r !== action.payload.recipeId);
      if (state.plannerList[date][action.payload.mealId].length === 0) delete state.plannerList[date][action.payload.mealId]
      if (Object.values(state.plannerList[date]).length === 0) delete state.plannerList[date]
      return state

    default:
      return state
  }
}