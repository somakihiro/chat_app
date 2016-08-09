import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import User from '../../stores/users'
import MessagesAction from '../../actions/messages'
import CurrentUserAction from '../../actions/currentUser'
import {CSRFToken} from '../../constants/app'
import CurrentUser from '../../stores/currentUser'

class UserList extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    const currentUser = CurrentUser.getCurrentUser()
    if (!currentUser) return {}
    const currentUserId = currentUser.id
    return {
      users: User.getUsers(),
      openChatId: MessagesStore.getOpenChatUserId(),
      currentUserId,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    User.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    User.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }

  loadUserMessages(id) {
    CurrentUserAction.loadCurrentUser()
    MessagesAction.loadUserMessages(id)
  }

  saveLastAccess(userId, toUserId, lastAccess) {
    const toUser = _.find(CurrentUser.getCurrentUser().accesses, {to_user_id: toUserId})
    if (toUser) {
      MessagesAction.updateLastAccess(lastAccess, toUserId)
    } else {
      MessagesAction.createLastAccess(userId, toUserId, lastAccess)
    }
  }

  deleteChatConfirm(e) {
    if (!confirm('本当に削除しますか？(チャットの履歴は残ります。)')) {
      e.preventDefault()
    }
  }

  render() {
    const {users, openChatId, currentUserId} = this.state

    const friendUsers = _.map(users, (user) => {
      const messageLength = user.messages.length
      const lastMessage = user.messages[messageLength - 1]
      const hoge =  _.find(CurrentUser.getCurrentUser().accesses, {to_user_id: user.id})
      let newMessageIcon
      if (lastMessage) {
        if (!hoge || lastMessage.created_at > hoge.last_access) {
          newMessageIcon = (
            <i className='fa fa-circle new-message-icon' />
          )
        }
      }

      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': openChatId === user.id,
      })
      return (
        <div key={user.id} onClick={this.loadUserMessages.bind(this, user.id)}>
          <div onClick={this.saveLastAccess.bind(this, currentUserId, user.id, new Date())}>
            <li
              onClick={this.changeOpenChat.bind(this, user.id)}
              className={itemClasses}
            >
              <form action={`/friendships/${user.id}`} method='post'>
                <input
                  type='hidden'
                  name='authenticity_token'
                  value={CSRFToken()}
                />
                <input
                  type='hidden'
                  name='_method'
                  value='delete'
                />
                <input
                  type='submit'
                  value='&#xf057;'
                  className='remove-chat-btn'
                  onClick={this.deleteChatConfirm.bind(this)}
                />
              </form>
              <div className='user-list__item__picture'>
                <img src={user.image ? '/user_images/' + user.image : 'assets/default_image.jpg'} />
              </div>
              <div className='user-list__item__details'>
                <div className='user-list__item__name'>
                  {newMessageIcon ? newMessageIcon : null}
                  <a href={`users/${user.id}`} className='user-list-name'>{user.name}</a>
                </div>
              </div>
            </li>
          </div>
        </div>
      )
    }, this)

    return (
        <div className='user-list'>
          <ul className='user-list__list'>
            {friendUsers}
           </ul>
        </div>
    )
  }
}

export default UserList
