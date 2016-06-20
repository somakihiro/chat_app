import React from 'react'
import Header from '../src/components/messages/header'
import UserList from '../src/components/messages/userList'
import MessagesBox from '../src/components/messages/messagesBox'

class Page extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header />
          <UserList />
          <MessagesBox />
        </div>
      )
  }
}

export default Page
