document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        window.location.href = 'login.html';
        return;
    }

    const entriesList = document.getElementById('entries-list');

    const loadDiaries = () => {
        let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
        diaries = diaries.filter(diary => diary.email === userEmail);

        entriesList.innerHTML = diaries.map(diary => `
            <li>
                <h3>${diary.title}</h3>
                <p>${diary.content}</p>
                <small>${new Date(diary.date).toLocaleString()}</small>
            </li>
        `).join('');
    };

    loadDiaries();
});


