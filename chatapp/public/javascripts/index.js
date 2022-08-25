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
        $('#userName').submit();
    }    
}
