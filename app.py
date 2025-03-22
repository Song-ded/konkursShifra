from flask import Flask, render_template, request, jsonify
from random import choice

app = Flask(__name__)

chars = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
numbers = [5, 7, 2, 3, 14, 9, 11, 20, 15, 18, 4, 8, 5, 6, 7, 8, 9, 10, 8, 2, 0, 4, 0, 8, 1, 6]
cyrillic_letters = ["а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"]

def letter_code(score=23):
    first_letter = choice(numbers)
    second_letter = choice(numbers)
    while second_letter + first_letter > score:
        first_letter = choice(numbers)
        second_letter = choice(numbers)
    third_letter = score - second_letter - first_letter
    while third_letter not in numbers:
        first_letter = choice(numbers)
        second_letter = choice(numbers)
        third_letter = score - second_letter - first_letter
    return chars[numbers.index(first_letter)] + chars[numbers.index(second_letter)] + chars[numbers.index(third_letter)]

def encrypt_word(word_input):
    word_iter = iter(word_input)
    word = ""
    for _ in word_input:
        try:
            char = next(word_iter)
            if char in cyrillic_letters:
                word += letter_code(cyrillic_letters.index(char) + 1)
            else:
                word += char
        except StopIteration:
            break
    return word

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/encrypt', methods=['POST'])
def encrypt():
    data = request.json
    word_input = data.get('word')
    if not word_input:
        return jsonify({'error': 'Слово не предоставлено'}), 400
    encrypted_word = encrypt_word(word_input)
    return jsonify({'encrypted_word': encrypted_word})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
