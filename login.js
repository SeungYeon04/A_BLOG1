document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert('로그인에 성공했습니다.');
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // 로그인한 사용자의 정보를 저장
        window.location.href = 'index.html'; // 로그인 성공 시 index.html로 이동
    } else {
        alert('이메일 또는 비밀번호가 잘못되었습니다.');
    }
});
