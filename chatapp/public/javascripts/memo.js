'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $("#userName").val();
    // 入力されたメッセージを取得
    const message = $("#message").val();

    const now = new Date();

    if (typeof message === "string" && message.trim().length > 0) {
        // メモの内容を表示
        $('#thread').prepend(
            '<div class="fukidashi right_message_box">' 
                + '<p class="nopadding">' + userName + "さんのメモ：" + message + "</p>" 
                + '<p class="nopadding" style="text-align: right; font-size:10px">' + create_iso(now) + '</p>' + 
            '</div>');
    }

    // 投稿後に入力エリアを空にする。
    $("#message").val("");

    return false;
}

// Date型からStringの "2022年9月2日 07:04" の形へ変換。
function create_iso(now) {
    let Year = now.getFullYear();
    let Month = now.getMonth()+1;
    let Date = now.getDate();
    let Hour = formatTime(now.getHours());
    let Min = formatTime(now.getMinutes());
    return Year + "年" + Month + "月" + Date + "日 " + Hour + ":" + Min;
}

function formatTime(i) {
    /* 1桁の場合 */
    if (i < 10) {
      /* 先頭を0埋め */
      i = "0" + i;
    }
    return i;
}