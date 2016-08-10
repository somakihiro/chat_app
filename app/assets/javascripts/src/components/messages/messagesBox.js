import React from 'react'
import classNames from 'classnames'
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
