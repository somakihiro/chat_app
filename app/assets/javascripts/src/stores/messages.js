// import _ from 'lodash'
import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import User from './users'
// import MessagesAction from '../actions/messages'

// const messages = {
//   2: {
//     user: {
//       profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
//       id: 2,
//       name: 'Ryan Clark',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424469794050,
//       currentUser: 1424469794080,
//     },
//     messages: [
//       {
//         contents: 'Hey!',
//         from: 2,
//         timestamp: 1424469793023,
//       },
//       {
//         contents: 'Hey, what\'s up?',
//         from: 1,
//         timestamp: 1424469794000,
//       },
//     ],
//   },
//   3: {
//     user: {
//       read: true,
//       profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
//       name: 'Jilles Soeters',
//       id: 3,
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424352522000,
//       currentUser: 1424352522080,
//     },
//     messages: [
//       {
//         contents: 'Want a game of ping pong?',
//         from: 3,
//         timestamp: 1424352522000,
//       },
//     ],
//   },
//   4: {
//     user: {
//       name: 'Todd Motto',
//       id: 4,
//       profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
//       status: 'online',
//     },
//     lastAccess: {
//       recipient: 1424423579000,
//       currentUser: 1424423574000,
//     },
//     messages: [
//       {
//         contents: 'Please follow me on twitter I\'ll pay you',
//         timestamp: 1424423579000,
//         from: 4,
//       },
//     ],
//   },
// }

// var openChatID = parseInt(Object.keys(messages)[0], 10)
let openChatID = parseInt(Object.keys(User.getUsers())[0], 10)
// var openChatID = parseInt([User.getUser()[0].id], 10)
// var openChatID = parseInt([3], 10)
class MessageStore extends BaseStore {

  getOpenChatUserID() {
    return openChatID
  }

  getChatByUserID(id) {
    // return this.getMessage()[id]
    return User.getUsers()[id]
  }

  // getChatByUserID() {
  //   return User.getUser()[this.getOpenChatUserID()].messages
  // }

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
      // openChatID = payload.action.id
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

    // LOAD_MESSAGES(payload) {
    //   MessagesStore.setUserMessages(payload.action.json)
    //   MessagesStore.emitChange()
    // },

    SAVE_MESSAGE(payload) {
      const messages = MessagesStore.getUserMessages()
      messages.push({
        // id: Math.floor(Math.random() * 1000000),
        body: payload.action.body,
        to_user_id: payload.action.to_user_id,
      })
      MessagesStore.setUserMessages(messages)
      MessagesStore.emitChange()
    },
  }

  actions[payload.action.type] && actions[payload.action.type](payload)
})

window.MessagesStore = MessagesStore
export default MessagesStore
