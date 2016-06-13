import React from 'react'

export default class Main extends React.Component {

  static get defaultProps() {
    return {
    }
  }

  static get propTypes() {
    return {
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
    }
  }

  render() {
    return (
      <div className='reply-box'>
        <input className='reply-box__input' placeholder='Type message to reply..' />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
      </div>
    )
  }
}

export default Main
