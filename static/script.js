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