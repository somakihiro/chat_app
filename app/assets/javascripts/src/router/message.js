import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../components/messages/app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'
import MessagesStore from '../stores/messages'
import CurrentUserAction from '../actions/currentUser'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadUserMessages, this.loadUsers, this.loadCurrentUser)
  }

  loadUserMessages(ctx, next) {
    const openChatId = MessagesStore.getOpenChatUserId()
    MessagesAction.loadUserMessages(openChatId)
    next()
  }

  loadUsers(ctx, next) {
    UsersAction.loadUsers()
    next()
  }

  loadCurrentUser(ctx, next) {
    CurrentUserAction.loadCurrentUser()
    next()
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
