import _ from 'lodash'
import React from 'react'
import User from '../../stores/users'
import ChatAppModule from '../../lib/utils'

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

  onSubmitHandler(to_user_id) {
    _.map(this.state.users, (user) => {
      ChatAppModule.post('/friendships', {'to_user_id': to_user_id})
    })
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
              <li className='search_user_list_item' key={user.id}>
                <div className='search_user_list_result' onClick={this.onSubmitHandler.bind(this, user.id)}>
                  <img className='search_user_list_result_image' src={user.image ? '/user_images/' + user.image : '/assets/default_image.jpg'} />
                  {user.name}
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }
}
