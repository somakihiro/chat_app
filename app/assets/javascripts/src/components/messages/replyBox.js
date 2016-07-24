import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import CurrentUserStore from '../../stores/currentUser'

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
      image: '',
      toUserId: MessagesStore.getOpenChatUserID(),
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
    if (e.keyCode === 13) {
      MessagesAction.saveMessage(this.state.value, this.state.toUserId, this.state.userId)
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

  imagePost() {
    MessagesAction.saveMessage(this.state.image, this.state.toUserId, this.state.userid)
    this.setState({
      image: '',
    })
  }

  updateImage(e) {
    this.setState({
      image: e.target.image,
    })
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
            // ref='value'
            // onKeyDown={this.handleKeyDown.bind(this)}
            // onChange={this.updateValue.bind(this)}
          />
          <button className='image-post-btn btn btn-primary' type='button'>画像送信</button>
        </div>
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
