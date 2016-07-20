import React from 'react'
import _ from 'lodash'
// import MessagesAction from '../../actions/messages'
import User from '../../stores/users'
import MessagesStore from '../../stores/messages'
import CurrentUser from '../../stores/currentUser'
import Header from './header'
import UserList from './userList'
import MessagesBox from './messagesBox'
// import MessagesAction from '../../actions/messages'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    // const users = User.getUsers()
    const openChatID = MessagesStore.getOpenChatUserID()
    // const userMessages = MessagesAction.loadUserMessages(openChatID).messages
    // const userMessages = MessagesStore.getUserMessages()
    const currentUser = CurrentUser.getCurrentUser()
    if (!currentUser) return {}
    const currentUserMessages = currentUser.messages? currentUser.messages : []
    // if (!currentUserMessages) return []
    // if (!currentUser) return {}
    // if (!currentUserMessages) return []
    // if (!currentUserMessages) return []
    const users = MessagesStore.getUserMessages()
    if (!users) return {}
    const openUserMessages = users.messages? users.messages : []
    // if (!openUserMessages) return []
    // const messages = _.map(users, (user) => { // [{id: , name: , messages:[{}]}, {}]
    //   return user.messages // [Array[85], Array[3]] [[{id: , body: ,},{},{}...],[{},{},{}]]
    // })
    // const currentUser = users[0]
    // if (!currentUser) return {}
    // const currentUserId = currentUser.id
    // const openUserMessages = users.messages
    // if (!openUserMessages) return []
    // if (!openUser) return {}
    // const openUserMessages = openUser.messages
    const allMessages = _.concat(currentUserMessages, openUserMessages)
    const messages = _.sortBy(allMessages, (message) => {return message.created_at})
    // if (messages.length < 0) return []
    // const openUser = MessagesAction.loadUserMessages(openChatID)
    // if (!openUser) return {}
    // const messages = openUser.messages
    // const openUser = _.find(users, {id: openChatID})
    // if (!openUser) return {}
    // const messages = openUser.messages

    return {
      // messagesBox
      // users,
      // currentUserId,
      currentUser,
      openChatID,
      messages,
      // userMessages,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
    User.onChange(this.onChangeHandler)
    CurrentUser.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
    User.offChange(this.onChangeHandler)
    CurrentUser.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    return (
        <div className='app'>
          <Header />
          <UserList />
          <MessagesBox {...this.state} />
        </div>
      )
  }
}

export default App
