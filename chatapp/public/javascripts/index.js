'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const roomId = $("#roomId").val();
    const userName = $("#userName").val();
    // ユーザ名とルーム名が未入力でないかチェックする
    if (userName === "" && roomName === "") {
        alert("ユーザー名とルーム名を入力してください。");
    }else if(userName === ""){
        alert("ユーザ名を入力してください。")
    } else if (roomId === ""){
        alert("ルーム名を入力してください。")
    } else {
        // 入室処理
        const eCreateRoom = $(".createRoom")[0]
        const form = document.createElement("form")
        form.hidden = true
        eCreateRoom.appendChild(form)
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
        form.action = "/enter_room"
        form.submit()

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
