'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $("#userName").val();
    // ユーザ名が未入力でないかチェックする
    if (userName === "") {
        alert("ユーザー名を入力してください。");
    } else {
        // 入室処理
        $('form').submit();
    }
}

function test() {
    console.log("test aaaaa")
}

function createRoom() {
    const userName = $("#userName").val()

    if (typeof userName !== "string" || userName.trim() === "") {
        alert("ユーザー名を入力してください。");
    } else {
        const eCreateRoom = $(".createRoom")[0]
        const eForm = document.createElement("form")
        eForm.method = "POST"
        eForm.action = "/create_room"
        eForm.hidden = true
        eCreateRoom.appendChild(eForm)
        const eUserName = document.createElement("input")
        eUserName.name = "userName"
        eUserName.value = userName
        eUserName.hidden = true
        eForm.appendChild(eUserName)
        eForm.submit()
    }
}
