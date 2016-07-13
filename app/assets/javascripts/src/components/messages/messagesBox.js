import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import MessagesStore from '../../stores/messages'
import UsersAction from '../../actions/users'
import User from '../../stores/users'
import _ from 'lodash'
// import Utils from '../../utils'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const users = User.getUser()
    const currentUser = UsersAction.loadCurrentUser()
    const openChatID = MessagesStore.getOpenChatUserID()
    const openUser = _.find(users, {id: openChatID})
    if (!openUser) return {}
    const messages = openUser.messages

    // const message = User.getUser()[MessagesStore.getOpenChatUserID()].messages
    // return {messages: MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())}
    // return {messages: MessagesStore.getMessage()}
    // return {messages: _.find(User.getUser(), MessagesStore.getOpenChatUserID()]).messages})
    // return {messages: MessagesStore.getChatByUserID(MessagesStore.getOpenChatUserID())}
    // return {messages: message}
    // return {messages: User.getUser()}

    return {
      users: users,
      currentUser: currentUser,
      openChatID: openChatID,
      messages: messages,
    }
  }
  componentDidMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    User.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
    User.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    // const messagesLength = this.state.messages.length
    // const currentUserID = UsersAction.loadCurrentUser().id

    const messages = _.map(this.state.messages, (message) => {
    // const messages = _.map(this.state.users, (user) => {
    //   if(user.id === this.state.openChatID){
    //     _.map(user.messages, (message) => {
    //       const messageClasses = classNames({
    //         'message-box__item': true,
    //         'message-box__item--from-current': message.user_id === currentUserID,
    //         'clear': true,
    //     })

    //       return (
    //         <li key={ message.id } className={ messageClasses }>
    //           <div className='message-box__item__contents'>
    //             { message.message }
    //           </div>
    //         </li>
    //       )
    //     })
    //   }
    // })
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === this.state.currentUser.id,
        'clear': true,
      })

      return (
          <li key={ message.id } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.message }
            </div>
          </li>
        )
    })

    // const lastMessage = this.state.messages[messagesLength - 1]

    // if (lastMessage.from === currentUserID) {
    //   if (this.state.lastAccess.recipient >= lastMessage.timestamp) {
    //     const date = Utils.getShortDate(lastMessage.timestamp)
    //     messages.push(
    //         <li key='read' className='message-box__item message-box__item--read'>
    //           <div className='message-box__item__contents'>
    //             Read { date }
    //           </div>
    //         </li>
    //       )
    //   }
    // }
    return (
        <div className='message-box'>
          <ul className='message-box__list'>
            { messages }
          </ul>
          <ReplyBox />,
        </div>
      )
  }
}

export default MessagesBox
