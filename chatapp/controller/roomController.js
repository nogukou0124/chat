class RoomController {
  /**
   * string[]
   */
  roomIds

  /**
   * {
   *  roomId: strin
   *  userName: string
   * }[]
   */
  users

  /**
   * {
   *  roomId: string
   *  userName: string
   *  isLetter: boolean
   *  message: string
   *  receivedAt: Date or string or number
   * }[]
   */
  chatHistory

  constructor() {
    this.roomIds = []
    this.users = []
    this.chatHistory = []
  }

  defaultEnterRoom(roomId, userName) {
    return this.setNewUser(roomId, userName)
  }

  setNewRoomId(roomId) {
    this.roomIds.push(roomId)
    console.log(this.roomIds)
  }

  setNewUser(roomId, userName) {
    console.log(this.users.filter((u) => u.roomId === roomId).map((u) => u.userName))
    if (this.users.filter((u) => u.roomId === roomId).map((u) => u.userName).includes(userName)) {
      return false
    } else {
      this.users.push({
        userName: userName,
        roomId: roomId,
      })
      console.log(this.users)
      return true
    }
  }
}

module.exports = RoomController
