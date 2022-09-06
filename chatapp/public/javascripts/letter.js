'use strict';

// レターメッセージをサーバに送信する
function publishLetter() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const message = $("#message").val();

    if (typeof message === "string" && message.trim().length > 0) {
        // レターを送信 username, メッセージ
        socket.emit("sendLetterEvent", {
            userName: userName,
            roomId: roomId,
            message: message
        });
    }

    // 投稿後に入力エリアを空にする。
    $("#message").val("");
    return false;
}


// サーバから受信したレターメッセージを画面上に表示する
socket.on('receiveLetterEvent', function (data) {
    // dataの中身　{userName: userName, message:メッセージ内容, time:送信時間}
    $('#letterThread').prepend('<p>' + data.userName + "さんのレター：" + data.message + '</p>');
});

// 送信中であることを明記
socket.on('sendingLetterEvent', function (data) {
    // dataの中身　{userName: userName, message:メッセージ内容, time:送信時間}
    $('#letterThread').prepend('<p>' + data.userName + "さんのレターを送信中。" + '</p>');
});

