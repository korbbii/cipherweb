// Create a character set including uppercase, lowercase, digits, and special characters
function createCharacterSet() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const specialChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/"; // include special characters
    return uppercase + lowercase + digits + specialChars;
}

// Find index of a character in the character set
function findIndex(character, characterSet) {
    return characterSet.indexOf(character);
}

// Encrypt the plaintext using the Vigenère cipher
function encrypt(plaintext, key) {
    const characterSet = createCharacterSet();
    const m = characterSet.length;
    const keyLength = key.length;
    let ciphertext = "";

    for (let i = 0; i < plaintext.length; i++) {
        const char = plaintext[i];
        if (characterSet.includes(char)) {
            const P_i = findIndex(char, characterSet);
            const K_i = findIndex(key[i % keyLength], characterSet);
            const C_i = (P_i + K_i) % m;
            ciphertext += characterSet[C_i];
        } else {
            ciphertext += char; // Non-supported characters remain unchanged
        }
    }
    return ciphertext;
}

// Decrypt the ciphertext using the Vigenère cipher
function decrypt(ciphertext, key) {
    const characterSet = createCharacterSet();
    const m = characterSet.length;
    const keyLength = key.length;
    let plaintext = "";

    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        if (characterSet.includes(char)) {
            const C_i = findIndex(char, characterSet);
            const K_i = findIndex(key[i % keyLength], characterSet);
            const P_i = (C_i - K_i + m) % m;
            plaintext += characterSet[P_i];
        } else {
            plaintext += char; // Non-supported characters remain unchanged
        }
    }
    return plaintext;
}

// Function to decrypt the text and display it
function decryptText() {
    const encryptedText = document.getElementById('encryptedText').value;
    const key = document.getElementById('key').value;
    const outputText = document.getElementById('outputText');

    if (!encryptedText || !key) {
        outputText.textContent = "Please provide both the encrypted text and the key.";
        return;
    }

    const decryptedText = decrypt(encryptedText, key);
    outputText.textContent = `Decrypted Text: ${decryptedText}`;
}

// Function to check the answer after decryption
function submitAnswer() {
    const userAnswer = document.getElementById('userAnswer').value.trim().toLowerCase();
    const correctAnswer = "cat"; // The correct answer is 'cat'
    
    const outputText = document.getElementById('outputText');

    if (!userAnswer) {
        outputText.textContent = "Please enter your answer.";
        return;
    }

    if (userAnswer === correctAnswer) {
        outputText.textContent = "Correct🎉! The answer is 'cat'.";
    } else {
        outputText.textContent = `Incorrect❌! You entered: ${userAnswer}`;
    }
}

// JavaScript function to toggle the description and answer container visibility
function toggleDescription(id, answerId) {
    const description = document.getElementById(id);
    const encryptedKey = document.getElementById('encryptedKey1');
    const answerContainer = document.getElementById(answerId);
    const quizButton = document.getElementById('quizButton');

    // Toggle visibility of description and encrypted key
    description.classList.toggle('hidden');
    encryptedKey.classList.toggle('hidden');
    answerContainer.classList.toggle('hidden');

    // Change button text and functionality based on current state
    if (description.classList.contains('hidden')) {
        quizButton.textContent = "Take Quiz";
    } else {
        quizButton.textContent = "X";
        quizButton.onclick = function() {
            toggleDescription(id, answerId);
        };
    }
}
