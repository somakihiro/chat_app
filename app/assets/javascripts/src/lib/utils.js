import _ from 'lodash'
import $ from '../vendor/jquery'
import {CSRFToken} from '../constants/app'

const ChatAppModule = {
  post: (path, params) => {
    params['authenticity_token'] = CSRFToken()
    const form = $('<form></form>')
    form.attr('method', 'post')
    form.attr('action', path)

    _.each(params, (value, key) => {
      const field = $('<input></input>')
      field.attr('type', 'hidden')
      field.attr('name', key)
      field.attr('value', value)
      form.append(field)
    })

    $(document.body).append(form)
    form.submit()
  },

  patch: (path, params) => {
    params['_method'] = 'patch'
    ChatAppModule.post(path, params)
  },

  delete: (path) => {
    const params = {'_method': 'delete'}
    ChatAppModule.post(path, params)
  },
}

window.ChatAppModule = ChatAppModule
export default ChatAppModule
