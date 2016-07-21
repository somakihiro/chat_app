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

  loadCurrentUser() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}/me`)
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            tyep: ActionTypes.LOAD_CURRENT_USER,
            json: json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  loadSearchUsers() {
    return new Promise((resolve, reject) => {
      request
      .get(`${APIEndpoints.USERS}/search`)
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
