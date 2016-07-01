import _ from 'lodash'
import React from 'react'
import User from '../../stores/users'
import UserList from './userList'

export default class Search extends React.Component {
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
    return (
      <div className='search'>
        <input type='text'
               className='search_form'
               value={this.state.searchString}
               onChange={this.handleChange}
               placeholder='ユーザー名で検索しよう'
        />
        <UserList {...this.state} />
      </div>
    )
  }
}