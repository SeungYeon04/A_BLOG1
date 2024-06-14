import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    console.log('Signup form loaded:', signupForm);

    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Form submitted:', { username, email, password });

        try {
            const usersRef = collection(db, 'users');
            const userSnapshot = await getDocs(query(usersRef, where('email', '==', email)));
            console.log('User snapshot:', userSnapshot);

            if (!userSnapshot.empty) {
                alert('이미 존재하는 이메일입니다.');
            } else {
                const newUser = await addDoc(usersRef, { username, email, password });
                console.log('User added:', newUser);
                alert('회원가입이 완료되었습니다.');
                window.location.href = 'login.html';
            }
        } catch (error) {
            console.error('Error:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    });
});
