'use strict';

const express = require('express');
const router = express.Router();

// ログイン画面の表示
router.get('/', function (_request, response, _next) {
    response.render('index');
});

// チャット画面の表示
router.post('/room', function (request, response, _next) {
    console.log('room')
    console.log('ユーザ名：' + request.body.userName);
    response.render('room', { userName: request.body.userName });
});

// URL直打ち回避用
router.get('*', (_request, response, _next) => {
    response.redirect('/')
});

module.exports = router;
