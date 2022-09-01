'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const message = $("#message").val();

    if (typeof message === "string" && message.trim().length > 0) {
        // 投稿内容を送信 username, メッセージ
        socket.emit("sendMessageEvent", [userName, message]);
    }

    // 投稿後に入力エリアを空にする。
    $("#message").val("");
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data[0] + "さん：" + data[1] + " " + create_isoString(data[2]) + '</p>');
});


function create_isoString(str_date) {
    const year = str_date.substring(0, 4);  //2022
    const month = str_date.substring(4, 6); //09
    const day = str_date.substring(6, 8);   //01
    const hour = str_date.substring(8, 10); //21
    const min = str_date.substring(10, 12); //00
    const isoString = year + '-' + month + '-' + day + 'T' + hour + ':' + min;
    return isoString
}