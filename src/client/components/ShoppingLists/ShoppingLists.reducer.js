export default function shoppingListsReducer(state, action) {
  switch (action.type) {
    case 'GET_SHOPPINGLIST_LIST':
      return ([
       ...state,
       ...action.payload
     ])

    case 'EDIT_SHOPPINGLIST':
      const idx = state.findIndex(s => s._id === action.payload._id)
      state[idx] = {
        ...state[idx],
        ...action.payload
      }
      return orderAlphabetically(state,'name')

    case 'DELETE_SHOPPINGLIST':
      return state.filter(s => s._id !== action.payload._id)

    case 'RENAME_SHOPPINGLIST':
    break;

    case 'TOGGLE_SHOPPINGLIST_ITEM':
    break;

    case 'EDIT_SHOPPINGLIST_ITEM':
    break;

    case 'DELETE_SHOPPINGLIST_ITEM':
    break;

    case 'ADD_SHOPPINGLIST_ITEM':
    break;

    default:
      return state
  }
}