import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from 'firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const entriesList = document.getElementById('entries-list');

    const loadDiaries = async () => {
        try {
            const diariesRef = collection(db, 'diaries');
            const diarySnapshot = await getDocs(query(diariesRef, where('email', '==', loggedInUser.email)));
            let diaries = [];
            diarySnapshot.forEach(doc => diaries.push({ ...doc.data(), id: doc.id }));

            entriesList.innerHTML = diaries.map(diary => `
                <li>
                    <h3>${diary.title}</h3>
                    <p>${diary.content}</p>
                    <small>${new Date(diary.date.seconds * 1000).toLocaleString()}</small>
                </li>
            `).join('');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    loadDiaries();
});
