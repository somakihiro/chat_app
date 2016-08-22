import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UserStore from './users'
import CurrentUserStore from './currentUser'
import MessagesAction from '../actions/messages'

let openChatId = parseInt(Object.keys(UserStore.getUsers())[0], 10)

class MessageStore extends BaseStore {

  getOpenChatUserId() {
    const users = UserStore.getUsers()
    if (Number.isNaN(openChatId) && users.length !== 0) {
      openChatId = users[0].id
      MessagesAction.loadUserMessages(openChatId)
    }
    return openChatId
  }

  getUserMessages() {
    if (!this.get('userMessages')) this.setUserMessages({})
    return this.get('userMessages')
  }

  setUserMessages(obj) {
    this.set('userMessages', obj)
  }

}

const MessagesStore = new MessageStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const actions = {
    LOAD_USER_MESSAGES(payload) {
      openChatId = payload.action.id
      MessagesStore.setUserMessages(payload.action.json)
      MessagesStore.emitChange()
    },

    SAVE_MESSAGE(payload) {
      const messages = CurrentUserStore.getCurrentUser().messages
      const currentUserId = CurrentUserStore.getCurrentUser().id
      messages.push({
        id: Math.floor(Math.random() * 1000000),
        body: payload.action.body,
        to_user_id: payload.action.to_user_id,
        user_id: currentUserId,
      })
      MessagesStore.emitChange()
    },

    SAVE_IMAGE_CHAT(payload) {
      const messages = CurrentUserStore.getCurrentUser().messages
      const currentUserId = CurrentUserStore.getCurrentUser().id
      messages.push({
        image: payload.action.image,
        to_user_id: payload.action.to_user_id,
        user_id: currentUserId,
      })
      MessagesStore.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.MessagesStore = MessagesStore
export default MessagesStore
