import _ from 'lodash'
import React from 'react'
import User from '../../stores/users'
import FriendshipsAction from '../../actions/friendships'

export default class UserList extends React.Component {
  static get propTypes() {
    return {
      searchString: React.PropTypes.string,
    }
  }
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    return {users: User.getUser()}
  }

  componentDidMount() {
    User.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    User.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  saveFriend(id) {
    FriendshipsAction.saveFriend(id)
  }

  render() {
    var users = this.state.users
    const searchString = this.props.searchString.trim().toLowerCase()
    if (searchString.length > 0) {
      users = _.filter(users, (user) => {
        return user.name.toLowerCase().match(searchString)
      })
    }
    return (
      <ul className='search_user_list'>
        {
          _.map(users, (user) => {
            return (
                // <a
                //   href='/'
                //   key={ user.id }
                // >
                //   <li
                //      className='search_user_list_id'
                //      onClick={ this.saveFriend.bind(this, user.id) }
                //   >
                //     {user.name}
                //   </li>
                // </a>
                <li key={ user.id }>
                  <form action='/friendships' method='post'>
                    <input name='to_user_id' value={ user.id } type='hidden' />
                    <input type='submit' value={ user.name } className='search_user_list_id' />
                  </form>
                </li>
            )
          })
         }
      </ul>
    )
  }
}
