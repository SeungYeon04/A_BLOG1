document.addEventListener('DOMContentLoaded', () => {
    const diaryForm = document.getElementById('diary-form');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const entriesList = document.getElementById('entries-list');
    const entryTitle = document.getElementById('entry-title');
    const entryContent = document.getElementById('entry-content');
    const backBtn = document.getElementById('back-btn');

    const loadEntries = () => {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        if (entriesList) {
            entriesList.innerHTML = '';
            entries.forEach(entry => {
                const entryElement = createEntryElement(entry);
                entriesList.appendChild(entryElement);
            });
        }
    };

    const saveEntry = (title, content) => {
        const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        const newEntry = { id: Date.now(), title, content };
        entries.push(newEntry);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
    };

    const deleteEntry = (id) => {
        let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
        entries = entries.filter(entry => entry.id !== id);
        localStorage.setItem('diaryEntries', JSON.stringify(entries));
        loadEntries();
    };

    const viewEntry = (entry) => {
        localStorage.setItem('currentEntry', JSON.stringify(entry));
        window.location.href = 'view.html';
    };

    const createEntryElement = (entry) => {
        const entryElement = document.createElement('a');
        entryElement.innerHTML = `
            <h3>${entry.title}</h3>
            <div class="button-container">
                <button class="view-btn" data-id="${entry.id}">View</button>
                <button class="delete-btn" data-id="${entry.id}">Delete</button>
            </div>
        `;
        entryElement.querySelector('.view-btn').addEventListener('click', () => {
            viewEntry(entry);
        });
        entryElement.querySelector('.delete-btn').addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteEntry(id);
        });
        return entryElement;
    };

    if (diaryForm) {
        diaryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = titleInput.value;
            const content = contentInput.value;
            saveEntry(title, content);
            titleInput.value = '';
            contentInput.value = '';
            window.location.href = 'index.html';
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    if (entryTitle && entryContent) {
        const currentEntry = JSON.parse(localStorage.getItem('currentEntry'));
        if (currentEntry) {
            entryTitle.textContent = currentEntry.title;
            entryContent.textContent = currentEntry.content;
        }
    }

    loadEntries();
});
