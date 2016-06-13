import Dispatcher from '../dispatcher'
import {EventEmitter} from 'events'
import assign from 'object-assign'

const messages = {
  2: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 2,
      name: 'Ryan Clark',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'Hey!',
        from: 2,
        timestamp: 1424469793023,
      },
      {
        contents: 'Hey, what\'s up?',
        from: 1,
        timestamp: 1424469794000,
      },
    ],
  },
}

const openChatID = parseInt(Object.keys(messages)[0], 10)

const MessagesStore = assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on('change', callback)
  },
  removeChangeListener(callback) {
    this.off('change', callback)
  },
  getOpenChatUserID() {
    return openChatID
  },
  getChatByUserID(id) {
    return messages[id]
  },
  getAll() {
    return messages
  },
})

MessagesStore.dispatchToken = Dispatcher.register(payload => {
})

export default MessagesStore
