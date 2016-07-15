import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'
// import FriendshipsAction from '../actions//friendships'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadMessages, this.loadUsers, this.loadCurrentUser)
  }

  loadMessages(ctx, next) {
    MessagesAction.loadMessages()
    next()
  }

  loadUsers(ctx, next) {
    UsersAction.loadUsers()
    next()
  }

  // loadUsersAll(ctx, next) {
  //   UsersAction.loadUserAll()
  //   next()
  // }

  loadCurrentUser(ctx, next) {
    UsersAction.loadCurrentUser()
    next()
  }

  // loadFriendships(ctx, next) {
  //   FriendshipsAction.loadFriendships()
  //   next()
  // }

  // loadUsersID(ctx, next) {
  //   UsersAction.loadUserID()
  //   next()
  // }

  // loadFriendUsers(ctx, next) {
  //   UsersAction.loadFriendUser()
  //   next()
  // }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
