import { doc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const entryId = localStorage.getItem('currentEntryId');
    if (!entryId) {
        alert('No entry selected');
        window.location.href = 'index.html';
        return;
    }

    const entryTitle = document.getElementById('entry-title');
    const entryContent = document.getElementById('entry-content');
    const deleteBtn = document.getElementById('delete-btn');
    const backBtn = document.getElementById('back-btn');

    try {
        const entryDoc = await getDoc(doc(db, 'diaries', entryId));
        if (entryDoc.exists()) {
            const entry = entryDoc.data();
            entryTitle.textContent = entry.title;
            entryContent.textContent = entry.content;
        } else {
            alert('Entry not found');
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Error loading entry:', error);
        alert('Error loading entry');
        window.location.href = 'index.html';
    }

    deleteBtn.addEventListener('click', async () => {
        const confirmDelete = confirm('Are you sure you want to delete this entry?');
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, 'diaries', entryId));
                alert('Entry deleted');
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Error deleting entry:', error);
                alert('Error deleting entry');
            }
        }
    });

    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});
