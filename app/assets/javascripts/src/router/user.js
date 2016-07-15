import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Search from '../components/users/search'
import UsersAction from '../actions/users'
// import MessagesAction from '../actions/messages'

export default class UserRouter extends BaseRouter {
  register() {
    this.route('/users/search', this.decorateSearch, this.loadSearchUsers, this.loadCurrentUser)
  }

  loadSearchUsers(ctx, next) {
    UsersAction.loadSearchUsers()
    next()
  }

  loadCurrentUser(ctx, next) {
    UsersAction.loadCurrentUser()
    next()
  }

  decorateSearch(ctx, next) {
    (new ReactDecorator()).decorate('react-main', Search)
    next()
  }
}
