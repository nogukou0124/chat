'use strict';

module.exports = function (socket, io) {
    // レターメッセージを送信する
    socket.on('sendLetterEvent', function (data) {
        // 5秒後にメッセージを送る
        // setTimeout関数だと並列に何個も処理しないといけないので現実的ではない。
        // setTimeout(function() {
        //     io.sockets.emit("receiveLetterEvent", data);
        // }, 5000);
        

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
            const now = new Date().getTime();
            for (const dic of io.sockets.reserved_letters) {
                // 経過時間を計算
                const diff = now - dic.time;
                // 5秒以上経過していれば送信処理
                if (diff > 5000) {
                    // reserved_lettersから削除
                    io.sockets.reserved_letters.splice(io.sockets.reserved_letters.indexOf(dic), 1);
                    // レター送信
                    io.sockets.emit("receiveLetterEvent", dic.letter);
                }
            }
        } 
    };
    // デモのために1秒おきに設定。
    setInterval(send_letter, 1000);
};