'use strict';

// レターメッセージをサーバに送信する
function publishLetter() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const message = $("#message").val();

    if (typeof message === "string" && message.trim().length > 0) {
        // レターを送信 username, メッセージ
        socket.emit("sendLetterEvent", [userName, message]);
    }

    // 投稿後に入力エリアを空にする。
    $("#message").val("");
    return false;
}


// サーバから受信したレターメッセージを画面上に表示する
socket.on('receiveLetterEvent', function (data) {
    // dataの中身　[userName, メッセージ内容, 送信時間]
    $('#letterThread').prepend('<p>' + data[0] + "さんのレター：" + data[1] + " " + data[2] + '</p>');
});

// 送信中であることを明記
socket.on('sendingLetterEvent', function (data) {
    // dataの中身　[userName, メッセージ内容, 送信時間]
    $('#letterThread').prepend('<p>' + data[0] + "さんのレター:送信中" + '</p>');
});

