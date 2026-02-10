document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("shift-input");
  const keyInput = document.getElementById("shift-key");
  const encryptBtn = document.getElementById("shift-encrypt-btn");
  const decryptBtn = document.getElementById("shift-decrypt-btn");
  const bruteBtn = document.getElementById("shift-brute-force-btn");
  const result = document.getElementById("shift-result");

  function shiftEncrypt(text, key) {
    key = parseInt(key);
    if (isNaN(key)) return "Invalid key!";
    return text.toUpperCase().split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + key) % 26) + 65);
      } else {
        return char;
      }
    }).join('');
  }

  function shiftDecrypt(text, key) {
    key = parseInt(key);
    if (isNaN(key)) return "Invalid key!";
    return text.toUpperCase().split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((char.charCodeAt(0) - 65 - key + 26) % 26) + 65);
      } else {
        return char;
      }
    }).join('');
  }

  function bruteForceAttack(text) {
    const possibilities = [];
    for (let key = 1; key < 26; key++) {
      possibilities.push(`${key}: ${shiftDecrypt(text, key)}`);
    }
    return possibilities.join('\n');
  }

  encryptBtn.addEventListener("click", () => {
    const text = input.value.trim();
    const key = keyInput.value.trim();
    if (!text || !key) {
      result.textContent = "Please enter text and key!";
      return;
    }
    result.textContent = shiftEncrypt(text, key);
  });

  decryptBtn.addEventListener("click", () => {
    const text = input.value.trim();
    const key = keyInput.value.trim();
    if (!text || !key) {
      result.textContent = "Please enter text and key!";
      return;
    }
    result.textContent = shiftDecrypt(text, key);
  });

  bruteBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) {
      result.textContent = "Please enter text!";
      return;
    }
    result.textContent = bruteForceAttack(text);
  });
});
