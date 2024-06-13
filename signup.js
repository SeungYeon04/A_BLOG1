document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('이미 존재하는 이메일입니다.');
    } else {
        users.push({ username, email, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('회원가입이 완료되었습니다.');
        window.location.href = 'login.html'; // 회원가입 성공 시 login.html로 이동
    }
});
