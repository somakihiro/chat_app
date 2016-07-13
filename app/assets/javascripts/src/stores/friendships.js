import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import UsersAction from '../actions/users'

class FriendshipStore extends BaseStore {
  getFriendship() {
    if (!this.get('friendship')) this.setFriendship([])
    return this.get('friendship')
  }

  setFriendship(array) {
    this.set('friendship', array)
  }
}

const Friend = new FriendshipStore()

Friend.dispatcher = Dispatcher.register(payload => {
  const actions = {
    LOAD_FRIEND_SHIPS(payload) {
      Friend.setFriendship(payload.action.json)
      Friend.emitChange()
    },
    SAVE_FRIEND(payload) {
      const friendships = Friend.getFriendship()
      friendships.push({
        to_user_id: payload.action.toUserID,
        from_user_id: UsersAction.loadCurrentUser().id,
      })
      Friend.setFriendship(friendships)
      Friend.emitChange()
    },
  }
  actions[payload.action.type] && actions[payload.action.type](payload)
})

export default Friend
