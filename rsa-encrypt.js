document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("rsa-encrypt-input");
  const eInput = document.getElementById("rsa-encrypt-key-e");
  const nInput = document.getElementById("rsa-encrypt-key-n");
  const btn = document.getElementById("rsa-encrypt-btn");
  const result = document.getElementById("rsa-encrypt-result");

  // Function to perform modular exponentiation
  function modPow(base, exponent, modulus) {
    base = BigInt(base);
    exponent = BigInt(exponent);
    modulus = BigInt(modulus);
    let result = 1n;
    base = base % modulus;
    while (exponent > 0) {
      if (exponent % 2n === 1n) {
        result = (result * base) % modulus;
      }
      exponent = exponent / 2n;
      base = (base * base) % modulus;
    }
    return result;
  }

  btn.addEventListener("click", () => {
    const plaintext = input.value.trim().toUpperCase();
    const e = BigInt(eInput.value.trim());
    const n = BigInt(nInput.value.trim());

    if (!plaintext || !e || !n) {
      result.textContent = "Please enter all fields!";
      return;
    }

    // Convert plaintext letters to numbers (A=0, B=1,... Z=25, space=26)
    const numbers = Array.from(plaintext).map(c => {
      if (c >= "A" && c <= "Z") return c.charCodeAt(0) - 65;
      else return 26; // for space or non-letter
    });

    // Encrypt each number
    const cipherNumbers = numbers.map(m => modPow(m, e, n).toString());

    result.textContent = cipherNumbers.join(" ");
  });
});
