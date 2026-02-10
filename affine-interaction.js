document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("affine-input");
    const keyA = document.getElementById("affine-key-a");
    const keyB = document.getElementById("affine-key-b");
    const result = document.getElementById("affine-result");

    document.getElementById("affine-encrypt-btn").onclick = () => {
        processText(true);
    };

    document.getElementById("affine-decrypt-btn").onclick = () => {
        processText(false);
    };

    function gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    function modInverse(a, m) {
        for (let i = 1; i < m; i++) {
            if ((a * i) % m === 1) return i;
        }
        return null;
    }

    function processText(isEncrypt) {
        const text = input.value.toUpperCase();
        const a = parseInt(keyA.value);
        const b = parseInt(keyB.value);

        if (!text || isNaN(a) || isNaN(b)) {
            result.textContent = "❌ Please enter text, key a and key b";
            return;
        }

        if (gcd(a, 26) !== 1) {
            result.textContent = "❌ Key a must be coprime with 26";
            return;
        }

        let output = "";
        const aInv = modInverse(a, 26);

        for (let char of text) {
            if (char >= "A" && char <= "Z") {
                let x = char.charCodeAt(0) - 65;
                let y;

                if (isEncrypt) {
                    y = (a * x + b) % 26;
                } else {
                    y = (aInv * (x - b + 26)) % 26;
                }

                output += String.fromCharCode(y + 65);
            } else {
                output += char;
            }
        }

        result.textContent = output;
    }
});
