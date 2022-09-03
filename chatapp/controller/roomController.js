class RoomController {
  /**
   * string[]
   */
  roomIds

  /**
   * {
   *  roomId: strin
   *  userNames: string[]
   * }[]
   */
  users

  /**
   * {
   *  roomId: string
   *  chatInfo: {
   *   userName: string
   *   isLetter: boolean
   *   message: string
   *   receivedAt: Date or string or number
   *  }[]
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
  }

  setNewUser(roomId, userName) {
    if (!this.roomIds.includes(roomId)) return false

    let room = this.users.find((u) => u.roomId === roomId)
    if (room === undefined) {
      // 新規部屋作成
      room = {
        roomId: roomId,
        userNames: [userName],
      }
      console.log(userName, " が ", roomId, " を作成し入室しました。")
      this.users.push(room)
      return true
    } else {
      // 既存部屋入室
      if (!room.userNames.includes(userName)) {
        room.userNames.push(userName)
        console.log(userName, " が ", roomId, " に入室しました。")
        return true
      }
    }
    return false
  }

  exitRoom(roomId, userName) {
    const room = this.users.find((u) => u.roomId === roomId)

    if (room) {
      for (let i = 0; i < room.userNames.length; i++) {
        const uName = room.userNames[i]
        if (uName === userName) {
          room.userNames.splice(i, 1)
          console.log(userName, "が", roomId, "から退会しました。")
          break
        }
      }

      if (room.userNames.length === 0) {
        const index = this.users.map((u) => u.roomId).indexOf(roomId)
        const roomIndex = this.roomIds.indexOf(roomId)
        this.users.splice(index, 1)
        this.roomIds.splice(roomIndex, 1)
        console.log("ユーザがいなくなり", roomId, "が削除されました。")
      }
    }
  }
}

module.exports = RoomController
