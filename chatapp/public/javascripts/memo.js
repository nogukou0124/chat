'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const message = $("#message").val();

    if (typeof message === "string" && message.trim().length > 0) {
        // メモの内容を表示
        $('#thread').prepend('<p>' + userName + "さんのメモ：" + message + '</p>');
    }

    // 投稿後に入力エリアを空にする。
    $("#message").val("");

    return false;
}
