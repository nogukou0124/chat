'use strict';

const express = require('express');
const router = express.Router();
const RoomController = require('../controller/roomController');

const roomController = new RoomController()

// ログイン画面の表示
router.get('/', function (_request, response, _next) {
    return response.render('index');
});

// チャット画面の表示
router.post('/room', function (request, response, _next) {
    console.log('ユーザ名：' + request.body.userName);
    console.log('ルームID: ' + request.body.roomId);

    return response.redirect(307, `/room/${request.body.roomId}`)
});

router.post('/room/:roomId', function (request, response, _next) {
    console.log('ユーザ名：' + request.body.userName);
    console.log('ルームID: ' + request.params.roomId);

    if (roomController.defaultEnterRoom(request.params.roomId, request.body.userName)) {
        return response.render('room', {
            userName: request.body.userName,
            roomId: request.params.roomId,
        });
    } else {
        return response.render('error', {
            message: "存在しないルームID か 重複するユーザ名 です",
            error: {
                status: 404,
            }
        })
    }
});

// 部屋の新規作成用パス
router.post('/create_room', function (_req, res) {
    const now = new Date()
    let newRoomId = `?${now.getFullYear()}?${now.getMonth()}?${now.getDate()}?${now.getDay()}?${now.getHours()}?${now.getMinutes()}?${now.getSeconds()}?${now.getMilliseconds()}?`
    while (newRoomId.includes("?")) {
        newRoomId = newRoomId.replace("?", String(Math.floor(Math.random() * 10)))
    }
    newRoomId = Number(newRoomId).toString(16)
    while (newRoomId[newRoomId.length - 1] === "0") {
        newRoomId = newRoomId.slice(0, -1)
    }
    roomController.setNewRoomId(newRoomId)
    return res.redirect(307, `/room/${newRoomId}`)
})

// API 入室時のロジック
router.post('/enter_room', (req, res) => {
    console.log("enter room", req.body)
    return res.redirect(307, "/room")
})

// API 退出時のロジック
router.post('/exit_room', (req, res) => {
    // console.log("exit room", req.body)
    roomController.exitRoom(req.body.roomId, req.body.userName)
    return res.redirect("/")
})

// URL直打ち回避用
router.get('*', (_request, response, _next) => {
    return response.redirect('/')
});

module.exports = router;
