document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("rsa-decrypt-input");
  const dInput = document.getElementById("rsa-decrypt-key-d");
  const nInput = document.getElementById("rsa-decrypt-key-n");
  const btn = document.getElementById("rsa-decrypt-btn");
  const result = document.getElementById("rsa-decrypt-result");

  // Modular exponentiation function
  function modPow(base, exponent, modulus) {
    base = BigInt(base);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);
    let res = 1n;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2n === 1n) res = (res * base) % modulus;
      exponent = exponent / 2n;
      base = (base * base) % modulus;
    }
    return res;
  }

  btn.addEventListener("click", () => {
    const ciphertext = input.value.trim();
    const d = BigInt(dInput.value.trim());
    const n = BigInt(nInput.value.trim());

    if (!ciphertext || !d || !n) {
      result.textContent = "Please enter all fields!";
      return;
    }

    // Split ciphertext into numbers
    const cipherNumbers = ciphertext.split(" ").map(x => BigInt(x));

    // Decrypt each number
    const plaintext = cipherNumbers.map(c => {
      const num = modPow(c, d, n); // Decrypt
      return String.fromCharCode(Number(num) + 65); // 0→A, 1→B ...
    }).join("");

    result.textContent = plaintext;
  });
});
