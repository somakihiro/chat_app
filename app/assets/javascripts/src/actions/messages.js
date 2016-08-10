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
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  createLastAccess(to_user_id, last_access) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.USERS}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id, last_access})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  updateLastAccess(to_user_id, last_access) {
    return new Promise((resolve, reject) => {
      request
      .put(`${APIEndpoints.CURRENT_USER}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({to_user_id, last_access})
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  saveMessage(body, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}`)
      .set('X-CSRF-Token', CSRFToken())
      .send({
        body,
        to_user_id,
      })
      .end((error, res) => {
        if (!error && res.status === 200) {
          const json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_MESSAGE,
            body,
            to_user_id,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },

  saveImageChat(file, to_user_id) {
    return new Promise((resolve, reject) => {
      request
      .post(`${APIEndpoints.MESSAGES}/upload_image`)
      .set('X-CSRF-Token', CSRFToken())
      .attach('image', file, file.name)
      .field('to_user_id', to_user_id)
      .end((error, res) => {
        if (!error && res.status === 200) {
          let json = JSON.parse(res.text)
          Dispatcher.handleServerAction({
            type: ActionTypes.SAVE_IMAGE_CHAT,
            image: file.name,
            to_user_id,
            json,
          })
          resolve(json)
        } else {
          reject(res)
        }
      })
    })
  },
}
