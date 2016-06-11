import ReactDecorator from '../base/react_decorator'
import BaseRouter from '../base/router'
import Main from '../components/messages/main'

export default class CardRouter extends BaseRouter {
  register() {
    this.route('/', this.decorateMain)
  }

  decorateMain(ctx, next) {
    (new ReactDecorator()).decorate('react-main', Main)
    next()
  }
}
