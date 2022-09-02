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

  exitRoom(roomId, userName) {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i]
      if (user.roomId === roomId && user.userName === userName) {
        this.users.splice(i, 1)
        break
      }
    }
    if (this.users.filter((u) => u.roomId === roomId).length === 0) {
      const index = this.roomIds.indexOf(roomId)
      this.roomIds.splice(index, 1)
    }
    // console.log(this.users, this.roomIds)
  }
}

module.exports = RoomController
