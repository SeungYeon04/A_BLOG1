document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        window.location.href = 'login.html';
        return;
    }

    const entriesList = document.getElementById('entries-list');

    const loadDiaries = () => {
        let diaries = JSON.parse(localStorage.getItem('diaries')) || [];
        diaries = diaries.filter(diary => diary.email === loggedInUser.email);

        entriesList.innerHTML = diaries.map(diary => `
            <li>
                <h3>${diary.title}</h3>
                <p>${diary.content}</p>
                <small>${new Date(diary.date).toLocaleString()}</small>
                <button onclick="viewDiary(${diary.id})">View</button>
            </li>
        `).join('');
    };

    const viewDiary = (id) => {
        const diaries = JSON.parse(localStorage.getItem('diaries')) || [];
        const diary = diaries.find(d => d.id === id);
        if (diary) {
            localStorage.setItem('currentDiary', JSON.stringify(diary));
            window.location.href = 'view.html';
        }
    };

    loadDiaries();
});


