import _ from 'lodash'
import React from 'react'
import UserStore from '../../stores/users'
import Utils from '../../lib/utils'

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
    return {users: UserStore.getUsers()}
  }

  componentDidMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  onSubmitHandler(to_user_id) {
    Utils.post('/friendships', {to_user_id})
  }

  render() {
    const searchUsers = this.state.users

    return (
      <ul className='search_user_list'>
        {
          _.map(searchUsers, (user) => {
            return (
              <li className='search_user_list_item' key={user.id}>
                <div className='search_user_list_result' onClick={this.onSubmitHandler.bind(this, user.id)}>
                  <img className='search_user_list_result_image' src={user.image ? '/user_images/' + user.image : '/assets/images/default_image.jpg'} />
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
