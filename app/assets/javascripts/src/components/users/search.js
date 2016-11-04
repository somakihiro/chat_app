import React from 'react'
import UserList from './userList'
import UsersAction from '../../actions/users'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      searchString: '',
    }
  }

  handleChange(e) {
    const searchString = e.target.value
    this.setState({
      searchString,
    })
    UsersAction.loadSearchUsers(searchString)
  }

  render() {
    const {searchString} = this.state
    return (
      <div className='search'>
        <div className='chatapp-logo'>
          <span className='google logo-c'>C</span>
          <span className='google logo-h'>h</span>
          <span className='google logo-a'>a</span>
          <span className='google logo-t'>t</span>
          <span className='google logo-A'>A</span>
          <span className='google logo-p'>p</span>
          <span className='google logo-p2'>p</span>
        </div>
        <input
          type='text'
          className='search_form'
          value={searchString}
          onChange={this.handleChange.bind(this)}
          placeholder='ユーザー名で検索しよう'
        />
        <UserList {...this.state} />
      </div>
    )
  }
}
