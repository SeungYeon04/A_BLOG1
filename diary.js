document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const diaryForm = document.getElementById('diary-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    diaryForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = titleInput.value;
        const content = contentInput.value;

        let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
        const id = diaries.length ? diaries[diaries.length - 1].id + 1 : 1;
        diaries.push({ id, email: loggedInUser.email, title, content, date: new Date() });
        localStorage.setItem('diaries', JSON.stringify(diaries));

        alert('일기가 저장되었습니다.');
        window.location.href = 'index.html';
    });
});
