import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
// import MessagesStore from '../../stores/messages'
// import UsersAction from '../../actions/users'
// import User from '../../stores/users'
import _ from 'lodash'
// import Utils from '../../utils'

class MessagesBox extends React.Component {

  static get propTypes() {
    return {
      users: React.PropTypes.array,
      currentUser: React.PropTypes.object,
      messages: React.PropTypes.array,
    }
  }

  // constructor(props) {
  //   super(props)
  //   this.state = this.initialState
  // }

  // get initialState() {
  //   return this.getStateFromStores()
  // }

  // getStateFromStores() {
    // const users = User.getUsers()
    // // const users = UsersAction.loadUserAll()
    // // const users = _.map(user, (user) => {
    // //   return UsersAction.loadUserID(user.id)
    // // })
    // // const users = UsersAction.loadUserID()
    // // const currentUser = UsersAction.loadCurrentUser()
    // const currentUser = User.getCurrentUser()
    // // if (!currentUser) return {}
    // // const currentUserID = currentUser[0]
    // // const currentUserMessage = currentUser[0].messages
    // const openChatID = MessagesStore.getOpenChatUserID()
    // const openUser = _.find(users, {id: openChatID})
    // if (!openUser) return {}
    // const messages = openUser.messages

  //   return {
  //     users,
  //     currentUser,
  //     // openChatID,
  //     messages,
  //   }
  // }
  // componentDidMount() {
  //   MessagesStore.onChange(this.onStoreChange.bind(this))
  //   User.onChange(this.onStoreChange.bind(this))
  // }

  // componentWillUnmount() {
  //   MessagesStore.offChange(this.onStoreChange.bind(this))
  //   User.offChange(this.onStoreChange.bind(this))
  // }

  // onStoreChange() {
  //   this.setState(this.getStateFromStores())
  // }

  render() {
    // const messagesLength = this.state.messages.length
    // const currentUserID = UsersAction.loadCurrentUser().id
    const {currentUser, messages} = this.props

    const allMessages = _.map(messages, (message) => {
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
        'message-box__item--from-current': message.user_id === currentUser,
        'clear': true,
      })

      return (
        <li key={message.id} className={ messageClasses }>
          <div className='message-box__item__contents'>
            {message.body}
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
          { allMessages }
        </ul>
        <ReplyBox />,
      </div>
    )
  }
}

export default MessagesBox
