import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
// import UsersAction from '../actions/users'

class UserStore extends BaseStore {
  getUsers() {
    if (!this.get('users')) this.setUsers([])
    return this.get('users')
  }

  setUsers(array) {
    this.set('users', array)
  }

  // getCurrentUser() {
  //   // return UsersAction.loadCurrentUser()
  //   if (!this.get('currentUser')) this.setCurrentUser({})
  //   return this.get('currentUser')
  // }

  // setCurrentUser(obj) {
  //   this.set('currentUser', obj)
  // }
}

const User = new UserStore()

User.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    LOAD_USERS(payload) {
      User.setUsers(payload.action.json)
      User.emitChange()
    },

    // LOAD_CURRENT_USER(payload) {
    //   User.setCurrentUser(payload.action.json)
    //   User.emitChange()
    // },

    LOAD_SEARCH_USERS(payload) {
      User.setUsers(payload.action.json)
      User.emitChange()
    },
    // LOAD_USERS_ALL(payload) {
    //   User.setUsersAll(payload.action.json)
    //   User.emitChange()
    // }
    // LOAD_USER_ID(payload) {
    //   User.setUser(payload.aciton.json)
    //   User.emitChange()
    // },
    // LOAD_FRIEND_USER(payload) {
    //   User.setUser(payload.action.json)
    //   User.emitChange()
    // },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.User = User
export default User
