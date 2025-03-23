document.getElementById('encryptButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;

    fetch('/encrypt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: inputText }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети или сервера');
        }
        return response.json();
    })
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('encryptedResult').textContent = data.encrypted_word;
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        document.getElementById('encryptedResult').textContent = 'Произошла ошибка. Проверьте консоль для подробностей.';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contestEndModal');
    modal.style.display = 'flex';
});

document.getElementById('closeModal').addEventListener('click', () => {
    const modal = document.getElementById('contestEndModal');
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('contestEndModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.getElementById('themeToggle').addEventListener('click', () => {
    const body = document.body;
    const themeToggleIcon = document.querySelector('.theme-toggle i');

    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark-theme');
    }
});
