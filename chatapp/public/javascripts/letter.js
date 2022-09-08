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
    if (data.userName === userName) {
        // 自分のレター
        // 送信中の表記を削除
        // $("#sending_letter_message").remove();
        // 送信中の表記を送信完了にする。
        $("#sending_letter_message").replaceWith('<div class="sending_letter_messages" id="sending_letter_message">' + data.userName + "さんのレターを送信しました。" + '</div>');
        // レター内容表記
        $('#thread').prepend(
            '<div class="letter_box right_letter_box">'
                + '<p class="nopadding">' + data.userName + "さん：" + data.message + " " + '</p>'
                + '<p class="nopadding" style="text-align: right; font-size:10px">' + data.time + '</p>' +
            '</div>');
    } else {
        // 送られてきたレター
        $('#thread').prepend(
            '<div class="letter_box left_letter_box">'
                + '<p class="nopadding">' + data.userName + "さん：" + data.message + " " + '</p>'
                + '<p class="nopadding" style="text-align: right; font-size:10px">' + data.time + '</p>' +
            '</div>');
    }

});

// 送信中であることを明記
socket.on('sendingLetterEvent', function (data) {
    // dataの中身　{userName: userName, message:メッセージ内容, time:送信時間}
    $('#thread').prepend('<div class="sending_letter_messages" id="sending_letter_message">' + data.userName + "さんのレターを送信中..." + '</div>');
});

