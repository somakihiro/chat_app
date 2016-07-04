import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import App from '../app'
import MessagesAction from '../actions/messages'
import UsersAction from '../actions/users'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateApp, this.loadMessages, this.loadUsers)
  }

  loadMessages(ctx, next) {
    MessagesAction.loadMessage()
    next()
  }

  loadUsers(ctx, next) {
    UsersAction.loadUser()
    next()
  }

  decorateApp(ctx, next) {
    (new ReactDecorator()).decorate('react-main', App)
    next()
  }
}
