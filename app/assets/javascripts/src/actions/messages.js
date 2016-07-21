import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  // sendMessage(message) {
  //   Dispatcher.handleViewAction({
  //     type: 'sendMessage',
  //     // userID: userID,
  //     message: message,
  //     // timestamp: +new Date(),
  //   })
  // },
  loadUserMessages(id) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}/${id}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_USER_MESSAGES,
            json: json,
            // id,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  // loadMessages() {
  // //   return new Promise((resolve, reject) => {
  // //     request
  // //     .get(`${APIEndpoints.MESSAGES}`)
  // //     .end((error, res) => {
  // //       if (!error && res.status === 200) {
  // //         const json = JSON.parse(res.text)
  // //         Dispatcher.handleServerAction({
  // //           type: ActionTypes.LOAD_MESSAGES,
  // //           json: json,
  // //         })
  // //         resolve(json)
  // //       } else {
  // //         reject(res)
  // //       }
  // //     })
  // //   })
  // // },

  saveMessage(body, to_user_id, user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
              body,
              to_user_id,
              user_id,
              // id,
            })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_MESSAGE,
            body,
            to_user_id,
            user_id,
            // id,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  // loadFriendShips() {
  //   return new Promise((resolve, reject) => {
  //     request
  //     .get(`${APIEndpoints.FRIENDSHIPS}`)
  //     .end((error, res) => {
  //       if (!error && res.status === 200) {
  //         const json = JSON.parse(res.text)
  //         Dispatcher.handleServerAction({
  //           type: ActionTypes.LOAD_FRIEND_SHIPS,
  //           json: json,
  //         })
  //         resolve(json)
  //       } else {
  //         reject(res)
  //       }
  //     })
  //   })
  // },
}
