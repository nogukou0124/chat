'use strict';

// 入室メッセージをサーバに送信する

// 入力されたユーザ名を取得する
const userName =  $('#userName').val();
// 入室メッセージイベントを送信する
socket.emit("sendEnterEvent", userName);

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveEnterEvent', function (data) {
    $('#thread').prepend('<p>' + data + 'さんが入室しました。' + '</p>');
});


// サーバから受信した履歴を画面上に表示する
socket.on('recieveHistoryEvent', function (data) {
    console.log(data);
    for (const mess of data) {
        if (mess.type === "publish") {
            // publishの履歴の作成
            $('#thread').prepend('<p>' + mess.data[0] + "さん：" + mess.data[1] + '</p>');
        } else if (mess.type === "letter") {
            // letterの履歴の作成
            $('#thread').prepend('<p>' + mess.data[0] + "さん：" + mess.data[1] + '</p>');
        }
    }
});
