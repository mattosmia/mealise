import { orderAlphabetically } from '../../helpers/sort';

export default function mealsReducer(state, action) {
    switch (action.type) {
    case 'GET_INGREDIENT_LIST':
       return ([
        ...state,
        ...action.payload
      ])
    case 'EDIT_INGREDIENT':
      const idx = state.findIndex(i => i._id === action.payload._id)
      state[idx] = {
        ...state[idx],
        ...action.payload
      }
      return orderAlphabetically(state,'name')

    case 'DELETE_INGREDIENT':
      return state.filter(i => i._id !== action.payload._id)

    case 'ADD_INGREDIENT':
      return (
        orderAlphabetically([
          ...state,
          ...[action.payload]
        ],'name'))

    default:
      return state
  }
}