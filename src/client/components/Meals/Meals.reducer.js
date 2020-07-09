export default function mealsReducer(state, action) {
  console.log('state',state, 'action', action)
  switch (action.type) {
    case 'GET_MEAL_LIST':
      return ([
        ...state,
        ...action.payload
      ])

    case 'REORDER_MEAL_LIST':
      return action.payload

    case 'EDIT_MEAL':
    break;

    case 'DELETE_MEAL':
      return state.filter(m => m._id !== action.payload._id)

    case 'ADD_MEAL':
      return ([
        ...state,
        ...[action.payload]
      ])

    default:
      return state
  }
}