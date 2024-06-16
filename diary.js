import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const diaryForm = document.getElementById('diary-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    if (diaryForm) {
        diaryForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const title = titleInput.value;
            const content = contentInput.value;

            try {
                const diaryRef = collection(db, 'diaries');
                await addDoc(diaryRef, { email: loggedInUser.email, title, content, date: new Date() });
                alert('일기가 저장되었습니다.');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Error saving diary:', error);
                alert('일기 저장 중 오류가 발생했습니다.');
            }
        });
    }

    loadDiaries(loggedInUser.email);
});

async function loadDiaries(email) {
    const entriesList = document.getElementById('entries-list');
    if (!entriesList) return;

    try {
        const diariesRef = collection(db, 'diaries');
        const q = query(diariesRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);

        entriesList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const entry = doc.data();
            const entryElement = document.createElement('li');
            entryElement.innerHTML = `
                <h3>${entry.title}</h3>
                <p>${entry.content}</p>
                <p>${new Date(entry.date.seconds * 1000).toLocaleString()}</p>
                <button class="view-btn" data-id="${doc.id}">View</button>
            `;
            entryElement.querySelector('.view-btn').addEventListener('click', () => {
                localStorage.setItem('currentEntryId', doc.id);
                window.location.href = 'view.html';
            });
            entriesList.appendChild(entryElement);
        });
    } catch (error) {
        console.error('Error loading diaries:', error);
        alert('일기 불러오기 중 오류가 발생했습니다.');
    }
}
