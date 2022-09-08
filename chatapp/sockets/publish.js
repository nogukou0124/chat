'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data) {
        // 投稿時間をdataに追加
        const now = new Date();
       
        // data.timeに投稿時間を追加
        data.time = create_iso(now);
        
        data.message +=  "<br/>" +create_iso(now);

        // 全クライアントに向けて送信
        // io.sockets.emit("receiveMessageEvent", data);
        // ルーム内のクライアントに送信
        io.to(data.roomId).emit("receiveMessageEvent", data);

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