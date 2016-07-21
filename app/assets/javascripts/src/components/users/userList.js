import _ from 'lodash'
import React from 'react'
import User from '../../stores/users'
import {CSRFToken} from '../../constants/app'

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
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {users: User.getUsers()}
  }

  componentDidMount() {
    User.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    User.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  render() {
    const {users} = this.state
    const {searchString} = this.props

    let allUsers = users
    const searchUserName = searchString.trim().toLowerCase()
    if (searchUserName.length > 0) {
      allUsers = _.filter(allUsers, (user) => {
        return user.name.toLowerCase().match(searchUserName)
      })
    }
    return (
      <ul className='search_user_list'>
        {
          _.map(allUsers, (user) => {
            return (
              <li key={user.id}>
                <form action='/friendships' method='post'>
                  <input type='hidden' name='authenticity_token' value={CSRFToken()} />
                  <input name='to_user_id' value={user.id} type='hidden' />
                  <input type='submit' value={user.name} className='search_user_list_id' />
                </form>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
