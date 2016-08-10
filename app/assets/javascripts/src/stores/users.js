import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'

class UserStore extends BaseStore {
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

  setUsers(array) {
    this.set('users', array)
  }
}

const User = new UserStore()

User.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    LOAD_USERS(payload) {
      User.setUsers(payload.action.json)
      User.emitChange()
    },

    LOAD_SEARCH_USERS(payload) {
      User.setUsers(payload.action.json)
      User.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.User = User
export default User
