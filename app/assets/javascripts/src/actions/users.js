import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  loadUser() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS_SEARCH}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_USER,
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