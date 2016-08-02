import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import CurrentUserStore from '../../stores/currentUser'
import _ from 'lodash'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    return this.getStateFromStores()
  }

  getStateFromStores() {
    return {
      value: '',
      toUserId: MessagesStore.getOpenChatUserId(),
      userId: CurrentUserStore.getCurrentUser().id,
    }
  }

  componentDidMount() {
    MessagesStore.onChange(this.onChangeHandler)
  }

  componentWillUnmount() {
    MessagesStore.offChange(this.onChangeHandler)
  }

  onStoreChange() {
    this.setState(this.getStateFromStores())
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && this.state.value !== '') {
      MessagesAction.saveMessage(this.state.value, this.state.toUserId, this.state.userId, this.state.image)
      this.setState({
          value: '',
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  uploadImageChat(e) {
    const inputDOM = e.target
    if (!inputDOM.files.length) return
    const file = inputDOM.files[0]
    MessagesAction.saveImageChat(file, this.state.toUserId, this.state.userId)
  }

  render() {
    const {value} = this.state

    return (
      <div className='reply-box'>
        <input
          value={value}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.updateValue.bind(this)}
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <div className='reply-box__image'>
          <input
            className='image-select-btn'
            type='file'
            ref='image'
            onChange={this.uploadImageChat.bind(this)}
          />
        </div>
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
