'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const roomName = $("#roomName").val();
    const userName = $("#userName").val();
    // ユーザ名とルーム名が未入力でないかチェックする
    if (userName === "" && roomName === "") {
        alert("ユーザー名とルーム名を入力してください。");
    }else if(userName === ""){
        alert("ユーザ名を入力してください。")
    }else if(roomName === ""){
        alert("ルーム名を入力してください。")
    } else {
        // 入室処理
        $('form').submit();
    }    
}
