import Utils from '../utils'
import MessagesStore from '../stores/messages'
import UserStore from '../stores/user'

class UserList extends React.Component {
  getInitialState() {
    const allMessages = MessagesStore.getAllChats()

    const messageList = []
    for (const id in allMessages) {
      const item = allMessages[id]

      const messagesLength = item.messages.length
      messageList.push({
        lastMessage: item.messages[messagesLength - 1],
        lastAccess: item.lastAccess,
        user: item.user,
      }, )
    }

    return {
      openChatID: MessagesStore.getOpenChatUserID(),
      messageList: messageList,
    }
  }
  render() {
    this.state.messageList.sort((a, b) => {
      if (a.lastMessage.timestamp > b.lastMessage.timestamp) {
        return -1
      }
      if (a.lastMessage.timestamp < b.lastMessage.timestamp) {
        return 1
      }
      return 0
    })

    const messages = this.state.messageList.map((message, index) => {
      const date = Utils.getNiceDate(message.lastMessage.timestamp)

      var statusIcon
      if (message.lastMessage.from !== message.user.id) {
        statusIcon = (
            <i className='fa fa-reply user-list__item__icon' />
          )
      }
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        statusIcon = (
            <i className='fa fa-circle user-list__item__icon' />
          )
      }

      var isNewMessage = false
      if (message.lastAccess.currentUser < message.lastMessage.timestamp) {
        isNewMessage = message.lastMessage.from !== UserStore.user.id
      }

      console.log(this.state.openChatID, message.user.id)

      const itemClasses = React.addons.classSet({
        'user-list__item': true,
        'clear': true,
        'user-list__item--new': isNewMessage,
        'user-list__item--active': this.state.openChatID === messages.user.id,
      }, )

      console.log(itemClasses)

      return (
          <li className='{ itemClasses }' key='{ message.user.id }'>
            <div className='user-list__item__picture'>
              <img src={ message.user.profilePicture } />
            </div>
            <div className='user-list__item__details'>
              <h4 className='user-list__item__name'>
                { message.user.name }
                <abbr className='user-list__item__timestamp'>
                  { date }
                </abbr>
              </h4>
              <span className='user-list__item__message'>
                { statusIcon } { message.lastMessage.contents }
              </span>
            </div>
          </li>
        )
    }, this)
    return (
        <div className='user-list'>
          <ul className='user-list__list'>
            { messages }
          </ul>
        </div>
      )
  }
}

export default UserList
