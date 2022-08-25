'use strict';

// 入室メッセージをサーバに送信する

// 入力されたユーザ名を取得する
const userName =  $('#username').val();
// 入室メッセージイベントを送信する
socket.emit('sendMessageEvent',userName)

// 入室メッセージイベントを送信する
socket.emit("sendEnterEvent", userName);

// サーバから受信した入室メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data + 'さんが入室しました' + '</p>');
});

