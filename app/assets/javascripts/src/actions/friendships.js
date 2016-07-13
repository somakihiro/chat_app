import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  loadFriendships() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.FRIENDSHIPS}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_FRIEND_SHIPS,
            json: json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
  saveFriend(toUserID) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.FRIENDSHIPS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id: toUserID})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_FRIEND,
            to_user_id: toUserID,
            json: json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
