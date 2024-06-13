const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let users = [];
let diaries = {};

// 회원가입 기능
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    } else {
        users.push({ username, email, password });
        diaries[email] = [];
        res.status(200).json({ message: '회원가입이 완료되었습니다.' });
    }
});

// 로그인 기능
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.status(200).json({ message: '로그인에 성공했습니다.', email });
    } else {
        res.status(400).json({ message: '이메일 또는 비밀번호가 잘못되었습니다.' });
    }
});

// 일기 저장 기능
app.post('/save-diary', (req, res) => {
    const { email, title, content } = req.body;
    if (diaries[email]) {
        diaries[email].push({ title, content, date: new Date() });
        res.status(200).json({ message: '일기가 저장되었습니다.' });
    } else {
        res.status(400).json({ message: '유효하지 않은 사용자입니다.' });
    }
});

// 일기 목록 가져오기
app.post('/get-diaries', (req, res) => {
    const { email } = req.body;
    if (diaries[email]) {
        res.status(200).json(diaries[email]);
    } else {
        res.status(400).json({ message: '유효하지 않은 사용자입니다.' });
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
