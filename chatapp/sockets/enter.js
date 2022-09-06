'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterEvent', function (data) {
        // ルームに参加
        socket.join(data.roomId);
        socket.broadcast.to(data.roomId).emit("receiveEnterEvent", data);

        // 履歴を送る必要があれば送信。
        if (io.sockets.messages !== undefined) {
            const roomMessages = io.sockets.messages.filter(function (val) {
                return val.data.roomId == data.roomId;
            });
            if (roomMessages.length > 0) {
                console.log("履歴送信ーーーーー");
                console.log(roomMessages);
                // 入室したクライアントのみそのルームの履歴を送信
                socket.emit("recieveHistoryEvent", roomMessages);
            }
        }
    });
};
