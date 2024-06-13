document.addEventListener('DOMContentLoaded', () => {
    const entryTitle = document.getElementById('entry-title');
    const entryContent = document.getElementById('entry-content');
    const backBtn = document.getElementById('back-btn');

    const currentDiary = JSON.parse(localStorage.getItem('currentDiary'));

    if (currentDiary) {
        entryTitle.textContent = currentDiary.title;
        entryContent.textContent = currentDiary.content;
    }

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
