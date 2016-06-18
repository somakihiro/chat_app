import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Page from '../app'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decoratePage)
  }

  decoratePage(ctx, next) {
    (new ReactDecorator()).decorate('react-main', Page)
    next()
  }
}
