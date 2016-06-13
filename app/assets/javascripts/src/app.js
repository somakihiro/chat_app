import Header from '../partials/header'
import UserList from '../partials/userList'
import MessagesBox from '../partials/messagesBox'

class Page extends React.Component {
  render() {
    return (
        <div className='app'>
          <Header />,
          <UserList />,
          <MessagesBox />,
        </div>
      )
  }
}

React.render(<Page />, document.body)
