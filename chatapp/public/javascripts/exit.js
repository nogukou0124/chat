'use strict';

// 退室メッセージをサーバに送信する
function exit() {
    // ユーザ名取得
    const userName = $('#userName').val();
    const roomId = $('#roomId').val();
    // 退室メッセージイベントを送信する
    socket.emit('sendExitEvent', {
        userName: userName,
        roomId: roomId,
    })
    // 退室
    location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitEvent', function (data) {
    const roomId = $('#roomId').val();
    if (roomId === data.roomId) {
        $('#thread').prepend('<p>' + data.userName + 'さんが退出しました。' +  '</p>');
    }
});
