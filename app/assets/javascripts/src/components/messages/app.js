import React from 'react'
import Header from './header'
import UserList from './userList'
import MessagesBox from './messagesBox'
// import MessagesAction from '../../actions/messages'
import User from '../../stores/users'
import MessagesStore from '../../stores/messages'
import _ from 'lodash'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    // messagesBox
    const users = User.getUsers()
    const currentUser = User.getCurrentUser()
    const openChatID = MessagesStore.getOpenChatUserID()
    const openUser = _.find(users, {id: openChatID})
    if (!openUser) return {}
    const messages = openUser.messages

    return {
      // messagesBox
      users,
      currentUser,
      openChatID,
      messages,
      // userList
      // friendUsers: User.getUsers(),
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
    this.setState(this.getStateFromStores())
  }

  render() {
    return (
        <div className='app'>
          <Header />
          <UserList {...this.state} />
          <MessagesBox {...this.state} />
        </div>
      )
  }
}

export default App
