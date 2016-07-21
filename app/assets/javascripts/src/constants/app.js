import keyMirror from 'keymirror'

export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS: APIRoot + '/users',
  FRIENDSHIPS: APIRoot + '/friendships',
  CURRENT_USER: APIRoot + '/current_user',
}

export const ActionTypes = keyMirror({
  // messages
  LOAD_MESSAGES: null,
  SAVE_MESSAGE: null,
  UPDATE_OPEN_CHAT_ID: null,

  // user
  LOAD_USERS: null,
  LOAD_CURRENT_USER: null,
  LOAD_SEARCH_USERS: null,
  LOAD_USER_MESSAGES: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
