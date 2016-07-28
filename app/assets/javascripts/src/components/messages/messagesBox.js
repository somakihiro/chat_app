import React from 'react'
import classNames from 'classNames'
import ReplyBox from '../../components/messages/replyBox'
import _ from 'lodash'

class MessagesBox extends React.Component {

  static get propTypes() {
    return {
      openChatID: React.PropTypes.number,
      currentUser: React.PropTypes.object,
      messages: React.PropTypes.array,
    }
  }

  render() {
    const {messages, currentUser, openChatID} = this.props

    const userMessages = _.map(messages, (message) => {
      const messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id === currentUser.id,
        'clear': true,
      })
      if (message.to_user_id === currentUser.id || message.to_user_id === openChatID) {
        return (
          <li key={message.id} className={messageClasses}>
            <div className='message-box__item__contents'>
              {message.image ? <img className='image-message' src={`/message_images/${message.image}`} /> : message.body}
            </div>
          </li>
        )
      }
    })

    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          {userMessages}
        </ul>
        <ReplyBox />
      </div>
    )
  }
}

export default MessagesBox

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
    // })
