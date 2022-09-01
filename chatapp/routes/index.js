'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function (_request, response, _next) {
    return response.render('index');
});

// チャット画面の表示
router.post('/room', function (request, response, _next) {
    return response.redirect('/')
});

router.post('/room/:roomId', function (request, response, _next) {
    console.log('ユーザ名：' + request.body.userName);
    console.log(request.params)
    return response.render('room', { userName: request.body.userName });
});

// 部屋の新規作成用パス
router.post('/create_room', function (req, res, _next) {
    const now = new Date()
    const nowStr = `${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getDay()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}${now.getMilliseconds()}`
    return res.redirect(307, `/room/${nowStr}`)
})

// URL直打ち回避用
router.get('*', (_request, response, _next) => {
    return response.redirect('/')
});

module.exports = router;
