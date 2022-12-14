'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitEvent', function (data) {
        socket.broadcast.to(data.roomId).emit("receiveExitEvent", data);
        socket.leave(data.roomId);
    });
};
