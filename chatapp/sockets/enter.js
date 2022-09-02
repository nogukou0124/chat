'use strict';

module.exports = function (socket, io) {
    // 入室メッセージをクライアントに送信する
    socket.on('sendEnterEvent', function (data) {
        socket.broadcast.emit("receiveEnterEvent", data);

        // 履歴を送る必要があれば送信。
        if (io.sockets.messages !== undefined && io.sockets.messages.length > 0) {
            console.log("履歴送信ーーーーー");
            console.log(io.sockets.messages);
            // 入室したクライアントのみに送信
            socket.emit("recieveHistoryEvent", io.sockets.messages);
        }
    });
};
