document.addEventListener('DOMContentLoaded', () => {
    const diaryForm = document.getElementById('diary-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');

    const saveEntry = (title, content) => {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        const newEntry = { id: Date.now(), title, content };
        entries.push(newEntry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
    };

    diaryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = titleInput.value;
        const content = contentInput.value;
        saveEntry(title, content);
        titleInput.value = '';
        contentInput.value = '';
        window.location.href = 'index.html';
    });
});
