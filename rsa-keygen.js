document.addEventListener("DOMContentLoaded", () => {
  const pInput = document.getElementById("rsa-keygen-p");
  const qInput = document.getElementById("rsa-keygen-q");
  const btn = document.getElementById("rsa-keygen-btn");
  const result = document.getElementById("rsa-keygen-result");

  function gcd(a, b) {
    while (b !== 0) {
      let t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  function modInverse(e, phi) {
    let m0 = phi, t, q;
    let x0 = 0, x1 = 1;
    if (phi === 1) return 0;
    while (e > 1) {
      q = Math.floor(e / phi);
      t = phi;
      phi = e % phi;
      e = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
  }

  btn.addEventListener("click", () => {
    const p = parseInt(pInput.value.trim());
    const q = parseInt(qInput.value.trim());

    if (isNaN(p) || isNaN(q) || p <= 1 || q <= 1) {
      result.textContent = "Please enter valid prime numbers!";
      return;
    }

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    // Choose e
    let e = 3;
    while (gcd(e, phi) !== 1) {
      e += 2;
    }

    const d = modInverse(e, phi);

    result.textContent = `Public Key: (e=${e}, n=${n})\nPrivate Key: (d=${d}, n=${n})`;
  });
});
