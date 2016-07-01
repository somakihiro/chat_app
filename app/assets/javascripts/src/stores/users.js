import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

class UserStore extends BaseStore {
  getUser() {
    if (!this.get('user')) this.set('user', [])
    return this.get('user')
  }

  setUser(array) {
    this.set('user', array)
  }
}

const User = new UserStore()

User.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    LOAD_USER(payload) {
      User.setUser(payload.action.json)
      User.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.User = User
export default User
