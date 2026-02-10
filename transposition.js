document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("transposition-input");
  const keyInput = document.getElementById("transposition-key");
  const encryptBtn = document.getElementById("transposition-encrypt-btn");
  const decryptBtn = document.getElementById("transposition-decrypt-btn");
  const result = document.getElementById("transposition-result");

  function encryptTransposition(text, key) {
    key = parseInt(key);
    if (isNaN(key) || key <= 0) return "Invalid key!";
    let cols = key;
    let rows = Math.ceil(text.length / cols);
    let paddedText = text.padEnd(rows * cols, " ");
    let cipherText = "";

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        cipherText += paddedText[r * cols + c];
      }
    }
    return cipherText;
  }

  function decryptTransposition(cipherText, key) {
    key = parseInt(key);
    if (isNaN(key) || key <= 0) return "Invalid key!";
    let cols = key;
    let rows = Math.ceil(cipherText.length / cols);
    let plainText = Array(rows * cols).fill(" ");
    let index = 0;

    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (index < cipherText.length) {
          plainText[r * cols + c] = cipherText[index++];
        }
      }
    }
    return plainText.join("").trim();
  }

  encryptBtn.addEventListener("click", () => {
    const text = input.value.trim();
    const key = keyInput.value.trim();
    if (!text || !key) {
      result.textContent = "Please enter text and key!";
      return;
    }
    result.textContent = encryptTransposition(text, key);
  });

  decryptBtn.addEventListener("click", () => {
    const text = input.value.trim();
    const key = keyInput.value.trim();
    if (!text || !key) {
      result.textContent = "Please enter text and key!";
      return;
    }
    result.textContent = decryptTransposition(text, key);
  });
});
