'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#username').val();
    // 退室メッセージイベントを送信する
    socket.emit('sendMessageEvent',userName)
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data) {
    $('#thread').prepend('<p>' + data + 'さんが退出しました' +  '</p>');
});
