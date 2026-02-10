// Wait until the HTML is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("caesar-input");
  const encryptBtn = document.getElementById("caesar-encrypt-btn");
  const decryptBtn = document.getElementById("caesar-decrypt-btn");
  const result = document.getElementById("caesar-result");

  // Encrypt function (Caesar Cipher shift = 3)
  function caesarEncrypt(text, shift = 3) {
    return text.toUpperCase().split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
      } else {
        return char; // keep spaces or punctuation
      }
    }).join('');
  }

  // Decrypt function
  function caesarDecrypt(text, shift = 3) {
    return text.toUpperCase().split('').map(char => {
      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65);
      } else {
        return char;
      }
    }).join('');
  }

  // Button listeners
  encryptBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) {
      result.textContent = "Please enter text!";
      return;
    }
    result.textContent = caesarEncrypt(text);
  });

  decryptBtn.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) {
      result.textContent = "Please enter text!";
      return;
    }
    result.textContent = caesarDecrypt(text);
  });
});
