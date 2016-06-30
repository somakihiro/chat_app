import _ from 'lodash'
import React from 'react'
import User from '../../stores/users'

export default class Search extends React.Component {
  static get propTypes() {
    return {
      items: React.PropTypes.any,
    }
  }
  constructor(props) {
    super(props)
    this.state = this.initialState
    this.handleChange = this.handleChange.bind(this)
  }
  get initialState() {
    return {
      searchString: '',
    }
  }
  handleChange(e) {
    this.setState({
      searchString: e.target.value,
    })
  }
  render() {
    // var libraries = this.props.items
    var users = User.getUser()
    const searchString = this.state.searchString.trim().toLowerCase()
    if (searchString.length > 0) {
      users = users.filter((user) => {
        return user.name.toLowerCase().match(searchString)
      })
    }
    return (
      <div className='search'>
        <input type='text'
               className='search_form'
               value={this.state.searchString}
               onChange={this.handleChange}
               placeholder='ユーザー名で検索しよう'
        />
        <ul className='search_user_list'>
          {
            _.map(users, (user) => {
              return <li key={user.id} className='search_user_list_id'>{user.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
