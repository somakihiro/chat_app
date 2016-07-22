import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import User from '../../stores/users'
import MessagesAction from '../../actions/messages'
import CurrentUserAction from '../../actions/currentUser'
import {CSRFToken} from '../../constants/app'

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
    return {
      users: User.getUsers(),
      openChatID: MessagesStore.getOpenChatUserID(),
    }
    // const allMessages = MessagesStore.getMessage()

    // const messageList = []
    // _.each(allMessages, (messages) => {
    //   const messagesLength = messages.length
    //   messageList.push({
    //     lastMessage: messages[messagesLength - 1],
    //     // lastAccess: message.lastAccess,
    //     user: User.getUser(),
    //   })
    // })

    // return {
    //   openChatID: MessagesStore.getOpenChatUserID(),
    //   messageList: messageList,
    // }
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

  render() {
    const {users, openChatID} = this.state

    const friendUsers = _.map(users, (user) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        // 'user-list__item--new': isNewMessage,
        'user-list__item--active': openChatID === user.id,
      })
      return (
        <div key={user.id} onClick={this.loadUserMessages.bind(this, user.id)}>
          <li
              onClick={this.changeOpenChat.bind(this, user.id)}
              className={itemClasses}
          >
            <div className='user-list__item__picture'>
              <img src={user.image ? '/user_images/' + user.image : 'assets/default_image.jpg'}/>
            </div>
            <div className='user-list__item__details'>
              <div className='user-list__item__name'>
                {user.name}
              </div>
              <form action={`/friendships/${user.id}`} method='post'>
                <input type='hidden' name='authenticity_token' value={CSRFToken()} />
                <input type='hidden' name='_method' value='delete' />
                <input type='submit' value='削除' className='user-list__item__delete btn btn-danger' />
              </form>
            </div>
          </li>
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

  //   this.state.messageList.sort((a, b) => {
  //     if (a.lastMessage.id > b.lastMessage.id) {
  //       return -1
  //     }
  //     if (a.lastMessage.id < b.lastMessage.id) {
  //       return 1
  //     }
  //     return 0
  //   })

  //   const messages = this.state.messageList.map((message, index) => {
  //     // const date = Utils.getNiceDate(message.lastMessage.timestamp)

  //     var statusIcon
  //     if (message.lastMessage.from !== message.user.id) {
  //       statusIcon = (
  //         <i className='fa fa-reply user-list__item__icon' />
  //       )
  //     }
  //     if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
  //       statusIcon = (
  //         <i className='fa fa-circle user-list__item__icon' />
  //       )
  //     }

  //     var isNewMessage = false
  //     if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
  //       isNewMessage = message.lastMessage.from !== UserStore.user.id
  //     }

  //     const itemClasses = classNames({
  //       'user-list__item': true,
  //       'clear': true,
  //       'user-list__item--new': isNewMessage,
  //       'user-list__item--active': this.state.openChatID === message.user.id,
  //     })

  //     return (
  //       <li
  //         onClick={ this.changeOpenChat.bind(this, message.user.id) }
  //         // className={ itemClasses }
  //         key={ index }
  //       >
  //         <div className='user-list__item__picture'>
  //           <img src={ message.user.image } />
  //         </div>
  //         <div className='user-list__item__details'>
  //           <h4 className='user-list__item__name'>
  //             { message.user.name }
  //             { /*  <abbr className='user-list__item__timestamp'>
  //                 { date }
  //               </abbr>
  //             */ }
  //           </h4>
  //           <span className='user-list__item__message'>
  //             {
  //               // statusIcon
  //             }
  //             { message.lastMessage }
  //           </span>
  //         </div>
  //       </li>
  //     )
  // //   }, this)
  //   return (
  //     <div className='user-list'>
  //       <ul className='user-list__list'>
  //         { messages }
  //        </ul>
  //     </div>
  //   )
  // }
