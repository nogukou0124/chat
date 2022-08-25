'use strict';

// チャットルームに入室する
function enter() {
    // 入力されたユーザ名を取得する
    const userName = $('form').submit();
    // ユーザ名が未入力でないかチェックする
    if (userName === '') {
        alert(userName);
        }
    
}
