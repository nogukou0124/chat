'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const message = $("#message").val();

    if (typeof message === "string" && message.trim().length > 0) {
        // 投稿内容を送信 username, メッセージ
        socket.emit("sendMessageEvent", {
            userName: userName, 
            roomId: roomId,
            message: message
        });
    }

    // 投稿後に入力エリアを空にする。
    $("#message").val("");
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    // dataの中身　{userName: userName, message:メッセージ内容, time:送信時間}
    $('#thread').prepend('<p>' + data.userName + "さん：" + data.message + " " + '</p>');
    console.log(data);
});

