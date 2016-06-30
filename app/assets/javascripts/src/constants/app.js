import keyMirror from 'keymirror'

export const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
export const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  USERS_SEARCH: APIRoot + '/users/search',
}

export const ActionTypes = keyMirror({
  // messages
  LOAD_MESSAGE: null,
  SAVE_MESSAGE: null,
  // user search
  LOAD_USER: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}
