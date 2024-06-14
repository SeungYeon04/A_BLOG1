import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    console.log('Login form loaded:', loginForm);

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Form submitted:', { email, password });

        try {
            const usersRef = collection(db, 'users');
            const userQuery = query(usersRef, where('email', '==', email), where('password', '==', password));
            console.log('Executing query:', userQuery);
            const userSnapshot = await getDocs(userQuery);
            console.log('User snapshot:', userSnapshot);

            if (!userSnapshot.empty) {
                alert('로그인에 성공했습니다.');
                const user = userSnapshot.docs[0].data();
                console.log('Logged in user:', user);
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                alert('이메일 또는 비밀번호가 잘못되었습니다.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('로그인 중 오류가 발생했습니다.');
        }
    });
});
