'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        // 投稿時間をdataに追加
        const now = new Date();
        // date[2]に投稿時間を追加
        data.push(create_iso(now));
        io.sockets.emit("receiveMessageEvent", data);

        // 履歴に追加
        if (io.sockets.messages == null) {
            io.sockets.messages = [{type: "publish", data: data}];
        } else {
            io.sockets.messages.push({type: "publish", data: data});
        }
    });
};


// Date型からStringの "2022年9月2日 07:04" の形へ変換。
function create_iso(now) {
    let Year = now.getFullYear();
    let Month = now.getMonth()+1;
    let Date = now.getDate();
    let Hour = formatTime(now.getHours());
    let Min = formatTime(now.getMinutes());
    return Year + "年" + Month + "月" + Date + "日 " + Hour + ":" + Min;
}

function formatTime(i) {
    /* 1桁の場合 */
    if (i < 10) {
      /* 先頭を0埋め */
      i = "0" + i;
    }
    return i;
}