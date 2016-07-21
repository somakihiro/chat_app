import React from 'react'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import CurrentUser from '../../stores/currentUser'

class ReplyBox extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
    this.onChangeHandler = this.onStoreChange.bind(this)
  }

  get initialState() {
    // return {
    //   value: '',
    //   toUserID: MessagesStore.getOpenChatUserID(),
    // }
    return this.getStateFromStores()
  }

  getStateFromStores() {
    // const currentUserMessages = CurrentUser.getCurrentUser().messages
    // const messageId = currentUserMessages ? currentUserMessages[currentUserMessages.length - 1].id + 1 : null

    return {
      value: '',
      toUserId: MessagesStore.getOpenChatUserID(),
      userId: CurrentUser.getCurrentUser().id,
      // id: messageId,
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
      // MessagesAction.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value)
      MessagesAction.saveMessage(this.state.value, this.state.toUserId, this.state.userId)
      this.setState({
        value: '',
        // toUserId: MessagesStore.getOpenChatUserID(),
        // userId: CurrentUser.getCurrentUser().id,
      })
    }
  }

  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }

  // loaduserMessages(id) {
  //   MessagesAction.loaduserMessages(id)
  // }

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
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default ReplyBox
