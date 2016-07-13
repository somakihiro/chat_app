import keyMirror from 'keymirror'

export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  FRIENDSHIPS: APIRoot + '/friendships',
}

export const ActionTypes = keyMirror({
  // messages
  LOAD_MESSAGE: null,
  SAVE_MESSAGE: null,
  UPDATE_OPEN_CHAT_ID: null,

  // user
  LOAD_USER: null,
  LOAD_CURRENT_USER: null,
  LOAD_SEARCH_USER: null,

  // friendships
  LOAD_FRIEND_SHIPS: null,
  SAVE_FRIEND: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
