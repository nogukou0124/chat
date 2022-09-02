'use strict';

module.exports = function (socket, io) {
    // レターメッセージを送信する
    socket.on('sendLetterEvent', function (data) {
        // 5秒後にメッセージを送る
        // setTimeout関数だと並列に何個も処理しないといけないので現実的ではない。
        // setTimeout(function() {
        //     io.sockets.emit("receiveLetterEvent", data);
        // }, 5000);

        //送信中であることを明記
        socket.emit('sendingLetterEvent', data);

        // タイムスタンプ方式でレターを送信した時間を記録。
        const now = new Date().getTime();
        //レター送信待機中の配列に追加
        if (io.sockets.reserved_letters == null) {
            io.sockets.reserved_letters = [{time: now, letter: data}];
        } else {
            io.sockets.reserved_letters.push({time: now, letter: data});
        }
    });

    // 1分おき(5秒実装の場合は1秒おき)にreserved_lettersを確認して時間が経過していればレター送信処理。
    const send_letter = function(){
        if (io.sockets.reserved_letters !== undefined && io.sockets.reserved_letters.length > 0) {
            const now = new Date();
            for (const dic of io.sockets.reserved_letters) {
                // 経過時間を計算
                const diff = now.getTime() - dic.time;
                // 5秒以上経過していれば送信処理
                if (diff > 5000) {
                    // reserved_lettersから削除
                    io.sockets.reserved_letters.splice(io.sockets.reserved_letters.indexOf(dic), 1);

                    // dic.letter[2]に投稿時間を追加
                    dic.letter.push(create_iso(now));
                    // レター送信
                    io.sockets.emit("receiveLetterEvent", dic.letter);

                    // 履歴に追加
                    if (io.sockets.messages == null) {
                        io.sockets.messages = [{type: "letter", data: dic.letter}];
                    } else {
                        io.sockets.messages.push({type: "letter", data: dic.letter});
                    }
                }
            }
        } 
    };
    // デモのために1秒おきに設定。
    setInterval(send_letter, 1000);
};

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