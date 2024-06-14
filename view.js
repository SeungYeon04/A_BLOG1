import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from 'firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const entryTitle = document.getElementById('entry-title');
    const entryContent = document.getElementById('entry-content');
    const backBtn = document.getElementById('back-btn');

    const currentDiaryId = localStorage.getItem('currentDiaryId');

    if (currentDiaryId) {
        try {
            const diaryDoc = await getDoc(doc(db, 'diaries', currentDiaryId));
            if (diaryDoc.exists()) {
                const diary = diaryDoc.data();
                entryTitle.textContent = diary.title;
                entryContent.textContent = diary.content;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('일기 불러오기 중 오류가 발생했습니다.');
        }
    }

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
