import React from 'react'
import Header from '../src/partials/header'
import UserList from '../src/partials/userList'
import MessagesBox from '../src/partials/messagesBox'

export default class Page extends React.Component {
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
