import React from 'react'
import UserList from './userList'

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
    this.setState({
      searchString: e.target.value,
    })
  }
  render() {
    const {searchString} = this.state
    return (
      <div className='search'>
        <input type='text'
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
