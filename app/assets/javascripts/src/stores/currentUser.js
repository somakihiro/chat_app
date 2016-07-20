import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

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
  const actions = {
    LOAD_CURRENT_USER(payload) {
      CurrentUser.setCurrentUser(payload.action.json)
      CurrentUser.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.CurrentUser = CurrentUser
export default CurrentUser
