'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        // 投稿時間をdataに追加
        const now = new Date();
        const str_now = now
            .toISOString()           //2022-02-05T21:00:00.000Z
            .replace(/[^0-9]/g, '')  //20220205210000000
            .slice(0, -5);           //202202052100
        // date[2]に投稿時間を追加
        data.push(str_now);
        io.sockets.emit("receiveMessageEvent", data);

        // 履歴に追加
        if (io.sockets.messages == null) {
            io.sockets.messages = [{type: "publish", data: data}];
        } else {
            io.sockets.messages.push({type: "publish", data: data});
        }
    });
};
