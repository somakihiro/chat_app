import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class CurrentUserStore extends BaseStore {
  getCurrentUser() {
    if (!this.get('currentUser')) this.setCurrentUser({})
    return this.get('currentUser')
  }

  setCurrentUser(obj) {
    this.set('currentUser', obj)
  }
}

const CurrentUser = new CurrentUserStore()

CurrentUser.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.LOAD_CURRENT_USER:
      CurrentUser.setCurrentUser(payload.action.json)
      CurrentUser.emitChange()
      break
  }

  return true
})

window.CurrentUser = CurrentUser
export default CurrentUser
