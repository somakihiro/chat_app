import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import User from './users'
import CurrentUserStore from './currentUser'

let openChatID = parseInt(Object.keys(User.getUsers())[0], 10)

class MessageStore extends BaseStore {

  getOpenChatUserID() {
    return openChatID
  }

  getChatByUserID(id) {
    return User.getUsers()[id]
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
    UPDATE_OPEN_CHAT_ID(payload) {
      openChatID = payload.action.userID
      // messages[openChatID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
    },

    LOAD_USER_MESSAGES(payload) {
      MessagesStore.setUserMessages(payload.action.json)
      MessagesStore.emitChange()
    },

    // sendMessage(payload) {
    //   const messages = MessagesStore.getMessage()
    //   messages.push({
    //     id: Math.floor( Math.random() * 1000000 ),
    //     message: payload.action.message,
    //   })
      // const userID = payload.action.userID
      // messages[userID].messages.push({
      //   contents: payload.action.message,
      //   timestamp: payload.action.timestamp,
      //   from: UserStore.user.id,
      // })
      // messages[userID].lastAccess.currentUser = +new Date()
    //   MessagesStore.emitChange()
    // },

    SAVE_MESSAGE(payload) {
      const messages = CurrentUserStore.getCurrentUser().messages
      messages.push({
        id: Math.floor(Math.random() * 1000000),
        // id: payload.action.id,
        body: payload.action.body,
        to_user_id: payload.action.to_user_id,
        user_id: payload.action.user_id,
        image: payload.action.image,
      })
      MessagesStore.emitChange()
    },

    SAVE_IMAGE_CHAT(payload) {
      const messages = CurrentUserStore.getCurrentUser().messages
      messages.push({
        image: payload.action.image,
        to_user_id: payload.action.to_user_id,
        user_id: payload.action.user_id,
      })
      MessagesStore.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.MessagesStore = MessagesStore
export default MessagesStore
