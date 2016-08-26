import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints} from '../constants/app'

export default {
  loadUsers() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_USERS,
            json: json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  loadSearchUsers(search_string) {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}/search`)
      .query({search_string})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.LOAD_SEARCH_USERS,
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
