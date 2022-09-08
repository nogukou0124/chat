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
    });
    const eH1 = $("h1")[0]
    const form = document.createElement("form")
    form.hidden = true
    eH1.appendChild(form)
    const eUserName = document.createElement("input")
    eUserName.hidden = true
    eUserName.name = "userName"
    eUserName.value = userName
    form.appendChild(eUserName)
    const eRoomId = document.createElement("input")
    eRoomId.hidden = true
    eRoomId.name = "roomId"
    eRoomId.value = roomId
    form.appendChild(eRoomId)
    form.method = "POST"
    form.action = "/exit_room"
    form.submit()
    // console.log(userName, roomId)
    // 退室
    // location.href = '/';
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveExitEvent', function (data) {
    const roomId = $('#roomId').val();
    const now = new Date();
    if (roomId === data.roomId) {
        $('#thread').prepend('<div class="messages">' + data.userName + 'さんが退出しました。' + '</div>');
    }
});
